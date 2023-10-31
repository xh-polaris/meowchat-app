<template>
  <view class="background">
    <!--上面空白高度还要改动-->

    <view style="height: 24vw"></view>
    <navigator url="/pages/plan/helped-plans">
      进入helped-plans的测试入口
    </navigator>
    <view style="display: flex; margin-left: 2.5vw">
      <GoToMyPlans></GoToMyPlans>
      <FishAmount></FishAmount>
    </view>
    <PlanEntry></PlanEntry>
  </view>

  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";
import PlanEntry from "@/pages/plan/PlanEntry.vue";
import FishAmount from "@/pages/plan/FishAmount.vue";
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  min-height: 100vh;
}
</style>
