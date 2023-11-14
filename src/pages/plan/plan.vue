<template>
  <view class="background">
    <!--上面空白高度还要改动-->
    <view style="height: 15vw"></view>
    <image :src="Icons.Plan_Logo" class="plan-logo"></image>
    <template v-if="!isRefreshing">
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
import { Icons } from "@/utils/url";

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
  .plan-logo {
    width: 36vw;
    height: 4.5vw;
    margin-left: 6vw;
    margin-bottom: 4vw;
  }
}
</style>
