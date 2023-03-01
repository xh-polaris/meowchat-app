<template>
  <uni-nav-bar :fixed="true" shadow status-bar background-color="#f9f9f9">
    <view>
      <view
        style="
          margin-left: 181rpx;
          margin-top: 23rpx;
          font-size: 35rpx;
          font-weight: bold;
        "
        >图鉴</view
      >
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
      <input
        v-model="searchCatPreviewsReq.keyword"
        maxlength="20"
        placeholder="搜索猫咪"
      />
      <image
        style="width: 60rpx"
        mode="widthFix"
        src="/static/images/search.png"
        @click="onClickSearch"
      />
    </view>
    <!-- 校区选择框   -->
    <view class="school-box">
      <view class="school-select-box">
        <image class="arrow" :src="Icons.Location" />
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
    <view v-if="cats.length > 0">
      <view v-for="cat of cats" :key="cat.id" class="out">
        <view class="row" @click="onClickCatBox(cat.id, cat.name)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-else>
      <image :src="Pictures.NoData" />
    </view>
  </view>
  <tab-bar id="3"></tab-bar>
</template>

<script lang="ts" setup>
import { Pictures, Icons, Pages } from "@/utils/url";
import CatBox from "@/pages/collection/cat-box.vue";
import { reactive, ref } from "vue";
import { StorageKeys } from "@/utils/const";
import { onClickCatBox } from "@/pages/collection/utils";
import {
  getCatPreviews,
  searchCatPreviews
} from "@/apis/collection/collection";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import {
  GetCatPreviewsReq,
  SearchCatPreviewsReq
} from "@/apis/collection/collection-interfaces";
import { CatPreview, Community } from "@/apis/schemas";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { listCommunity } from "@/apis/community/community";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";

const currentSchool = ref("");
const currentCampus = ref("");
let communityId = ref("");
let parentId = ref("");

function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}
const lists = reactive<{
  data: Community[];
}>({
  data: []
});

const campuses = reactive<{
  data: Community[];
}>({
  data: []
});

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

const getCatPreviewsReq = reactive<GetCatPreviewsReq>({
  page: 0,
  communityId: uni.getStorageSync(StorageKeys.CommunityId)
});
let searchCatPreviewsReq = reactive<SearchCatPreviewsReq>({
  communityId: uni.getStorageSync(StorageKeys.CommunityId),
  page: 0,
  keyword: ""
});
const allCats = ref<CatPreview[]>([]);
let cats = ref<CatPreview[]>([]);
let whetherSearch = false;

const getCatPreviewsHandler = () => {
  getCatPreviews(getCatPreviewsReq).then((res) => {
    allCats.value.push(...res.cats);
    cats.value.push(...res.cats);
  });
};
getCatPreviewsHandler();

function pageRefresh() {
  allCats.value = [];
  cats.value = [];
  getCatPreviewsHandler();
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

function setBranch(e: string, index: number) {
  uni.setStorageSync(StorageKeys.CommunityId, campuses.data[index].id);
  currentCampus.value = e;
  pageRefresh();
}

function onClickSwitch() {
  uni.navigateTo({
    url: Pages.SchoolSelect
  });
}

function onClickSearch() {
  searchCatPreviews(searchCatPreviewsReq).then((res) => {
    if (res.cats.length != 0) {
      cats.value = res.cats;
      whetherSearch = true;
    } else {
      cats.value = allCats.value;
      whetherSearch = false;
    }
  });
}

onReachBottom(() => {
  if (!whetherSearch) {
    getCatPreviewsReq.page++;
    getCatPreviews(getCatPreviewsReq).then((res) => {
      if (res.cats.length === 0) {
        uni.stopPullDownRefresh();
      } else {
        cats.value.push(...res.cats);
      }
    });
  } else {
    searchCatPreviewsReq.page++;
    searchCatPreviews(searchCatPreviewsReq).then((res) => {
      if (res.cats.length === 0) {
        uni.stopPullDownRefresh();
      } else {
        cats.value.push(...res.cats);
      }
    });
  }
});

onShow(() => {
  getCampus();
  pageRefresh();
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
