import { ONEMAP_VIEW } from '@/config/oneMapConfig'

export default class onemapView {

  constructor(){

  }

  // 大亚湾主视角
  handleDywView(){
    window.$viewer.camera.flyTo({
      destination: new OneMap.Cartesian3(ONEMAP_VIEW.DYW.destination.x, ONEMAP_VIEW.DYW.destination.y, ONEMAP_VIEW.DYW.destination.z),
      orientation: {
        direction: new OneMap.Cartesian3(ONEMAP_VIEW.DYW.direction.x, ONEMAP_VIEW.DYW.direction.y, ONEMAP_VIEW.DYW.direction.z),
        up: new OneMap.Cartesian3(ONEMAP_VIEW.DYW.up.x, ONEMAP_VIEW.DYW.up.y, ONEMAP_VIEW.DYW.up.z)
      },
      duration: 3
    });
  }

  // 石化区视角
  handleBaseView(){
    window.$viewer.camera.flyTo({
      destination: new OneMap.Cartesian3(ONEMAP_VIEW.SHQ.destination.x, ONEMAP_VIEW.SHQ.destination.y, ONEMAP_VIEW.SHQ.destination.z),
      orientation: {
        direction: new OneMap.Cartesian3(ONEMAP_VIEW.SHQ.direction.x, ONEMAP_VIEW.SHQ.direction.y, ONEMAP_VIEW.SHQ.direction.z),
        up: new OneMap.Cartesian3(ONEMAP_VIEW.SHQ.up.x, ONEMAP_VIEW.SHQ.up.y, ONEMAP_VIEW.SHQ.up.z)
      },
      duration: 3
    });
  }

  // 全幅视角
  handleFullView(){
    window.$viewer.camera.flyTo({ destination: OneMap.Cartesian3.fromDegrees(114.59058117663098,22.754346222710428, 25000) });
  }

  // 标注视角
  handleMarkerView(point) {
    window.$viewer.camera.flyTo({ destination: OneMap.Cartesian3.fromDegrees(point.x, point.y, point.z) });
  }

  // 默认视角
  handleDefaultView(point){
    window.$viewer.camera.flyToBoundingSphere(
      new OneMap.BoundingSphere(OneMap.Cartesian3.fromDegrees(point.x, point.y, 20), 30),
      {
        offset: new OneMap.HeadingPitchRange(OneMap.Math.toRadians(-20.0), OneMap.Math.toRadians(-25.0), point.offset),
        duration: 2,
      },
    );
  }

  // 放大视角
  handleViewEnlarge(){
    const position = this.handleGetViewPosition()
    window.$viewer.camera.flyTo({
      destination: OneMap.Cartesian3.fromDegrees(position.centerLon + 0.005, position.centerLat  + 0.005, position.height / 1.1),
      orientation: {
        direction: window.$camera.direction,
        up: window.$camera.up
      },
      duration: 3
    });
  }

  // 缩小视角
  handleViewNarrow(){ 
    const position = this.handleGetViewPosition()
    window.$viewer.camera.flyTo({
      destination: OneMap.Cartesian3.fromDegrees(position.centerLon - 0.005, position.centerLat  - 0.005, position.height * 1.1),
      orientation: {
        direction:  window.$camera.direction,
        up: window.$camera.up
      },
      duration: 3
    });
  }

  // 获取当前视角
  handleGetViewPosition(){
    var cameraPosition =  window.$viewer.camera.position;
    // 获取当前坐标系标准
    var ellipsoid =  window.$viewer.scene.globe.ellipsoid;
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    var cartographic = ellipsoid.cartesianToCartographic(cameraPosition);
    // 获取镜头的高度
    var height = cartographic.height;
    // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
    var centerLon = parseFloat(OneMap.Math.toDegrees(cartographic.longitude).toFixed(8));
    var centerLat = parseFloat(OneMap.Math.toDegrees(cartographic.latitude).toFixed(8));
    // 返回坐标
    return { centerLon, centerLat, height }
  }

}