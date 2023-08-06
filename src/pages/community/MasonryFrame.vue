<template>
  <Masonry v-if="isInitialized" :get-previews="getPreviews"></Masonry>
</template>

<script lang="ts" setup>
import Masonry from "@/pages/community/Masonry.vue";
import { getMomentPreviews, searchMomentPreviews } from "@/apis/moment/moment";
import { ref } from "vue";
import { Moment } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";

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
const getPreviews = ref<() => Promise<Moment[]>>();
if (props.search === "default") {
  getPreviews.value = async () => {
    return (
      await getMomentPreviews({
        page: page.value++,
        communityId: uni.getStorageSync(StorageKeys.CommunityId)
      })
    ).moments;
  };
} else if (props.search === "search") {
  getPreviews.value = async () => {
    return (
      await searchMomentPreviews({
        page: page.value++,
        communityId: uni.getStorageSync(StorageKeys.CommunityId),
        keyword: props.keyword
      })
    ).moments;
  };
}
isInitialized.value = true;
</script>

<style lang="scss" scoped></style>
