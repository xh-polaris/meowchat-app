<template>
  <TopBar :has-go-back="true">
    <template #center>切换社区</template>
  </TopBar>
  <view style="height: 4vw"></view>
  <SearchBar place-holder="输入学校名称"></SearchBar>
  <view style="height: 4vw"></view>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import TopBar from "@/components/TopBar.vue";
</script>

<style scoped lang="scss"></style>
