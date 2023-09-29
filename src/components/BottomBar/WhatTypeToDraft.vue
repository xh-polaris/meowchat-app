<template>
  <view
    class="background"
    @click="emits('toggleShowingDraft', false)"
    @mousedown.prevent.stop
  >
    <view class="choices">
      <view class="choice" @click="goToPage(Pages.DraftMoment)">
        <view class="text">社区动态</view>
      </view>
      <view class="choice" @click="goToPage(Pages.DraftPost)">
        <view class="text">世界帖子</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Pages } from "@/utils/url";
const emits = defineEmits(["toggleShowingDraft"]);
const goToPage = (url: string) => {
  uni.navigateTo({
    url
  });
};
</script>

<style scoped lang="scss">
.background {
  z-index: 150;
  background-color: #22222288;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .choices {
    padding: 2vw;
    margin-bottom: 19vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4vw;
    .choice {
      box-sizing: border-box;
      width: 40vw;
      height: 12vw;
      background-color: #fdfdfd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2vw;
      border-radius: 8vw;
      color: #1fa1ff;
      font-weight: bold;
      .text {
        width: fit-content;
        position: relative;
      }
      &:active {
        background-color: #f3f9fe;
        width: 40vw;
        border-radius: 8vw;
      }
    }
  }
}
</style>
