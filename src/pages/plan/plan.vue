<template>
  <view class="background">
    <!--上面空白高度还要改动-->
    <!--    <view style="height: 15vw"></view>-->
    <!--    <image :src="Icons.Plan_Logo" class="plan-logo"></image>-->
    <TopBar bg-color="#f4f9ff" :has-shadow="false">
      <template #left>
        <image :src="Icons.Plan_Logo" class="plan-logo" />
      </template>
    </TopBar>
    <view v-if="showHeader" class="tool-bar">
      <GetFishTask />
      <FishAmount style="margin-left: 25vw" />
      <view class="my-plans">
        <GoToMyPlans />
      </view>
    </view>
    <view style="height: 16vw" />
    <PlanEntries v-if="showContent" />
    <view style="height: 20vw" />
  </view>

  <BottomBar id="plan" />
</template>

<script setup lang="ts">
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";
import GetFishTask from "@/pages/plan/GetFishTask.vue";
import TopBar from "@/components/TopBar.vue";

import FishAmount from "@/pages/plan/FishAmount.vue";
import PlanEntries from "@/pages/plan/PlanEntries.vue";
import { ref } from "vue";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { Icons } from "@/utils/url";
import { refresh } from "@/utils/utils";

const showHeader = ref(false);
const showContent = ref(false);

onShow(() => {
  refresh(showHeader);
  refresh(showContent);
});

onPullDownRefresh(() => {
  refresh(showHeader);
  refresh(showContent);
  uni.stopPullDownRefresh();
});
</script>

<style scoped lang="scss">
.tool-bar {
  display: flex;
  z-index: 100;
  padding-left: 2.5vw;
  position: fixed;
  width: 100vw;
  height: 16vw;
  align-items: center;
  background-color: #f4f9ff;
}
.background {
  background-color: #f4f9ff;
  min-height: 100vh;
  position: relative;
  z-index: 0;
  .plan-logo {
    width: 36vw;
    height: 4.5vw;
    margin-left: 4vw;
  }
  .my-plans {
    position: fixed;
    left: 75.64vw; // 固定在右侧
    top: 43.58vw; // 可以调整 top 的值来控制垂直位置
    z-index: 99;
  }
}
</style>
