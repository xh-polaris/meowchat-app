<template>
  <view class="background">
    <!--上面空白高度还要改动-->

    <view style="height: 24vw"></view>
    <navigator url="/pages/plan/helped-plans/helped-plans">
      进入helped-plans的测试入口
    </navigator>
    <navigator url="/pages/plan/plan-details/plan-details">
      进入plan-details的测试入口
    </navigator>
    <view style="display: flex; margin-left: 2.5vw">
      <GoToMyPlans></GoToMyPlans>
      <FishAmount></FishAmount>
    </view>
    <PlanEntries></PlanEntries>
  </view>

  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";

import FishAmount from "@/pages/plan/FishAmount.vue";
import PlanEntries from "@/pages/plan/PlanEntries.vue";
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  min-height: 100vh;
}
</style>
