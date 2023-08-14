<template>
  <TopBar :has-go-back="true" bg-color="#ffffff" :has-shadow="false">
    <template #center>编辑帖子</template>
  </TopBar>
  <BottomPanel
    :can-publish="false"
    text="发布动态"
    @publish="() => {}"
  ></BottomPanel>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomPanel from "@/pages/draft/BottomPanel.vue";
//组件<CellBar> 样式分为有下划线和没有下划线
</script>

<style scoped lang="scss"></style>
