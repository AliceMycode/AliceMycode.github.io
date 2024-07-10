import Vue from "vue";
import markerTemplate from "@/template/markerTemplate";
let WindowVm = Vue.extend(markerTemplate);
class marker {
  constructor(item, props) {
    this.viewer = window.$viewer;
    this.typeName = props.typeName
    this.offset = props?.offSet ? props.offSet : [0, 0]
    this.position = OneMap.Cartesian3.fromDegrees(item.position[0], item.position[1]);
    //根据模板创建一个面板
    this.vmInstance = new WindowVm({ propsData: { item, props } }).$mount();
    this.vmInstance.closeEvent = e => { this.windowClose() }
    //将字符串模板生成的内容添加到DOM上
    this.viewer.cesiumWidget.container.appendChild(this.vmInstance.$el);

    this.addPostRender();
  }

  //添加场景事件
  addPostRender() {
    this.viewer.scene.postRender.addEventListener(this.postRender, this);
  }

  //场景渲染事件 实时更新窗口的位置 使其与笛卡尔坐标一致
  postRender() {

    if (!this.vmInstance.$el || !this.vmInstance.$el.style) return;
    const canvasHeight = this.viewer.scene.canvas.height;
    const windowPosition = new OneMap.Cartesian2();
    OneMap.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, windowPosition)
   
    const elIconElementChildWidth = this.vmInstance.$el.children[1].offsetWidth;
    const elIconElementChildHeight = this.vmInstance.$el.children[1].offsetHeight;
    this.vmInstance.$el.children[1].style.bottom = canvasHeight - windowPosition.y - this.offset[0] + "px";
    this.vmInstance.$el.children[1].style.left = windowPosition.x - elIconElementChildWidth / 2 - this.offset[1] + "px";
    this.vmInstance.$el.children[1].style.display = "block"; 


    const elTitleElementChildWidth = this.vmInstance.$el.children[0].offsetWidth;
    this.vmInstance.$el.children[0].style.bottom = canvasHeight - windowPosition.y + 60+ "px";
    // this.vmInstance.$el.children[0].style.bottom = canvasHeight - windowPosition.y + elIconElementChildHeight - this.offset[0] + "px";
    this.vmInstance.$el.children[0].style.left = windowPosition.x - elTitleElementChildWidth / 2 + this.offset[1] + "px";
    this.vmInstance.$el.children[0].style.display = "block";

  }

  //关闭 
  windowClose() {
    if (this.vmInstance) {
      this.vmInstance.$el.remove();
      this.vmInstance.$destroy();
      // this.vmInstance.$el.style.display = "none"; //删除dom
    }
    //移除事件监听
    this.viewer.scene.postRender.removeEventListener(this.postRender, this); 
  }

}

export class viewmarkercustom {
  constructor() { 
    this.list = {}
  }

  cerate(data, options) {
    this.props = options
    this.list[options.typeName] = data.map(item => {
      return this.cerateMarker(item);
    })
  }


  cerateMarker(item) {
    return new marker(item, this.props)
  }


  remove(params) {
    let fn = (item) => item.windowClose();
    let list = this.screen(params, fn);
  }


  screen(params, fn) {
    if (!params) throw new Error('no params object!');
    let keys = Object.keys(params);
    return this.list[params[keys[0]]].filter((item, index) => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (item[key] != params[key]) {
          // 不符合筛选参数条件
          return true
        } else {
          // 符合筛选参数条件
          if (fn) { fn(item, index) };
          return false;
        }
      }
    })
  }

}

