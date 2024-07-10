export default class viewShedStage {
  constructor(options) {
    this.viewer = window.$viewer
    this.arrViewField = []
    this.labelEntity = []
    this.flag = false
    this.viewModel = {
      verticalAngle: options?.verticalAngle ? options.verticalAngle : 90,
      horizontalAngle: options?.horizontalAngle ? options.horizontalAngle : 100,
      distance: options?.distance ? options.distance : 10
    }
    //初始化事件
    this.init()
  }
  init() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair'
    this.handleToolTip()
    this.handleLeftClick()
    this.handleRightClick()
    this.handleMouseMove()
  }
  // 添加可视域
  addViewField() {
    let e = new OneMap.ViewShed3D(this.viewer, {
      horizontalAngle: Number(this.viewModel.horizontalAngle),
      verticalAngle: Number(this.viewModel.verticalAngle),
      distance: Number(this.viewModel.distance),
      calback: () => {
        this.viewModel.distance = e.distance
      }
    });
    this.arrViewField.push(e)
  }
  //添加信息提示实体
  handleToolTip() {
    this.labelEntity = this.viewer.entities.add({
      id: 'tooltip',
      position: OneMap.Cartesian3.fromDegrees(0, 0),
      label: {
        text: '左键选取观测起点',
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
  handleLeftClick() {
    this.handler.setInputAction((event) => {
      this.flag = true
      let position = this.viewer.scene.pickPosition(event.position);
      //解决需要两次左键点击地图才能选点的问题
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(event.position, ellipsoid);
      }
      if (!position) return;
      if (OneMap.defined(position)) {
        this.labelEntity.label._text._value = '左键选取观测终点，右键结束绘制,并开始分析'
      }
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  handleRightClick() {
    this.handler.setInputAction((movement) => {
      if(!this.flag) {
        this.clearAllViewField()
      }
      this.unRegisterEvents()
      //关闭事件句柄
      this.handler.destroy();
      this.handler = null;
      //设置鼠标默认样式
      this.viewer._element.style.cursor = 'default';
      //清除指定实体
      this.deleteLabelEntity()
    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      const newPosition = this.viewer.scene.pickPosition(movement.endPosition);
      if (OneMap.defined(newPosition)) {
        //tooltip跟随鼠标移动
        if (this.labelEntity) {
          this.labelEntity.position = newPosition
        }

      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  deleteLabelEntity() {
    let entID = this.viewer.entities.getById('tooltip')
    this.viewer.entities.remove(entID);
    this.labelEntity = null
  }
  //解除鼠标事件
  unRegisterEvents() {
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  // 清除可视域
  clearAllViewField() {
    for (let e = 0, i = this.arrViewField.length; e < i; e++) {
      this.arrViewField[e].destroy()
    }
    this.arrViewField = []
  }

}