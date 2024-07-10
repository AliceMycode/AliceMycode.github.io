
import * as echarts from 'echarts'
import { Message } from 'element-ui'
export default class profileAnalysis {
  constructor() {
    this.viewer = window.$viewer
    this.startAndEndPoints = []
    this.vertexEntities = []
    this.positions = []
    this.tempPositions = []
    this.echartDom = null
    this.labelEntity = null
    this.lineEntity = undefined
    this.echartsInstance = null
    this.interNumber = 50000
    this.init()
    this.profile = {
      arrHB: [],
      arrPoint: [],
      arrLX: [],
      ponits: [],
      distance: 0
    }
  }
  init() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair';
    //设置tooltip
    this.handleToolTip()
    //初始化鼠标移动事件
    this.handleMouseMove()
    //初始化鼠标右键事件
    this.handleRightClick()
    //初始化左键事件
    this.handleLeftClick()
  }
  //创建图表dom
  createEchartsDom() {
    const app = document.getElementById('app')
    this.echartDom = document.createElement('div')
    app.appendChild(this.echartDom)
    this.echartDom.setAttribute('id', 'profileAnalysis-container')
  }
  //左键点击
  handleLeftClick() {
    this.handler.setInputAction((event) => {
      this.startAndEndPoints.push(this.viewer.scene.pickPosition(event.position))
      this.positions.push(this.viewer.scene.pickPosition(event.position))
      if (this.positions.length == 1) { //首次点击  
        this.createLineEntity();
        this.createStartEntity();
      }
      if (this.startAndEndPoints.length == 2) {
        this.createEndEntity();
        this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
        for (let i = 0; i < this.startAndEndPoints.length - 1; i++) {
          let point = this.equidistantInterpolation(this.startAndEndPoints[i], this.startAndEndPoints[i + 1])
          this.profile.arrPoint.push(point)
        }
        for (let j = 0; j < this.profile.arrPoint.length; j++) {
          for (let m = 0; m < this.profile.arrPoint[j].length; m++) {
            this.profile.ponits.push(this.profile.arrPoint[j][m])
          }
        }
        this.profile.arrLX.push(0)
        for (let k = 1; k < this.profile.ponits.length - 1; k++) {
          this.profile.arrHB.push(this.profile.ponits[k].hit)
          let disc = this.distance(this.profile.ponits[k - 1], this.profile.ponits[k])
          this.profile.distance = this.profile.distance + disc
          this.profile.arrLX.push(this.profile.arrLX[k - 1] + disc)
        }
        this.startAndEndPoints = []
      }
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  //鼠标移动
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      //判断是否有起点，没有则用终点，两者都没有，则返回
      let position = this.viewer.scene.pickPosition(movement.endPosition);
      if (!position) {
        position = this.viewer.scene.camera.pickEllipsoid(movement.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!position) return;
      //动态创建线实体
      this.handleMoveEvent(position);
      if (this.labelEntity) {
        this.labelEntity.position = position
      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
    //关闭事件句柄
    this.handler.destroy();
    this.handler = null;
  }

  handleRightClick() {
    this.handler.setInputAction((movement) => {
      this.unRegisterEvents()
      //设置鼠标默认样式
      this.viewer._element.style.cursor = 'default';
      if (this.lineEntity) {
        if (this.startAndEndPoints.length == 1) {
          this.clear()
          Message.info('至少要绘制两个点，请重新绘制')
        } else {
          this.createEchartsDom()
          this.initChart(this.profile)
        }
      }
      this.removeLabel()
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  equidistantInterpolation(pointA, pointB) {
    // 插值处理
    let tpLength = this.getArcLength(pointA, pointB)

    // 插值间距按照输入的插值来进行
    let interpolationNumber = parseInt(tpLength / this.interNumber)
    let pointAToW84 = this.worldCoordinateToLonAndLat(pointA)
    let pointBToW84 = this.worldCoordinateToLonAndLat(pointB)
    let lat1 = OneMap.Math.toRadians(pointAToW84.lat)
    let lon1 = OneMap.Math.toRadians(pointAToW84.lon)
    let lat2 = OneMap.Math.toRadians(pointBToW84.lat)
    let lon2 = OneMap.Math.toRadians(pointBToW84.lon)
    let spaceList = []
    // 插值坐标数组
    for (let i = 0; i < interpolationNumber + 1; i++) {
      let lonRadians = OneMap.Math.lerp(lon1, lon2, i / interpolationNumber)
      let latRadians = OneMap.Math.lerp(lat1, lat2, i / interpolationNumber)
      let lon = OneMap.Math.toDegrees(lonRadians)
      let lat = OneMap.Math.toDegrees(latRadians)
      // 计算插值点坐标
      let point = {
        lon: Number(lon),
        lat: Number(lat)
      }
      point = this.getGeoCoordinate(point.lat, point.lon)
      point.len = 0
      spaceList.push(point)
    }
    return spaceList
  }
  initChart(e) {
    function strFormat(str) {
      let strString = String(str)
      let strs = strString.slice(0, strString.indexOf('.') + 3)
      return strs
    }
    let t = e.ponits
    let chartData = {
      dataZoom: [{
        type: 'inside',
        throttle: 50
      }],
      valueAxis: {
        position: 'left',
        axisLine: { // 坐标轴线
          show: true, // 默认显示，属性show控制显示与否
          lineStyle: { // 属性lineStyle控制线条样式
            color: '#48b',
            width: 2,
            type: 'solid'
          }
        }
      },
      grid: {
        x: 50,
        y: 40,
        x2: 80,
        y2: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: '#ccc'
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: "rgba(0,0,0,0.8)", //设置背景颜色 rgba格式
        borderColor: "rgba(0,0,0,0.8)", //设置边框颜色
        textStyle: {
          color: "white" //设置文字颜色
        },
        formatter: function (e) {
          // console.log(e, 'kkkkk')
          let a = ''
          if (e.length === 0) return a
          e[0].value
          let r = t[e[0].dataIndex]
          // console.log(r, 'shujuchakan')
          return a += '所在位置&nbsp;' + strFormat(r.lon) + ',' + strFormat(r.lat) + '</label><br />' + e[0].seriesName + '&nbsp;' + strFormat(r.hit) + "&nbsp;<label style='color:" + e[0].color + ";'>"
        }
        /*  */
      },
      //x轴相关设置
      xAxis: [{
        name: '距离/km',
        // nameLocation: 'left',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'], // 是否显示轴线箭头
          symbolSize: [6, 6], // 箭头大小
          symbolOffset: [0, 7], // 箭头位置
          lineStyle: {
            width: 1,
            type: 'solid',
            color: '#fff',  //坐标轴的颜色
          }
        },
        axisTick: { // 坐标轴刻度
          show: true, // 是否显示
          inside: false, // 是否朝内
          length: 3, // 长度
          lineStyle: { // 默认取轴线的样式
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          interval: 'auto',
          textStyle: {
            color: '#fff',  //坐标的字体颜色
          },
          // formatter:
        },
        data: e.arrLX

      }],
      //y轴相关设置
      yAxis: [{
        name: '高程值/m',
        type: 'value',
        axisLabel: {
          rotate: 30,
          interval: '50',
          textStyle: {
            color: '#fff',  //坐标的字体颜色
          },
        },
        splitLine: {    //网格线
          lineStyle: {
            type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
          }
        },
        axisLine: { // 坐标轴 轴线
          show: true, // 是否显示
          symbol: ['none', 'arrow'], // 是否显示轴线箭头
          symbolSize: [6, 6], // 箭头大小
          symbolOffset: [0, 7], // 箭头位置
          lineStyle: {
            width: 1,
            type: 'solid',
            color: '#fff',  //坐标轴的颜色
          }
        },
        axisTick: { // 坐标轴刻度
          show: true, // 是否显示
          inside: false, // 是否朝内
          length: 3, // 长度
          lineStyle: { // 默认取轴线的样式
            width: 1,
            type: 'solid'
          }
        }

      }],
      series: [{
        name: '高程值',
        type: 'line',
        smooth: !0,
        symbol: 'none',
        sampling: 'average',
        zlevel: 1,
        z: 1,
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }])

        },
        data: e.arrHB
      }]
    }
    this.echartsInstance = echarts.init(document.getElementById("profileAnalysis-container"))
    this.echartsInstance.setOption(chartData)
  }
  getArcLength(pointA, pointB) {
    if (pointA && pointB) {
      var lat1 = pointA.x
      var lon1 = pointA.y
      var lat2 = pointB.x
      var lon2 = pointB.y
    } else {
      Message.info('至少要绘制两个点，请重新绘制')
      return;
    }

    let EARTH_RADIUS = 6378137.0
    let PI = Math.PI

    // 弧度
    function getRad(d) {
      return d * PI / 180.0
    }

    let f = getRad((lat1 + lat2) / 2)
    let g = getRad((lat1 - lat2) / 2)
    let l = getRad((lon1 - lon2) / 2)

    let sg = Math.sin(g)
    let sl = Math.sin(l)
    let sf = Math.sin(f)

    let s, c, w, r, d, h1, h2
    // 地球半径
    let a = EARTH_RADIUS
    // 地球扁率
    let fl = 1 / 298.257

    sg = sg * sg
    sl = sl * sl
    sf = sf * sf

    s = sg * (1 - sl) + (1 - sf) * sl
    c = (1 - sg) * (1 - sl) + sf * sl

    w = Math.atan(Math.sqrt(s / c))
    r = Math.sqrt(s * c) / w
    d = 2 * w * a
    h1 = (3 * r - 1) / 2 / c
    h2 = (3 * r + 1) / 2 / s
    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
  }
  getGeoCoordinate(lat, lon) {
    let terrainheight = this.viewer.scene.globe.getHeight(OneMap.Cartographic.fromDegrees(lon, lat));
    (terrainheight !== undefined) ? terrainheight : 0
    let point = {
      lon: lon,
      lat: lat,
      hit: terrainheight
    }
    return point
  }
  distance(point1, point2) {
    /** 根据经纬度计算出距离**/
    let strat = OneMap.Cartographic.fromDegrees(point1.lon, point1.lat, point1.hit)
    let end = OneMap.Cartographic.fromDegrees(point2.lon, point2.lat, point2.hit)
    let geodesic = new OneMap.EllipsoidGeodesic()
    geodesic.setEndPoints(strat, end)
    let s = geodesic.surfaceDistance
    // 返回两点之间的距离
    s = (Math.sqrt(Math.pow(s, 2) + Math.pow(strat.height - end.height, 2))) / 1000
    // s = Math.abs(strat.height - end.height) / 1000
    return s
  }
  worldCoordinateToLonAndLat(cartesian3) {
    const cartographic = OneMap.Cartographic.fromCartesian(cartesian3)
    const lat = OneMap.Math.toDegrees(cartographic.latitude)
    const lng = OneMap.Math.toDegrees(cartographic.longitude)
    const alt = cartographic.height
    return { lon: lng, lat: lat, hit: alt }
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '左键选取起点和终点，右键结束绘制并分析',
        font: '15px sans-serif',
        pixelOffset: new OneMap.Cartesian2(10, 10),//y大小根据行数和字体大小改变
        horizontalOrigin: OneMap.HorizontalOrigin.LEFT,
        showBackground: true,
        backgroundColor: new OneMap.Color(0.165, 0.165, 0.165, 1.0),
        //防止label被地形遮挡
        disableDepthTestDistance: 50000
      }
    });
  }

  //创建线对象
  createLineEntity() {
    this.lineEntity = this.viewer.entities.add({
      polyline: {
        positions: new OneMap.CallbackProperty(e => {
          return this.tempPositions;
        }, false),
        width: 3,
        heightReference: OneMap.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: 50000,
        depthFailMaterial: OneMap.Color.AQUA,
        material: OneMap.Color.AQUA,
        //解决线穿过点的问题
        clampToGround: true,
        zIndex: -1,
      }
    })
  }

  //创建起点
  createStartEntity() {
    let vertexEntity = this.viewer.entities.add({
      position: this.positions[0],
      type: "start_marker",
      billboard: {
        image: require('@/assets/mearsure/start.png'),
        //防止被遮挡
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        verticalOrigin: OneMap.VerticalOrigin.BOTTOM,
      },
      point: {
        color: OneMap.Color.WHITE,
        outlineColor: OneMap.Color.BLUE,
        outlineWidth: 2,
        pixelSize: 6,
        //Entity中point开启贴地及设置高度
        disableDepthTestDistance: 50000
      },
    });
    this.vertexEntities.push(vertexEntity);
  }


  //创建终点节点
  createEndEntity() {
    let vertexEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      type: "end_marker",
      label: {
        // text: "总距离：" + this.disTance(this.positions) + "米",
        scale: 0.5,
        font: 'normal 30px MicroSoft YaHei',
        pixelOffset: new OneMap.Cartesian2(0, -60),
        style: OneMap.LabelStyle.FILL_AND_OUTLINE,
        outlineColor: OneMap.Color.WHITE,
        showBackground: true,
        eyeOffset: new OneMap.Cartesian3(0, 0, -10),
        fillColor: OneMap.Color.fromCssColorString('#fff'),
        backgroundColor: OneMap.Color.fromCssColorString('#2773DE'),
      },
      billboard: {
        image: require('@/assets/mearsure/end.png'),
        verticalOrigin: OneMap.VerticalOrigin.BOTTOM,
        //防止被遮挡
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      point: {
        color: OneMap.Color.WHITE,
        outlineColor: OneMap.Color.BLUE,
        outlineWidth: 2,
        pixelSize: 6,
        //Entity中point开启贴地及设置高度
        disableDepthTestDistance: 50000
      },
    });
    this.vertexEntities.push(vertexEntity);
  }

  //处理鼠标移动
  handleMoveEvent(position) {
    if (this.positions.length < 1) return;
    this.tempPositions = this.positions.concat(position);
  }
  removeLabel() {
    //清除指定实体
    let entID = this.viewer.entities.getById('tooltip')
    this.viewer.entities.remove(entID);
    this.labelEntity = null
  }
  //清空绘制
  clear() {
    //清除线对象
    this.viewer.entities.remove(this.lineEntity);
    this.lineEntity = undefined;

    //清除节点
    this.vertexEntities.forEach(item => {
      this.viewer.entities.remove(item);
    });
    this.vertexEntities = [];
    this.positions = [],
    this.tempPositions = []
    this.startAndEndPoints = []
    //移除dom
    if (this.echartDom) {
      this.echartDom.style.display = 'none'
      this.echartDom.remove()
    }
    //清除echarts实例
    if (this.echartsInstance) {
      this.echartsInstance.dispose()
    }
  }

}








