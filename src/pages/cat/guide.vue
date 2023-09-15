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
  background-color: #f7f8fc;
  margin-left: 6vw;
  margin-top: 10px;
  border-radius: 2vw;
  width: 88%;
  z-index: 0;
  .image-fill {
    width: 32vw;
    height: 8vw;
    margin-left: 3vw;
    padding: 1vw;
  }
  .text {
    color: gray;
    font-size: 3.2vw;
    color: black;
    margin-top: 2vw;
    margin-left: 6vw;
    margin-right: 6vw;
    padding-bottom: 4vw;
    z-index: 2;
  }
}
</style>
