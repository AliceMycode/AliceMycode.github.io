
// 绘制标注类
export class viewmarker {

    // 数据1
    listOne = [
      {
        label: '数据1', 
        point: [
          [114.57073824353962, 22.745250142701078,6], 
        ]
      },
      {
        label: '数据2', 
        point: [ 
          [114.57741574470803, 22.745182218097895,6], 
        ]
      },
      {
        label: '数据3', 
        point: [
          [114.57840275723755, 22.740643262819415,6], 
        ]
      },
      {
        label: '数据4', 
        point: [
          [114.58149603392712, 22.742969591305894,6], 
        ]
      }
    ]
    typeName = 'marker'
  
    constructor(){
      
    }
  
    // 绘制
    handleDrawMarker(data){
      const sourceData =  data == undefined ? this.listOne : data
      // 数据1
      for (let i in sourceData) {
        const item = sourceData[i];
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
            cursor:'pointer',
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
  
    // 移除
    handleRomveMarker (list) {
      for (let i in list) {
        const item = list[i]
        window.$viewer.entities.removeById(item._id)
      }
    }
  
    // 获取
    handleGetMarker () {
      const overlayListAll = window.$viewer.entities.values;
      const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
      return overlayList
    }
  
    // 添加
    handleCreateMarker (data) {
      this.handleDrawMarker(data)
    } 
  
    // 删除
    handleDeleteMarker () {
      const listGet = this.handleGetMarker()
      this.handleRomveMarker(listGet)
    }
    
  }