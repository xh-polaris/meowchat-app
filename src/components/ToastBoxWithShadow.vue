<template>
  <view class="shadow" @touchmove.stop.prevent>
    <view class="box">
      <img :src="toastImageUrl" class="background-photo" />
      <view class="bold-text">
        <text class="normal">{{ props.boldNormalText }}</text>
        <text class="blue">{{ props.boldBlueText }}</text>
      </view>
      <view class="grey-text">{{ props.greyText }}</view>
      <view class="button" @click="close">确认</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
const props = defineProps<{
  boldNormalText: string;
  boldBlueText: string;
  greyText: string;
}>();
const emits = defineEmits(["close"]);
const close = () => {
  emits("close");
};
const toastImageUrl = Icons.Plan_Toast;
</script>

<style scoped lang="scss">
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #22222288;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .box {
    width: 64vw;
    height: 52vw;
    box-sizing: border-box;
    background-color: #eeeeee;
    border-radius: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 4.4vw;
    padding-top: 20vw;
    position: relative;
    background-size: 100% 100%;
    overflow: hidden;
    .background-photo {
      position: absolute;
      width: 64vw;
      height: 52vw;
      top: 0;
      left: 0;
    }
    .bold-text {
      z-index: 2;
      font-weight: bold;
      .blue {
        color: #1f5fff;
      }
    }
    .grey-text {
      z-index: 2;
      color: #9a9a9a;
      font-size: 3.8vw;
    }
    .button {
      position: absolute;
      font-size: 4vw;
      bottom: 6vw;
      width: 36vw;
      height: 8vw;
      border-radius: 4vw;
      background: repeating-linear-gradient(to right, #39acff, #4c73ff);
      box-sizing: border-box;
      text-align: center;
      line-height: 8vw;
      color: #eeeeee;
      &:active {
        filter: brightness(80%);
      }
    }
  }
}
</style>
