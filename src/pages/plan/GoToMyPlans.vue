<template>
  <view class="goToMyPlans">
    <img :src="Icons.GoToPath_Tag" class="small-icon" />
      <text class="goTo_text">已助力了8个计划</text>
    <img :src="Icons.GoToArrow" class="arrow" />
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.goToMyPlans {
  border-radius: 2vw;
  height: 12vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 3.5vw;

  .small-icon {
    height: 7vw;
    width: 7vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }

  .goTo_text {
    color: #00365c;
    font-size: 4vw;
    margin-right: 2vw;
    font-weight: bold;
    letter-spacing: 0.3vw;
  }

  .arrow {
    height: 3vw;
    width: 1.8vw;
    margin-right: 2.5vw;
  }
}
</style>
