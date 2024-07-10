
export default class effectDragCircle {

  constructor(){
    this.ellipseId = 'DragCircle_1'                               // 圆id
    this.ellipseMarkerId = 'DragCircleMarker_1'                   // 圆标注id
    this.center = { x: 114.58540831783083, y: 22.7453738564298 }  // 圆心
    this.radius = 300                                             // 圆半径
    this.drag = false                                             // 圆拖拽标志位
  } 

  // 创建
  handleCreateDragCircle(){
    // 创建圆
    const ellipse = {
      id: this.ellipseId,
      position: OneMap.Cartesian3.fromDegrees( this.center.x, this.center.y ),
      ellipse: {
        semiMinorAxis: this.radius,
        semiMajorAxis: this.radius,
        height: 0,
        material: OneMap.Color.fromCssColorString('rgba(0, 0, 0, 0.3)'),
        outline: true,
        outlineColor: OneMap.Color.fromCssColorString('rgba(255, 255, 255, 0.5)'),
        outlineWidth: 3.0
      }
    }
    window.$viewer.entities.add(ellipse)

    // 创建圆的标注
    const ellipseMarker = {
      id: this.ellipseMarkerId,
      position: OneMap.Cartesian3.fromDegrees( this.center.x, this.center.y ),
      billboard: {
        image: require('@/assets/base/marker1.png'),
        show: true,
        horizontalOrigin: OneMap.HorizontalOrigin.RIGHT,
        verticalOrigin: OneMap.VerticalOrigin.BOTTOM,
        pixelOffset: new OneMap.Cartesian2(32, 0)
      },
      label: {
        text: `${this.radius}米`,
        font: '16px',
        fillColor: OneMap.Color.fromCssColorString('rgba(255, 255, 255, 1)'),
        outlineColor: OneMap.Color.fromCssColorString('rgba(255, 255, 255, 1)'),
        style: OneMap.LabelStyle.FILL_AND_OUTLINE,
        showBackground: true,
        horizontalOrigin: OneMap.HorizontalOrigin.RIGHT,
        verticalOrigin: OneMap.VerticalOrigin.BOTTOM,
        pixelOffset: new OneMap.Cartesian2(32, -70)
      }
    }
    window.$viewer.entities.add(ellipseMarker)
    
  }

  // 删除
  handleDeleteDragCircle(){
    window.$viewer.entities.removeById(this.ellipseId)
    window.$viewer.entities.removeById(this.ellipseMarkerId)
  }

  // 拖拽圆
  handleDragDragCircle(cartesian){
    // 获取圆
    const ellipse = window.$viewer.entities.getById(this.ellipseId)
    const ellipseMarker = window.$viewer.entities.getById(this.ellipseMarkerId)

    // 获取园心到最后一个点的距离
    const ellipseRadius = parseFloat(this.getSpaceDistance(this.center, cartesian)) 

    // 设置圆的半径
    if (ellipse) {
      ellipse.ellipse.semiMinorAxis = new OneMap.CallbackProperty(() => { return ellipseRadius }, false)
      ellipse.ellipse.semiMajorAxis = new OneMap.CallbackProperty(() => { return ellipseRadius }, false)
    }

    // 设置标注的位置
    if (ellipseMarker) {
      ellipseMarker.label.text = ellipseRadius + '米'
    }
  }

  // 计算位置
  getDragPosition (center, radius) {
    const ellRadius = 6371                // 地球半径，单位千米
    const distance = radius / 1000        // 将周边范围单位转化为千米
    const dlng = 2 * Math.asin(Math.sin(distance / (2 * ellRadius)) / Math.cos(center.y * Math.PI / 180))
    const dlat = distance / ellRadius
    const parseLng = dlng * 180 / Math.PI
    const parseLat = dlat * 180 / Math.PI
    return { parseLng: parseLng, parseLat: parseLat }
  }
  
  // 计算距离
  getSpaceDistance (center, cartesian) {
    var distance = 0
    const start = new OneMap.Cartesian3.fromDegrees(center.x, center.y, 0)
    const end = cartesian
    var point1cartographic = OneMap.Cartographic.fromCartesian(start)
    var point2cartographic = OneMap.Cartographic.fromCartesian(end)

    // 根据经纬度计算出距离
    var geodesic = new OneMap.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    var s = geodesic.surfaceDistance

    // 返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
    distance = distance + s

    return Math.round(distance)
  }

}