<template>
  <view class="main">
    <text>story</text>
    <text>{{ props.cat.name }}</text>
  </view>
</template>

<script lang="ts" setup>
import { Cat } from "@/apis/schemas";

interface Props {
  cat: Cat;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.main {
  margin: 0 6vw;
}
</style>
