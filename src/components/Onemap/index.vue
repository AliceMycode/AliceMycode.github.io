<template>
  <div>
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import initOneMap from '@/mixins'
export default {
  data(){
    return {

    }
  },
  mixins:[initOneMap],
  mounted(){
    this.$nextTick(() => {
      this.initMap()
    })
  }
}
</script>

<style lang="less" scoped>
  .map {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
  }
</style>