<template>
  <view v-if="!isDebugOn" class="button" @click="setIsDebugOn(true)">调试</view>
  <view v-else class="panel">
    <view class="header">
      <view class="title">调试面板</view>
      <view class="clickable" @click="setIsDebugOn(false)">最小化</view>
    </view>
    <view class="env">
      <view
        :class="'toggle ' + (isProductionEnv ? 'current' : '')"
        @click="setIsProductionEnv(true)"
        >正式环境
      </view>
      <view
        :class="'toggle ' + (!isProductionEnv ? 'current' : '')"
        @click="setIsProductionEnv(false)"
        >测试环境
      </view>
    </view>
    <view class="lane">
      <view class="label">当前泳道</view>
      <input
        type="text"
        :class="'laneInput ' + (laneInputEditable ? 'editable' : '')"
        :disabled="!laneInputEditable"
      />
      <view
        class="clickable"
        @click="setLaneInputEditable(!laneInputEditable)"
        >{{ laneInputEditable ? "确认" : "修改" }}</view
      >
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
const laneInputEditable = ref(false);
const setLaneInputEditable = ref((isTrue: boolean) => {
  laneInputEditable.value = isTrue;
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
    padding: 1vw 2vw;
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
      border: 1px solid #888888;
      height: 4vw;
      width: fit-content;
      padding: 2vw;
      line-height: 4vw;
      border-radius: 2vw;
      margin-right: 2vw;
      &.current {
        background-color: #888888;
        color: #000000;
      }
    }
    margin-bottom: 2vw;
  }
  .lane {
    margin-left: 2vw;
    justify-content: space-between;
    align-items: baseline;
    .laneInput {
      width: 40vw;
      margin-left: 4vw;
      padding: 1vw 3vw;
      border-radius: 2vw;
      &.editable {
        background-color: #333333;
      }
    }
  }
}
</style>
