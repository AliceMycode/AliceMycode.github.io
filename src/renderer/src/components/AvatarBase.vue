<template>
  <div
    class="user-avatar"
    :style="{ width: width + 'px', height: width + 'px', 'border-radius': borderRadius + 'px' }"
    @click="showDetailHandler"
  >
    <ShowLocalImage
      :width="width"
      :fileId="userId"
      partType="avatar"
      :forceGet="false"
    ></ShowLocalImage>
  </div>
</template>
<script setup>
const props = defineProps({
  userId: {
    type: String
  },
  width: {
    type: Number,
    default: 0
  },
  borderRadius: {
    type: Number,
    default: 0
  },
  showDetail: {
    type: Boolean,
    default: false
  }
})
const showDetailHandler = () => {
  if (!props.showDetail) {
    return
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  background: #d3d3d3;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
</style>
