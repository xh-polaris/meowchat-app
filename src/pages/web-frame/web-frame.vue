<template>
  <web-view :src="props.url"></web-view>
</template>

<script lang="ts" setup>
const props = defineProps<{
  url: string;
}>();
</script>

<style scoped></style>
