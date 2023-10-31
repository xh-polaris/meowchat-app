<template>
  <view class="background">
    <!--上面空白高度还要改动-->
    <view style="height: 24vw"></view>
    <GoToMyPlans></GoToMyPlans>
    <Card></Card>
    <HelpedCard></HelpedCard>
    <!--  <PlanEntry></PlanEntry>-->
  </view>

  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";
import Card from "@/pages/plan/Card.vue";
import PlanEntry from "@/pages/plan/PlanEntry.vue";
import HelpedCard from "@/pages/plan/HelpedCard.vue";
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  min-height: 90vh;
}
</style>
