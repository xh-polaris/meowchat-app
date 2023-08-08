<template>
  <BottomBarContent :id="props.id"></BottomBarContent>
  <template v-if="false">
    <WhatTypeToDraft :current="props.id"></WhatTypeToDraft>
  </template>
</template>

<script setup lang="ts">
import BottomBarContent from "@/components/BottomBar/BottomBarContent.vue";
import WhatTypeToDraft from "@/components/BottomBar/WhatTypeToDraft.vue";
interface Props {
  id: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
