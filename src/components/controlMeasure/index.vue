<template>
  <div class="controlMeasure" v-drag>
    <!-- <div  id="toolTip" style="display:none;position:absolute;height:20px;width:127px;background: olive;top:0px;left:0px">
   </div> -->
    <div class="controlMeasure_title">测量能力<i :class="active ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"
        @click="handleSelectActive"></i></div>
    <div class="controlMeasure_cellbox" v-show="active">
      <div v-for="(item, index) in list" :key="index" @click="handleSelectLayer(item)"
        :class="{ 'controlMeasure_cell': true, 'controlMeasure_cell_active': item.show }">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { ONEMAP_MEASURE } from "@/config/onemapMeasure"
import measureDistance from '@/class/measure/measureDistance'
import measureArea from '@/class/measure/measureArea'
import { measureHeight, clear } from '@/class/measure/measureHeight'

import MeasureHeight from '@/class/measure/measureHeight_copy'




export default {
  data() {
    return {
      list: ONEMAP_MEASURE,
      active: false,
      //面积测量
      measureArea:null,
      //距离测量
      measureDistance:null,
      MeasureHeight: null
    }
  },
  mounted() {
    // console.log('aa',new OneMap.ViewDome())
  },
  methods: {
    handleSelectLayer(item) {
      item.show = !item.show
    },
    handleSelectActive() {
      this.active = !this.active
    },
    // 选择图层
    handleSelectLayer(item) {
      item.show = !item.show;
      if (item.type == 'distance') { this.handleSelectDistance(item) }
      if (item.type == 'height') { this.handleSelectHeight(item) }
      if (item.type == 'area') { this.handleSelectArea(item) }
    },
    // 选择距离分析
    handleSelectDistance(item) {
      if (item.show) {
        this.measureDistance = new measureDistance()
        this.measureDistance.activate()
      } else {
        this.measureDistance.clear()
        this.measureDistance = null
      }
    },
    // 选择面积
    handleSelectArea(item) {
      if (item.show) {
        this.measureArea = new measureArea()
      } else {
        this.measureArea.clearEntity()
        this.measureArea = null
      }
    },
    // 选择高度
    handleSelectHeight(item) {
      if (item.show) {
        // this.MeasureHeight = new MeasureHeight()
        measureHeight()
      } else {
        clear()
      }
    },
  }
}
</script>

<style lang="less" scoped>
.controlMeasure {
  position: fixed;
  top: 30px;
  right: 630px;
  width: 180px;
  background-color: #042d52;
  border: 1px solid #248aca;
  border-radius: 5px;
  overflow: hidden;
  cursor: move;

  .controlMeasure_title {
    height: 30px;
    font-size: 14px;
    background: rgba(19, 75, 121, 1);
    color: #bddff2;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    i {
      font-size: 18px;
      cursor: pointer;
    }

  }

  .controlMeasure_cellbox {
    .controlMeasure_cell {
      margin: 5px 5px;
      padding: 0 5px;
      color: #bddff2;
      height: 30px;
      background: rgba(5, 111, 177, .3);
      border: 1px solid rgba(89, 144, 186, .64);
      display: flex;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
    }

    .controlMeasure_cell_active {
      background: #248aca;
    }
  }


}</style>