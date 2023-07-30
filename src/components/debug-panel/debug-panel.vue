<template>
  <view
    v-if="!isDebugOn"
    :class="
      'button ' + (backendEnv === BackendEnv.Product ? 'green' : 'orange')
    "
    @click="setIsDebugOn(true)"
    >{{ laneName !== "" ? laneName : "基准" }}</view
  >
  <view v-else class="panel">
    <view class="header">
      <view class="title">泳道设置</view>
      <view class="clickable" @click="setIsDebugOn(false)">最小化</view>
    </view>
    <view class="env">
      <view
        :class="
          'toggle green ' + (backendEnv === BackendEnv.Product ? 'current' : '')
        "
        @click="setEnv(BackendEnv.Product)"
        >正式环境
      </view>
      <view
        :class="
          'toggle orange ' + (backendEnv === BackendEnv.Test ? 'current' : '')
        "
        @click="setEnv(BackendEnv.Test)"
        >测试环境
      </view>
    </view>
    <view class="lane">
      <view class="label">当前泳道</view>
      <input
        v-model="laneName"
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
import { StorageKeys, BackendEnv } from "@/utils/const";
const reboot = () => {
  uni.reLaunch({
    url: Pages.FirstPage
  });
};
const laneInputEditable = ref(false);
const isDebugOn = ref(false);
const setIsDebugOn = (isTrue: boolean) => {
  if (!isTrue && laneInputEditable.value) return;
  isDebugOn.value = isTrue;
};
const backendEnv = ref(uni.getStorageSync(StorageKeys.BackendEnv));
const setEnv = (env: string) => {
  uni.setStorageSync(StorageKeys.BackendEnv, env);
  reboot();
};
const laneName = ref(uni.getStorageSync(StorageKeys.BackendLane));
const emptyInputValue = () => (laneName.value = "");

const setLaneInputEditable = (isTrue: boolean) => {
  if (!isTrue) {
    uni.setStorageSync(StorageKeys.BackendLane, laneName.value);
    reboot();
  }
  laneInputEditable.value = isTrue;
};
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
