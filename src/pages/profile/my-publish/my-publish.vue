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
    <view v-show="current === 0">
      <my-posts search="post" :keyword="props.id"></my-posts>
    </view>
    <view v-show="current === 1">
      <masonry search="moment" :keyword="props.id" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyPosts from "@/pages/profile/my-publish/my-posts";
import Masonry from "@/pages/community/masonry";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
const props = defineProps<{
  id: string;
}>();
const items = ["帖子", "动态"];
let current = ref(0);
function onClickItem(e) {
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
