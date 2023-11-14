<template>
  <view class="background">
    <!--上面空白高度还要改动-->

    <template v-if="!isRefreshing">
      <view style="height: 24vw"></view>
      <view style="display: flex; margin-left: 2.5vw">
        <GoToMyPlans></GoToMyPlans>
        <FishAmount></FishAmount>
      </view>
      <PlanEntries></PlanEntries>
    </template>
  </view>

  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";

import FishAmount from "@/pages/plan/FishAmount.vue";
import PlanEntries from "@/pages/plan/PlanEntries.vue";
import { nextTick, ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";

const isRefreshing = ref(false);
function pageRefresh() {
  isRefreshing.value = true;
  nextTick(() => {
    isRefreshing.value = false;
  });
}
onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  min-height: 100vh;
}
</style>
