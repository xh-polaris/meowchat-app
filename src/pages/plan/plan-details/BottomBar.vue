<template>
  <view class="bottom-bar">
    <view class="help-button" @click="onHelpClick">
      <view class="help-text">马上助力</view>
    </view>
  </view>
</template>
<script setup lang="ts">
function onHelpClick() {
  console.log("助力按钮被点击");
}
</script>
<style scoped lang="scss">
.bottom-bar {
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  width: 100vw;
  height: 20vw;
  .help-button {
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    background-color: #1e97ff;
    width: 50vw;
    height: 10vw;
    border-radius: 10vw;
    margin-left: 25vw;
    margin-top: 2vw;
    .help-text {
      text-align: center;
      font-weight: bold;
      font-size: 4.5vw;
      letter-spacing: 0.5vw;
      color: #ffffff;
    }
  }
}
</style>
