<template>
  <view class="nav-bar" :style="{ height: navBarHeight + 'px' }">
    <view class="top-bar" :style="{ height: topBarHeight + 'px' }"></view>
    <view class="capsule-bar" :style="{ height: capsuleBarHeight + 'px' }">
      <view class="school-box">
        <view class="school-select-box">
          <image class="arrow" :src="Icons.Location" @click="onClickSwitch" />
          <view class="names" @click="onClickSwitch">
            <view class="school-name">
              {{ currentSchool }}
            </view>
            <view v-if="currentSchool !== currentCampus" class="campus-name">
              ({{ currentCampus }})</view
            >
            <view v-else class="campus-name"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view :style="{ height: navBarHeight + 'px' }"></view>

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
import { Icons } from "@/utils/url";
import MasonryFrame from "@/pages/community/masonry-frame.vue";
import Cards from "@/pages/community/cards/cards.vue";
import CarouselFrame from "@/pages/community/carousel-frame.vue";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import { onClickSwitch } from "@/pages/community/utils";
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

const topBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const capsuleData = uni.getMenuButtonBoundingClientRect();
const capsuleBarHeight =
  capsuleData.height + (capsuleData.top - topBarHeight) * 2;
const navBarHeight = topBarHeight + capsuleBarHeight;

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

.arrow {
  width: 32rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.nav-bar {
  position: fixed;
  background-color: #fafcff;
  width: 100vw;
  z-index: 100;
}
.top-bar {
  width: 100vw;
}
.capsule-bar {
  width: 100vw;
  display: flex;
  align-items: center;
}

.navbtn {
  color: #939393;
  font-size: calc(10 / 390 * 100vw);
  margin: 0 calc(10 / 390 * 100vw);

  &.current {
    color: #ffffff;
    background-color: #1fa1ff;
    padding: 10rpx 15rpx 10rpx 15rpx;
    border-radius: 15rpx;
    font-size: calc(15 / 390 * 100vw);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
}

.school-box {
  background-color: #fafcff;
  height: fit-content;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  .school-select-box {
    height: fit-content;
    display: flex;
    align-items: center;
  }
}

.names {
  display: flex;
  align-items: baseline;

  .school-name {
    font-weight: bold;
    border-bottom: 2px solid #1fa1ff;
    line-height: calc(18 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
    padding-bottom: calc(4 / 390 * 100vw);
    font-size: calc(18 / 390 * 100vw);
  }

  .campus-name {
    color: #939393;
    font-weight: bold;
    letter-spacing: calc(0.5 / 390 * 100vw);
    font-size: calc(16 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
  }
}
</style>
