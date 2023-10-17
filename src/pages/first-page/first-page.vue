<template>
  <view />
</template>

<script lang="ts" setup>
import { init } from "@/utils/init";
import { Pages } from "@/utils/url";
uni.showLoading({
  title: "初始化中"
});
init().then(() => {
  uni.hideLoading();
  uni.reLaunch({
    url: Pages.Community
  });
});
</script>

<style scoped></style>
