<template>
  <UniNavBar :fixed="true" shadow status-bar background-color="#f9f9f9">
    <view
      class="d-flex a-center left"
      style="position: absolute; left: 40rpx; bottom: 25rpx"
      @click="enterMessage"
    >
      <image :src="Icons.Message" style="width: 45rpx; height: 35rpx"></image>
      <!-- 暂时将数量写为0 -->
      <view v-show="false" class="font-sm px-1 message-count">0</view>
    </view>
    <view class="font-weight font-md2" style="margin: auto">喵世界</view>
  </UniNavBar>
  <view class="navbar">
    <view :class="types[0].className" @click.prevent="types[0].onClick">
      {{ types[0].name }}
    </view>
    |
    <view :class="types[1].className" @click.prevent="types[1].onClick">
      {{ types[1].name }}
    </view>
    |
    <view :class="types[2].className" @click.prevent="types[2].onClick">
      {{ types[2].name }}
    </view>
    |
    <view :class="types[3].className" @click.prevent="types[3].onClick">
      {{ types[3].name }}
    </view>
    <view class="search" @click.prevent="search" />
  </view>

  <view class="blue-background">
    <view class="top-padding" />

    <WorldPosts
      v-if="!isRefreshing"
      search="default"
      :only-official="onlyOfficial"
    />
    <view class="empty-bottom"></view>
  </view>

  <TabBar id="3"></TabBar>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { onLoad, onPullDownRefresh, onReady } from "@dcloudio/uni-app";
import { Icons, Pages } from "@/utils/url";
import WorldPosts from "@/pages/world/world-posts.vue";
import { search } from "./utils";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";
import { StorageKeys } from "@/utils/const";

//搜索界面需要用到的缓存
uni.removeStorageSync(StorageKeys.Search);
uni.setStorageSync(StorageKeys.IsClickSearch, false);
const onlyOfficial = ref(false);
const types = reactive([
  {
    name: "官方",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("官方");
      onlyOfficial.value = true;
      pageRefresh();
    }
  },
  {
    name: "热度",
    isCurrent: true,
    className: "navbtn current",
    onClick: () => {
      toggleSelf("热度");
      onlyOfficial.value = false;
      pageRefresh();
    }
  },
  {
    name: "最新",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("最新");
      onlyOfficial.value = false;
      pageRefresh();
    }
  },
  {
    name: "关注",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("关注");
      onlyOfficial.value = false;
      pageRefresh();
    }
  }
]);

const toggleSelf = (name: string) => {
  if (!types.filter((type) => type.name === name)[0].isCurrent) {
    types.map((type) => {
      type.isCurrent = false;
      type.className = "navbtn";
    });
    const currentType = types.filter((type) => type.name === name)[0];
    currentType.isCurrent = true;
    currentType.className = "navbtn current";
  }
};

const isRefreshing = ref(false);

function pageRefresh() {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 1);
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

function enterMessage() {
  uni.navigateTo({
    url: Pages.Message
  });
}

onLoad(() => {
  uni.showLoading({
    title: "加载中"
  });
});

onReady(() => {
  uni.hideLoading();
});
</script>

<style lang="scss" scoped>
@import "@/common/user-info.scss";

body {
  font-family: sans-serif;
  background-color: #fafcff;
}

.blue-background {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
}

.message-count {
  background-color: red;
  color: white;
  margin-left: -20rpx;
  margin-top: 20rpx;
  z-index: 99;
  border-radius: 20rpx;
}

.navbar {
  position: fixed;
  background-color: #fafcff;
  display: flex;
  color: #b8b8b8;
  font-size: calc(13 / 390 * 100vw);
  align-items: center;
  width: 100vw;
  padding-top: calc(10 / 390 * 100vw);
  padding-bottom: calc(16 / 390 * 100vw);
  transition-duration: 0.4s;
  z-index: 100;
}

.navbtn {
  color: #939393;
  font-size: calc(14 / 390 * 100vw);
  margin: 0 calc(20 / 390 * 100vw);

  &:active {
    color: #1c74b9 !important;
  }

  &.current {
    color: #1fa1ff;
    font-size: calc(20 / 390 * 100vw);
    padding-bottom: calc(2 / 390 * 100vw);
    border-bottom: calc(1 / 390 * 100vw) #1fa1ff solid;
    font-weight: bold;
  }
}

.search {
  width: calc(35 / 390 * 100vw);
  height: calc(35 / 390 * 100vw);
  background-image: url("/static/images/search-grey.png");
  background-size: 100% 100%;
  position: fixed;
  z-index: 10;
  right: calc(18 / 390 * 100vw);
}

.top-padding {
  height: calc(56 / 390 * 100vw);
}

.empty-bottom {
  height: 140rpx;
}
</style>
