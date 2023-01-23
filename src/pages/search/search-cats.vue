<template>
  <template v-if="catsData">
    <view v-if="catsData">
      <view v-for="cat of catsData" :key="cat.id" class="out">
        <view class="row" @click="onClickCatBox(cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-if="catsData.length === 0">
      <image src="https://static.xhpolaris.com/nodata.png" />
    </view>
  </template>
</template>

<script setup>
import { reactive } from "vue";
import {
  getCatPreviews,
  searchCatPreviews
} from "@/apis/collection/collection";
import { onReachBottom } from "@dcloudio/uni-app";
import CatBox from "@/pages/collection/cat-box";

const props=defineProps(['search','keyword'])

let catsData = reactive([]);
let page = 0;
const getCatPreviewsAsync = async () => {
  let cats = [];
  if (props.search === "default") {
    cats = (
      await getCatPreviews({
        page: page
      })
    ).cats;
  } else if (props.search === "cat") {
    cats = (
      await searchCatPreviews({
        page: page,
        keyword: props.keyword,
        communityId: uni.getStorageSync("communityId")
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

function onClickCatBox(id) {
  uni.navigateTo({
    url: `/pages/cat/cat?id=${id}`
  });
}
</script>

<style lang="scss">
.out {
  padding: 20rpx 30rpx 10rpx;

  .row {
    border-radius: 25px;
    border: 1px solid #dad6d6;
    padding: 10rpx 0;
  }
}
</style>
