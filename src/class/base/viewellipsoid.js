
// 绘制椭球体类
export class viewellipsoid {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.57090458861703, 22.74520384929044 , 0.0], 
      ]
    }
  ]
  // 数据2
  listTwo = [
    {
      label: '数据1', 
      point: [
        [114.56579089687042,22.745290126988657, 0.0], 
      ]
    }
  ]
  // 数据3
  listThree = [
    {
      label: '数据1', 
      point: [
        [114.57514272272061,22.74466798244991, 2.0], 
      ]
    }
  ]

  typeName = '椭圆类'

  constructor(){

  }

  // 绘制
  handleDrawEllipsoid(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        ellipsoid: {
          radii: new OneMap.Cartesian3(200.0, 100.0, 100.0),
          material: OneMap.Color.BLUE,
        },
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据2
    for(let i in this.listTwo) {
      const item = this.listTwo[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        ellipsoid: {
          radii: new OneMap.Cartesian3(100.0, 100.0, 100.0),
          material: OneMap.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: OneMap.Color.BLACK,
        },
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据3
    for(let i in this.listThree) {
      const item = this.listThree[i];
      const list = item.point[0];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...list),
        ellipsoid : {
          radii: new OneMap.Cartesian3(100.0, 100.0, 200.0),
          fill: false,
          outline: true,
          outlineColor: OneMap.Color.YELLOW,
          slicePartitions: 24,
          stackPartitions: 36,
        }
      }

      window.$viewer.entities.add(entitie)
    }
  }

  // 移除
  handleRomveEllipsoid (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetEllipsoid () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateEllipsoid () {
    this.handleDrawEllipsoid()
  } 

  // 删除
  handleDeleteEllipsoid () {
    const listGet = this.handleGetEllipsoid()
    this.handleRomveEllipsoid(listGet)
  }
  
}