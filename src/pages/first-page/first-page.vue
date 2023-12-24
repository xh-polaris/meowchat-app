<template>
  <view />
</template>

<script lang="ts" setup>
import { init } from "@/utils/init";
import { Pages } from "@/utils/url";
uni.showLoading({
  title: "初始化中"
});
const task = () => {
  init()
    .then(() => {
      uni.hideLoading();
      uni.reLaunch({
        url: Pages.Community
      });
    })
    .catch((err) => {
      console.error("初始化失败", err);
      setTimeout(task, 3000);
    });
};
task();
</script>

<style scoped></style>
