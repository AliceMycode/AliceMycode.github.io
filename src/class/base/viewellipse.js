
// 绘制椭圆体类
export class viewellipse {

  // 数据1
  listOne = [
    [114.57090458861703, 22.74520384929044 , 0.0],
  ]
  // 数据2
  listTwo = [
    [114.56579089687042,22.745290126988657, 0.0], 
  ]
  // 数据3
  listThree = [
    [114.57514272272061,22.74466798244991, 2.0], 
  ]

  // 数据4
  listFour = [
    [114.5716448105361,22.75185253178573, 2.0], 
  ]

  // 数据5
  listFive = [
    [114.56680303088838,22.751957779003448, 2.0], 
  ]

  // 数据6
  listSix = [
    [114.57653491740628,22.75192700410013, 2.0],
  ]

  // 数据7
  listSeven = [
    [114.57566201184547,22.748224810646125, 2.0],
  ]

  // 数据8
  listEight = [
    [ 114.57145442699681,22.74882937204766,0],
  ]

  // 数据9
  listnine = [
    [ 114.566939576953,22.748758609323385,0],
  ]

  // 数据10
  listTen = [
    [ 114.5792860596923,22.75133841626755,0],
  ]

  // 数据11
  listEleven = [
    [114.57879673017554,22.748071257507288,0]
  ]

  // 数据12
  listTwelve = [
    [114.58156363445033,22.751207765318,0]
  ]
  
  // 数据13
  listThirteen= [
    [114.58105562204999,22.747774130819757,0]
  ]

  typeName = '椭圆类'

  constructor(){ }

  // 绘制
  handleDrawEllipse(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100,
          semiMinorAxis: 50,
          material: OneMap.Color.RED.withAlpha(0.5),
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 立体圆柱（填充）
    for(let i in this.listTwo) {
      const item = this.listTwo[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100,
          semiMinorAxis: 50,
          material: OneMap.Color.YELLOW,
          extrudedHeight: 50
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 立体圆柱（空心）
    for(let i in this.listThree) {
      const item = this.listThree[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100,
          semiMinorAxis: 50,
          material: OneMap.Color.YELLOW,
          extrudedHeight: 50,
          outline: true,
          outlineColor: OneMap.Color.PURPLE,
          outlineWidth: 5,
          fill:false,
          numberOfVerticalLines: 5
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 扫描圆
    for(let i in this.listFour) {
      const item = this.listFour[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CircleScanMaterialProperty({
            color: new OneMap.Color(1.0, 1.0, 0.0, 0.7),
            speed: 20.0
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }

     // 波纹圆
     for(let i in this.listFive) {
      const item = this.listFive[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CircleRippleMaterialProperty({
            color: new OneMap.Color(1, 1, 0, 0.7),
            speed: 12.0,
            count: 4,
            gradient: 0.2
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }
   
    // 扩散圆
    for(let i in this.listSix) {
      const item = this.listSix[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CircleDiffuseMaterialProperty({
            color: new OneMap.Color(1, 1, 0, 0.7),
            speed: 12.0,
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 雷达扫描圆
    for(let i in this.listSeven) {
      const item = this.listSeven[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.RadarScanMaterialProperty({
            color: new OneMap.Color(1.0, 1.0, 0.0, 0.7),
            speed: 20.0,
          }),
          height: 20.0,
          heightReference: OneMap.HeightReference.RELATIVE_TO_GROUND,
          outline: true,
          outlineColor: new OneMap.Color(1.0, 1.0, 0.0, 1.0)
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 雷达线扫描
    for(let i in this.listEight) {
      const item = this.listEight[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.RadarLineMaterialProperty({
            color: new OneMap.Color(1.0, 1.0, 0.0, 0.7),
            speed: 20.0
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 波纹雷达扫描
    for(let i in this.listnine) {
      const item = this.listnine[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.RadarWaveMaterialProperty({
            color: new OneMap.Color(1.0, 1.0, 0.0, 0.7),
            speed: 20.0
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 消影圆
    for(let i in this.listTen) {
      const item = this.listTen[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CircleFadeMaterialProperty({
            color: new OneMap.Color(1, 1, 0, 0.7),
            speed: 12.0,
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }

    // 脉冲圆
    for(let i in this.listEleven) {
      const item = this.listEleven[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CirclePulseMaterialProperty({
            color: new OneMap.Color(1, 1, 0, 0.7),
            speed: 12.0,
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }


      // 模糊圆
      for(let i in this.listTwelve) {
        const item = this.listTwelve[i];
        const entitie = {
          typeName: this.typeName,
          position: OneMap.Cartesian3.fromDegrees(...item),
          ellipse : {
            semiMajorAxis: 100.0,
            semiMinorAxis: 100.0,
            material: new OneMap.CircleBlurMaterialProperty({
              color: new OneMap.Color(1, 1, 0, 0.7),
              speed: 12.0,
            })
          }
        }
        window.$viewer.entities.add(entitie)
      }


      // 螺旋圆
    for(let i in this.listThirteen) {
      const item = this.listThirteen[i];
      const entitie = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(...item),
        ellipse : {
          semiMajorAxis: 100.0,
          semiMinorAxis: 100.0,
          material: new OneMap.CircleSpiralMaterialProperty({
            color: new OneMap.Color(1, 1, 0, 0.7),
            speed: 12.0,
          })
        }
      }
      window.$viewer.entities.add(entitie)
    }


  }

  // 移除
  handleRomveEllipse (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetEllipse () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreateEllipse () {
    this.handleDrawEllipse()
  } 

  // 删除
  handleDeleteEllipse () {
    const listGet = this.handleGetEllipse()
    this.handleRomveEllipse(listGet)
  }
  
}