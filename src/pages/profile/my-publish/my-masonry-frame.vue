<template>
  <Masonry
    v-if="isInitialized"
    :get-previews-handler="getPreviewsHandler"
  ></Masonry>
  <view class="nomore">没有更多喵~</view>
  <view style="width: 100%; height: 40rpx"></view>
</template>

<script setup lang="ts">
import Masonry from "@/pages/community/masonry.vue";
import { getOwnMomentPreviews } from "@/apis/moment/moment";
import { ref } from "vue";

interface Props {
  type?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "my"
});

const isInitialized = ref(false);
const getPreviewsHandler = ref();
if (props.type === "my") {
  getPreviewsHandler.value = async (page: number) => {
    return await getOwnMomentPreviews({
      page,
      communityId: uni.getStorageSync("communityId")
    });
  };
} //else if (props.type === "liked") {
// getPreviewsHandler.value = async (page: number) => {
//return await getLikedMomentPreviews({
// page,
//communityId: uni.getStorageSync("communityId"),
//keyword: props.keyword
//});
//};
//}
isInitialized.value = true;
</script>

<style lang="scss" scoped>
.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
}
</style>
