export default class inundationAnalysis {
  constructor() {
    this.viewer = window.$viewer
    this.entityCollection = []
    this.positions = []
    this.clickStatus = false
    this.labelEntity = null
    this.waterMinElevation = 10
    this.waterMaxElevation = 50
    this.init()
  }
  init() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair';
    this.drawPolygon()
    this.handleToolTip()
    this.handleMouseMove()
  }
  addFloodEntity(positions) {
    console.log('positions',positions)
    this.entityCollection.push(this.viewer.entities.add({
      polygon: {
        hierarchy: new OneMap.PolygonHierarchy(positions),
        extrudedHeight: new OneMap.CallbackProperty(() => {
          if (this.waterMinElevation < this.waterMaxElevation) {
            this.waterMinElevation += 0.1
          }
          return this.waterMinElevation
        }),
        material: OneMap.Color.fromCssColorString('#3D81A5').withAlpha(0.7)
      }
    }))
  }
  drawPolygon() {
    this.handler.setInputAction((clickEvent) => {
      this.clickStatus = true;
      let cartesian = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
      if (!cartesian) {
        return false
      }
      if (this.positions.length == 0) {
        //鼠标左击 添加第1个点
        this.positions.push(cartesian.clone());
        this.addPoint(cartesian);
        this.handleMouseMove()
      } else if (this.positions.length == 2) {
        if (!cartesian) {
          return false
        }
        this.positions.pop();
        // 鼠标左击 添加第2个点
        this.positions.push(cartesian.clone());
        this.addPoint(cartesian);
        this.addPolyGon(this.positions);
        this.handleRightClick()
      } else if (this.positions.length >= 3) {
        if (!cartesian) {
          return false
        }
        this.positions.pop();
        this.positions.push(cartesian.clone()); // 鼠标左击 添加第3个点
        this.addPoint(cartesian);
      }

    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  };
  handleRightClick() {
    // 右击结束
    this.handler.setInputAction((clickEvent) => {
      let clickPosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
      if (!clickPosition) {
        return false;
      }
      //删除最后一个移动的点，添加鼠标右键的点
      this.positions.pop();
      this.positions.push(clickPosition);
      // 闭合
      this.positions.push(this.positions[0]);
      this.addPoint(clickPosition);
      this.handler.destroy();
      this.handler = null;
      this.viewer._element.style.cursor = 'default';
      //绘制动态拉伸的polygon
      this.addFloodEntity(this.positions)
      //清除指定实体
      let entID = this.viewer.entities.getById('tooltip')
      this.viewer.entities.remove(entID);
      this.labelEntity = null
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  handleMouseMove() {
    this.handler.setInputAction((moveEvent) => {
      let movePosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(moveEvent.endPosition), this.viewer.scene);
      if (!movePosition) {
        return false;
      }
      if (this.labelEntity) {
        this.labelEntity.position = movePosition
      }
      if (this.positions.length == 1) {
        this.positions.push(movePosition);
        this.addLine(this.positions);
      } else {
        if (this.clickStatus) {
          if (this.positions.length == 0) return
          this.positions.push(movePosition);
        } else {
          if (this.positions.length == 0) return
          this.positions.pop();
          this.positions.push(movePosition);
        }
      }
      this.clickStatus = false;
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE)
  }
  // 添加点
  addPoint(position) {
    this.entityCollection.push(this.viewer.entities.add(new OneMap.Entity({
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
  addLine(positions) {
    this.entityCollection.push(this.viewer.entities.add(
      new OneMap.Entity({
        polyline: {
          positions: new OneMap.CallbackProperty(() => positions, false),
          width: 2,
          material: OneMap.Color.AQUA,
          clampToGround: true,
        }
      })
    ))
  }

  // 添加面
  addPolyGon(positions) {
    this.entityCollection.push(this.viewer.entities.add(new OneMap.Entity({
      polygon: {
        hierarchy: new OneMap.CallbackProperty(() => {
          return new OneMap.PolygonHierarchy(positions);
        }, false),
        material: OneMap.Color.WHITE.withAlpha(0.2),
        classificationType: OneMap.ClassificationType.BOTH // 贴地表和贴模型,如果设置了，这不能使用挤出高度
      }
    })));
  };

  clear() {
    for (let i = 0; i < this.entityCollection.length; i++) {
      let item = this.entityCollection[i]
      this.viewer.entities.remove(item)
    }
    this.positions = []
    this.waterMaxElevation = 50
    this.waterMinElevation = 10
    this.entityCollection = []
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '左键开始绘制，右键结束绘制',
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

}