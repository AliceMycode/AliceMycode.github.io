export default class shadowAnalysis {
  constructor() {
    this.viewer = window.$viewer
    this.inter = null
  }
  lightingShadowInit() {
    this.viewer.scene.globe.enableLighting = true;
    this.viewer.shadows = true;
    this.viewer.terrainShadows = OneMap.ShadowMode.RECEIVE_ONLY
    //阴影透明度--越大越透明
    this.viewer.shadowMap.darkness = 0.7 
    let time = 0
    this.inter = setInterval(() => {
      // 改变时间设置光照效果
      let date = new Date().getTime() + time
      let utc = OneMap.JulianDate.fromDate(new Date(date))
      //北京时间
      this.viewer.clockViewModel.currentTime = OneMap.JulianDate.addHours(utc, 0, new OneMap.JulianDate())
      time = time + 1000 * 600
    }, 100)
  }
  clearOpenLight() {
    this.viewer.scene.globe.enableLighting = false
    this.viewer.shadows = false
    this.viewer.terrainShadows = OneMap.ShadowMode.DISABLED
    if (this.inter) {
      clearInterval(this.inter)
      this.inter = null
    }
  }

}

