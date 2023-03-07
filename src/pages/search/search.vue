<template>
  <view class="page">
    <view
      class="d-flex border a-center j-sb mx-2 mb-2"
      style="border-radius: 70rpx; height: 70rpx"
    >
      <view class="d-flex a-center">
        <image
          class="ml-2"
          style="width: 40rpx; height: 40rpx"
          :src="Icons.Search"
        >
        </image>
        <input
          ref="getValue"
          v-model="searchText"
          class="search-text ml-2"
          maxlength="20"
          placeholder="搜索帖子|动态|图鉴"
          type="text"
        />
      </view>
      <view style="color: #57a4da" class="mr-2" @click="onClickSearch">
        搜索
      </view>
    </view>
    <view v-if="!isClickSearch">
		<view v-if="list.length !== 0">
			<view class="d-flex a-center pl-2 pb-1">
						<image :src="Icons.Collection" style="width: 45rpx;height: 45rpx;"></image>
						<view class="ml-1 mb-1"
						style="color: #999999;font-size: 32rpx;">最近搜索</view>
					</view>
			
			<!-- 搜索历史列表 -->
			<view  class="px-1 mb-2">
			  <view
			    v-for="(item, index) in list"
			    :key="index"
			    hover-class="bg-light"
			    class="px-3 py-1 border d-inline-block m-1 font-md"
			    :style="getStyle"
			    style="border-radius: 40rpx;color: #515151;"
			    @click="clickSearchHistory(item)"
			  >
			    {{ item }}
			  </view>
			</view>
		</view>
	  <view v-else class="pl-2 font-md" style="color: #999999;">
	    还没有搜索历史~
	  </view>
    </view>

    <view v-else>
      <view style="margin-top: 20upx">
        <zzx-tabs
          ref="mytabs"
          :items="items"
          :current="current"
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
        <view v-show="current === 0">
          <!-- 帖子 -->
          <world-posts search="post" :keyword="searchText"></world-posts>
        </view>
        <view v-show="current === 1">
          <!-- 动态 -->
          <masonry search="search" :keyword="searchText" />
        </view>
        <view v-show="current === 2">
          <!-- 图鉴 -->
          <search-cats search="cat" :keyword="searchText"></search-cats>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import WorldPosts from "@/pages/world/world-posts.vue";
import Masonry from "@/pages/community/masonry.vue";
import SearchCats from "@/pages/search/search-cats.vue";
import ZzxTabs from "@/components/third-party/zzx-tabs/zzx-tabs.vue";
import { Icons } from "@/utils/url";

const items = ["帖子", "动态", "图鉴"];

const searchText = ref("");

searchText.value = uni.getStorageSync("search");

let list = reactive<string[]>([]);

const current = ref(0);

const isClickSearch = ref(false);

isClickSearch.value = uni.getStorageSync("isClickSearch");

let historyText = uni.getStorageSync("historySearchText");
  if (list.length === 0 && historyText) {
    list = JSON.parse(
      decodeURIComponent(uni.getStorageSync("historySearchText"))
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
    uni.setStorageSync("search", searchText.value);
    // 加入搜索历史
    uni.setStorageSync("isClickSearch", true);
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
        "historySearchText",
        encodeURIComponent(JSON.stringify(list))
      );
    }
  } else {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "none"
    });
  }
  uni.navigateTo({
    url: "/pages/search/search"
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

<style scoped lang="scss">
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
