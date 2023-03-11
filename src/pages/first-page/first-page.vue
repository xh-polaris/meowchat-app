<template>
  <view />
</template>

<script lang="ts" setup>
import { init } from "@/utils/init";
import { Pages } from "@/utils/url";

init().then(() => {
  uni.reLaunch({
    url: Pages.Community
  });
});
</script>

<style scoped></style>
