<template>
  <view class="guide-area">
    <image :src="Icons.Guide" mode="scaleToFill" class="image-fill" />
    <text class="text">{{ props.cat.details }}</text>
  </view>
</template>
<script setup lang="ts">
import { Icons } from "@/utils/url";
import { Cat } from "@/apis/schemas";
interface Props {
  cat: Cat;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.guide-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fafafa;
  border-radius: 20px;
  width: 98%;
  z-index: 0;
  .image-fill {
    width: 32vw;
    height: 10vw;
  }
  .text {
    font-size: 10px;
    color: gray;
    z-index: 2;
  }
}
</style>
