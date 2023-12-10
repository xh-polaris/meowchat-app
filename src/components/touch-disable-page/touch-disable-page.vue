<template>
  <view class="disable-page" @touchmove.stop.prevent />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.disable-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
