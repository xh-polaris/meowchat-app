<template>
  <Masonry v-if="isInitialized" :get-previews="getPreviews"></Masonry>
</template>

<script setup lang="ts">
import Masonry from "@/pages/community/masonry.vue";
import { getMomentPreviews, searchMomentPreviews } from "@/apis/moment/moment";
import { ref } from "vue";

interface Props {
  search?: string;
  keyword?: string;
}
const props = withDefaults(defineProps<Props>(), {
  search: "default",
  keyword: "cat"
});

const page = ref<number>(0); //每往下翻页一次page加1直到没有内容

const isInitialized = ref(false);
const getPreviews = ref();
if (props.search === "default") {
  getPreviews.value = async () => {
    return (
      await getMomentPreviews({
        page: page.value++,
        communityId: uni.getStorageSync("communityId")
      })
    ).moments;
  };
} else if (props.search === "search") {
  getPreviews.value = async () => {
    return (
      await searchMomentPreviews({
        page: page.value++,
        communityId: uni.getStorageSync("communityId"),
        keyword: props.keyword
      })
    ).moments;
  };
}
isInitialized.value = true;
</script>

<style lang="scss" scoped></style>
