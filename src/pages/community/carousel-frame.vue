<template>
  <carousel v-if="isCarouselInitialized" :contents="carouselContents" />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Carousel from "./carousel";
import { getNews } from "@/apis/notice/notice";
import { News } from "@/apis/schemas";

let isCarouselInitialized = ref(false);
let carouselContents = reactive<News[]>([]);
getNews({ communityId: uni.getStorageSync("communityId") }).then((res) => {
  carouselContents = res.news;
  isCarouselInitialized.value = true;
});
</script>

<style lang="scss" scoped></style>
