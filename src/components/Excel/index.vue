<template>
  <download-excel class="export-excel-wrapper" :data="tileSetData" :fields="fields" :name="`模型数据${nowDate}` + '.xls'">
    <div class="exportBtn">模型数据抽取(excel)</div>
  </download-excel>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: "index",
  computed: {
    get_json_fields: function () {
      let temp = this.list ? this.list[0] : {}
      if (temp) {
        let tempkey = {}
        Object.keys(temp).forEach(key => {
          tempkey[key] = {
            field: key,
            callback: (val) => {
              return '&nbsp;' + val;
            }
          }

        })
        return tempkey
      }
    },
  },
  data() {
    return {
      tileSetData: [],
      nowDate: moment().format("YYYY-MM-DD"),
      fields: {
        '3DTiles版本': 'version',
        '仿射变化矩阵': 'transform',
        '外包盒几何误差(m)': 'geometricErrorWai',
        '生产工具': 'generatetool',
        '外包盒边界': 'boundingVolume.box',
        '瓦片空间范围框': 'children.boundingVolume.box',
        '瓦片几何误差': 'geometricErrorWa',
        '瓦片类型': 'tilseType',
        '瓦片类容': 'content',
      },
    }
  },
  mounted() {
    this.getModelData()
  },
  methods: {
    getModelData() {
      axios.get('/data/tileset.json').then(res => {
        let quyu1 = res.data['/gangqu/quyu1/']
        let quyu2 = res.data['/gangqu/quyu2/']
        let quyu3 = res.data['/gangqu/quyu3/']
        this.tileSetData.push({
          ...quyu1.asset,
          geometricErrorWai: quyu1.geometricError,
          geometricErrorWa: quyu1.root.geometricError,
          boundingVolume: quyu1.root.boundingVolume,
          transform: quyu1.root.transform,
          children: quyu1.root.children[0],
          content: quyu1.root.children[0].content.uri,
          tilseType: quyu1.root.children[0].content.uri.includes('json') ? 'json' : quyu1.root.children[0].content.uri.slice(indexOf('.'))
        })
        this.tileSetData.push({
          ...quyu2.asset,
          geometricErrorWai: quyu2.geometricError,
          geometricErrorWa: quyu2.root.geometricError,
          boundingVolume: quyu2.root.boundingVolume,
          transform: quyu2.root.transform,
          children: quyu2.root.children[0],
          content: quyu2.root.children[0].content.uri,
          tilseType: quyu2.root.children[0].content.uri.includes('json') ? 'json' : quyu2.root.children[0].content.uri.slice(indexOf('.'))
        })

        this.tileSetData.push({
          ...quyu3.asset,
          geometricErrorWai: quyu3.geometricError,
          geometricErrorWa: quyu3.root.geometricError,
          boundingVolume: quyu3.root.boundingVolume,
          transform: quyu3.root.transform,
          children: quyu3.root.children[0],
          content: quyu3.root.children[0].content.uri,
          tilseType: quyu3.root.children[0].content.uri.includes('json') ? 'json' : quyu3.root.children[0].content.uri.slice(indexOf('.'))
        })
      })
    }
  },
}
</script>

<style scoped lang="less">
.export-excel-wrapper {
  display: inline-block;
  .exportBtn {
    height: 30px;
    display: flex;
    width: 162px;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
