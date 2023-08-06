<template>
  <carousel v-if="isCarouselInitialized" :contents="carouselContents" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Carousel from "./Carousel.vue";
import { getNews } from "@/apis/notice/notice";
import { StorageKeys } from "@/utils/const";

let isCarouselInitialized = ref(false);
let carouselContents;
getNews({ communityId: uni.getStorageSync(StorageKeys.CommunityId) }).then(
  (res) => {
    carouselContents = res.news;
    if (carouselContents.length !== 0) {
      isCarouselInitialized.value = true;
    }
  }
);
</script>

<style lang="scss" scoped></style>
