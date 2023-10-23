<template>
  <TopBar>
    <template #center>喵世界</template>
  </TopBar>
  <GoToMyPlans></GoToMyPlans>
  <Card></Card>
  <Card2></Card2>
  <!--  <PlanEntry></PlanEntry>-->
  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomBar from "@/components/BottomBar.vue";
import GoToMyPlans from "@/pages/plan/GoToMyPlans.vue";
import Card from "@/pages/plan/Card.vue";
import Card2 from "@/pages/plan/Card2.vue";
import PlanEntry from "@/pages/plan/PlanEntry.vue";
</script>

<style scoped lang="scss"></style>
