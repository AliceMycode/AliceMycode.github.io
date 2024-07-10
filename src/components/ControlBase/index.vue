<template>
  <div class="controlBase" v-drag>
    <div class="controlBase_title">基础能力<i :class="active ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'"
        @click="handleSelectActive"></i></div>
    <div class="controlBase_cellbox" v-show="active">
      <div v-for="(item, index) in list" :key="index" @click="handleSelectLayer(item)"
        :class="{ 'controlBase_cell': true, 'controlBase_cell_active': item.show }">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { ONEMAP_BASE } from "@/config/onemapBase"
//点类
import { viewpoint } from '@/class/base/viewpoint'
//线类
import { viewline } from '@/class/base/viewline'
//面类
import { viewpolygon } from '@/class/base/viewpolygon'
//面/墙/标注
import { viewerpolygonWallMarker } from '@/class/base/viewerpolygonWallMarker'
//矩形勒
import { viewrectangle } from '@/class/base/viewrectangle'
//椭圆类
import { viewellipse } from '@/class/base/viewellipse'
//走廊类
import { viewcorridor } from '@/class/base/viewcorridor'
//墙体类
import { viewwall } from '@/class/base/viewwall'
//立方体类
import { viewbox } from '@/class/base/viewbox'
//圆柱体类
import { viewcylinder } from '@/class/base/viewcylinder'
//椭球体类
import { viewellipsoid } from '@/class/base/viewellipsoid'
//折线体类
import { viewpolylineVolume } from '@/class/base/viewpolylineVolume'
//文本类
import { viewlabel } from '@/class/base/viewlabel'
//标注类
import { viewmarker } from '@/class/base/viewmarker'
//自定义标注类
import { viewmarkercustom } from '@/class/base/viewmarkercustom'
//html类
import { viewhtml } from '@/class/base/viewhtml'
//自定义html类
import { viewhtmlcustom } from '@/class/base/viewhtmlcustom'
//标注配置
import { propsOne, propsTwo, propsThree ,propsFour} from '@/config/markerConfig'
//假数据
import { markerCustomDataOne, markerCustomDataTwo, markerCustomDataThree ,markerCustomDataFour} from '@/data/markerData'



