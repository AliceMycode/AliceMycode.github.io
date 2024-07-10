import effectLineMotion from '@/class/effect/effectLineMotion'


//沿线运动子类
export default class effectLineMotionDom extends effectLineMotion {

  constructor () {
    //必须先调用父类构造方法否则会报错
    //super() 方法引用父类的构造方法。
    //通过在构造方法中调用 super() 方法，我们就调用了父类的构造方法，这样就可以访问父类的属性和方法
    super()

    this.app = document.getElementById('app')

  }

  // 创建DOM
  handleCreateLineMotionDom () {
    this.Btn = document.createElement('div')
    this.Btn.setAttribute('class', 'btn_container')

    this.btn1 = document.createElement('div')
    this.btn1.innerHTML = '创建运动'
    this.btn1.setAttribute('class', 'btn')
    this.btn1.onclick = () => this.handleCreateMotion()
    this.Btn.appendChild(this.btn1)

    this.btn2 = document.createElement('div')
    this.btn2.innerHTML = '清除运动'
    this.btn2.setAttribute('class', 'btn')
    this.btn2.onclick = () => this.handleClearMotion()
    this.Btn.appendChild(this.btn2)

    this.btn3 = document.createElement('div')
    this.btn3.innerHTML = '开始运动'
    this.btn3.setAttribute('class', 'btn')
    this.btn3.onclick = () => this.handleStartMotion()
    this.Btn.appendChild(this.btn3)

    this.btn4 = document.createElement('div')
    this.btn4.innerHTML = '暂停运动'
    this.btn4.setAttribute('class', 'btn')
    this.btn4.onclick = () => this.handleStopMotion()
    this.Btn.appendChild(this.btn4)
    
    this.btn5 = document.createElement('div')
    this.btn5.innerHTML = '重置运动'
    this.btn5.setAttribute('class', 'btn')
    this.btn5.onclick = () => this.handleResetMotion()
    this.Btn.appendChild(this.btn5)

    this.btn6 = document.createElement('div')
    this.btn6.innerHTML = '移动运动'
    this.btn6.setAttribute('class', 'btn')
    this.btn6.onclick = () => this.handleMoveMotion()
    this.Btn.appendChild(this.btn6)

    this.app.appendChild(this.Btn)

    this.handleCreateMotion()
  }

  // 删除DOM
  handleDeleteLineMotionDom () {
    this.app.removeChild(this.Btn)
    this.handleClearMotion()
  }
  
  // 创建运动
  handleCreateMotion(){
    this.handleCreateLineMotion()
  }

  // 清除运动
  handleClearMotion(){
    this.handleDeleteLineMotion()
  }

  // 开始运动
  handleStartMotion () {
    window.$viewer.clock.shouldAnimate = true
  }

  // 暂停运动
  handleStopMotion () {
    window.$viewer.clock.shouldAnimate = false
  }

  // 重置运动
  handleResetMotion(){
    window.$viewer.clock.currentTime = this.startTime
  }

  // 移动运动
  handleMoveMotion(){
    const moveTime =  OneMap.JulianDate.addSeconds(this.startTime, 8, new OneMap.JulianDate())
    window.$viewer.clock.currentTime = moveTime
  }

}