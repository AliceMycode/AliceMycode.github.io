/**
 * @descripion:
 * @param {Viewer} viewer
 * @param {Cartesian2} position
 * @param {String} title
 * @param {String} id
 * @return {*}
 */

import Vue from "vue";
import bubbleTemplate from "@/template/bubbleTemplate";
let WindowVm = Vue.extend(bubbleTemplate);
export default class viewbubble {
  constructor( item ,props) {
    this.viewer = window.$viewer;
    this.offset = props.offSet ? props.offSet : [230, 120]
    this.position = OneMap.Cartesian3.fromDegrees(item.position[0], item.position[1]);
    //根据模板创建一个面板
    this.vmInstance = new WindowVm({propsData: {item}}).$mount(); 
    this.vmInstance.closeEvent = e => {this.windowClose()}
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
    OneMap.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene,this.position,windowPosition)
    
    this.vmInstance.$el.style.bottom = canvasHeight - windowPosition.y + this.offset[0] + "px";
    const elWidth = this.vmInstance.$el.offsetWidth;
    this.vmInstance.$el.style.left = windowPosition.x - elWidth / 2 + this.offset[1] + "px";


  }
  //关闭 
  windowClose() {
    if (this.vmInstance) {
      this.vmInstance.$el.remove();
      this.vmInstance.$destroy();
    }
    //this.vmInstance.$el.style.display = "none"; //删除dom
    this.viewer.scene.postRender.removeEventListener(this.postRender, this); //移除事件监听
  }
}
