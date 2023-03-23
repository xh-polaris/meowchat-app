<template>
  <Masonry
    v-if="isInitialized"
    :get-previews-handler="getPreviewsHandler"
  ></Masonry>
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

const isInitialized = ref(false);
const getPreviewsHandler = ref();
if (props.search === "default") {
  getPreviewsHandler.value = async (page: number) => {
    return await getMomentPreviews({
      page,
      communityId: uni.getStorageSync("communityId")
    });
  };
} else if (props.search === "search") {
  getPreviewsHandler.value = async (page: number) => {
    return await searchMomentPreviews({
      page,
      communityId: uni.getStorageSync("communityId"),
      keyword: props.keyword
    });
  };
}
isInitialized.value = true;
</script>

<style lang="scss" scoped></style>