export default {
  data() {
    return {
      list: ONEMAP_BASE,
      active: false,
      //点类
      viewpoint: new viewpoint(),
      //线类
      viewline: new viewline(),
      //面类
      viewpolygon: new viewpolygon(),
      //面/墙/标注
      viewerpolygonWallMarker: new viewerpolygonWallMarker(),
      //矩形类
      viewrectangle: new viewrectangle(),
      //椭圆类
      viewellipse: new viewellipse(),
      //走廊类
      viewcorridor: new viewcorridor(),
      //墙类
      viewwall: new viewwall(),
      //立方体类
      viewbox: new viewbox(),
      //圆柱体类
      viewcylinder: new viewcylinder(),
      //椭球体类
      viewellipsoid: new viewellipsoid(),
      //折线体类
      viewpolylineVolume: new viewpolylineVolume(),
      //文本类
      viewlabel: new viewlabel(),
      //标注类
      viewmarker: new viewmarker(),
      //html类
      viewhtml: new viewhtml(),
      //自定义html类
      viewhtmlcustom: new viewhtmlcustom(),
      //自定义标注
      viewmarkercustom:new viewmarkercustom(),

    }
  },
  mounted() {
    // console.log('list',this.list)
  },
  methods: {
    handleSelectLayer(item) {
      item.show = !item.show
    },
    handleSelectActive() {
      this.active = !this.active
    },
    handleSelectLayer(item) {
      item.show = !item.show
      //点类
      if (item.type == 'point') { this.handleSelectPoint(item) }
      //线类
      if (item.type == 'line') { this.handleSelectLine(item) }
      //面类
      if (item.type == 'polygon') { this.handleSelectPolygon(item) }
      //面/墙/标注
      if (item.type == 'polygonWallMarker') { this.handleSelectPolygonWallMarker(item) }
      //矩形类
      if (item.type == 'rectangle') { this.handleSelectRectangle(item) }
      //椭圆类
      if (item.type == 'ellipse') { this.handleSelectEllipse(item) }
      //走廊类
      if (item.type == 'corridor') { this.handleSelectCorridor(item) }
      //墙类
      if (item.type == 'wall') { this.handleSelectWall(item) }
      //立方体类
      if (item.type == 'box') { this.handleSelectBox(item) }
      //圆柱体类
      if (item.type == 'cylinder') { this.handleSelectCylinder(item) }
      //椭球体类
      if (item.type == 'ellipsoid') { this.handleSelectEllipsoid(item) }
      //折线体类
      if (item.type == 'polylineVolume') { this.handleSelectPolylineVolume(item) }
      //文本类
      if (item.type == 'label') { this.handleSelectLabel(item) }
      //标注类
      if (item.type == 'marker') { this.handleSelectMarker(item) }
      //自定义标注类
      if (item.type == 'markerCustom') { this.handleSelectMarkerCustom(item) }
      //html类
      if (item.type == 'html') { this.handleSelectHtml(item) }
      //自定义html类
      if (item.type == 'htmlcustom') { this.handleSelectHtmlCustom(item) }

    },
    // 选择点类
    handleSelectPoint(item) {
      if (item.show) {
        this.viewpoint.handleCreatePoint()
      } else {
        this.viewpoint.handleDeletePoint()
      }
    },
    // 选择线类
    handleSelectLine(item) {
      if (item.show) {
        this.viewline.handleCreateLine()
      } else {
        this.viewline.handleDeleteLine()
      }
    },
    // 选择面类
    handleSelectPolygon(item) {
      if (item.show) {
        this.viewpolygon.handleCreatePolygon()
      } else {
        this.viewpolygon.handleDeletePolygon()
      }
    },
    handleSelectPolygonWallMarker(item) {
      if (item.show) {
        this.viewerpolygonWallMarker.handleCreatePolygonWallMarker()
      } else {
        this.viewerpolygonWallMarker.handleDeletePolygonWallMarker()
      }
    },
    // 选择矩形类
    handleSelectRectangle(item) {
      if (item.show) {
        this.viewrectangle.handleCreateRectangle()
      } else {
        this.viewrectangle.handleDeleteRectangle()
      }
    },
    // 选择椭圆类
    handleSelectEllipse(item) {
      if (item.show) {
        this.viewellipse.handleCreateEllipse()
      } else {
        this.viewellipse.handleDeleteEllipse()
      }
    },
    // 选择走廊类
    handleSelectCorridor(item) {
      if (item.show) {
        this.viewcorridor.handleCreateCorridor()
      } else {
        this.viewcorridor.handleDeleteCorridor()
      }
    },
    // 选择立方体类
    handleSelectBox(item) {
      if (item.show) {
        this.viewbox.handleCreateBox()
      } else {
        this.viewbox.handleDeleteBox()
      }
    },
    // 选择圆柱体类
    handleSelectCylinder(item) {
      if (item.show) {
        this.viewcylinder.handleCreateCylinder()
      } else {
        this.viewcylinder.handleDeleteCylinder()
      }
    },
    // 选择椭圆体类
    handleSelectEllipsoid(item) {
      if (item.show) {
        this.viewellipsoid.handleCreateEllipsoid()
      } else {
        this.viewellipsoid.handleDeleteEllipsoid()
      }
    },
    // 选择折线体类
    handleSelectPolylineVolume(item) {
      if (item.show) {
        this.viewpolylineVolume.handleCreatePolylineVolume()
      } else {
        this.viewpolylineVolume.handleDeletePolylineVolume()
      }
    },
    //html类
    handleSelectHtml(item) {
      if (item.show) {
        this.viewhtml.handleCreateHtml()
      } else {
        this.viewhtml.handleDeleteHtml()
      }
    },
    // 选择HTML自定义
    handleSelectHtmlCustom(item) {
      if (item.show) {
        this.viewhtmlcustom.create()
      } else {
        this.viewhtmlcustom.delete()
      }
    },
    // 选择标注类
    handleSelectMarker(item) {
      if (item.show) {
        this.viewmarker.handleCreateMarker()
      } else {
        this.viewmarker.handleDeleteMarker()
      }
    },
    //自定义标注类
    handleSelectMarkerCustom(item) {
      if (item.show) {
        //自定义标注
        this.viewmarkercustom.cerate(markerCustomDataOne, propsOne)
        this.viewmarkercustom.cerate(markerCustomDataTwo, propsTwo)
        this.viewmarkercustom.cerate(markerCustomDataThree, propsThree)
        this.viewmarkercustom.cerate(markerCustomDataFour, propsFour)
      } else {
        this.viewmarkercustom.remove({ typeName: 'markerCustomOne' })
        this.viewmarkercustom.remove({ typeName: 'markerCustomTwo' })
        this.viewmarkercustom.remove({ typeName: 'markerCustomThree' })
        this.viewmarkercustom.remove({ typeName: 'markerCustomFour' })
      }
    },
    // 选择文本类
    handleSelectLabel(item) {
      if (item.show) {
        this.viewlabel.handleCreateLabel()
      } else {
        this.viewlabel.handleDeleteLabel()
      }
    },
    // 选择墙体类
    handleSelectWall(item) {
      if (item.show) {
        this.viewwall.handleCreateWall()
      } else {
        this.viewwall.handleDeleteWall()
      }
    },
  }
}
</script>

<style lang="less" scoped>
.controlBase {
  position: fixed;
  top: 30px;
  right: 230px;
  width: 180px;
  background-color: #042d52;
  border: 1px solid #248aca;
  border-radius: 5px;
  overflow: hidden;
  cursor: move;

  .controlBase_title {
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

  .controlBase_cellbox {
    .controlBase_cell {
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

    .controlBase_cell_active {
      background: #248aca;
    }
  }


}
</style>