<template>
  <div class="image-container">
    <div class="background">
      <navigator url="/pages/collection/collection">
        <image :src="Icons.Cam" mode="scaleToFill" class="background-image" />
      </navigator>
    </div>
    <div class="button">
      <navigator url="/pages/collection/collection">
        <image :src="Icons.View" mode="scaleToFill" class="button-image" />
      </navigator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.image-container {
  margin-left: 3vw;
  position: relative;
  width: 94vw;
  height: 18vw;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 94vw;
    height: 18vw;
    .background-image {
      width: 94vw;
      height: 18vw;
    }
  }
  .button {
    position: absolute;
    right: 3vw;
    top: 5vw;
    width: 26vw;
    height: 8vw;
    z-index: 10;
    .button-image {
      width: 26vw;
      height: 8vw;
    }
  }
}
</style>
