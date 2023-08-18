<template>
  <TopBar :has-go-back="true" bg-color="#ffffff" :has-shadow="false">
    <template #center>小鱼干计划</template>
  </TopBar>
  <CellBar
    label="测试"
    place-holder="写点什么"
    :has-bottom-line="true"
  ></CellBar>
  <CellBar label="测试" place-holder="写点什么"></CellBar>
  <BottomPanel
    :can-publish="false"
    text="发布计划"
    @publish="() => {}"
  ></BottomPanel>
</template>

<script setup lang="ts">
import CellBar from "@/pages/draft/CellBar.vue";
import TopBar from "@/components/TopBar.vue";
import BottomPanel from "@/pages/draft/BottomPanel.vue";
//组件<CellBar> 样式分为有下划线和没有下划线
</script>

<style scoped lang="scss"></style>
