<template>
  <TopBar>
    <template #center>喵世界</template>
  </TopBar>
  <Card></Card>
  <PlanEntry></PlanEntry>
  <BottomBar id="plan"></BottomBar>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomBar from "@/components/BottomBar.vue";
import Card from "@/pages/plan/Card.vue";
import PlanEntry from "@/pages/plan/PlanEntry.vue";
</script>

<style scoped lang="scss"></style>
