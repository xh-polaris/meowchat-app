<template>
  <template v-if="catsData">
    <view v-if="catsData">
      <view v-for="cat of catsData" :key="cat.id">
        <view @click="onClickCatBox(cat.avatarUrl, cat.name, cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-if="catsData.length === 0"> <image :src="Pictures.NoData" /> </view>
  </template>
</template>

<script setup lang="ts">
import { Pages, Pictures } from "@/utils/url";
import { reactive, ref } from "vue";
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
  choose?: "detail" | "choose";
}
const props = withDefaults(defineProps<Props>(), {
  search: "default",
  keyword: "cat",
  choose: "detail"
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

// 点击选择的猫咪照片
const catImage = ref("");
const catName = ref("猫猫");
const catId = ref("");
function onClickCatBox(avatarUrl: string, name: string, id: string) {
  if (props.choose === "detail") {
    uni.navigateTo({
      url: `${Pages.Cat}?id=${id}`
    });
  } else if (props.choose === "choose") {
    catImage.value = avatarUrl;
    catName.value = name;
    catId.value = id;
    uni.setStorageSync("idSelected", catId.value);
    uni.setStorageSync("nameSelected", catName.value);
    uni.setStorageSync("avatarSelected", catImage.value);
    uni.navigateBack({
      delta: 1
    });
  }
}
</script>

<style lang="scss"></style>
