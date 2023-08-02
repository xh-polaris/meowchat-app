<template>
  <view class="nav-bar" :style="{ height: navBarHeight + 'px' }">
    <view class="top-bar" :style="{ height: topBarHeight + 'px' }"></view>
    <view class="capsule-bar" :style="{ height: capsuleBarHeight + 'px' }">
      <slot></slot>
    </view>
  </view>
  <view :style="{ height: navBarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
const topBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const capsuleData = uni.getMenuButtonBoundingClientRect();
const capsuleBarHeight =
  capsuleData.height + (capsuleData.top - topBarHeight) * 2;
const navBarHeight = topBarHeight + capsuleBarHeight;
</script>

<style scoped lang="scss">
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
