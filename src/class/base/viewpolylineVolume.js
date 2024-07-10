
// 绘制折线体类
export class viewpolylineVolume {

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
        [114.57214077332807,22.749091215382037, 10],
        [114.57457909877337,22.75016017994323, 10],
        [114.57563900316335,22.743226950055817, 10],
        [114.57351102482797,22.742931124583098, 10],
      ]
    },
  ]

  // 数据2
  listThree = [
    {
      label: '数据1', 
      point: [
        [114.5772452845444,22.75250440015632, 10],
        [114.57774367285865,22.745690012768744, 10],
        [114.58048124158363,22.74633402003985, 10]
      ]
    },
  ]


  typeName = '折线体类'

  constructor(){

  }

  // 绘制
  handleDrawPolylineVolume (){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const list = item.point.flat();
      const entitie = {
        typeName: this.typeName,
        polylineVolume: {
          positions: OneMap.Cartesian3.fromDegreesArray(list),
          shape: this.computeCircle(60.0),
          material: OneMap.Color.RED,
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
        polylineVolume: {
          positions: OneMap.Cartesian3.fromDegreesArrayHeights(list),
          shape: this.computeStar(7, 70, 50),
          cornerType: OneMap.CornerType.MITERED,
          material: OneMap.Color.BLUE,
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
        polylineVolume: {
          positions: OneMap.Cartesian3.fromDegreesArrayHeights(list),
          shape: [
            new OneMap.Cartesian2(-5, -5),
            new OneMap.Cartesian2(5, -5),
            new OneMap.Cartesian2(5, 5),
            new OneMap.Cartesian2(-5, 5),
          ],
          cornerType: OneMap.CornerType.BEVELED,
          material: OneMap.Color.GREEN.withAlpha(0.5),
          outline: true,
          outlineColor: OneMap.Color.BLACK,
        },
      }

      window.$viewer.entities.add(entitie)
    }
  }

  //计算园
  computeCircle(radius) {
    const positions = [];
    for (let i = 0; i < 360; i++) {
      const radians = OneMap.Math.toRadians(i);
      positions.push(
        new OneMap.Cartesian2(
          radius * Math.cos(radians),
          radius * Math.sin(radians)
        )
      );
    }
    return positions;
  }

  // 计算
  computeStar(arms, rOuter, rInner) {
    const angle = Math.PI / arms;
    const length = 2 * arms;
    const positions = new Array(length);
    for (let i = 0; i < length; i++) {
      const r = i % 2 === 0 ? rOuter : rInner;
      positions[i] = new OneMap.Cartesian2(
        Math.cos(i * angle) * r,
        Math.sin(i * angle) * r
      );
    }
    return positions;
  }

  // 移除
  handleRomvePolylineVolume (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetPolylineVolume () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreatePolylineVolume () {
    this.handleDrawPolylineVolume()
  } 

  // 删除
  handleDeletePolylineVolume () {
    const listGet = this.handleGetPolylineVolume()
    this.handleRomvePolylineVolume(listGet)
  }
  
}