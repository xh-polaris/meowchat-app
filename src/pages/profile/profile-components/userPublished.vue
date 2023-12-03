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
      <template v-if="current === 0">
        <Masonry
          :loader-builder="() => buildPublishMomentLoader(props.userId)"
        ></Masonry>
      </template>
      <template v-else-if="current === 1">
        <MyPosts :type="props.type" :user-id="props.userId"></MyPosts>
      </template>
      <template v-else-if="current === 2">
        <Masonry
          :loader-builder="() => buildLikingMomentLoader(props.userId)"
        ></Masonry>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import MyPosts from "@/pages/profile/my-publish/my-posts.vue";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
import { ref } from "vue";
import {
  buildLikingMomentLoader,
  buildPublishMomentLoader
} from "@/pages/profile/profile-components/loader";
import Masonry from "@/pages/community/Masonry.vue";

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
