
// 绘制文本类
export class viewlabel {

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
    typeName = '文本类'
  
    constructor(){
  
    }
  
    // 绘制
    handleDrawLabel(){
      // 数据1
      for (let i in this.listOne) {
        const item = this.listOne[i];
        const point = item.point[0];
        const entitie = {
          typeName: this.typeName,
          position : OneMap.Cartesian3.fromDegrees(...point),
          label : {
            text : '标签',
            font : '16px Helvetica',
            fillColor : OneMap.Color.SKYBLUE,
            outlineColor : OneMap.Color.BLACK,
            outlineWidth : 2,
            disableDepthTestDistance:50000,
            style : OneMap.LabelStyle.FILL_AND_OUTLINE
          }
        }
        window.$viewer.entities.add(entitie)
      }
    }
  
    // 移除
    handleRomveLabel (list) {
      for (let i in list) {
        const item = list[i]
        window.$viewer.entities.removeById(item._id)
      }
    }
  
    // 获取
    handleGetLabel () {
      const overlayListAll = window.$viewer.entities.values;
      const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
      return overlayList
    }
  
    // 添加
    handleCreateLabel () {
      this.handleDrawLabel()
    } 
  
    // 删除
    handleDeleteLabel () {
      const listGet = this.handleGetLabel()
      this.handleRomveLabel(listGet)
    }
    
  }