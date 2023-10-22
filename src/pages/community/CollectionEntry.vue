<template>
  <div class="image-container">
    <div class="cam">
      <navigator open-type="switchTab" url="/pages/collection/collection">
        <img :src="Icons.View" class="overlay-image view" />
      </navigator>
    </div>

    <div class="view">
      <navigator open-type="switchTab" url="/pages/collection/collection">
        <img :src="Icons.Cam" class="overlay-image cam" />
      </navigator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.image-container {
  position: relative;
  width: 90vw;
  height: 40vw;

  .overlay-image {
    position: absolute;
    width: 90vw;
    height: 18vw;

    &.cam {
      top: 16vw;
      left: 5vw;
      width: 90vw;
      z-index: 1;
    }

    &.view {
      top: 21vw;
      left: 68vw;
      width: 23vw;
      z-index: 2;
      height: 8.2vw;
    }
  }
}
</style>
