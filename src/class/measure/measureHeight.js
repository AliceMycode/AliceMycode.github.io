//****************************高度测量 第一个点的经纬度，第二个点的高度，两点水平距离为半径************************************************//
export const measureHeight = function () {
  var viewer = window.$viewer
  var handler = new OneMap.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  var positions = [];
  viewer._element.style.cursor = 'crosshair';
  var labelEntity = null
  var poly = null;
  var height = 0;
  var cartesian = null;
  //添加信息提示实体

  handleToolTip()
  //鼠标移动事件
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.endPosition);
    //tooltip跟随鼠标移动
    if (labelEntity) {
      labelEntity.position = cartesian
    }
    if (positions.length >= 2) {
      if (!OneMap.defined(poly)) {
        poly = new PolyLinePrimitive(positions);
      } else {
        positions.pop();
        positions.push(cartesian);
      }
      height = getHeight(positions);
    }
  }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  //左键单击事件
  handler.setInputAction(function (movement) {
    cartesian = viewer.scene.pickPosition(movement.position);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
      positions.push(cartesian);
      viewer.entities.add({
        name: 'heightPoint',
        position: positions[0],
        point: {
          pixelSize: 5,
          color: OneMap.Color.WHITE,
          outlineColor: OneMap.Color.BLUE,
          outlineWidth: 2,
          disableDepthTestDistance: 50000,
          heightReference: OneMap.HeightReference.none
        },
      });
      if (labelEntity) {
        labelEntity.label._text._value = '双击左键测量高度'
      }
    }

  }, OneMap.ScreenSpaceEventType.LEFT_CLICK);

  //左键双击事件
  handler.setInputAction(function (movement) {
    viewer._element.style.cursor = 'default';
    handler.destroy();
    handler = null
    deleteLabelEntity()
    var textDisance = height + "米";
    var point1cartographic = OneMap.Cartographic.fromCartesian(positions[0]);
    var point2cartographic = OneMap.Cartographic.fromCartesian(positions[1]);
    var point_temp = OneMap.Cartesian3.fromDegrees(OneMap.Math.toDegrees(point1cartographic.longitude), OneMap.Math.toDegrees(point1cartographic.latitude), point2cartographic.height);
    viewer.entities.add({
      name: 'heightPoint',
      position: point_temp,
      point: {
        pixelSize: 5,
        color: OneMap.Color.WHITE,
        outlineColor: OneMap.Color.BLUE,
        outlineWidth: 2,
        disableDepthTestDistance: 50000,
        heightReference: OneMap.HeightReference.none
      },
      label: {
        text: textDisance,
        font: '18px sans-serif',
        verticalOrigin: OneMap.VerticalOrigin.BOTTOM,
        pixelOffset: new OneMap.Cartesian2(20, -20),
        style: OneMap.LabelStyle.FILL_AND_OUTLINE,
        outlineColor: OneMap.Color.WHITE,
        showBackground: true,
        eyeOffset: new OneMap.Cartesian3(0, 0, -10),
        fillColor: OneMap.Color.fromCssColorString('#fff'),
        backgroundColor: OneMap.Color.fromCssColorString('#2773DE'),
      }
    });
  }, OneMap.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  //左键双击事件
  handler.setInputAction(function (movement) {
    viewer._element.style.cursor = 'default';
    handler.destroy();
    handler = null
    deleteLabelEntity()

  }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);

  function deleteLabelEntity() {
    let entID = viewer.entities.getById('tooltip')
    viewer.entities.remove(entID);
    labelEntity = null
  }
  function handleToolTip() {
    labelEntity = viewer.entities.add({
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
  function getHeight(_positions) {
    console.log('_positions',_positions)
    var cartographic = OneMap.Cartographic.fromCartesian(_positions[0]);
    var cartographic1 = OneMap.Cartographic.fromCartesian(_positions[1]);
    var height_temp = cartographic1.height - cartographic.height;
    return height_temp.toFixed(2);
  }

  var PolyLinePrimitive = (function () {
    function _(positions) {
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
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      var _self = this;
      var _update = function () {
        var temp_position = [];
        temp_position.push(_self.positions[0]);
        var point1cartographic = OneMap.Cartographic.fromCartesian(_self.positions[0]);
        var point2cartographic = OneMap.Cartographic.fromCartesian(_self.positions[1]);
        var point_temp = OneMap.Cartesian3.fromDegrees(OneMap.Math.toDegrees(point1cartographic.longitude), OneMap.Math.toDegrees(point1cartographic.latitude), point2cartographic.height);
        temp_position.push(point_temp);
        return temp_position;
      };
      var _update_ellipse = function () {
        return _self.positions[0];
      };
      var _semiMinorAxis = function () {
        var point1cartographic = OneMap.Cartographic.fromCartesian(_self.positions[0]);
        var point2cartographic = OneMap.Cartographic.fromCartesian(_self.positions[1]);
        /**根据经纬度计算出距离**/
        var geodesic = new OneMap.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var s = geodesic.surfaceDistance;
        return s;
      };
      var _height = function () {
        var height_temp = getHeight(_self.positions);
        return height_temp - 6;
      };
      //实时更新polyline.positions
      this.options.polyline.positions = new OneMap.CallbackProperty(_update, false)
      this.options.position = new OneMap.CallbackProperty(_update_ellipse, false)
      this.options.ellipse.semiMinorAxis = new OneMap.CallbackProperty(_semiMinorAxis, false);
      this.options.ellipse.semiMajorAxis = new OneMap.CallbackProperty(_semiMinorAxis, false);
      this.options.ellipse.height = new OneMap.CallbackProperty(_height, false);
      viewer.entities.add(this.options)
    };

    return _;
  })();
};

export function clear() {
  let listGet = handleGetEntities()
  handleRomveEntities(listGet)
}





// 获取
function handleGetEntities() {
  const overlayListAll = window.$viewer.entities.values;
  const overlayList = overlayListAll.filter(item => { return item._name == 'heightLine' || item._name == 'heightPoint' })
  return overlayList
}


// 移除
function handleRomveEntities(list) {
  for (let i in list) {
    const item = list[i]
    window.$viewer.entities.removeById(item._id)
  }
}

