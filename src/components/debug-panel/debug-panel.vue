<template>
  <view v-if="!isDebugOn" class="button" @click="setIsDebugOn(true)">调试</view>
  <view v-else class="panel" @click="setIsDebugOn(false)">
    <view>调试面板</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isDebugOn = ref(uni.getStorageSync("isDebugOn"));
const setIsDebugOn = ref((isTrue: boolean) => {
  uni.setStorageSync("isDebugOn", isTrue);
  isDebugOn.value = isTrue;
});
</script>

<style scoped lang="scss">
.button {
  padding: 2vw 4vw;
  border-radius: 2vw;
  border: 0.2vw solid #22222288;
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
  padding: 2vw 4vw;
  position: fixed;
  left: 2vw;
  bottom: 32vw;
  background-color: #222222;
  color: #cccccc;
}
</style>
