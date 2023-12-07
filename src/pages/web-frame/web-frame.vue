<template>
  <web-view :src="props.url" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  url: string;
}>();
</script>

<style scoped></style>
