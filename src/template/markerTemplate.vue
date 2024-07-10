<template>
  <div :class="{ 'marker-container': true }">
    <div :id="item.id" :class="{ 'marker-title': true }" v-if="item.showTitle" @click="handleClick(item, $event, 'title')"
      :data-data="JSON.stringify(item)"
      :style="{ 'background': props.bg ? props.bg : '#27a8a1', 'color': props.color ? props.color : '#fff', 'border': `1px solid ${props.bdColor ? props.bdColor : '#fff'}` }">
      <span>{{ item.title }}</span>
    </div>
    <div v-if="!item.showTitle"></div>
    <div class="marker-icon"><img :src="props.icon" alt="" @click="handleClick(item, $event, 'icon')" /></div>
    <!-- 更多标注列表 -->
    <div ref="clickPop" class="map-popover" v-show="isShowPopover">
      <div class="clickPop">
        <div class="clickPop-item text-hidden" v-for="(item, index) in clickPopList" :key="'DOMLIST_' + index"
          :title="item.title" @click="htmlDetail(item)">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import viewbubble from '@/class/base/viewbubble'
import bus from '@/utils/bus'
export default {
  name: "markerTemplate",
  data() {
    return {
      bubbles: {},
      clickPopList: [],
      isShowPopover: false,
      handler: null
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      required: true,
    }

  },
  mounted() {
    bus.$on('showTitleOrHide', this.handleHideTitle)
    this.handler = new OneMap.ScreenSpaceEventHandler(window.$viewer.scene.canvas);
    this.handler.setInputAction(() => {
      
    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  },
  methods: {
    closeMapPopove() {
      let dom = document.getElementsByClassName('map-popover')
      this.isShowPopover = true
      if (dom.length != 0) {
        for (let i = 0; i < dom.length; i++) {
          dom[i].style.display = 'none'
        }
      }
    },
    // 右击悬浮列表
    handleClick(data, event, type) {
    
      this.clickPopList = [];
      // 触发范围（px）;
      let range = 70;
      // 获取鼠标的坐标
      let x = event.clientX, clientHeight = document.body.clientHeight, y = clientHeight - event.clientY;
      let markerList = document.getElementsByClassName('marker-title')
      for (let i = 0; i < markerList.length; i++) {
        let item = markerList[i];
        let bottom = item.style.bottom, left = item.style.left
        if (bottom && left) {
          bottom = Number(bottom.split('px')[0]);
          left = Number(left.split('px')[0]) + (item.offsetWidth / 2);
          if (x - left < range && x - left > 0 - range && y - bottom < range && y - bottom > 0 - range) {
            this.clickPopList.push(JSON.parse(item.dataset.data));
          }
        }
      }
      if (this.clickPopList.length == 1) { // 当只有一个标注时直接显示详情弹窗
        if (type == 'title') {
          this.handleTitleClick(data)
        } else {
          this.handleIconClick(data)
        }
      } else if (this.clickPopList.length > 1) { //大于一个标注时显示列表弹窗
        this.$nextTick(() => {
          let clickPop = this.$refs.clickPop;
          if (clickPop) {
            clickPop.style.left = x + 'px';
            clickPop.style.bottom = y + 'px';
          }
        })

      }
    },
    // js触发事件
    htmlDetail(item) {
      this.handleTitleClick(item)
    },
    //icon点击事件
    handleIconClick(item) {
      this.closeMapPopove()
      item.showTitle = !item.showTitle
      this.bubble(item)
    },
    //标题点击事件
    handleTitleClick(item) {
      this.closeMapPopove()
      item.showTitle = false
      this.bubble(item)
    },
    //关闭弹窗触发的事件
    handleHideTitle(item) {
      item.showTitle = true
      this.bubbles[item.id] = null
    },
    //实例化气泡弹窗
    bubble(item) {
      if (!item.showTitle) {
        this.bubbles[item.id] = new viewbubble(item, this.props)
      } else {
        this.bubbles[item.id].windowClose()
        this.bubbles[item.id] = null
      }
    },
  }
};
</script>


<style scoped lang="less">
.marker-container {
  .marker-icon {
    position: absolute;
    margin: 2px auto 0 auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    left: calc(50% - 14.5px);

    img {
      width: 30px;
    }

    &:hover {
      z-index: 999;
    }
  }

  .marker-title {
    position: absolute;
    max-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    border-radius: 5px;
    padding: 3px 8px;
    cursor: pointer;

    &:hover {
      z-index: 999;
      min-width: max-content;
    }
  }

  .map-popover {
    position: absolute;
    z-index: 1999;
    display: block;

    .clickPop {
      background-color: #fff;
      padding: 10px 0;
      border-radius: 6px;

      .clickPop-item {
        padding: 0 10px;
        font-size: 13px;
        line-height: 20px;
        cursor: pointer;
      }

      .clickPop-item+.clickPop-item {
        margin-top: 4px;
      }

      .clickPop-item:hover {
        background-color: #bddff2;
      }
    }
  }
}
</style>
