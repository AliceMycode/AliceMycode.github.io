import * as echarts from 'echarts'
import { Message } from 'element-ui'
export default class slopeAspectAnalysis {
  constructor() {
    this.viewer = window.$viewer
    this.id = OneMap.createGuid();
    //存放标注实体
    this.markers = [];
    //存放线实体
    this.lines = [];
    //线坐标数组
    this.tempPositions = []
    this.positions = []
    //标注坐标
    this.posArray = [];
    this.resultChart = undefined;
    this.echartDom = null
    this.labelEntity = null
    this.flag = false
    this.handleToolTip()
    this.init();

  }
  //创建图表dom
  createEchartsDom() {
    const app = document.getElementById('app')
    this.echartDom = document.createElement('div')
    app.appendChild(this.echartDom)
    this.echartDom.setAttribute('id', 'slopeAspectAnalysis')
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '左键选取起点和终点，右键结束绘制并开始分析',
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
  init() {
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair';
    this.handleMouseMove()
    this.handleRightClick()
    this.handleLeftClick()
  }
  //鼠标移动事件
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      let position = this.viewer.scene.pickPosition(movement.endPosition);
      if (!position) {
        position = this.viewer.scene.camera.pickEllipsoid(movement.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!position) return;
      this.handleMoveEvent(position);
      if (this.labelEntity) {
        this.labelEntity.position = position
      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  handleRightClick() {
    this.handler.setInputAction((event) => {
      this.viewer._element.style.cursor = 'default';
      if (!this.flag) {
        Message('至少需要绘制两个点才能进行分析')
        this.removeLabel()
        this.unRegisterEvents()
        this.remove()
        return false
      }
      this.resultChart = this.showResult(this.posArray[0], this.posArray[1]);
      this.posArray = [];
      this.removeLabel()
      this.destroyHandler();
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK)
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
  //创建起点
  createStartMarker(cartesian) {
    return this.viewer.entities.add({
      position: cartesian,
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
      }
    });
  }
  //创建终点
  createEndMarker(cartesian) {
    return this.viewer.entities.add({
      position: cartesian,
      billboard: {
        image: require('@/assets/mearsure/end.png'),
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
      }
    });
  }
  //左键点击事件
  handleLeftClick() {
    this.handler.setInputAction((event) => {
      let cartesian = this.viewer.scene.pickPosition(event.position);
      this.positions.push(cartesian)
      //解决需要两次左键点击地图才能选点的问题
      if (!cartesian) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        cartesian = this.viewer.scene.camera.pickEllipsoid(event.position, ellipsoid);
      }
      if (!cartesian) return;
      this.posArray.push(cartesian);
      if (this.posArray.length == 1) {
        this.lines.push(this.createLineEntity())
        this.markers.push(this.createStartMarker(cartesian))
      } else {
        this.flag = true
        this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
        this.markers.push(this.createEndMarker(cartesian))
      }
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  //创建线对象
  createLineEntity() {
    return this.viewer.entities.add({
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
  //处理鼠标移动
  handleMoveEvent(position) {
    if (this.positions.length < 1) return;
    this.tempPositions = this.positions.concat(position);
  }
  destroyHandler() {
    this.handler = this.handler && this.handler.destroy();
  }
  screenToWorld(position) {
    return this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(position), this.viewer.scene);
  }
  piObj(position) {
    return this.viewer.scene.pick(position);
  }
  //点击的屏幕坐标
  piTerrainToModule(position, type) {
    try {
      if (position == undefined) {
        return false;
      }
      let world = this.screenToWorld(position);
      if (world == undefined) {
        return false;
      }

      let lon = undefined, lat = undefined, height = undefined;
      let feature = this.piObj(position);
      if (feature == undefined) {
        let WGS84_p = OneMap.Ellipsoid.WGS84.cartesianToCartographic(world);
        if (WGS84_p == undefined) return false;
        lon = OneMap.Math.toDegrees(WGS84_p.longitude);
        lat = OneMap.Math.toDegrees(WGS84_p.latitude);
        height = WGS84_p.height;
      }
      if (feature != undefined) {
        //3dtiles
        if (feature instanceof OneMap.OneMap3DTileFeature) {
          let cartesian = this.viewer.scene.pickPosition(position);
          if (cartesian == undefined) return false;
          if (OneMap.defined(cartesian)) {
            let cartographic = OneMap.Cartographic.fromCartesian(cartesian);
            if (cartographic.height < 0) return false;
            lon = OneMap.Math.toDegrees(cartographic.longitude);
            lat = OneMap.Math.toDegrees(cartographic.latitude);
            //模型高度 
            height = cartographic.height;
          }
        }
        if (feature.id != undefined) {
          let cartesian = this.viewer.scene.pickPosition(position);
          if (cartesian == undefined) return false;
          if (OneMap.defined(cartesian)) {
            let cartographic = OneMap.Cartographic.fromCartesian(cartesian);
            if (cartographic.height < 0) return false;
            lon = OneMap.Math.toDegrees(cartographic.longitude);
            lat = OneMap.Math.toDegrees(cartographic.latitude);
            //模型高度
            height = cartographic.height;
          }
        }
      }
      //判断是否有值
      if (lon == undefined) return false;
      let result = null;
      if (type == "1") {
        result = { lon: lon, lat: lat, height: height }
      } else {
        result = OneMap.Cartesian3.fromDegrees(lon, lat, height);
      }
      return result;
    } catch (error) {
      console.log(error);
    }

  }
  //；初始化图标
  showResult(startPoint, endPoint) {
    //起止点相关信息
    let scartographic = OneMap.Cartographic.fromCartesian(startPoint);
    let samplePoint = [scartographic];
    //取样点个数
    let pointSum = 10;
    let tempCartesians = new OneMap.Cartesian3();
    let slopePercent = [0];
    let disL = [0];
    let angle = 0;
    for (let i = 1; i <= pointSum; i++) {
      OneMap.Cartesian3.lerp(startPoint, endPoint, i / pointSum, tempCartesians);
      let tempCartographic = OneMap.Cartographic.fromCartesian(tempCartesians);
      let surfaceHeight = this.viewer.scene.globe.getHeight(tempCartographic);
      tempCartographic.height = surfaceHeight;
      samplePoint.push(tempCartographic);
      let lastCarto = samplePoint[i - 1];
      let dis = OneMap.Cartesian3.distance(OneMap.Cartographic.toCartesian(lastCarto), OneMap.Cartographic.toCartesian(tempCartographic));
      disL.push(disL[i - 1] + dis);
      angle = Math.asin((tempCartographic.height - lastCarto.height) / dis);
      slopePercent.push(Math.tan(angle) * 100);
    }
    this.createEchartsDom()
    let myChart = echarts.init(document.getElementById("slopeAspectAnalysis"));
    let option = {
      title: {
        text: '坡度坡向示意图',
        left: 'center',
        subtext: '',
        textStyle: {
          color: 'white',
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: "rgba(0,0,0,0.8)", //设置背景颜色 rgba格式
        borderColor: "rgba(0,0,0,0.8)", //设置边框颜色
        textStyle: {
          color: "white" //设置文字颜色
        },
      },
      legend: {
        data: ['']
      },
      //右上角工具条
      toolbox: {
        show: false,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          name: "长度(米)",
          boundaryGap: false,
          data: disL,
          axisLabel: {
            textStyle: {
              color: 'white'
            }
          },
          axisLine: {
            lineStyle: {
              color: "white"
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: "坡度（%）",
          axisLabel: {
            formatter: function (data) { return data.toFixed(2) + "%"; },
            // formatter: '{value} 米',
            textStyle: {
              color: 'white'
            }
          },
          splitLine: {    //网格线
            lineStyle: {
              type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
            }
          },
          axisLine: {
            lineStyle: {
              color: "white"
            }
          }
        }
      ],
      series: [
        {
          name: '坡度',
          type: 'line',
          areaStyle: {},
          smooth: true,
          data: slopePercent,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
      ]
    };

    // 为echarts对象加载数据
    myChart.setOption(option);
    return myChart;
  }
  //移除标注
  removeMarker() {
    for (let index = 0; index < this.markers.length; index++) {
      let element = this.markers[index];
      this.viewer.entities.remove(element);
    }
    this.markers = []
  }
  //移除线
  removeLine() {
    for (let index = 0; index < this.lines.length; index++) {
      let element = this.lines[index];
      this.viewer.entities.remove(element);
    }
    this.lines = []
  }
  removeLabel() {
    //清除指定实体
    let entID = this.viewer.entities.getById('tooltip')
    this.viewer.entities.remove(entID);
    this.labelEntity = null
  }
  //清除dom、标注、线实体
  remove() {
    if (this.markers.length == 0) {
      return false;
    }
    this.removeMarker()
    this.removeLine()
    //移除dom
    if (this.echartDom) {
      this.echartDom.style.display = 'none'
      this.echartDom.remove()
    }
    if( this.resultChart) this.resultChart.dispose()

  }
}
