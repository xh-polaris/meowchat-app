<template>
  <view style="background-color: #ffff">
    <zzx-tabs
      ref="mytabs"
      :current="current"
      :items="items"
      @click-item="onClickItem"
    >
    </zzx-tabs>
    <view class="wrap tab">
      <view v-if="current === 0">
        <MyMasonry :type="props.type" :user-id="props.userId"></MyMasonry>
      </view>
      <view v-if="current === 1">
        <my-posts :type="props.type" :user-id="props.userId"></my-posts>
      </view>
      <view v-if="current === 2">
        <MyMasonry :user-id="props.userId" type="liked"></MyMasonry>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import MyPosts from "@/pages/profile/my-publish/my-posts.vue";
import MyMasonry from "@/pages/profile/my-publish/my-masonry.vue";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
import { ref } from "vue";

const props = defineProps<{
  type?: string;
  userId?: string;
}>();
const items = ["动态", "帖子", "喜欢"];
let current = ref(0);

function onClickItem(e: any) {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
}
</script>

<style>
.tab {
  padding-top: 20rpx;
}
</style>
