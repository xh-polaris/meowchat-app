<template>
  <image
    :src="props.urls?.[0] || ''"
    class="cat-image"
    mode="aspectFill"
    @click="onClickImage(props.urls?.[0] || '', props.urls)"
  />
</template>

<script setup lang="ts">
import { onClickImage } from "@/components/utils";
const props = defineProps<{
  urls: string[];
}>();
</script>

<style scoped lang="scss">
.cat-image {
  position: fixed;
  width: 100vw;
  height: 68vw;
  z-index: -1;
  top: 0;
}
</style>
