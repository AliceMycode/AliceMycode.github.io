import gcoord from 'gcoord';

// 绘制面类
export class viewpolygon {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.612562,22.758365],
        [114.619209,22.756032],
        [114.613029,22.752499]
      ]
    }
  ]
  // 数据2
  listTwo = [
    {
      label: '数据1', 
      point: [
        [114.601171,22.758232], 
        [114.604046,22.759365],
        [114.605052,22.756865],
        [114.603974,22.756199],
        [114.603974,22.756199],
        [114.602824,22.754666]
      ]
    }
  ]
  // 数据3
  listThree = [
    {
      label: '数据1', 
      point: [
        gcoord.transform([114.605465,22.7474], gcoord.BD09, gcoord.WGS84),
        gcoord.transform([114.608807,22.747333], gcoord.BD09, gcoord.WGS84),
        gcoord.transform([114.608771,22.745467], gcoord.BD09, gcoord.WGS84),
        gcoord.transform([114.605447,22.74545],gcoord.BD09, gcoord.WGS84),
      ]
    }
  ]

  typeName = '面类'

  constructor(){

  }

  // 绘制
  handleDrawPolygon(){

    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        polygon: {
          hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
          material: OneMap.Color.fromCssColorString('#2773DE').withAlpha(0.4),
          extrudedHeight: 1,
          closeTop: true,
          closeBottom: false,
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 数据2
    for(let i in this.listTwo) {
      const item = this.listTwo[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        polygon : {
          hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
          material: OneMap.Color.fromCssColorString('#009a00').withAlpha(0.4),
          extrudedHeight: 10,
          outline:true,
          outlineColor:'white',
          closeTop : true,
          closeBottom : false
        }
      }

      window.$viewer.entities.add(entitie)
    }

    // 数据3
    for(let i in this.listThree) {
      const item = this.listThree[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        polygon : {
          hierarchy: OneMap.Cartesian3.fromDegreesArray(list),
          material: OneMap.Color.fromCssColorString('rgba(1,88,217,0.4)'),
          extrudedHeight: 10,
          outline: true,
          outlineColor: OneMap.Color.fromCssColorString('rgba(26,192,250,1)'),
          closeTop : false,
          closeBottom : false
        }
      }

      window.$viewer.entities.add(entitie)
    }
  }

  // 移除
  handleRomvePolygon (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetPolygon () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreatePolygon () {
    this.handleDrawPolygon()
  } 

  // 删除
  handleDeletePolygon () {
    const listGet = this.handleGetPolygon()
    this.handleRomvePolygon(listGet)
  }
  
}