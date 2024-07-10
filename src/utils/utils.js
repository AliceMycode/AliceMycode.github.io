 /**
 * 笛卡尔坐标转WGS84
 * @param Cartesian3 单个点或点数组
 */
  export function Cartesian3ToWGS84(Cartesian3){
   if (!Cartesian3 || !Cartesian3.x || !Cartesian3.y) {
       throw "Error in parameters";
   }
   let _cartesian3 = new OneMap.Cartesian3(Cartesian3.x, Cartesian3.y, Cartesian3.z);
   let _cartographic = OneMap.Cartographic.fromCartesian(_cartesian3);
   let _lat = OneMap.Math.toDegrees(_cartographic.latitude);
   let _lng = OneMap.Math.toDegrees(_cartographic.longitude);
   let _alt = _cartographic.height;
   return {lng: _lng, lat: _lat, alt: _alt};
 }