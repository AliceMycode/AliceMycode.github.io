// 绘制点类
export class viewpoint {

  listOne = [
    {color: OneMap.Color.SKYBLUE, outlineColor: OneMap.Color.YELLOW, x: '114.57095548953777', y: '22.745400735000274', z: 0, size: 3, outlineWidth: 3},
    {color: OneMap.Color.GREEN, outlineColor: OneMap.Color.YELLOW, x: '114.57068211722952', y: '22.746604574572174', z: 5, size: 5, outlineWidth: 3},
    {color: OneMap.Color.RED, outlineColor: OneMap.Color.YELLOW, x: '114.57079488072907', y: '22.745733943772354', z: 10, size: 8, outlineWidth: 3},
    {color: OneMap.Color.BLACK, outlineColor: OneMap.Color.YELLOW, x: '114.57098196556824', y: '22.74567506934497', z: 3, size: 10, outlineWidth: 3}
  ]
  typeName = '点类'

  constructor(){

  }

  // 绘制
  handleDrawPoint(){
    for (let i in this.listOne) {
      const item = this.listOne[i]
      const point = {
        typeName: this.typeName,
        position: OneMap.Cartesian3.fromDegrees(item.x, item.y, item.z),
        point: {
          // 点位大小
          pixelSize: item.size,
          //点位颜色
          color: item.color,
          // 边的颜色
          outlineColor: item.outlineColor,
          // 边的宽度
          outlineWidth: item.outlineWidth,
          disableDepthTestDistance:50000
        }
      }

      window.$viewer.entities.add(point)
    }
  }

  // 移除
  handleRomvePoint (list) {
    for (let i in list) {
      const item = list[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  // 获取
  handleGetPoint () {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
    return overlayList
  }

  // 添加
  handleCreatePoint () {
    this.handleDrawPoint()
  } 

  // 删除
  handleDeletePoint(){
    const listGet = this.handleGetPoint()
    this.handleRomvePoint(listGet)
  }
  
}