
// 绘制圆柱体类
export class viewcylinder {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.57090458861703, 22.74520384929044 , 0.0], 
      ]
    },
  ]

  // 数据2
  listTwo = [
    {
      label: '数据1', 
      point: [
        [114.57975204165572, 22.743368003623388 , 0.0], 
      ]
    },
  ]

  // 数据3
  listThree = [
    {
      label: '数据1', 
      point: [
        [114.57475280108596, 22.7437254411502 , 0.0], 
      ]
    },
  ]

  // 数据4
  listFour = [
    {
      label: '数据1', 
      point: [
        [114.56763006265092,22.746754783040927, 0.0], 
      ]
    },
  ]

  typeName = '圆柱类'

  constructor(){

  }

  // 绘制
  handleDrawCylinder(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        cylinder : {
          topRadius: 30,
          bottomRadius: 30,
          length: 200,
          material: OneMap.Color.RED,
        }
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据2
    for (let i in this.listTwo) {
      const item = this.listTwo[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        cylinder : {
          topRadius: 30,
          bottomRadius: 50,
          length: 200,
          material : OneMap.Color.BLUE
        }
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据3
    for (let i in this.listThree) {
      const item = this.listThree[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        cylinder : {
          topRadius: 50,
          bottomRadius: 50,
          length: 200,
          material : OneMap.Color.PURPLE,
          outline: true,
          outlineColor: OneMap.Color.RED,
          outlineWidth: 2,
          fill:false,
        }
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据4
    for (let i in this.listFour) {
      const item = this.listFour[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        cylinder : {
          topRadius: 50,
          bottomRadius: 50,
          length: 200,
          material : OneMap.Color.YELLOW,
          slices: 5,
        }
      }

      window.$viewer.entities.add(entitie)
    }
  }

  // 移除
  handleRomveCylinder (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetCylinder () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateCylinder () {
    this.handleDrawCylinder()
  } 

  // 删除
  handleDeleteCylinder () {
    const listGet = this.handleGetCylinder()
    this.handleRomveCylinder(listGet)
  }
  
}