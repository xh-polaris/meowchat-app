<template>
  <view
    v-if="!isDebugOn"
    :class="'button ' + (isProductionEnv ? 'green' : 'orange')"
    @click="setIsDebugOn(true)"
    >{{
      (isProductionEnv ? "正式: " : "测试: ") +
      (laneName !== "" ? laneName : "基准")
    }}</view
  >
  <view v-else class="panel">
    <view class="header">
      <view class="title">泳道设置</view>
      <view class="clickable" @click="setIsDebugOn(false)">最小化</view>
    </view>
    <view class="env">
      <view
        :class="'toggle green ' + (isProductionEnv ? 'current' : '')"
        @click="setIsProductionEnv(true)"
        >正式环境
      </view>
      <view
        :class="'toggle orange ' + (!isProductionEnv ? 'current' : '')"
        @click="setIsProductionEnv(false)"
        >测试环境
      </view>
    </view>
    <view class="lane">
      <view class="label">当前泳道</view>
      <input
        v-model="inputValue"
        placeholder="基准"
        type="text"
        :class="'laneInput ' + (laneInputEditable ? 'editable' : '')"
        :disabled="!laneInputEditable"
      />
      <view
        v-if="laneInputEditable"
        class="clickable"
        style="transform: translateX(2vw)"
        @click="emptyInputValue()"
        >清空</view
      >
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
import { Pages } from "@/utils/url";
const reboot = () => {
  uni.reLaunch({
    url: Pages.Community
  });
};
const laneInputEditable = ref(false);
const isDebugOn = ref(uni.getStorageSync("isDebugOn"));
const setIsDebugOn = ref((isTrue: boolean) => {
  if (!isTrue && laneInputEditable.value) return;
  uni.setStorageSync("isDebugOn", isTrue);
  isDebugOn.value = isTrue;
});
const isProductionEnv = ref(uni.getStorageSync("isProductionEnv"));
const setIsProductionEnv = ref((isTrue: boolean) => {
  if (isProductionEnv.value !== isTrue) {
    uni.setStorageSync("isProductionEnv", isTrue);
    isProductionEnv.value = isTrue;
  }
  reboot();
});
const laneName = ref("");
const inputValue = ref("");
const emptyInputValue = ref(() => (inputValue.value = ""));

const setLaneInputEditable = ref((isTrue: boolean) => {
  if (!isTrue) laneName.value = inputValue.value;
  laneInputEditable.value = isTrue;
});
</script>

<style scoped lang="scss">
.button {
  padding: 2vw 4vw;
  border-radius: 2vw;
  color: #000000;
  position: fixed;
  left: 2vw;
  bottom: 32vw;
  &.green {
    background-color: #45bb76;
  }
  &.orange {
    background-color: #da8b28;
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
      z-index: 20;
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
      //&.green {
      //  border: 1px solid seagreen;
      //}
      //&.orange {
      //  border: 1px solid #f89512;
      //}
      &.current {
        background-color: #888888;

        color: #000000;
        &.green {
          background-color: #45bb76;
          border: 1px solid #45bb76;
        }
        &.orange {
          background-color: #da8b28;
          border: 1px solid #da8b28;
        }
      }
    }
    margin-bottom: 2vw;
  }
  .lane {
    margin-left: 2vw;
    justify-content: space-between;
    align-items: baseline;
    .laneInput {
      flex: 1;
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
