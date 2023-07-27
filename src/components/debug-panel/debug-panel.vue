<template>
  <view v-if="!isDebugOn" class="button" @click="setIsDebugOn(true)">调试</view>
  <view v-else class="panel">
    <view class="header">
      <view class="title">调试面板</view>
      <view class="clickable" @click="setIsDebugOn(false)">最小化</view>
    </view>
    <view class="env">
      <view class="toggle" @click="setIsProductionEnv(true)">正式环境</view>
      <view class="toggle" @click="setIsProductionEnv(false)">测试环境</view>
    </view>
    <view class="lane">
      <view>当前泳道</view>
      <input type="text" class="laneInput" />
      <view class="clickable">{{ true ? "修改" : "确认" }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isDebugOn = ref(uni.getStorageSync("isDebugOn"));
const setIsDebugOn = ref((isTrue: boolean) => {
  uni.setStorageSync("isDebugOn", isTrue);
  isDebugOn.value = isTrue;
});
const isProductionEnv = ref(uni.getStorageSync("isProductionEnv"));
const setIsProductionEnv = ref((isTrue: boolean) => {
  if (isProductionEnv.value !== isTrue) {
    uni.setStorageSync("isProductionEnv", isTrue);
    isProductionEnv.value = isTrue;
  }
});
</script>

<style scoped lang="scss">
.button {
  padding: 2vw 4vw;
  border-radius: 2vw;
  background-color: #222222;
  color: #cccccc;
  position: fixed;
  left: 2vw;
  bottom: 32vw;
  &:active {
    background-color: #444444;
  }
}
.panel {
  padding: 4vw;
  border-radius: 2vw;
  position: fixed;
  left: 2vw;
  box-sizing: border-box;
  bottom: 32vw;
  width: 96vw;
  background-color: #222222;
  color: #cccccc;
  .clickable {
    background-color: #222222;
    border-radius: 2vw;
    padding: 0 1vw;
    &:active {
      background-color: #333333;
    }
  }
  .header,
  .env,
  .lane {
    display: flex;
  }
  .header {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8vw;
    .title {
      font-size: 6vw;
      font-weight: bold;
    }
  }
  .env {
    .toggle {
      background-color: #333333;
      height: 4vw;
      width: fit-content;
      padding: 2vw;
      line-height: 4vw;
      border-radius: 2vw;
      margin-right: 2vw;
    }
    margin-bottom: 2vw;
  }
  .lane {
    margin-left: 2vw;
    justify-content: space-between;
    align-items: baseline;
    .laneInput {
      padding: 1vw 3vw;
      border-radius: 2vw;
      background-color: #333333;
      font-family: monospace;
    }
  }
}
</style>
