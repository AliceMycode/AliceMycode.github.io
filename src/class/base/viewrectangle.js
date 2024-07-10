
// 绘制矩形类
export class viewrectangle {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.57090458861703, 22.74520384929044 , 0.0], 
      ]
    }
  ]

  typeName = '矩形类'

  constructor(){

  }

  // 绘制
  handleDrawRectangle(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        rectangle: {
          coordinates: OneMap.Rectangle.fromDegrees( 114.0, 22.0, -245.0, 23.0  ),
          material: OneMap.Color.RED.withAlpha(0.5),
        },
      }

      window.$viewer.entities.add(entitie)
    }
  }

  // 移除
  handleRomveRectangle (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetRectangle () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateRectangle () {
    this.handleDrawRectangle()
  } 

  // 删除
  handleDeleteRectangle () {
    const listGet = this.handleGetRectangle()
    this.handleRomveRectangle(listGet)
  }
  
}