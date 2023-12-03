<template>
  <BottomBarContent
    :id="props.id"
    @toggle-showing-draft="toggleShowingDraft"
  ></BottomBarContent>
</template>

<script setup lang="ts">
import BottomBarContent from "@/components/BottomBar/BottomBarContent.vue";
import { ref } from "vue";
interface Props {
  id: string;
}
const props = defineProps<Props>();

const isShowingDraft = ref(false);
const toggleShowingDraft = (bool: boolean) => {
  isShowingDraft.value = bool;
};
</script>

<style scoped lang="scss"></style>
