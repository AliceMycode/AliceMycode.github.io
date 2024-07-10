//距离测量类
import { Message } from 'element-ui';
export default class measureDistance {
  constructor() {
    this.viewer = window.$viewer
    this.initEvents()
    this.positions = []
    this.toolTipEntity = null
    this.tempPositions = []
    this.vertexEntities = []
    this.labelEntity = null
    //测量结果
    this.measureDistance = 0
  }

  //初始化事件
  initEvents() {
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.MeasureStartEvent = new OneMap.Event(); //开始事件
    this.MeasureEndEvent = new OneMap.Event(); //结束事件        
  }

  //激活
  activate() {
    this.deactivate();
    //设置tooltip
    this.handleToolTip()
    //注册鼠标事件 
    this.registerEvents();
    //设置鼠标状态 
    this.viewer._element.style.cursor = 'crosshair';
    this.isMeasure = true;
    this.measureDistance = 0;
  }

  //禁用
  deactivate() {
    if (!this.isMeasure) return;
    this.unRegisterEvents();
    this.viewer.enableCursorStyle = true;
    this.isMeasure = false;
    this.tempPositions = [];
    this.positions = [];
  }

  //清空绘制
  clear() {
    //清除线对象
    this.viewer.entities.remove(this.lineEntity);
    this.lineEntity = undefined;
    //移除标注
    this.removeLabel()
    //清除节点
    this.vertexEntities.forEach(item => {
      this.viewer.entities.remove(item);
    });
    this.vertexEntities = [];
  }

  //创建线对象
  createLineEntity() {
    this.lineEntity = this.viewer.entities.add({
      polyline: {
        positions: new OneMap.CallbackProperty(e => {
          return this.tempPositions;
        }, false),
        width: 3,
        material: OneMap.Color.AQUA,
        depthFailMaterial: OneMap.Color.AQUA
      }
    })
  }

  //创建起点
  createStartEntity() {
    let vertexEntity = this.viewer.entities.add({
      position: this.positions[0],
      type: "MeasureDistanceVertex",
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
      type: "MeasureDistanceVertex",
      label: {
        text: "总距离：" + this.disTance(this.positions) + "米",
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

  //注册鼠标事件
  registerEvents() {
    this.handleLeftClick();
    this.handleRightClick();
    this.handleMouseMove();
  }

  //左键点击事件
  handleLeftClick() {
    this.handler.setInputAction(event => {
      let position = this.viewer.scene.pickPosition(event.position);
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(event.position, ellipsoid);
      }
      if (!position) return;
      if (this.labelEntity) {
        this.labelEntity.label._text._value = '单击左键选取测量终点，并单击右键开始测量距离'
      }
      this.positions.push(position);
      if (this.positions.length == 1) { //首次点击  
        this.createLineEntity();
        this.createStartEntity();
        return;
      }

    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '单击左键选取测量起点',
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

  //鼠标移动事件
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      this.viewer._element.style.cursor = 'crosshair';
      let position = this.viewer.scene.pickPosition(movement.endPosition);
      if (!position) {
        position = this.viewer.scene.camera.pickEllipsoid(movement.startPosition, this.viewer.scene.globe.ellipsoid);
      }
      if (!position) return;
      if (this.labelEntity) {
        this.labelEntity.position = position
      }
      if (!this.isMeasure) return;
      this.handleMoveEvent(position);
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }

  //处理鼠标移动
  handleMoveEvent(position) {
    if (this.positions.length < 1) return;
    this.tempPositions = this.positions.concat(position);
  }

  //右键事件
  handleRightClick() {
    this.handler.setInputAction(e => {
      this.viewer._element.style.cursor = 'default';
      if (!this.isMeasure || this.positions.length <= 1) {
        this.deactivate();
        this.clear();
        Message.info('至少选取两个点才能进行距离测量')
      } else {
        this.createEndEntity();
        this.lineEntity.polyline = {
          positions: this.positions,
          width: 3,
          heightReference: OneMap.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: 50000,
          depthFailMaterial: OneMap.Color.AQUA,
          material: OneMap.Color.AQUA,
          //解决线穿过点的问题
          clampToGround: true,
          zIndex: -1,

        };
        this.measureEnd();
      }
      //清除指定实体
      this.removeLabel()
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }

  //测量结束
  measureEnd() {
    this.deactivate();
    this.MeasureEndEvent.raiseEvent(this.measureDistance); //触发结束事件 传入结果
  }

  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  removeLabel() {
    //清除指定实体
    let entID = this.viewer.entities.getById('tooltip')
    this.viewer.entities.remove(entID);
    this.labelEntity = null
  }
  //positions 包含两个点的数组
  disTance(positions) {
    var distance = 0;
    for (var i = 0; i < positions.length - 1; i++) {
      var start = OneMap.Cartographic.fromCartesian(positions[i]);
      var end = OneMap.Cartographic.fromCartesian(positions[i + 1]);
      var geodesic = new OneMap.EllipsoidGeodesic();
      geodesic.setEndPoints(start, end);
      var distance = geodesic.surfaceDistance
    }
    return distance.toFixed(2);
  }
}
