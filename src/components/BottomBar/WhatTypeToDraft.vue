<template>
  <view class="background">
    <view class="choices">
      <view class="prompt">选择发布类型</view>
      <view class="choice">
        <text class="text">[社区]动态</text>
        <text v-if="props.current === 'community'" class="current"
          >(当前页)</text
        >
      </view>
      <view class="choice">
        <text class="text">[世界]帖子</text>
        <text v-if="props.current === 'world'" class="current">(当前页)</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  current: string;
}
const props = withDefaults(defineProps<Props>(), {
  current: ""
});
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
