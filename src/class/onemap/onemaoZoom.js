export function zoomIn() {
    let cameraPos = window.$viewer.camera.position;
    let ellipsoid = window.$viewer.scene.globe.ellipsoid;
    let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
    let height = cartographic.height;
  
    // viewer.camera.zoomIn(height / 3);
  
    let centerLon = parseFloat(OneMap.Math.toDegrees(cartographic.longitude).toFixed(8));
    let centerLat = parseFloat(OneMap.Math.toDegrees(cartographic.latitude).toFixed(8));
  
    window.$viewer.camera.flyTo({
      // destination: OneMap.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.8),
      duration: 1.0
    });
  }
  export function zoomOut() {
    let cameraPos = window.$viewer.camera.position;
    let ellipsoid = window.$viewer.scene.globe.ellipsoid;
    let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
    let height = cartographic.height;
  
    // viewer.camera.zoomOut(height * 1.2);
  
    let centerLon = parseFloat(OneMap.Math.toDegrees(cartographic.longitude).toFixed(8));
    let centerLat = parseFloat(OneMap.Math.toDegrees(cartographic.latitude).toFixed(8));
  
    window.$viewer.camera.flyTo({
      // destination: OneMap.Cartesian3.fromDegrees(centerLon, centerLat, height * 1.8),
      duration: 1.0
    });
  }
  
  