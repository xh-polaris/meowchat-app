<template>
  <template v-if="catsData">
    <view v-if="catsData">
      <view v-for="cat of catsData" :key="cat.id" class="out">
        <view class="row" @click="onClickCatBox(cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-if="catsData.length === 0"> <image :src="Pictures.NoData" /> </view>
  </template>
</template>

<script setup lang="ts">
import { Pages, Pictures } from "@/utils/url";
import { reactive } from "vue";
import {
  getCatPreviews,
  searchCatPreviews
} from "@/apis/collection/collection";
import { onReachBottom } from "@dcloudio/uni-app";
import CatBox from "@/pages/collection/cat-box.vue";
import { CatPreview } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";

interface Props {
  search?: "default" | "cat";
  keyword?: string;
}
const props = withDefaults(defineProps<Props>(), {
  search: "default",
  keyword: "cat"
});

const catsData = reactive<CatPreview[]>([]);
let page = 0;
const getCatPreviewsAsync = async () => {
  let cats: CatPreview[] = [];

  if (props.search === "default") {
    cats = (
      await getCatPreviews({
        page: page,
        communityId: uni.getStorageSync(StorageKeys.CommunityId)
      })
    ).cats;
  } else if (props.search === "cat") {
    cats = (
      await searchCatPreviews({
        page: page,
        keyword: props.keyword,
        communityId: uni.getStorageSync(StorageKeys.CommunityId)
      })
    ).cats;
  }
  page++;
  return cats;
};

async function createCatsDataBatch() {
  const cats = await getCatPreviewsAsync();
  catsData.push(...cats);
}

createCatsDataBatch();

onReachBottom(() => {
  createCatsDataBatch();
});

function onClickCatBox(id: string) {
  uni.navigateTo({
    url: `${Pages.Cat}?id=${id}`
  });
}
</script>

<style lang="scss">
.out {
  padding-right: 30rpx;
  padding-left: 30rpx;
  margin-bottom: 10rpx;

  .row {
    border-radius: 18px;
    border: 1px solid #dad6d6;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
