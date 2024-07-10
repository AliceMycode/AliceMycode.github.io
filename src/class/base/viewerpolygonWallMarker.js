import gcoord from 'gcoord';
import { Cartesian3ToWGS84 } from '@/utils/utils'
export  class viewerpolygonWallMarker {
  // 数据1
  listOne = [
    {
     label: '数据1', 
     point: [
       gcoord.transform([114.605465,22.7474], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.608807,22.747333], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.608771,22.745467], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.605447,22.74545],gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.605465,22.7474], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.608807,22.747333], gcoord.BD09, gcoord.WGS84),
     ]
   }
 ]

  // 数据2
  listTwo = [
   {
     label: '数据2', 
     point: [
       gcoord.transform([114.611807,22.7503], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.617287,22.750266], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.617179,22.747067], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.611789,22.747017],gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.611807,22.7503], gcoord.BD09, gcoord.WGS84),
       gcoord.transform([114.617287,22.750266], gcoord.BD09, gcoord.WGS84),
     ]
   }
 ]

 // 数据3
 listThree = [
  {
    label: '数据3', 
    point: [
      gcoord.transform([114.606471,22.752866], gcoord.BD09, gcoord.WGS84),
      gcoord.transform([114.607783,22.752716], gcoord.BD09, gcoord.WGS84),
      gcoord.transform([114.607765,22.750583], gcoord.BD09, gcoord.WGS84),
      gcoord.transform([114.606453,22.750633],gcoord.BD09, gcoord.WGS84),
      gcoord.transform([114.606471,22.752866], gcoord.BD09, gcoord.WGS84),
      gcoord.transform([114.607783,22.752716], gcoord.BD09, gcoord.WGS84),
    ]
  }
]

// 数据4
listFour = [
 {
   label: '数据4', 
   point: [
     gcoord.transform([114.619623,22.756349], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.621707,22.757215], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.622982,22.754316], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.620808,22.753483],gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.619623,22.756349], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.621707,22.757215], gcoord.BD09, gcoord.WGS84),
   ]
 }
]


// 数据5
listFive = [
 {
   label: '数据5', 
   point: [
     gcoord.transform([114.609633,22.754016], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.611861,22.754941], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.612445,22.753499], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.610217,22.752574],gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.609633,22.754016], gcoord.BD09, gcoord.WGS84),
     gcoord.transform([114.611861,22.754941], gcoord.BD09, gcoord.WGS84),
   ]
 }
]
//中心点容器
centerPointContainer = []
typeName = '面/墙/标注'
 constructor() {

 }

 //绘制面
 handleDrawPolygon(){
  for (let i in this.listOne) {
   const item = this.listOne[i];
   const list = item.point.flat();
   const entitie = {
     typeName: this.typeName,
     labelName:item.label,
     polygon: {
       hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
       material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
        extrudedHeight: 10,
       closeTop: true,
       closeBottom: false,
     }
   }
   this.handleDynamicWall(this.listOne)
   this.handleGetCenterPoint(entitie)
  }

  for (let i in this.listTwo) {
   const item = this.listTwo[i];
   const list = item.point.flat();
   const entitie = {
     typeName: this.typeName,
     labelName:item.label,
     polygon: {
       hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
       material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
       closeTop: true,
       closeBottom: false,
     }
   }
   this.handleDynamicWall(this.listTwo)
   this.handleGetCenterPoint(entitie)
  }

  for (let i in this.listThree) {
   const item = this.listThree[i];
   const list = item.point.flat();
   const entitie = {
     typeName: this.typeName,
     labelName:item.label,
     polygon: {
       hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
       material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
       closeTop: true,
       closeBottom: false,
     }
   }
   this.handleDynamicWall(this.listThree)
   this.handleGetCenterPoint(entitie)
  }

  for (let i in this.listFour) {
   const item = this.listFour[i];
   const list = item.point.flat();
   const entitie = {
     typeName: this.typeName,
     labelName:item.label,
     polygon: {
       hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
       material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
       closeTop: true,
       closeBottom: false,
     }
   }
   this.handleDynamicWall(this.listFour)
   this.handleGetCenterPoint(entitie)
  }

  for (let i in this.listFive) {
   const item = this.listFive[i];
   const list = item.point.flat();
   const entitie = {
     typeName: this.typeName,
     labelName:item.label,
     polygon: {
       hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
       material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
       closeTop: true,
       closeBottom: false,
     }
   }
   this.handleDynamicWall(this.listFive)
   this.handleGetCenterPoint(entitie)
  }

 }
 //绘制标注
 handleDrawMarker(){
   for (let i in this.centerPointContainer) {
    const item = this.centerPointContainer[i];
    const point = item.point[0];
    const entitie = {
      typeName: this.typeName,
      position : OneMap.Cartesian3.fromDegrees(...point),
      billboard : {
        // 远大近小,能放多段值
        scaleByDistance : new OneMap.NearFarScalar(50, 0.4, 10000, 1),
        image : require('@/assets/base/marker1.png'),
        width: 50,
        height: 50,
        disableDepthTestDistance:50000
      },
      label : {
        text : item.label,
        font : '14px sans-serif',
        showBackground : true,
        fillColor: OneMap.Color.fromCssColorString('#fff'),
        backgroundColor: OneMap.Color.fromCssColorString('#2773DE'),
        // 水平角度
        horizontalOrigin : OneMap.HorizontalOrigin.CENTER,
        // 偏移角度
        pixelOffset : new OneMap.Cartesian2(0.0, -25),
        pixelOffsetScaleByDistance : new OneMap.NearFarScalar(10, 1.0, 200, 1.5)
      }
    }
    window.$viewer.entities.add(entitie)
  }
 }
 handleCreatePolygonWallMarker(){
  this.handleDrawPolygon()
  this.handleDrawMarker()
 }
 //获取中心点
 handleGetCenterPoint(entitie){
   const polygon = window.$viewer.entities.add(entitie)
   var polyPositions = polygon.polygon.hierarchy.getValue(OneMap.JulianDate.now()).positions;
   var pCenter = OneMap.BoundingSphere.fromPoints(polyPositions).center; 
   var options = {
    label:entitie.labelName,
    point:[
     [Cartesian3ToWGS84(pCenter).lng,Cartesian3ToWGS84(pCenter).lat,Cartesian3ToWGS84(pCenter).alt]
    ]
   }
   this.centerPointContainer.push(options)
 }

 //绘制动态墙
 handleDynamicWall(data){
    for (let i in data) {
     const item = data[i];
     const list = item.point.flat();
     const wallEntitie = {
       typeName: this.typeName,
       wall: {
         positions: OneMap.Cartesian3.fromDegreesArray(list),
         material: new OneMap.PolylineTrailLinkMaterialProperty({
           color: OneMap.Color.fromCssColorString('#2773DE').withAlpha(1),
           duration: 1500,
           trailImage: require('@/assets/material/walldynamic.png')
         }),
         maximumHeights: new Array(list.length).fill(30),
         minimumHeights: new Array(list.length).fill(0),
       }
     }
     window.$viewer.entities.add(wallEntitie)
   }
 }

 // 获取
 handleGetPolygonWallMarker () {
  const overlayListAll = window.$viewer.entities.values;
  const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
  return overlayList
 }

 // 删除
 handleDeletePolygonWallMarker () {
   const listGet = this.handleGetPolygonWallMarker()
   this.handleRomvePolygonWallMarker(listGet)
 }
 // 移除
 handleRomvePolygonWallMarker (list) {
   for (let i in list) {
     const item = list[i]
     window.$viewer.entities.removeById(item._id)
   }
 }

}