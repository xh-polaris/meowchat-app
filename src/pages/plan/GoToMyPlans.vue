<template>
  <view class="goToMyPlans">
    <img :src="Icons.GoToPath_Tag" class="small-icon" />
    <text class="goTo_text">我已助力了8个计划</text>
    <img :src="Icons.GoToArrow" class="arrow" />
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.goToMyPlans {
  border-radius: 6vw;
  margin: 2.5vw;
  height: 12vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;

  .small-icon {
    height: 5vw;
    width: 5vw;
    margin-left: 3vw;
    margin-right: 3vw;
  }

  .goTo_text {
    color: #00365c;
  }

  .arrow {
    height: 5vw;
    width: 3vw;
    position: absolute;
    right: 10vw;
  }
}
</style>
