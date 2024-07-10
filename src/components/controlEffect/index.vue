<template>
  <div class="controlEffect" v-drag>
    <div class="controlEffect_title">特效能力<i :class="active ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'" @click="handleSelectActive"></i></div>
    <div class="controlEffect_cellbox" v-show="active">
      <div v-for="(item,index) in list" :key="index" @click="handleSelectLayer(item)" :class="{'controlEffect_cell':true,'controlEffect_cell_active':item.show}">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { ONEMAP_EFFECT } from "@/config/onemapEffect"
//报警雷达
import effectAlarmSpread from '@/class/effect/effectAlarmSpread'
//沿线运动
import effectLineMotionDom from '@/class/effect/effectLineMotionDom'
//拖拽圆
import effectDragCircle from '@/class/effect/effectDragCircle'
//拖拽圆墙
import effectDragCircleWall from '@/class/effect/effectDragCircleWall'


export default {
  data(){
    return {
      list:ONEMAP_EFFECT,
      active: false,
      effectAlarmSpread:new effectAlarmSpread(),
      effectLineMotionDom:new effectLineMotionDom(),
      effectDragCircle:new effectDragCircle(),
      effectDragCircleWall:new effectDragCircleWall()
    }
  },
  mounted(){
    
  },
  methods:{
    handleSelectLayer(item){
      item.show = !item.show
      if(item.type == 'alarmSpread'){this.handleSelectAlarmSpread(item)}
      if(item.type == 'lineMotion'){this.handleSelectLineMotion(item)}
      if(item.type == 'dragCircle'){this.handleSelectDragCircle(item)}
      if(item.type == 'dragCircleWall') {this.handleSelectDragCircleWall(item)}
    },
    //控制下拉显隐
    handleSelectActive(){
      this.active = !this.active
    },
    //报警雷达
    handleSelectAlarmSpread(item){
      if(item.show){
        this.effectAlarmSpread.handleCreateAlarmSpread()
      }else{
        this.effectAlarmSpread.handleDeleteAlarmSpread()
      }
    },
    //沿线运动
    handleSelectLineMotion(item){
      if(item.show){
        this.effectLineMotionDom.handleCreateLineMotionDom()
      }else{
        this.effectLineMotionDom.handleDeleteLineMotionDom()
      }
    },
    //拖拽圆
    handleSelectDragCircle(item){
      if(item.show){
        this.effectDragCircle.handleCreateDragCircle()
      }else{
        this.effectDragCircle.handleDeleteDragCircle()
      }
    },
    //拖拽圆墙
    handleSelectDragCircleWall(item){
      if(item.show){
        this.effectDragCircleWall.handleCreateDragCircleWall()
      }else{
        this.effectDragCircleWall.handleDeleteDragCircleWall()
      }
    }
   
  }
}
</script>

<style lang="less" scoped>
.controlEffect {
  position: fixed;
  top: 30px;
  right: 830px;
  width: 180px;
  background-color: #042d52;
  border: 1px solid #248aca;
  border-radius: 5px;
  overflow: hidden;
  cursor: move;
  .controlEffect_title {
    height: 30px;
    font-size: 14px;
    background: rgba(19, 75, 121, 1);
    color: #bddff2;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i{
        font-size: 18px;
        cursor: pointer;
    }

  }
  .controlEffect_cellbox {
    .controlEffect_cell {
      margin: 5px 5px;
      padding: 0 5px;
      color: #bddff2;
      height: 30px;
      background: rgba(5,111,177,.3);
      border: 1px solid rgba(89,144,186,.64);
      display: flex;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
    }
    .controlEffect_cell_active{
        background: #248aca;
      }   
  }


}


</style>