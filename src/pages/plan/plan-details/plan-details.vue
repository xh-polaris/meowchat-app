<template>
  <TopBar :has-go-back="true">
    <template #left>小鱼干计划详情</template>
  </TopBar>
  <view class="background">
    <Cards></Cards>
  </view>
  <BottomBar></BottomBar>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import Cards from "@/pages/plan/plan-details/Cards.vue";
import BottomBar from "@/pages/plan/plan-details/BottomBar.vue";
</script>

<style scoped lang="scss">
.background {
  background-color: #f6f6f6;
  min-height: 80vh;
}
</style>
