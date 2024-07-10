import gcoord from 'gcoord';
// 绘制线类
export class viewline {

  // 数据1
  listOne = [
    { label: '数据1', 
      point: [
        // [114.6269062807418, 22.766864856759188],
        // [114.62772427838021, 22.765054903882014],
        // [114.62896913912552, 22.76554116536344],
        // [114.62815399691783, 22.76735650869563]
        gcoord.transform([114.6269062807418, 22.766864856759188], gcoord.WGS84, gcoord.BD09),
        gcoord.transform([114.62772427838021, 22.765054903882014], gcoord.WGS84, gcoord.BD09),
        gcoord.transform([114.62896913912552, 22.76554116536344], gcoord.WGS84, gcoord.BD09),
        gcoord.transform([114.62815399691783, 22.76735650869563], gcoord.WGS84, gcoord.BD09),
      ]
    }
  ]

  // 数据2
  listTwo = [
    {
      label: '数据2', 
      point: [
        [114.57094122905349, 22.74528030903257], 
        [114.57140307698566, 22.745243192566225]
      ]
    }
  ]

  // 数据3
  listThree = [
    {
      label: '数据3', 
      point: [
        [114.57089656424462, 22.745146885929874, 5], 
        [114.57102285545973, 22.74512281179907, 10], 
        [114.57104180231651, 22.745073463438533, 5]
      ]
    }
  ]

  // 数据4
  listFour = [
    {
      label: '数据4', 
      point: [
        [114.57142255956431, 22.745211993398918, 5], 
        [114.57160582746947, 22.745106531063513, 5]
      ]
    }
  ]

  // 数据5
  listFive = [
    {
      label: '数据5', 
      point: [
        [114.57136690454281, 22.744979792237945, 5], 
        [114.57164363183861, 22.744979776660898, 5]
      ]
    }
  ]

  // 数据6
  listSix = [
    {
      label: '数据6', 
      point: [
        [114.57278561527154,22.743737081304754,0], 
        [114.58227648635162,22.744456306714746,0]
      ]
    }
  ]

  // 数据7
  listSeven = [
    {
      label: '数据7', 
      point: [
        [114.5860850194232,22.745950261156477,0], 
        [114.59801110765541,22.750792099787297,0]
      ]
    }
  ]

  // 数据8
  listEight = [
    {
      label: '数据8', 
      point: [
        [114.58602868716552,22.738543438108724,0], 
        [114.58602868716552,22.738543438108724,1000]
      ]
    }
  ]

  typeName = '线类'

  constructor(){

  }

  // 绘制
  handleDrawLine(){
    console.log(gcoord)
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const linelist =  item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArray(linelist),
          //线宽为5
          width : 5,
          //线材质为红色
          material : OneMap.Color.RED,
          // 是否贴地
          clampToGround : false
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据2
    for(let i in this.listTwo) {
      const item = this.listTwo[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArray(linelist),
          width : 10,
          //使用发光材质
          material : new OneMap.PolylineGlowMaterialProperty({
            //发光强度
            glowPower : 0.2,
            //发光颜色
            color : OneMap.Color.BLUE
          })
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据3
    for(let i in this.listThree) {
      const item = this.listThree[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          material : new OneMap.PolylineOutlineMaterialProperty({
            color : OneMap.Color.ORANGE,
            outlineWidth : 2,
            outlineColor : OneMap.Color.BLACK
          })
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据4
    for(let i in this.listFour) {
      const item = this.listFour[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          followSurface : false,
          material : new OneMap.PolylineArrowMaterialProperty(OneMap.Color.PURPLE)
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据5
    for(let i in this.listFive) {
      const item = this.listFive[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          material : new OneMap.PolylineDashMaterialProperty({
            color: OneMap.Color.CYAN
          })
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据6
    for(let i in this.listSix) {
      const item = this.listSix[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          material : new OneMap.Spriteline1MaterialProperty(1000, require('@/assets/material/walldynamic.png'))
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据7
    for(let i in this.listSeven) {
      const item = this.listSeven[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          material : new OneMap.LineFlickerMaterialProperty({
            color: OneMap.Color.YELLOW,
            speed: 20 * Math.random(),
          })
        }
      }

      window.$viewer.entities.add(line)
    }

    // 数据8
    for(let i in this.listEight) {
      const item = this.listEight[i];
      const linelist = item.point.flat();
      const line = {
        typeName: this.typeName,
        polyline : {
          positions : OneMap.Cartesian3.fromDegreesArrayHeights(linelist),
          width : 5,
          material: new OneMap.LineFlowMaterialProperty({
            color: new OneMap.Color(1.0, 1.0, 0.0, 0.8),
            speed: 15 * Math.random(),
            percent: 0.1,
            gradient: 0.01
        })
        }
      }

      window.$viewer.entities.add(line)
    }


  }

  // 移除
  handleRomveLine (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetLine () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateLine () {
    this.handleDrawLine()
  } 

  // 删除
  handleDeleteLine () {
    const listGet = this.handleGetLine()
    this.handleRomveLine(listGet)
  }
  
}