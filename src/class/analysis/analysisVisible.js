import { Message } from 'element-ui';
export default class analysisVisible {
  constructor() {
    this.viewer = window.$viewer
    this.viewPointFlag = false; //是否选择了视点
    this.pickPositions = []; //被选中的点的坐标
    this.boardLines = []; //可视区域边界线
    this.pickPoints = []; //观测点和观测方向
    this.polyline = []
    this.labelEntity = null
    this.vertexEntity = null
    this.setBuildFrustrumHandler()
  }
  setBuildFrustrumHandler() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair';
    this.handleToolTip()
    this.handleLeftClick()
    this.handleMouseMove()
    this.handleRightClick()
  }
  handleLeftClick() {
    this.handler.setInputAction((event) => {
      let position = this.viewer.scene.pickPosition(event.position);
      //解决需要两次左键点击地图才能选点的问题
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(event.position, ellipsoid);
      }
      if (!position) return;
      if (OneMap.defined(position)) {
        //绘制起点
        this.pickPositions.push(position);
        this.pickPoints.push(this.createPoint(position));
        this.viewPointFlag = true;
        this.labelEntity.label._text._value = '左键选取方向点位，右键开始可视域分析'

      }
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  handleRightClick() {
    this.handler.setInputAction((movement) => {
      //关闭事件句柄
      this.handler.destroy();
      this.handler = null;
      //设置鼠标默认样式
      this.viewer._element.style.cursor = 'default';
      //去掉中间鼠标移动的点保留观测点和最后一次鼠标左键点击的点，至少需要两个点才能进行分析
      this.pickPositions.splice(1, 1)
      if (this.pickPositions.length == 2) {
        //清除黄色边界线
        this.deleteBorderEntity()
        //进行可视域分析
        this.viewAreaAnalysis(45, this.pickPositions[0], this.pickPositions[1]);
      }

      if (this.pickPositions.length == 1) {
        this.clear()
        Message.info('需要选取两个点位才能进行可视域分析')
      }
      //清除指定实体
      this.deleteLabelEntity()
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      const newPosition = this.viewer.scene.pickPosition(movement.endPosition);
      if (OneMap.defined(newPosition)) {
        if (this.viewPointFlag) {
          //始终保持数组第一个数组元素为观测点，最后一个元素为鼠标移动的点。且长度始终为2
          if (this.pickPositions.length == 1) {
            this.pickPositions.push(newPosition);
          } else {
            this.pickPositions.pop();
            this.pickPositions.push(newPosition);
          }
          //先清除区域边界线，再绘制新的边界线
          if (this.boardLines.length > 1) {
            this.deleteBorderEntity()
          }
          //构建可视区域
          if (this.pickPositions.length == 2) {
            this.boardLines = this.drawSector(this.pickPositions[0], this.pickPositions[1]);
          }
        }
        //tooltip跟随鼠标移动
        if (this.labelEntity) {
          this.labelEntity.position = newPosition
        }

      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  //可视化分析
  viewAreaAnalysis(degree, startPoint, endPoint) {
    for (let i = -degree; i <= degree; ++i) {
      let radian = OneMap.Math.toRadians(i); //角度转弧度
      let destPoint = this.rotatePoint(radian, startPoint, endPoint);
      this.getIntersectPoint(startPoint, destPoint);
    }
    this.pickPositions = [];
  }
  //绘制线
  drawLine(positionData, material, depthFailMaterial) {
    let shape = this.viewer.entities.add({
      polyline: {
        positions: positionData,
        arcType: OneMap.ArcType.NONE,
        width: 2,
        material: material,
        depthFailMaterial: depthFailMaterial, //被地形遮挡部分的颜色
      },
    });
    this.polyline.push(shape)
    return shape;
  }
  //计算某一点绕另一点旋转radian后的终点坐标
  rotatePoint(radian, startPoint, endPoint) {
    let startCartographic = OneMap.Cartographic.fromCartesian(startPoint); //起点经纬度坐标
    let endCartographic = OneMap.Cartographic.fromCartesian(endPoint); //终点经纬度坐标
    //初始化投影坐标系
    /*假设对图片上任意点a，绕一个坐标点o逆时针旋转angle角度后的新的坐标点b，有公式：
    b.x = ( a.x - o.x)*cos(angle) - (a.y - o.y)*sin(angle) + o.x
    b.y = (a.x - o.x)*sin(angle) + (a.y - o.y)*cos(angle) + o.y*/
    let webMercatorProjection = new OneMap.WebMercatorProjection(this.viewer.scene.globe.ellipsoid);
    let startMercator = webMercatorProjection.project(startCartographic); //起点墨卡托坐标
    let endMercator = webMercatorProjection.project(endCartographic); //终点墨卡托坐标
    //左边界线墨卡托坐标
    let position_Mercator = new OneMap.Cartesian3((endMercator.x - startMercator.x) * Math.cos(radian) - (endMercator.y - startMercator.y) * Math.sin(radian) + startMercator.x,
      (endMercator.x - startMercator.x) * Math.sin(radian) + (endMercator.y - startMercator.y) * Math.cos(radian) + startMercator.y, startMercator.z);
    //左边界线经纬度坐标
    let position_Cartographic = webMercatorProjection.unproject(position_Mercator);
    //左边界线笛卡尔空间直角坐标
    let position_Cartesian3 = OneMap.Cartographic.toCartesian(position_Cartographic.clone());
    return position_Cartesian3
  }
  //计算两点连成的直线段与地形/建筑的交点，并绘制可视线
  getIntersectPoint(startPoint, endPoint) {
    //计算两点连线的方向
    let direction = OneMap.Cartesian3.normalize(OneMap.Cartesian3.subtract(endPoint, startPoint, new OneMap.Cartesian3()), new OneMap.Cartesian3());
    //建立射线
    let ray = new OneMap.Ray(startPoint, direction);
    //计算相交点，注意，这里的相交点有可能比终点更远
    let result = this.viewer.scene.pickFromRay(ray);
    if (OneMap.defined(result)) {
      let intesectPosition = result.position;
      //判断相交点是否比终点更远
      if (this.distanceBetweenTwoPoints(startPoint, endPoint) > this.distanceBetweenTwoPoints(intesectPosition, startPoint)) {
        this.drawLine([startPoint, result.position], OneMap.Color.GREEN, OneMap.Color.GREEN);
        this.drawLine([result.position, endPoint], OneMap.Color.RED, OneMap.Color.RED);
      } else {
        this.drawLine([startPoint, endPoint], OneMap.Color.GREEN, OneMap.Color.GREEN);
      }
    } else {
      this.drawLine([startPoint, endPoint], OneMap.Color.GREEN, OneMap.Color.GREEN);
    }
  }
  //求扇形可视区域的两条边界线(视野范围)
  drawSector(startPoint, endPoint) {
    let lines = [];
    let leftLine = this.rotateLine(OneMap.Math.toRadians(45), startPoint, endPoint);
    let rightLine = this.rotateLine(OneMap.Math.toRadians(-45), startPoint, endPoint);
    lines.push(leftLine);
    lines.push(rightLine);
    return lines;
  }
  //画出某条直线段绕起点逆时针旋转radian(弧度)后的线段
  rotateLine(radian, startPoint, endPoint) {
    let position_Cartesian3 = this.rotatePoint(radian, startPoint, endPoint);
    let LinePoints = [];
    LinePoints.push(startPoint);
    LinePoints.push(position_Cartesian3);
    let line = this.drawLine(LinePoints, new OneMap.PolylineDashMaterialProperty({ color: OneMap.Color.AQUA }), OneMap.Color.AQUA);
    return line;
  }

  distanceBetweenTwoPoints(startPoint, endPoint) {
    let distance = 0;
    let start = OneMap.Cartographic.fromCartesian(startPoint);
    let end = OneMap.Cartographic.fromCartesian(endPoint);
    let geodesic = new OneMap.EllipsoidGeodesic();
    geodesic.setEndPoints(start, end);
    distance = geodesic.surfaceDistance
    return distance.toFixed(2);
  }
  createPoint(positions) {
    if (this.vertexEntity) return
    //创建起点
    this.vertexEntity = this.viewer.entities.add({
      position: positions,
      type: "marker",
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
    return this.vertexEntity
    // this.vertexEntities.push(vertexEntity);
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '左键绘制观测点',
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
  deletePolylineEntity() {
    for (let i = 0; i < this.polyline.length; i++) {
      let item = this.polyline[i]
      this.viewer.entities.remove(item)
    }
    this.polyline = []
  }
  deleteMarkerEntity() {
    for (let i = 0; i < this.pickPoints.length; ++i) {
      this.viewer.entities.remove(this.pickPoints[i]);
    }
    this.pickPoints = [];
  }
  deleteBorderEntity() {
    for (let i = 0; i < this.boardLines.length; ++i) {
      this.viewer.entities.remove(this.boardLines[i]);
    }
  }
  deleteLabelEntity() {
    let entID = this.viewer.entities.getById('tooltip')
    this.viewer.entities.remove(entID);
    this.labelEntity = null
  }
  clear() {
    this.viewPointFlag = false; //是否选择了视点
    this.pickPositions = []; //被选中的点的坐标
    this.deleteMarkerEntity()
    this.deletePolylineEntity()
  }

}












// //可视化分析（鼠标点击“可视域分析”按钮的响应事件）
// window.viewAreaAnalysis = function () {
//   window.$viewer.entities.removeAll();
//   pickPositions = [];
//   boardLines = [];
//   frustrumLabel = undefined;
//   viewPointFlag = false;
//   setBuildFrustrumHandler(true);
// }
