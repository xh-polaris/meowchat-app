<template>
  <carousel v-if="isCarouselInitialized" :contents="carouselContents" />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Carousel from "./carousel.vue";
import { getNews } from "@/apis/notice/notice";
import { News } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";

let isCarouselInitialized = ref(false);
let carouselContents = reactive<News[]>([]);
getNews({ communityId: uni.getStorageSync(StorageKeys.CommunityId) }).then(
  (res) => {
    carouselContents = res.news;
    isCarouselInitialized.value = true;
  }
);
</script>

<style lang="scss" scoped></style>
