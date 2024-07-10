
import { Message } from 'element-ui';
export default class MeasureArea {
  constructor() {
    this.viewer = window.$viewer
    this.labelEntity = null
    this.toolTipEntity = null
    this.clickStatus = false
    this.positions = []
    this.entityCollection = []
    this.registerEvents()
  }
  //注册鼠标事件
  registerEvents() {
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    //设置鼠标状态 
    this.viewer._element.style.cursor = 'crosshair';
    this.handleToolTip()
    this.handleLeftClick();
    this.handleRightClick();
    this.handleMouseMove();
  }
  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
    this.handler.destroy();
    this.handler = null
  }
  handleLeftClick() {
    this.handler.setInputAction((clickEvent) => {
      this.clickStatus = true;
      let cartesian = this.viewer.scene.pickPosition(clickEvent.position);
      if (!cartesian) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        cartesian = this.viewer.scene.camera.pickEllipsoid(clickEvent.position, ellipsoid);
      }
      if (!cartesian) return;
      // let cartesian = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
      // if (!cartesian) {
      //   return false
      // }
      if (this.positions.length == 0) {
        //鼠标左击 添加第1个点
        this.positions.push(cartesian.clone());
        this.handlePoint(cartesian);
      } else if (this.positions.length == 2) {
        if (!cartesian) {
          return false
        }
        this.positions.pop();
        // 鼠标左击 添加第2个点
        this.positions.push(cartesian.clone());
        this.handlePoint(cartesian);
        this.handlePolyGon(this.positions);
      } else if (this.positions.length >= 3) {
        if (!cartesian) {
          return false
        }
        this.positions.pop();
        // 鼠标左击 添加第3个点
        this.positions.push(cartesian.clone());
        this.handlePoint(cartesian);
      }

    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  handleRightClick() {
    this.handler.setInputAction((clickEvent) => {
      let clickPosition = this.viewer.scene.pickPosition(clickEvent.position);
      if (!clickPosition) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        clickPosition = this.viewer.scene.camera.pickEllipsoid(clickEvent.position, ellipsoid);
      }
      if (!clickPosition) return;
      // let clickPosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
      // if (!clickPosition) {
      //   return false
      // }
      if (this.positions.length <= 0 || this.positions.length <= 2) {
        this.clearToolTipEntity()
        this.clearEntity()
        Message.info('至少选取三个个点才能进行面积测量')
      } else {
        this.positions.pop()
        this.positions.push(clickPosition)
        // 闭合
        this.positions.push(this.positions[0]);
        this.handlePoint(clickPosition)
      }
      //关闭事件句柄
      this.viewer._element.style.cursor = 'default';
      this.unRegisterEvents()
      this.clearToolTipEntity()
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  handleMouseMove() {
    this.handler.setInputAction((moveEvent) => {
      let movePosition = this.viewer.scene.pickPosition(moveEvent.endPosition);
      if (!movePosition) {
        movePosition = this.viewer.scene.camera.pickEllipsoid(moveEvent.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!movePosition) return;
      // let movePosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(moveEvent.endPosition), this.viewer.scene);
      // if (!movePosition) {
      //   return false;
      // }
      if (this.toolTipEntity) {
        this.toolTipEntity.position = movePosition
      }
      if (this.positions.length <= 0) return
      if (this.positions.length == 1) {
        this.positions.push(movePosition);
        this.handleLine(this.positions);
      } else {
        if (this.clickStatus) {
          this.positions.push(movePosition);
        } else {
          this.positions.pop();
          this.positions.push(movePosition);
        }
      }
      //测量区域超过三个点
      if (this.positions.length >= 3) {
        // 绘制label
        if (this.labelEntity) {
          this.viewer.entities.remove(this.labelEntity);
          this.entityCollection.splice(this.entityCollection.indexOf(this.labelEntity), 1);
        }
        let text = "面积：" + this.getArea(this.positions);
        let centerPoint = this.getCenterOfGravityPoint(this.positions);
        this.labelEntity = this.handleLabel(centerPoint, text);
        this.entityCollection.push(this.labelEntity);
      }
      this.clickStatus = false;
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);

  }
  // 添加点
  handlePoint(position) {
    this.entityCollection.push(this.viewer.entities.add(new OneMap.Entity({
      name: 'areaPoint',
      position: position,
      point: {
        color: OneMap.Color.WHITE,
        outlineColor: OneMap.Color.BLUE,
        outlineWidth: 2,
        pixelSize: 5,
        heightReference: OneMap.HeightReference.NONE,
        disableDepthTestDistance: 50000
      }
    })));
  };
  // 添加线
  handleLine(positions) {
    this.entityCollection.push(this.viewer.entities.add(
      new OneMap.Entity({
        name: 'areaPolyline',
        polyline: {
          positions: new OneMap.CallbackProperty(() => positions, false),
          width: 2,
          material: OneMap.Color.AQUA,
          clampToGround: true,
        }
      })
    ))
  }
  //添加信息提示实体
  handleToolTip() {
    this.toolTipEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '单击左键选取测量区域点位，单击右键绘制最后一个点并开始测量面积',
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
  // 添加面
  handlePolyGon(positions) {
    this.entityCollection.push(this.viewer.entities.add(new OneMap.Entity({
      name: 'areaPolygon',
      polygon: {
        hierarchy: new OneMap.CallbackProperty(() => {
          return new OneMap.PolygonHierarchy(positions);
        }, false),
        material: OneMap.Color.AQUA.withAlpha(0.6),
        classificationType: OneMap.ClassificationType.BOTH // 贴地表和贴模型,如果设置了，这不能使用挤出高度
      }
    })));
  };
  // 添加标签
  handleLabel(position, text) {
    return this.viewer.entities.add(
      new OneMap.Entity({
        name: 'areaLabel',
        position: position,
        label: {
          text: text,
          font: '14px sans-serif',
          //指定以像素为单位的水平和垂直背景填充padding
          backgroundPadding: new OneMap.Cartesian2(6, 6),
          pixelOffset: new OneMap.Cartesian2(0, -25),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          showBackground: true,
          eyeOffset: new OneMap.Cartesian3(0, 0, -10),
          fillColor: OneMap.Color.fromCssColorString('#fff'),
          backgroundColor: OneMap.Color.fromCssColorString('#2773DE'),
        }
      })
    )
  }
  //方向
  Bearing(from, to) {
    from = OneMap.Cartographic.fromCartesian(from);
    to = OneMap.Cartographic.fromCartesian(to);
    var lat1 = from.latitude;
    var lon1 = from.longitude;
    var lat2 = to.latitude;
    var lon2 = to.longitude;
    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    if (angle < 0) {
      angle += Math.PI * 2.0;
    }
    var degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度

    angle = angle * degreesPerRadian; //角度
    return angle;
  }
  //角度
  Angle(p1, p2, p3) {
    var bearing21 = this.Bearing(p2, p1);
    var bearing23 = this.Bearing(p2, p3);
    var angle = bearing21 - bearing23;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
  //距离
  distance(point1, point2) {
    var point1cartographic = OneMap.Cartographic.fromCartesian(point1);
    var point2cartographic = OneMap.Cartographic.fromCartesian(point2);
    /**根据经纬度计算出距离**/
    var geodesic = new OneMap.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    var s = geodesic.surfaceDistance;
    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s;
  }
  //计算多边形面积
  getArea(points) {
    var res = 0;
    //拆分三角曲面
    for (var i = 0; i < points.length - 2; i++) {
      var j = (i + 1) % points.length;
      var k = (i + 2) % points.length;
      var totalAngle = this.Angle(points[i], points[j], points[k]);

      var dis_temp1 = this.distance(points[j], points[0]);
      var dis_temp2 = this.distance(points[k], points[0]);
      res += dis_temp1 * dis_temp2 * Math.sin(totalAngle) / 2;
    }

    if (res < 1000000) {
      res = Math.abs(res).toFixed(4) + " 平方米";
    } else {
      res = Math.abs((res / 1000000.0).toFixed(4)) + " 平方公里";
    }
    return res;

  };
  getCenterOfGravityPoint(mPoints) {
    var centerPoint = mPoints[0];
    for (var i = 1; i < mPoints.length; i++) {
      centerPoint = OneMap.Cartesian3.midpoint(centerPoint, mPoints[i], new OneMap.Cartesian3());
    }
    return centerPoint;
  }
  clearToolTipEntity() {
    this.viewer.entities.remove(this.toolTipEntity)
    this.toolTipEntity = null
  }
  clearEntity() {
    for (let i = 0; i < this.entityCollection.length; i++) {
      let item = this.entityCollection[i]
      this.viewer.entities.remove(item)
    }
    this.entityCollection = []
  }

}