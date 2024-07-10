import {templateHtmlCar} from "@/template/html"

// 绘制html类
export class viewhtml {

  // 数据1
  listOne = [
    {
      label: '数据1', 
      point: [
        [114.57073824353962, 22.745250142701078,6], 
      ],
    },
    {
      label: '数据2', 
      point: [ 
        [114.57741574470803, 22.745182218097895,6], 
      ],
    },
    {
      label: '数据3', 
      point: [
        [114.57840275723755, 22.740643262819415,6], 
      ],
    },
    {
      label: '数据4', 
      point: [
        [114.58149603392712, 22.742969591305894,6], 
      ],
    }
  ]
  typeName = 'html类'
  className = 'html_container'

  constructor(){

  }

  // 绘制
  handleDrawHtml(){
    // 数据1
    for (let i in this.listOne) {
      const item = this.listOne[i];
      const point = item.point[0];

      const elementDom = templateHtmlCar(this.className, i, item.label, this.handleSelectHtmlOne, this.handleSelectHtmlTwo)
      const element = elementDom.get(0)
      $('#app').append(elementDom)

      const htmlMarker = new OneMap.HtmlMarker({
        id: this.typeName,
        scene: window.$scene,
        element: element,
        pixelOffset: new OneMap.Cartesian2(41, 66),
        position: OneMap.Cartesian3.fromDegrees(...point)
      })
      htmlMarker.show = true

      window.$scene.primitives.add(htmlMarker)
    }
  }


  // 添加
  handleCreateHtml () {
    this.handleDrawHtml()
  } 

  //删除
  handleDeleteHtml(){
    //JQ写法
    // $(`.${this.className}`).remove()
    const listGet = this.handleGetHtml()
    this.handleRomveHtml(listGet)
  }
  // 获取
  handleGetHtml () {
    const overlayListAll =  window.$scene.primitives._primitives;
    const overlayList = overlayListAll.filter(item => { return item.id && item.id == this.typeName })
    return overlayList
  }
  handleRomveHtml(list){
    for(let i in list){
      const item = list[i]
      $(`.${this.className}`).remove()
      item.show = false
      window.$scene.primitives.remove(item)
    }
  }
  // 事件1
  handleSelectHtmlOne (index) {
    console.log('事件1',index)
  }

  // 事件2
  handleSelectHtmlTwo (index) {
    console.log('事件2',index)
  }
  
}



