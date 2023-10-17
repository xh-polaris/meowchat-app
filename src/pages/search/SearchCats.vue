<template>
  <template v-if="catsData">
    <view v-if="catsData">
      <view v-for="cat of catsData" :key="cat.id">
        <view @click="onClickCatBox(cat.avatarUrl, cat.name, cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-if="catsData.length === 0" class="no-cat-here-frame">
      <image :src="Pictures.NoCatHere" class="no-cat-here" />
    </view>
  </template>
</template>

<script lang="ts" setup>
import { Pages, Pictures } from "@/utils/url";
import { reactive, ref } from "vue";
import { getCatPreviews } from "@/apis/collection/collection";
import { onReachBottom } from "@dcloudio/uni-app";
import CatBox from "@/pages/collection/cat-box.vue";
import { CatPreview } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";
import { GetCatPreviewsReq } from "@/apis/collection/collection-interfaces";
import { getPrefetchData, PrefetchResp } from "@/apis/prefetch";

interface Props {
  keyword?: string;
  choose?: "detail" | "choose";
}

const props = defineProps<Props>();

const catsData = reactive<CatPreview[]>([]);
let page = 0;
const communityId = uni.getStorageSync(StorageKeys.CommunityId);
const fetch = async () => {
  let cats: CatPreview[];

  const req: GetCatPreviewsReq = {
    page: page,
    communityId: communityId
  };
  if (props.keyword) {
    req.keyword = props.keyword;
  }
  cats = (await getCatPreviews(req)).cats;
  page++;
  return cats;
};

const getCatPreviewsAsync = async () => {
  if (page || props.keyword) {
    return fetch();
  }
  let res: PrefetchResp;
  try {
    res = await getPrefetchData({ communityId: communityId });
  } catch (reason) {
    return fetch();
  }
  if (!res?.firstCatPreviewsResp?.cats) {
    return fetch();
  }
  page++;
  const cats = res.firstCatPreviewsResp.cats;
  res.firstCatPreviewsResp = undefined;
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
    uni.setStorageSync(StorageKeys.IdSelected, catId.value);
    uni.setStorageSync(StorageKeys.NameSelected, catName.value);
    uni.setStorageSync(StorageKeys.AvatarSelected, catImage.value);
    uni.navigateBack({
      delta: 1
    });
  }
}
</script>

<style lang="scss">
.no-cat-here-frame {
  width: 100vw;
  margin-top: 10vh;
  display: flex;
  justify-content: center;

  .no-cat-here {
    width: 400upx;
    height: 222upx;
  }
}
</style>
