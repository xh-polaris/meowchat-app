<template>
  <div>
    {{ props.id }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
}>()
</script>

<style lang="scss" scoped>

</style>
