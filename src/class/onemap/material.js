import materialWall from "@/class/onemap/materialWall"
import materialCircle from "@/class/onemap/materialCircle"
import materialLine from "@/class/onemap/materialLine"
export default class OneMapMaterial {

  constructor(){
    // 实例化墙体材质
    new materialWall()
    // // 实例化圆材质
    new materialCircle()
    // // 实例化线型材质
    new materialLine()
  }

 
}