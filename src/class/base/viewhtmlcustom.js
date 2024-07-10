import {templateHtmlCustom} from "@/template/html"

// 自定义HTML的类 父类
class viewhtmlcustomFather {

  constructor(){

    this.className = ''

    this.windowPosition = new OneMap.Cartesian2();

  }

  // 添加
  handleCreateHtml(element, item) {
    // 获取DOM
    const elementDom = element.get(0)

    // 采用JQ的方法挂在DOM
    $('.cesium-viewer-cesiumWidgetContainer').append(element)

    // 监听DOM位置
    window.$viewer.scene.postRender.addEventListener(() => {
        
      // 计算DOM坐标的位置
      OneMap.SceneTransforms.wgs84ToWindowCoordinates( window.$viewer.scene, OneMap.Cartesian3.fromDegrees(...item.position), this.windowPosition );

      // 计算DOM位置的改变
      elementDom.style.top = this.windowPosition.y - elementDom.offsetHeight - item.offset[1] + "px";
      elementDom.style.left = this.windowPosition.x - elementDom.offsetWidth / 2 - item.offset[0] + "px";

      // 根据高度，计算DOM缩放
      const camerPosition = window.$viewer.camera.position;
      let height = window.$viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
      height += window.$viewer.scene.globe.ellipsoid.maximumRadius;

      if ((!(OneMap.Cartesian3.distance(camerPosition, item.position) > height)) && window.$viewer.camera.positionCartographic.height < 50000) {
        elementDom.style.transform = "scale(1)";
      }

    }, this)
  }

  // 删除
  handleDeleteHtml(){
    $(`.${this.className}`).remove()
  }

} 

// 自定义HTML的类
export class viewhtmlcustom extends viewhtmlcustomFather {

  constructor(){
    
    super()

    this.className = 'html_custom_container';

    this.markerList = [
      { 
        name: '标注1',
        img: require('@/assets/base/marker2.png'),
        offset: [0, 0],
        position: [114.58831880569954,22.747807449386777],
      },
      { 
        name: '标注2',
        img: require('@/assets/base/marker2.png'),
        offset: [0, 0],
        position: [114.57785265392121,22.74339076529445],
      },
    ]

  }

  // 添加
  create() {
    for (let i in this.markerList) {
      const item = this.markerList[i]
      // 获取JQ的DOM
      const element = templateHtmlCustom(this.className, item.name, item.img)
      // 调用父类绘制HTML方法
      this.handleCreateHtml(element, item)
    }
  }

  // 删除
  delete(){
    // 调用父类删除HTML方法
   this.handleDeleteHtml()
  }

}
