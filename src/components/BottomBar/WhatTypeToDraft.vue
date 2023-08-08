<template>
  <view
    class="background"
    @click="emits('toggleShowingDraft', false)"
    @mousedown.prevent.stop
  >
    <view class="choices">
      <view class="prompt">选择发布类型</view>
      <view class="choice" @click="goToPage(Pages.DraftMoment)">
        <text class="text">[社区]动态</text>
        <text v-if="props.current === 'community'" class="current"
          >(当前页)</text
        >
      </view>
      <view class="choice" @click="goToPage(Pages.DraftPost)">
        <text class="text">[世界]帖子</text>
        <text v-if="props.current === 'world'" class="current">(当前页)</text>
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
const momentUrl = `${Pages.DraftNav}?type=moment`;
const emits = defineEmits(["toggleShowingDraft"]);
const goToPage = (url: string) => {
  uni.navigateTo({
    url: Pages.DraftTest
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
    width: fit-content;
    height: fit-content;
    margin-bottom: 24vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .prompt {
      color: white;
      font-size: 4.8vw;
      width: fit-content;
    }
    .choice {
      width: fit-content;
      background-color: #fdfdfd;
      padding: 2vw 4vw;
      border-radius: 1vw;
      margin-top: 2vw;
      .current {
        margin-left: 2vw;
        color: #1fa1ff;
      }
    }
  }
}
</style>
