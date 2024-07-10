//报警雷达类
export default class effectAlarmSpread{

    // 数据1
    listOne = [
      {
        label: '数据1', 
        point: [
          [114.57073824353962, 22.745250142701078, 35], 
        ]
      },
      {
        label: '数据2', 
        point: [ 
          [114.57741574470803, 22.745182218097895, 35], 
        ]
      },
      {
        label: '数据3', 
        point: [
          [114.57840275723755, 22.740643262819415, 35], 
        ]
      },
      {
        label: '数据4', 
        point: [
          [114.58149603392712, 22.742969591305894,35], 
        ]
      }
    ]
  
    typeName = '报警雷达'
  
    constructor(){
        
    }
  
    // 绘制
    handleDrawAlarmSpread(){
      // 数据1
      for (let i in this.listOne) {
        const item = this.listOne[i];
        const point = item.point[0];
        
        const cartesian3 = new OneMap.Cartesian3.fromDegrees(...point)
        const alarm = new OneMap.AlarmParticleAnimation(cartesian3,{
          size: new OneMap.Cartesian2(10, 10),
          startColor: OneMap.Color.WHITE.withAlpha(1.0),
          endColor: OneMap.Color.WHITE.withAlpha(0.0),
          innerRadius: 1,
          outerRadius: 8,
        });
        alarm.typeName = this.typeName
        alarm.show = true;
        window.$scene.primitives.add( alarm );
      }
    }
  
    // 移除
    handleRemoveAlarmSpread(list){
      for (let i in list) {
        const item = list[i]
        item.show = false
        window.$scene.primitives.remove(item)
      }
    }
  
    // 获取
    handleGetAlarmSpread(){
      const overlayListAll =  window.$scene.primitives._primitives;
      const overlayList = overlayListAll.filter(item => { return item.typeName && item.typeName == this.typeName })
      return overlayList
    }
  
    // 添加
    handleCreateAlarmSpread(){
      this.handleDrawAlarmSpread()
    }
  
    // 删除
    handleDeleteAlarmSpread(){
      const listGet = this.handleGetAlarmSpread()
      this.handleRemoveAlarmSpread(listGet)
    }
  
}