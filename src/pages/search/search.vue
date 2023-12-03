<template>
  <TopBar :has-go-back="true">
    <template #center>搜索</template>
  </TopBar>
  <view class="page">
    <view
      class="d-flex border a-center j-sb mx-2 mb-2"
      style="border-radius: 70rpx; height: 70rpx"
    >
      <view class="d-flex a-center">
        <image
          :src="Icons.Search"
          class="ml-2"
          style="width: 40rpx; height: 40rpx"
        >
        </image>
        <input
          ref="getValue"
          v-model="searchText"
          class="search-text ml-2"
          maxlength="20"
          placeholder="帖子 | 动态 | 图鉴"
          type="text"
        />
      </view>
      <view class="mr-2" style="color: #57a4da" @click="onClickSearch">
        搜索
      </view>
    </view>
    <view v-if="!showContent">
      <view v-if="list.length !== 0">
        <view class="d-flex a-center pl-2 pb-1">
          <image
            :src="Icons.Collection"
            style="width: 45rpx; height: 45rpx"
          ></image>
          <view class="ml-1 mb-1" style="color: #999999; font-size: 32rpx"
            >最近搜索
          </view>
        </view>

        <!-- 搜索历史列表 -->
        <view class="px-1 mb-2">
          <view
            v-for="(item, index) in list"
            :key="index"
            :style="getStyle"
            class="px-3 py-1 border d-inline-block m-1 font-md"
            hover-class="bg-light"
            style="border-radius: 40rpx; color: #515151"
            @click="clickSearchHistory(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
      <view v-else class="pl-2 font-md" style="color: #999999">
        还没有搜索历史~
      </view>
    </view>

    <view v-else>
      <view style="margin-top: 20upx">
        <zzx-tabs
          ref="mytabs"
          :current="current"
          :items="items"
          @click-item="onClickItem"
        >
        </zzx-tabs>
      </view>
      <view
        style="
          margin-top: 20upx;
          color: #999999;
          font-size: 24upx;
          height: 260upx;
        "
      >
        <template v-if="current === 0">
          <!-- 帖子 -->
          <WorldPosts :keyword="searchText"></WorldPosts>
        </template>
        <template v-else-if="current === 1">
          <!-- 动态 -->
          <Masonry :loader-builder="() => buildLoader(searchText)"></Masonry>
        </template>
        <template v-else-if="current === 2">
          <!-- 图鉴 -->
          <search-cats :keyword="searchText" search="cat"></search-cats>
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import WorldPosts from "@/pages/world/WorldPosts.vue";
import SearchCats from "@/pages/search/SearchCats.vue";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
import { Icons, Pages } from "@/utils/url";
import TopBar from "@/components/TopBar.vue";
import { StorageKeys } from "@/utils/const";
import { onLoad } from "@dcloudio/uni-app";
import { buildLoader } from "@/pages/community/utils";
import Masonry from "@/pages/community/Masonry.vue";

const items = ["帖子", "动态", "图鉴"];

const searchText = ref("");

let list = reactive<string[]>([]);

const current = ref(0);

const showContent = ref(false);

onLoad((query: any) => {
  showContent.value = query.showContent;
  searchText.value = query.searchText;
});

let historyText = uni.getStorageSync(StorageKeys.HistorySearchText);
if (list.length === 0 && historyText) {
  list = JSON.parse(
    decodeURIComponent(uni.getStorageSync(StorageKeys.HistorySearchText))
  );
}

function onClickItem(e: any) {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
}

function onClickSearch() {
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
    let index = list.findIndex((v) => v === searchText.value);
    if (index !== -1) {
      if (index !== 0) {
        list.unshift(list.splice(index, 1)[0]);
      }
    } else {
      list.unshift(searchText.value);
    }
    // 保存到本地存储
    if (list.length !== 0) {
      uni.setStorageSync(
        StorageKeys.HistorySearchText,
        encodeURIComponent(JSON.stringify(list))
      );
    }
  } else {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "none"
    });
  }
  uni.redirectTo({
    url: `${Pages.Search}?showContent=true&searchText=${searchText.value}`
  });
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

function clickSearchHistory(item: string) {
  searchText.value = item;
}
</script>

<style lang="scss" scoped>
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
