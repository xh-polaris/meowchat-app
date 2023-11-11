<template>
  <view class="frame">
    <img :src="Icons.LittleFish" class="small-icon" />
    <text class="text"
      >剩余<text style="color: dodgerblue">13</text>小鱼干</text
    >
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.frame {
  border-radius: 2vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 44vw;
  height: 12vw;

  .small-icon {
    height: 7vw;
    width: 7vw;
    margin-left: 3vw;
    margin-right: 2vw;
  }

  .text {
    color: #00365c;
    font-size: 4vw;
    margin-right: 2.5vw;
    font-weight: bold;
    letter-spacing: 0.1vw;
  }
}
</style>
