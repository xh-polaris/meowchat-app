<template>
  <view :style="{ height: navBarHeight + 'px' }" class="nav-bar">
    <view :style="{ height: topBarHeight + 'px' }" class="top-bar"></view>
    <view :style="{ height: capsuleBarHeight + 'px' }" class="capsule-bar">
      <slot></slot>
    </view>
  </view>
  <view :style="{ height: navBarHeight + 'px' }"></view>
</template>

<script lang="ts" setup>
const topBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const capsuleData = uni.getMenuButtonBoundingClientRect();
const capsuleBarHeight =
  capsuleData.height + (capsuleData.top - topBarHeight) * 2;
const navBarHeight = topBarHeight + capsuleBarHeight;
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  background-color: #fafcff;
  width: 100vw;
  z-index: 100;
}

.top-bar {
  width: 100vw;
}

.capsule-bar {
  width: 100vw;
  display: flex;
  align-items: center;
}
</style>
