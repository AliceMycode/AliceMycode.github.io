
// 绘制走廊类
export class viewcorridor {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.56795261178631,22.746444581230815], 
        [114.56950041783386,22.747414843831397], 
        [114.57151861396979,22.742108831501454], 
      ]
    },
  ]

  // 数据2
  listTwo = [
    {
      label: '数据1', 
      point: [
        [114.57214077332807,22.749091215382037],
        [114.57457909877337,22.75016017994323],
        [114.57563900316335,22.743226950055817]
      ]
    },
  ]

  // 数据2
  listThree = [
    {
      label: '数据1', 
      point: [
        [114.5772452845444,22.75250440015632],
        [114.57774367285865,22.745690012768744],
        [114.58048124158363,22.74633402003985]
      ]
    },
  ]


  typeName = '走廊类'

  constructor(){

  }

  // 绘制
  handleDrawCorridor(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        corridor: {
          positions: OneMap.Cartesian3.fromDegreesArray(list),
          width: 20.0,
          material: OneMap.Color.RED.withAlpha(0.5),
        },
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据2
    for (let i in this.listTwo) {
      const item = this.listTwo[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        corridor: {
          positions: OneMap.Cartesian3.fromDegreesArray(list),
          height: 100.0,
          width: 20.0,
          cornerType: OneMap.CornerType.MITERED,
          material: OneMap.Color.GREEN,
          outline: true,
        },
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据3
    for (let i in this.listThree) {
      const item = this.listThree[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        corridor: {
          positions: OneMap.Cartesian3.fromDegreesArray(list),
          extrudedHeight: 100.0,
          width: 20.0,
          cornerType: OneMap.CornerType.BEVELED,
          material: OneMap.Color.BLUE.withAlpha(0.5),
          outline: true,
          outlineColor: OneMap.Color.WHITE,
        },
      }

      window.$viewer.entities.add(entitie)
    }
  }

  // 移除
  handleRomveCorridor (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetCorridor () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateCorridor () {
    this.handleDrawCorridor()
  } 

  // 删除
  handleDeleteCorridor () {
    const listGet = this.handleGetCorridor()
    this.handleRomveCorridor(listGet)
  }
  
}