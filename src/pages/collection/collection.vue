<template>
  <view class="content">
    <!-- 搜索框 -->
    <view class="search-bar">
      <view class="search-bar-box">
        <input
          v-model="searchCatPreviewsReq.keyword"
          class="search-text"
          maxlength="20"
          placeholder="搜索猫咪"
        />
        <image
          class="search-span"
          src="/static/images/search_span.png"
          @click="onClickSearch"
        />
      </view>
    </view>
    <!-- 校区选择框   -->
    <view class="school-box">
      <view class="school-select-box">
        <image class="arrow" src="../../static/images/location.png" />
        <view class="school-name">
          {{ school.name }}
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
            v-for="item in school.campuses"
            :key="item"
            :class="'navbtn ' + (currentNavBtn === item ? 'current' : '')"
            @click="setBranch(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view v-if="cats.length > 0">
      <view v-for="cat of cats" :key="cat.id" class="out">
        <view class="row" @click="onClickCatBox(cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-else>
      <image src="https://static.xhpolaris.com/nodata.png" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import CatBox from "@/pages/collection/cat-box";
import { reactive, ref } from "vue";
import { onClickCatBox } from "@/pages/collection/event";
import {
  getCatPreviews,
  searchCatPreviews,
} from "@/apis/collection/collection";
import { onReachBottom } from "@dcloudio/uni-app";
import {
  GetCatPreviewsReq,
  SearchCatPreviewsReq,
} from "@/apis/collection/collection-interfaces";
import { CatPreview } from "@/apis/schemas";

const getCatPreviewsReq = reactive<GetCatPreviewsReq>({
  page: 0,
  communityId: "637ce159b15d9764c31f9c84",
});
let searchCatPreviewsReq = reactive<SearchCatPreviewsReq>({
  communityId: "637ce159b15d9764c31f9c84",
  page: 0,
  keyword: "",
});
let cats = ref<CatPreview[]>([]);
let whetherSearch = false;
getCatPreviews(getCatPreviewsReq).then((res) => {
  cats.value.push(...res.cats);
});

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0,
});

const currentNavBtn = ref("中北校区");

function setBranch(e: string) {
  currentNavBtn.value = e;
}

function onClickSwitch() {
  uni.navigateTo({
    url: `/pages/community/school-select`,
  });
}

function onClickSearch() {
  searchCatPreviews(searchCatPreviewsReq).then((res) => {
    cats.value = [];
    cats.value = res.cats;
    whetherSearch = true;
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
</script>

<style lang="scss" scoped>
.arrow {
  width: 44rpx;
  height: 50rpx;
  margin: 25rpx 0 30rpx 20rpx;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background-color: #ffffff;
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
}

.school-box {
  height: 12vh;
  display: flex;
  flex-direction: column;
}

.school-select-box {
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.school-name {
  margin: 20rpx 10rpx 30rpx 10rpx;
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

// 搜索框
.search-bar {
  width: 100%;
  height: 100rpx;
  margin-top: 2%;
}

.search-bar-box {
  display: flex;
  margin: 0 auto;
  width: 620rpx;
  height: 70rpx;
  border: 5rpx solid #f3f7f8;
  border-radius: 50rpx;
}

.search-span {
  width: 56rpx;
  height: 56rpx;
  margin-top: 6rpx;
  margin-right: 30rpx;
}

.search-text {
  width: 100%;
  margin-top: 10rpx;
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #7f7f81;
}

.out {
  padding: 20rpx 30rpx 10rpx;

  .row {
    border-radius: 25px;
    border: 1px solid #dad6d6;
    padding: 10rpx 0;
  }
}
</style>
