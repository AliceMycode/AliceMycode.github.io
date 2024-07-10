import { Cartesian3ToWGS84 } from '@/utils/utils'
import { viewmarker } from './viewmarker'
// 绘制走廊类
export class viewwall {

    // 动态墙数据
    listOne = [
      {
        label: '数据1', 
        point: [
          [114.57214077332807,22.749091215382037],
          [114.57457909877337,22.75016017994323],
          [114.57563900316335,22.743226950055817],
          [114.57351102482797,22.742931124583098], 
          [114.57214077332807,22.749091215382037],
          [114.57457909877337,22.75016017994323],
        ]
      },
    ]
  
    // 流体墙数据
    listTwo = [
      {
        label: '数据1', 
        point: [
          [114.57822956896872,22.750208699897794, 10],
          [114.58460740927212,22.753502475190956, 10],
          [114.58791174994693,22.747119220390996, 10],
          [114.58232191614185,22.74508128212634, 10],
          [114.57822956896872,22.750208699897794, 10],
          [114.58460740927212,22.753502475190956, 10],
        ]
      },
    ]
  
    // 普通实体墙数据
    listThree = [
      {
        label: '数据1', 
        point: [
          [114.57360808030926,22.756982920926635, 40],
          [114.5777188257382,22.75856037603011, 40],
          [114.57651221722467,22.753836340964455, 40],
          [114.57360808030926,22.756982920926635, 40],
          [114.5777188257382,22.75856037603011, 40],
        ]
      },
    ]
    
    // 泛光墙数据
    listFour =  [
      {
        label: '数据1', 
        point: [
          [114.57416826686416,22.740677010206333, 40],
          [114.57853484808025,22.74167238310485, 40],
          [114.57756655701162,22.736436975198615, 40],
          [114.57495514833064,22.73624405843852,40],
          [114.57416826686416,22.740677010206333, 40],
          [114.57853484808025,22.74167238310485, 40],
        ]
      },
    ]
  
    typeName = '墙体类'
  
    constructor(){
      this.viewmarkerClass = new viewmarker()
    }
  
    // 绘制
    handleDrawWall(){
      
      // 动态墙
      for (let i in this.listOne) {
        const item = this.listOne[i];
        const list = item.point.flat();
        console.log('aaaaaaaaaaa',list)
        const wallEntitie = {
          typeName: this.typeName,
          wall: {
            positions: OneMap.Cartesian3.fromDegreesArray(list),
            material: new OneMap.PolylineTrailLinkMaterialProperty({
              color: OneMap.Color.fromCssColorString('#2773DE').withAlpha(1),
              duration: 1500,
              trailImage: require('@/assets/material/walldynamic.png')
            }),
            heightReference: OneMap.HeightReference.CLAMP_TO_GROUND,//设置HeightReference高度参考类型为CLAMP_TO_GROUND贴地类型
            maximumHeights: new Array(list.length).fill(30),
            minimumHeights: new Array(list.length).fill(0),
          }
        }
        //面类
        const polygonEntitie = {
          typeName: this.typeName,
          polygon: {
            hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
            material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
            // extrudedHeight: 1,
            closeTop: true,
            closeBottom: false,
          }
        }
        //添加面实体
        const polygon = window.$viewer.entities.add(polygonEntitie)
        //获取面中心点
        var polyPositions = polygon.polygon.hierarchy.getValue(OneMap.JulianDate.now()).positions;
        var pCenter = OneMap.BoundingSphere.fromPoints(polyPositions).center; 
        const options = {
          label:'面中心点',
          point:[
            [Cartesian3ToWGS84(pCenter).lng,Cartesian3ToWGS84(pCenter).lat,Cartesian3ToWGS84(pCenter).alt]
          ]
        }
        this.viewmarkerClass.handleCreateMarker([options])
        //添加动态墙实体
        window.$viewer.entities.add(wallEntitie)
      }
  
      // 流体墙
      for (let i in this.listTwo) {
        const item = this.listTwo[i];
        const list = item.point.flat();
  
        const wallEntitie = {
          typeName: this.typeName,
          wall: {
            positions: OneMap.Cartesian3.fromDegreesArrayHeights(list),
            maximumHeights: new Array(list.length).fill(50),
            minimumHeights: new Array(list.length).fill(0),
            material: new OneMap.TrailLineMaterialProperty({
              color: OneMap.Color.RED,
              duration: 18000,
            }), 
          },
        }
        window.$viewer.entities.add(wallEntitie)
      }
  
      // 普通实体墙
      for (let i in this.listThree) {
        const item = this.listThree[i];
        const list = item.point.flat();
        const entitie = {
          typeName: this.typeName,
          wall: {
            positions: OneMap.Cartesian3.fromDegreesArrayHeights(list),
            maximumHeights: new Array(list.length).fill(50),
            minimumHeights: new Array(list.length).fill(0),
            material: OneMap.Color.BLUE,
            outline: true,
          },
        }
        window.$viewer.entities.add(entitie)
      }
  
      // 泛光墙
      for (let i in this.listFour) {
        const item = this.listFour[i];
        const list = item.point.flat();
        const entitie = {
          typeName: this.typeName,
          wall: {
            positions: OneMap.Cartesian3.fromDegreesArrayHeights(list),
            maximumHeights: new Array(list.length).fill(50),
            minimumHeights: new Array(list.length).fill(0),
            material: new OneMap.WallDiffuseMaterialProperty({
              color: new OneMap.Color(1.0, 1.0, 0.0, 1.0)
            }),
          },
        }

        window.$viewer.entities.add(entitie)
      }
      
    }
  
    // 移除
    handleRomveWall (list) {
      for (let i in list) {
        const item = list[i]
        window.$viewer.entities.removeById(item._id)
      }
    }
  
    // 获取
    handleGetWall () {
      const overlayListAll = window.$viewer.entities.values;
      const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
      return overlayList
    }
    
    // 添加
    handleCreateWall () {
      this.handleDrawWall()
    } 
  
    // 删除
    handleDeleteWall () {
      const listGet = this.handleGetWall()
      this.handleRomveWall(listGet)
      this.viewmarkerClass.handleDeleteMarker()
    }
    
  }
  
  
  