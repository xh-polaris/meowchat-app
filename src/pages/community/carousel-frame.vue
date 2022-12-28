<template>
  <carousel v-if="isCarouselInitialized" :contents="carouselContents" />
</template>

<script setup>

import { ref } from "vue";
import Carousel from "./carousel"
import { getNews } from "@/apis/notice/notice";

let isCarouselInitialized = ref(false)
let carouselContents
getNews({communityId: uni.getStorageSync("communityId")}).then(res => {
  carouselContents = res.news
  isCarouselInitialized.value = true
})

</script>

<style lang="scss" scoped>

</style>