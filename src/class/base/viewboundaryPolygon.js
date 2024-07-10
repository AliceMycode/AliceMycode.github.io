import { BOUNDARY_SHQ } from '@/data/boundary.js'

export default class viewboundaryPolygon {

  constructor() {
    this.typeName = '面类'
  }

  // 加载石化区边界
  handleCreateBoundarySHQ(){
    this.create(BOUNDARY_SHQ)
  }

  // 删除石化区
  handleDeleteBoundarySHQ(){
    this.delete(BOUNDARY_SHQ[0].labelName)
  }

  // 绘制
  create (list) {
    for (let i in list) {
      const item = list[i];
      const position = item.list.flat();

      const entitie = {
        typeName: this.typeName,
        labelName: item.labelName,
        polygon: {
          hierarchy: OneMap.Cartesian3.fromDegreesArray(position),
          extrudedHeight: 100,
          // perPositionHeight: true,
          material: OneMap.Color.fromCssColorString('rgba(1,88,217,0.4)'),
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
  delete (labelName) {
    const overlayListAll = window.$viewer.entities.values;
    const overlayList = overlayListAll.filter(item => { return item.labelName == labelName })
    for (let i in overlayList) {
      const item = overlayList[i]
      window.$viewer.entities.removeById(item._id)
    }
  }

  


}