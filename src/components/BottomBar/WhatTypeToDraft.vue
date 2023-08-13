<template>
  <view
    class="background"
    @click="emits('toggleShowingDraft', false)"
    @mousedown.prevent.stop
  >
    <view class="choices">
      <view class="choice" @click="goToPage(Pages.DraftMoment)">
        <text class="text">社区动态</text>
        <text v-if="props.current === 'community'" class="current">当前页</text>
      </view>
      <view class="choice" @click="goToPage(Pages.DraftTest)">
        <text class="text">世界帖子</text>
        <text v-if="props.current === 'world'" class="current">当前页</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Pages } from "@/utils/url";
interface Props {
  current: string;
}
const props = withDefaults(defineProps<Props>(), {
  current: ""
});
// const momentUrl = `${Pages.DraftNav}?type=moment`;
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
    width: 60vw;
    height: 30vw;
    margin-bottom: 19vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 4vw;
    .prompt {
      color: white;
      font-size: 4.8vw;
      width: fit-content;
    }
    .choice {
      width: fit-content;
      background-color: #fdfdfd;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2vw 4vw;
      border-radius: 1vw;
      margin-top: 3vw;
      .current {
        position: absolute;
        margin-left: 32vw;
        font-size: 3vw;
        color: #1fa1ff;
      }
    }
    .choice:active {
      background-color: #f3f9fe;
      width: 45vw;
      border-radius: 2vw;
    }
  }
}
</style>
