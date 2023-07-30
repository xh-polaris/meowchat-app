<template>
  <view class="main">
    <text>guide</text>
    <text>{{ props.cat.name }}</text>
  </view>
</template>

<script setup lang="ts">
import { Cat } from "@/apis/schemas";
interface Props {
  cat: Cat;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.main {
  margin: 0 6vw;
}
</style>
