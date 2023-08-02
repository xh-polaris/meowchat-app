<template>
  <TopBar bg-color="#fafcff">
    <SchoolSelect />
  </TopBar>

  <view class="background">
    <view v-if="!isRefreshing">
      <CarouselFrame />
    </view>

    <!--cards是未使用的功能，暂时不管-->
    <view v-if="false">
      <Cards :card-list="cardList" />
    </view>

    <view style="height: 4vw"></view>

    <view v-if="!isRefreshing">
      <MasonryFrame search="default"></MasonryFrame>
    </view>

    <view style="height: 18vw"></view>
  </view>

  <TabBar id="1"></TabBar>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import SchoolSelect from "@/components/SchoolSelect.vue";
import MasonryFrame from "@/pages/community/masonry-frame.vue";
import Cards from "@/pages/community/cards/cards.vue";
import CarouselFrame from "@/pages/community/carousel-frame.vue";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { listCommunity } from "@/apis/community/community";
import { Community } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";

uni.setStorageSync(StorageKeys.SearchText, "");

uni.setStorageSync(StorageKeys.IsClickCollectionSearch, false);

const currentSchool = ref("");
const currentCampus = ref("");
const communityId = ref("");
const parentId = ref("");
const cardList = reactive(["", "", "", "", "", ""]);

function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}

const lists = reactive<{
  data: Community[];
}>({
  data: []
});

async function schoolList() {
  lists.data = (await listCommunity({})).communities;
}

async function getCampus() {
  await schoolList();
  init();
  for (let i = 0; i < lists.data.length; i++) {
    if (lists.data[i].id === communityId.value) {
      currentCampus.value = lists.data[i].name;
      parentId.value = <string>lists.data[i].parentId;
    }
  }
  for (let j = 0; j < lists.data.length; j++) {
    if (lists.data[j].id === parentId.value) {
      currentSchool.value = lists.data[j].name;
    }
  }
}

const isRefreshing = ref(false);

function pageRefresh() {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 1);
  getCampus();
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

onLoad(() => {
  uni.showLoading({
    title: "加载中"
  });
});

onReady(() => {
  uni.hideLoading();
});

onShow(() => {
  getCampus();
  // getHistories();
  if (
    !communityId.value ||
    communityId.value != uni.getStorageSync(StorageKeys.CommunityId)
  ) {
    pageRefresh();
  }
});
</script>

<style lang="scss" scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
}
</style>
