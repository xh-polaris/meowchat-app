<template>
  <view class="bottom-bar">
    <view class="help-button" @click="onHelpClick">
      <view class="help-text">马上助力</view>
    </view>
  </view>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "onHelpClick"): void;
}>();
function onHelpClick() {
  emit("onHelpClick");
}
</script>
<style scoped lang="scss">
.bottom-bar {
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  width: 100vw;
  height: 20vw;
  z-index: 2;
  .help-button {
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    background: linear-gradient(to bottom, #1da0ff, #1f6bff);
    width: 55vw;
    height: 11vw;
    border-radius: 10vw;
    margin-left: 22.5vw;
    margin-top: 2vw;
    .help-text {
      text-align: center;
      font-weight: bolder;
      font-size: 4.8vw;
      letter-spacing: 0.4vw;
      color: #ffffff;
    }
  }
}
</style>
