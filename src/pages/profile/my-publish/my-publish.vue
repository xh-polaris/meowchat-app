<template>
  <view style="margin-top: 20upx">
    <zzx-tabs
      ref="mytabs"
      :items="items"
      :current="current"
      @click-item="onClickItem"
    >
    </zzx-tabs>
  </view>
  <view class="wrap">
    <view v-if="current === 0">
      <MyMasonry type="my"></MyMasonry>
    </view>
    <view v-if="current === 1">
      <my-posts></my-posts>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyPosts from "@/pages/profile/my-publish/my-posts.vue";
import MyMasonry from "@/pages/profile/my-publish/my-masonry.vue";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
const items = ["动态", "帖子"];
let current = ref(0);
function onClickItem(e: any) {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
}
</script>

<style scoped lang="scss">
@import "@/common/search-input.scss";
.wrap {
  margin-top: 20rpx;
  color: #999999;
  font-size: 24rpx;
  height: 260rpx;
}
</style>
