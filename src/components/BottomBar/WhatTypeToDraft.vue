<template>
  <view
    class="background"
    @click="emits('toggleShowingDraft', false)"
    @mousedown.prevent.stop
  >
    <view class="choices">
      <view class="choice" @click="goToPage(Pages.DraftMoment)">
        <view class="text"
          >社区动态
          <view v-if="props.current === 'community'" class="current"
            >当前页</view
          ></view
        >
      </view>
      <view class="choice" @click="goToPage(Pages.DraftPost)">
        <view class="text"
          >世界帖子
          <view v-if="props.current === 'world'" class="current"
            >当前页</view
          ></view
        >
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
    background-color: #ffffff;
    border-radius: 4vw;
    .choice {
      box-sizing: border-box;
      width: 48vw;
      height: 10vw;
      background-color: #fdfdfd;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1vw;
      .text {
        width: fit-content;
        position: relative;
        .current {
          position: absolute;
          right: -10vw;
          top: 0.4vw;
          font-size: 3vw;
          color: #1fa1ff;
        }
      }
      &:active {
        background-color: #f3f9fe;
        width: 45vw;
        border-radius: 2vw;
      }
    }
  }
}
</style>
