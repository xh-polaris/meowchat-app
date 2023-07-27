<template>
  <view
    v-if="!isDebugOn"
    class="button"
    @click="uni.setStorageSync('isDebugOn', true)"
    >调试</view
  >
  <view v-else class="panel" @click="uni.setStorageSync('isDebugOn', false)"
    >Panel</view
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
const isDebugOn = ref(uni.getStorageSync("isDebugOn"));
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
}
</style>
