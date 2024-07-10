//沿线运动父类
export default class effectLineMotion{

    //数据1
    listOne = [
      [114.53961534171557,22.743735175177033, 35],
      [114.55634094183759,22.745303274328155, 35],
      [114.57092625842952,22.743840327204392, 35],
      [114.58221677906327,22.74468758702936, 35],
      [114.59844534641104,22.750846606443105, 35],
      [114.61165769479702,22.756235287317892, 35],
      [114.61951119923307,22.759034380861856, 35],
      [114.62615785609681,22.761833749143715, 35],
      [114.63318330433846,22.76435306664515, 35],
      [114.63749035913858,22.769139634636453, 35],
      [114.6431154543098,22.77759448179336, 35],
      [114.64620096559862,22.7815488699097, 35]
    ]
  
    typeName = '沿线运动'
 
    startTime = OneMap.JulianDate.fromDate(new Date())
  
    constructor(){
     
    }
  
    // 绘制
    handleDrawLineMotion(){
      const viewer = window.$viewer;
      //设置飞行的时间到viewer的时钟里

      //起始时间
      var start = this.startTime
      //结束时间
      var stop = OneMap.JulianDate.addSeconds(start, this.listOne.length - 1, new OneMap.JulianDate());
  
      //设置时钟开始时间
      viewer.clock.startTime = start.clone();
      //设置始终停止时间
      viewer.clock.stopTime = stop.clone();
      //设置时钟当前时间
      viewer.clock.currentTime = start.clone();
      //循环执行到达终止时间，重新从起点时间开始
      viewer.clock.clockRange = OneMap.ClockRange.LOOP_STOP;  
      //true为开始运动，false暂停运动
      viewer.clock.shouldAnimate = true;                      
      //时间速率，数字越大时间过的越快
      viewer.clock.multiplier = 1;
  
      //添加模型
      const entitie = {
        typeName: this.typeName,
        //和时间轴关联
        availability : new OneMap.TimeIntervalCollection([new OneMap.TimeInterval({ start : start, stop : stop })]),
        position : this.computeFlight(this.listOne,start),
        //根据所提供的速度计算模型的朝向
        orientation : new OneMap.VelocityOrientationProperty(this.computeFlight(this.listOne,start)),
        //模型数据
        model : {
          uri : './Model/Cesium_Air.glb',
          minimumPixelSize : 64
        },
        //路线
        path : {
          resolution : 1,
          material : OneMap.Color.YELLOW,
          width : 10
        },
      }
      viewer.entities.add(entitie);
      viewer.camera.flyTo({ destination : OneMap.Cartesian3.fromDegrees(114.57073824353962, 22.745250142701078, 20000) });
    }
  
    // 移除
    handleRemoveLineMotion(list){
      for (let i in list) {
        const item = list[i]
        window.$viewer.entities.removeById(item._id)
      }
    }
  
    // 获取
    handleGetLineMotion(){
      const overlayListAll = window.$viewer.entities.values;
      const overlayList = overlayListAll.filter(item => { return item._typeName == this.typeName })
      return overlayList
    }
  
    // 添加
    handleCreateLineMotion(){
      this.handleDrawLineMotion()
    }
  
    // 删除
    handleDeleteLineMotion(){
      const listGet = this.handleGetLineMotion()
      this.handleRemoveLineMotion(listGet)
    }

    //利用Cesium的 SampledPositionProperty来动态控制模型的位置，达到模型沿轨迹平滑移动的目的
    computeFlight(data,start) {
        // 取样位置 相当于一个集合
        let property = new OneMap.SampledPositionProperty();
        for(let i = 0; i < data.length; i++){
            let time = OneMap.JulianDate.addSeconds(start, i, new OneMap.JulianDate());
            let position = OneMap.Cartesian3.fromDegrees(...data[i]);
            // 添加位置，和时间对应
            property.addSample(time, position);
        }
        return property;
    }
  
  }