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
        <Masonry
          :get-previews="buildPublishMomentLoader(props.userId)"
        ></Masonry>
      </view>
      <view v-else-if="current === 1">
        <MyPosts :type="props.type" :user-id="props.userId"></MyPosts>
      </view>
      <view v-else-if="current === 2">
        <Masonry
          :get-previews="buildLikingMomentLoader(props.userId)"
        ></Masonry>
      </view>
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
import { onReady } from "@dcloudio/uni-app";

const props = defineProps<{
  type?: string;
  userId?: string;
}>();
const items = ["动态", "帖子", "喜欢"];
let current = ref(-1);
// 没这几行真不行
onReady(() => {
  current.value = 0;
});
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
