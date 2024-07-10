//****************************高度测量 第一个点的经纬度，第二个点的高度，两点水平距离为半径************************************************//
export default class MeasureHeight {
  constructor() {
    this.viewer = window.$viewer
    this.labelEntity = null
    this.entityCollection = []
    this.positions = []
    this.poly = null
    this.height = 0
    this.registerEvents()
  }
  registerEvents() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair';
    //设置tooltip
    // this.handleToolTip()
    //初始化鼠标移动事件
    this.handleMouseMove()
    //初始化鼠标右键事件
    this.handleRightClick()
    //初始化左键事件
    this.handleLeftClick()
  }
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      let cartesian = this.viewer.scene.pickPosition(movement.endPosition);
      if (!cartesian) return;
      if (this.positions.length >= 2) {
        if (!OneMap.defined(this.poly)) {
          this.poly = new PolyLinePrimitive(this.positions);
          
          // this.poly = 1
        } else {
          console.log(111)
          this.positions.pop();
          this.positions.push(cartesian);
        }
        this.height = getHeight(this.positions);
      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  handleRightClick() {

  }
  handleLeftClick() {
    this.handler.setInputAction((event) => {
      let cartesian = this.viewer.scene.pickPosition(event.position);
      if (!cartesian) {
        return false
      }
      if (this.positions.length == 0) {
        this.positions.push(cartesian);
        this.positions.push(cartesian.clone());
        this.handleStartPoint(this.positions[0])
      }
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  // 添加点
  handleStartPoint(position) {
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
  handleLine() {
    this.entityCollection.push(this.viewer.entities.add(
      new OneMap.Entity({
        polyline: {
          positions: new OneMap.CallbackProperty(e => {
            return this.positions
          }, false),
          width: 2,
          material: OneMap.Color.AQUA,
          clampToGround: true,
        }
      })
    ))
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


  clear() {
    let listGet = handleGetEntities()
    handleRomveEntities(listGet)
  }


  // 获取
  handleGetEntities() {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._name == 'heightLine' || item._name == 'heightPoint' })
    return overlayList
  }


  // 移除
  handleRomveEntities(list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
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
}


class PolyLinePrimitive {
  constructor(positions) {
    this.options = {
      name: 'heightLine',
      polyline: {
        show: true,
        positions: [],
        material: OneMap.Color.AQUA,
        width: 2
      },
      ellipse: {
        show: true,
        material: OneMap.Color.AQUA.withAlpha(0.5),
        outline: true,
        outlineColor: OneMap.Color.WHITE,
      }
    }
    this.viewer = window.$viewer
    this.positions = positions
    this.init();
  }
  init() {
    //实时更新polyline.positions
    this.options.polyline.positions = new OneMap.CallbackProperty(()=>{
      this.update()
    }, false);
    this.options.position = new OneMap.CallbackProperty(() =>{
      this.updateEllipse()
    }, false);
    this.options.ellipse.semiMinorAxis = new OneMap.CallbackProperty(() =>{
      this.semiMinorAxis()
    }, false);
    this.options.ellipse.semiMajorAxis = new OneMap.CallbackProperty(() => {
      this.semiMinorAxis()
    }, false);
    this.options.ellipse.height = new OneMap.CallbackProperty(() =>{
      this.height()
    }, false);
    console.log(' this.viewer', this.viewer.entities)
    this.viewer.entities.add(this.options)

  }
  update() {
    // console.log('update',this.positions)
    let temp_position = [];
    temp_position.push(this.positions[0]);
    let point1cartographic = OneMap.Cartographic.fromCartesian(this.positions[0]);
    let point2cartographic = OneMap.Cartographic.fromCartesian(this.positions[1]);
    let point_temp = OneMap.Cartesian3.fromDegrees(OneMap.Math.toDegrees(point1cartographic.longitude), OneMap.Math.toDegrees(point1cartographic.latitude), point2cartographic.height);
    temp_position.push(point_temp);
    return temp_position;
  }

  updateEllipse() {
    // console.log('updateEllipse',this.positions)
    return this.positions[0];
  }

  semiMinorAxis() {
    // console.log('semiMinorAxis',this.positions)
    let point1cartographic = OneMap.Cartographic.fromCartesian(this.positions[0]);
    let point2cartographic = OneMap.Cartographic.fromCartesian(this.positions[1]);
    /**根据经纬度计算出距离**/
    let geodesic = new OneMap.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    let s = geodesic.surfaceDistance;
    return s;
  }

  height() {
    // console.log('height',this.positions)
    let height_temp = getHeight(this.positions);
    return height_temp;
  }
}


function getHeight(_positions) {
  if (_positions) {
    var cartographic = OneMap.Cartographic.fromCartesian(_positions[0]);
    var cartographic1 = OneMap.Cartographic.fromCartesian(_positions[1]);
    var height_temp = cartographic1.height - cartographic.height;
    return height_temp.toFixed(2);
  }

}








