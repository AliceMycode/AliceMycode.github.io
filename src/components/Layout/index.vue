<template>
  <div>
    <OneMap></OneMap>
    <layerBar></layerBar>
    <controlAnalyse></controlAnalyse>
    <controlBase></controlBase>
    <controlEffect></controlEffect>
    <controlMeasure></controlMeasure>
    <Appmain></Appmain>
  </div>
</template>

<script>
import Appmain from '@/components/Appmain'
import OneMap from '@/components/Onemap'
import layerBar from '@/components/LayerBar'
import controlBase from '@/components/ControlBase'
import controlAnalyse from '@/components/ControlAnalyse'
import controlMeasure from '@/components/controlMeasure'
import controlEffect from '@/components/controlEffect'

export default {
  components:{
    Appmain,
    OneMap,
    layerBar,
    controlBase,
    controlAnalyse,
    controlMeasure,
    controlEffect
  },
  data(){
    return {

    }
  },
  computed:{},
  methods:{},
  mounted(){
    
  }

}
</script>

