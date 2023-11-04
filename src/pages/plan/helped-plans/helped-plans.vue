<template>
  <TopBar :has-go-back="true">
    <template #left>我助力过的小鱼干计划</template>
  </TopBar>
  <view class="background">
    <HelpedCard></HelpedCard>
  </view>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import HelpedCard from "@/pages/plan/HelpedCard.vue";
//到时候background的min高度还要修
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  min-height: 80vh;
}
</style>
