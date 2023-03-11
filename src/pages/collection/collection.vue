<template>
  <uni-nav-bar :fixed="true" background-color="#f9f9f9" shadow status-bar>
    <view>
      <view
        style="
          margin-left: 181rpx;
          margin-top: 23rpx;
          font-size: 35rpx;
          font-weight: bold;
        "
        >图鉴
      </view>
    </view>
  </uni-nav-bar>
  <view class="content">
    <!-- 搜索框 -->
    <view
      class="border d-flex mx-3 a-center j-sb px-3 mt-1"
      style="
        height: 80rpx;
        border-radius: 50rpx;
        border-color: #a0cce9;
        border-width: 3rpx;
      "
    >
      <input v-model="searchText" maxlength="20" placeholder="搜索猫咪" />
      <image
        mode="widthFix"
        src="/static/images/search.png"
        style="width: 60rpx"
        @click="onClickSearch"
      />
    </view>
    <!-- 校区选择框   -->
    <view class="school-box">
      <view class="school-select-box">
        <image :src="Icons.Location" class="arrow" />
        <view class="school-name">
          {{ currentSchool }}
        </view>
        <view class="switch-box">
          <button class="switch" size="mini" @click="onClickSwitch">
            ⇌ 切换学校
          </button>
        </view>
      </view>
      <view class="school-select-box">
        <view class="navbar">
          <view
            v-for="(item, index) in campuses.data"
            :key="index"
            :class="'navbtn ' + (currentCampus === item.name ? 'current' : '')"
            @click="setBranch(item.name, index)"
          >
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <search-cats
      v-if="isClickCollectionSearch"
      search="cat"
      :keyword="searchText"
    ></search-cats>
    <search-cats v-if="!isClickCollectionSearch" search="default"></search-cats>
  </view>
  <tab-bar id="3"></tab-bar>
</template>

<script lang="ts" setup>
import { Icons, Pages } from "@/utils/url";
import { reactive, ref } from "vue";
import { StorageKeys } from "@/utils/const";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { Community } from "@/apis/schemas";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { listCommunity } from "@/apis/community/community";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";
import SearchCats from "@/pages/search/search-cats.vue";

const currentSchool = ref("");
const currentCampus = ref("");
let communityId = ref("");
let parentId = ref("");

let searchText = ref("");

/**
 * isClickSearch为false时显示所有猫咪
 * 为true时显示搜索猫咪
 */
let isClickCollectionSearch = ref(false);

searchText.value = uni.getStorageSync(StorageKeys.searchText);
isClickCollectionSearch.value = uni.getStorageSync(
  StorageKeys.isClickCollectionSearch
);

function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}

const lists = reactive<{ data: Community[] }>({ data: [] });

const campuses = reactive<{ data: Community[] }>({ data: [] });

function onClickSearch() {
  isClickCollectionSearch.value = true;
  if (searchText.value === "") {
    isClickCollectionSearch.value = false;
  }
  uni.setStorageSync(StorageKeys.searchText, searchText.value);
  uni.setStorageSync(
    StorageKeys.isClickCollectionSearch,
    isClickCollectionSearch.value
  );
  uni.reLaunch({
    url: "/pages/collection/collection"
  });
}

async function schoolList() {
  lists.data = (
    await listCommunity({
      parentId: ""
    })
  ).communities;
}

async function getCampus() {
  schoolList().then(async () => {
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
    campuses.data = (
      await listCommunity({
        parentId: parentId.value
      })
    ).communities;
  });
}

getCampus();

let isRefreshing = ref<boolean>(false);
onPullDownRefresh(() => {
  setTimeout(function () {
    uni.stopPullDownRefresh();
    isRefreshing.value = false;
  }, 1000);
  isRefreshing.value = true;
});

function setBranch(e: string, index: number) {
  uni.setStorageSync(StorageKeys.CommunityId, campuses.data[index].id);
  currentCampus.value = e;
}

function onClickSwitch() {
  uni.navigateTo({
    url: Pages.SchoolSelect
  });
}

onShow(() => {
  if (uni.getStorageSync(StorageKeys.CommunityId) !== communityId.value) {
    getCampus();
  }
});
</script>

<style lang="scss" scoped>
.arrow {
  width: 44rpx;
  height: 50rpx;
  margin: 25rpx 0 30rpx 20rpx;
}

.content {
  background-color: #fafcff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20rpx;
}

.switch {
  border-radius: 20px;
  margin-right: 20rpx;
  color: #1fa1ff;
  font-size: 25rpx;
  background: white;
  border: solid #1fa1ff 1px;
}

.navbar {
  background-color: #fafcff;
  display: flex;
  color: #b8b8b8;
  font-size: calc(15 / 390 * 100vw);
  align-items: baseline;
  width: 100vw;
  margin: 0 0 0 60rpx;
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: 20rpx;
  margin: 0 20rpx;

  &.current {
    color: #ffffff;
    background-color: #1fa1ff;
    padding: 10rpx 15rpx 10rpx 15rpx;
    border-radius: 15rpx;
    font-size: 25rpx;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
}

.switch-box {
  margin-left: auto;
  margin-top: 20rpx;
  margin-right: 10rpx;
}

.school-box {
  height: 12vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 10rpx;
}

.school-select-box {
  background-color: #fafcff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.school-name {
  margin: 20rpx 10rpx 0 10rpx;
  font-weight: bold;
  border-bottom: 2px solid skyblue;
  height: 55rpx;
  font-size: 40rpx;
}

.swiper-box {
  width: 100vw;
}

.swiper {
  height: 20vh;
}

.swiper-item {
  display: block;
  height: 20vh;
  line-height: 15vh;
  text-align: center;
}

.out {
  padding: 5rpx 30rpx 5rpx;

  .row {
    background-color: #ffffff;
    border-radius: 25px;
    border: 5rpx solid #f1f1f1;
    padding: 10rpx 0;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
  }
}
</style>
