<template>
  <div class="controlAnalyse" v-drag>
    <div class="controlAnalyse_title">分析能力<i :class="active ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"
        @click="handleSelectActive"></i></div>
    <div class="controlAnalyse_cellbox" v-show="active">
      <div v-for="(item, index) in list" :key="index" @click="handleSelectLayer(item)"
        :class="{ 'controlAnalyse_cell': true, 'controlAnalyse_cell_active': item.show }">{{ item.text }}
      </div>
      <div :class="{ 'controlAnalyse_cell': true }">
        <excel></excel>
      </div>
    </div>
  </div>
</template>

<script>
import { ONEMAP_ANALYSE } from "@/config/onemapAnalyse"
//通视分析
import analysisVisible from '@/class/analysis/analysisVisible.js'
//剖面分析
import profileAnalysis from '@/class/analysis/profileAnalysis'
//天际线分析
import skylineAnalysis from '@/class/analysis/skylineAnalysis'
//淹没分析
import inundationAnalysis from '@/class/analysis/inundationAnalysis'
//可视域分析
import viewShedStage from '@/class/analysis/viewShedStage'
//阴影分析
import shadowAnalysis from '@/class/analysis/shadowAnalysis'
//天空可视域分析
import skyViewableAnalysis from '@/class/analysis/skyViewableAnalysis'
//坡度坡向分析
import slopeAspectAnalysis from '@/class/analysis/slopeAspectAnalysis'
//BIM模型导入
import bimImport from '@/class/analysis/bimImport'
//模型数据抽取(json)
import modelDataExtraction from '@/class/analysis/modelDataExtraction'

import viewShedStage_copy from '@/class/analysis/viewShedStage_copy'

import excel from '@/components/Excel'




export default {
  data() {
    return {
      list: ONEMAP_ANALYSE,
      active: false,
      //剖面分析
      profileAnalysis: null,
      //通透分析
      analysisVisible: null,
      //天际线分析
      skylineAnalysis: null,
      //淹没分析
      inundationAnalysis: null,
      //可视域分析
      viewShedStage: null,
      //阴影分析
      shadowAnalysis: null,
      //天空可视域分析
      skyViewableAnalysis:null,
      //坡度坡向分析
      slopeAspectAnalysis: null,
      //BIM模型导入
      bimImport: null,
      //模型数据抽取
      modelDataExtraction: null,
      viewShedStage_copy: null,
    }
  },
  components: {
    excel
  },
  mounted() {
    // console.log('list',this.list)
  },
  methods: {
    handleSelectLayer(item) {
      item.show = !item.show
      if (item.type == 'profileAnalysis') { this.handleSelectProfileAnalysis(item) }
      if (item.type == 'analysisVisible') { this.handleSelectAnalysisVisible(item) }
      if (item.type == 'skylineAnalysis') { this.handleSelectSkylineAnalysis(item) }
      if (item.type == 'inundationAnalysis') { this.handleSelectInundationAnalysis(item) }
      if (item.type == 'viewShedStage') { this.handleSelectViewShedStage(item) }
      if (item.type == 'shadowAnalysis') { this.handleShadowAnalysis(item) }
      if (item.type == 'skyViewableAnalysis') { this.handleSkyViewableAnalysis(item) }
      if (item.type == 'slopeAspectAnalysis') { this.handleSlopeAspectAnalysis(item) }
      if (item.type == 'bimImport') { this.handleBimImport(item) }
      if (item.type == 'modelDataExtraction') { this.handleModelDataExtraction(item) }
    },
    handleSelectActive() {
      this.active = !this.active
    },
    //剖面分析
    handleSelectProfileAnalysis(item) {
      if (item.show) {
        this.profileAnalysis = new profileAnalysis()
      } else {
        this.profileAnalysis.clear()
        this.profileAnalysis = null
      }
    },
    //通视分析
    handleSelectAnalysisVisible(item) {
      if (item.show) {
        this.analysisVisible = new analysisVisible()
      } else {
        this.analysisVisible.clear()
        this.analysisVisible = null
      }
    },
    //天际线分析
    handleSelectSkylineAnalysis(item) {
      if (item.show) {
        this.skylineAnalysis = new skylineAnalysis()
        this.skylineAnalysis.handleSkylineAnay()
      } else {
        this.skylineAnalysis.closeSkylineAnay()
        this.skylineAnalysis = null
      }
    },
    //可视域分析
    handleSelectViewShedStage(item) {
      if (item.show) {
        this.viewShedStage = new viewShedStage()
        this.viewShedStage.addViewField()
        // this.viewShedStage_copy = new viewShedStage_copy({
        //   softShadows: true,
        //   enabled: true,
        //   viewDistance: 200,
        // })
      } else {
        this.viewShedStage.clearAllViewField()
        this.viewShedStage = null
        // this.viewShedStage_copy.clear()
      }
    },
    //阴影分析
    handleShadowAnalysis(item) {
      if (item.show) {
        this.shadowAnalysis = new shadowAnalysis()
        this.shadowAnalysis.lightingShadowInit()
      } else {
        this.shadowAnalysis.clearOpenLight()
        this.shadowAnalysis = null
      }
    },
    //天空可视域分析
    handleSkyViewableAnalysis(item){
      if(item.show){
         this.skyViewableAnalysis = new skyViewableAnalysis()
         this.skyViewableAnalysis.init()
      }else{

      }

    },
    //坡度坡向分析
    handleSlopeAspectAnalysis(item) {
      if (item.show) {
        this.slopeAspectAnalysis = new slopeAspectAnalysis()
      } else {
        this.slopeAspectAnalysis.remove()
        this.slopeAspectAnalysis = null
      }
    },
    //BIm模型导入
    handleBimImport(item) {
      if (item.show) {
        this.bimImport = new bimImport()
        this.bimImport.loadModeData()
        console.log('mapTilesEntity', this.bimImport.mapTilesEntity)
      } else {
        this.bimImport.handleAdjustView()
        this.bimImport = null
      }
    },
    //模型数据抽取(json)
    handleModelDataExtraction(item) {
      if (item.show) {
        this.modelDataExtraction = new modelDataExtraction()
        this.tilesData = this.modelDataExtraction.tileSetData
      } else {

      }
    },
    //淹没分析
    handleSelectInundationAnalysis(item) {
      if (item.show) {
        this.inundationAnalysis = new inundationAnalysis()
      } else {
        this.inundationAnalysis.clear()
        this.inundationAnalysis = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.controlAnalyse {
  position: fixed;
  top: 30px;
  right: 430px;
  width: 180px;
  background-color: #042d52;
  border: 1px solid #248aca;
  border-radius: 5px;
  overflow: hidden;
  cursor: move;

  .controlAnalyse_title {
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

  .controlAnalyse_cellbox {
    .controlAnalyse_cell {
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

    .controlAnalyse_cell_active {
      background: #248aca;
    }
  }





}
</style>