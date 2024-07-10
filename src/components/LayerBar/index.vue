<template>
  <div class="layerBar" v-drag>
    <div class="layerBar_title">图层管理<i :class="active ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'" @click="handleSelectActive"></i></div>
    <div class="layerBar_cellbox" v-show="active">
      <div v-for="(item,index) in list" :key="index" @click="handleSelectLayer(item)" :class="{'layerBar_cell':true,'layerBar_cell_active':item.show}">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { ONEMAP_LAYER } from "@/config/onemapLayer"
export default {
  data(){
    return {
      list:ONEMAP_LAYER,
      active: false,
    }
  },
  mounted(){
    // console.log('list',this.list)
  },
  methods:{
    handleSelectLayer(item){
      item.show = !item.show
    },
    handleSelectActive(){
      this.active = !this.active
    }
  }
}
</script>

<style lang="less" scoped>
.layerBar {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 180px;
  background-color: #042d52;
  border: 1px solid #248aca;
  border-radius: 5px;
  overflow: hidden;
  cursor: move;
  .layerBar_title {
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
  .layerBar_cellbox {
    .layerBar_cell {
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
    .layerBar_cell_active{
        background: #248aca;
      }   
  }


}


</style>