<template>
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
        src="/static/images/search.png"
        style="width: 60rpx; height: 60rpx"
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
          <view class="switch" @click="onClickSwitch"
            ><text class="font-md">⇌</text> {{ switchText }}
          </view>
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
    <template v-if="!isRefreshing">
      <search-cats
        v-if="isClickCollectionSearch"
        search="cat"
        :keyword="searchText"
		choose="choose"
      ></search-cats>
      <search-cats
        v-if="!isClickCollectionSearch"
        search="default"
		choose="choose"
      ></search-cats>
    </template>
  </view>
  <view class="empty-bottom"></view>
  <tab-bar id="2"></tab-bar>
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

const switchText = ref("\u00A0 切换学校");
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

searchText.value = uni.getStorageSync(StorageKeys.SearchText);
isClickCollectionSearch.value = uni.getStorageSync(
  StorageKeys.IsClickCollectionSearch
);

function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}

const lists = reactive<{ data: Community[] }>({ data: [] });

const campuses = reactive<{ data: Community[] }>({ data: [] });

function onClickSearch() {
  isClickCollectionSearch.value = searchText.value !== "";
  uni.setStorageSync(StorageKeys.SearchText, searchText.value);
  uni.setStorageSync(
    StorageKeys.IsClickCollectionSearch,
    isClickCollectionSearch.value
  );
  refresh();
}

async function schoolList() {
  lists.data = (await listCommunity({})).communities;
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
  refresh();
});

function refresh() {
  setTimeout(function () {
    uni.stopPullDownRefresh();
    isRefreshing.value = false;
  }, 1);
  isRefreshing.value = true;
}

function setBranch(e: string, index: number) {
  uni.setStorageSync(StorageKeys.CommunityId, campuses.data[index].id);
  currentCampus.value = e;
  refresh();
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
  isClickCollectionSearch.value = false;
  searchText.value = "";
  refresh();
});
</script>

<style lang="scss" scoped>
.global {
  background-color: #fafcff;
  width: 100vh;
  height: 100vh;
}

.arrow {
  width: 40rpx;
  height: 48rpx;
  margin: 27rpx 0 30rpx 20rpx;
}

.content {
  background-color: #fafcff;
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.switch {
  padding: 5rpx 25rpx 5rpx 25rpx;
  border-radius: 20px;
  margin-right: 20rpx;
  margin-top: 5rpx;
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
  margin: 0 0 0 50rpx;
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: 28rpx;
  margin: 0 20rpx;

  &.current {
    color: #ffffff;
    background-color: #1fa1ff;
    padding: 12rpx 20rpx 15rpx 20rpx;
    border-radius: 15rpx;
    font-size: 28rpx;
    box-shadow: 0 4px 10px rgba(74, 128, 240, 0.3);
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
  margin-bottom: 24upx;
}

.school-select-box {
  background-color: #fafcff;
  display: flex;
  flex-direction: row;
  //justify-content: space-around;
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

.empty-bottom {
  height: 140rpx;
}
</style>
