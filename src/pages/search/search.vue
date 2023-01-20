<template>
  <view class="page">
    <view class="search-bar">
      <view class="search-bar-box">
        <input
          ref="getValue"
          v-model="searchText"
          class="search-text"
          maxlength="20"
          placeholder="搜索帖子|动态|图鉴"
          type="text"
        />
        <image class="search-span" src="/static/images/search_span.png" />
      </view>
      <view v-if="isClickSearch" class="cancel" @click="onClickCancel">
        取消
      </view>
      <view v-if="!isClickSearch" class="search" @click="onClickSearch">
        搜索
      </view>
    </view>
    <view v-if="!isClickSearch" class="">
      <view v-if="list.length !== 0" class="pl-2 pb-1 font-md">历史记录</view>

      <!-- 搜索历史列表 -->
      <view v-if="list.length !== 0" class="px-1 mb-2">
        <view
          v-for="(item, index) in list"
          :key="index"
          hover-class="bg-light"
          class="px-2 py-1 border d-inline-block m-1 font-md"
          :style="getStyle"
          style="border-radius: 20rpx"
          @click="clickSearchHistory(item)"
        >
          {{ item }}
        </view>
      </view>
      <view v-if="list.length === 0" class="pl-2 font-md">
        还没有搜索历史~
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-if="isClickSearch" class="QS-tabs-box">
      <QSTabs
        ref="tabs"
        :tabs="tabs"
        animation-mode="line3"
        :current="current"
        active-color="#adadad"
        line-color="#1FA1FF"
        swiper-width="750"
        @change="change"
      >
      </QSTabs>
    </view>
    <swiper
      v-if="isClickSearch"
      :style="{ height: '1200rpx' }"
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <!-- 帖子 -->
      <swiper-item :key="index" class="swiper-item">
        <scroll-view scroll-y style="height: 100%; width: 100%">
          <world-posts
            :search="{ type: 'post' }"
            :keyword="searchText"
          ></world-posts>
        </scroll-view>
      </swiper-item>
      <!-- 动态 -->
      <swiper-item :key="index" class="swiper-item">
        <scroll-view scroll-y style="height: 100%; width: 100%">
          <masonry
            v-if="!isRefreshing"
            :search="{ type: 'moment' }"
            :keyword="searchText"
          />
        </scroll-view>
      </swiper-item>
      <!-- 图鉴 -->
      <swiper-item :key="index" class="swiper-item">
        <scroll-view scroll-y style="height: 100%; width: 100%">
          <search-cats
            :search="{ type: 'cat' }"
            :keyword="searchText"
          ></search-cats>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
import WorldPosts from "@/pages/world/world-posts";
import Masonry from "@/pages/community/masonry";
import SearchCats from "@/pages/search/search-cats.vue";

const tabs = ["帖子", "动态", "图鉴"];

let searchText = ref("");
// 搜索历史
let list = ref([]);
//是否点击搜索
let isClickSearch = ref(false);

let current = ref(0);
let swiperCurrent = ref(0);
const { proxy } = getCurrentInstance();

onLoad(() => {
  if (list.value.length === 0) {
    list.value = JSON.parse(uni.getStorageSync("historySearchText"));
  }
});

function change(index) {
  swiperCurrent.value = index;
}

function transition({ detail: { dx } }) {
  proxy.$refs.tabs.setDx(dx);
}

function animationfinish({ detail: { current } }) {
  proxy.$refs.tabs.setFinishCurrent(current);
  swiperCurrent.value = current;
}

function onClickCancel() {
  isClickSearch.value = !isClickSearch.value;
}

function onClickSearch() {
  isClickSearch.value = !isClickSearch.value;
  // 收起键盘
  uni.hideKeyboard();
  uni.showLoading({
    title: "加载中",
    mask: false
  });
  setTimeout(function () {
    uni.hideLoading();
  }, 1000);
  if (searchText.value !== "") {
    // 加入搜索历史
    let index = list.value.findIndex((v) => v === searchText.value);
    if (index !== -1) {
      if (index !== 0) {
        list.value.unshift(list.value.splice(index, 1)[0]);
      }
    } else {
      list.value.unshift(searchText.value);
    }
    // 保存到本地存储
    if (list.value.length !== 0) {
      uni.setStorageSync("historySearchText", JSON.stringify(list.value));
    }
  } else {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "none"
    });
  }
}
let getStyle = computed(() => {
  let color = {
    borderColor: ["#eea6aa", "#98d5d8", "#9dbe93", "#bccd99", "#EAD6BC"],
    background: ["#f8eae9", "#e8f6f6", "#e4f5e2", "#f2f6e8", "#FCE8CE"]
  };
  let index = Math.floor(Math.random() * color.borderColor.length);
  let borderColor = color.borderColor[index];
  let bgColor = color.background[index];
  return `background:${bgColor};border-color:${borderColor}`;
});

function clickSearchHistory(item) {
  searchText.value = item;
}
</script>

<style scoped lang="scss">
@import "@/common/search-input.scss";

.QS-tabs-box {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
}

.swiper-item {
  background-color: #fff;
}

.scroll-items {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40rpx;
}

.scroll-item {
  margin-top: 15rpx;
  padding: 25rpx;
  background-color: white;
  border-radius: 8rpx;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid #f8f8f8;
}

.scroll-item-image-box {
  flex-grow: 0;
}

.scroll-item-text-box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 28rpx;
  font-weight: bold;
  margin-left: 15rpx;
}

.scroll-item-image {
  border-radius: 4rpx;
  width: 180rpx;
  height: 150rpx;
}
</style>
