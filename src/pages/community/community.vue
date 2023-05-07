<template>
  <!--  <UniNavBar :fixed="true" status-bar background-color="#fafcff">-->
  <!--    <view-->
  <!--      class="d-flex a-center left"-->
  <!--      style="position: absolute; left: 40rpx; bottom: 25rpx"-->
  <!--      @click="onClickMessage"-->
  <!--    >-->
  <!--      &lt;!&ndash;      <image :src="Icons.Message" style="width: 45rpx; height: 35rpx"></image>&ndash;&gt;-->
  <!--      &lt;!&ndash;      &lt;!&ndash; 暂时将数量写为0 &ndash;&gt;&ndash;&gt;-->
  <!--      &lt;!&ndash;      <view v-show="false" class="font-sm px-1 message-count">0</view>&ndash;&gt;-->
  <!--    </view>-->
  <!--    &lt;!&ndash;    <view class="font-weight font-md2" style="margin: auto">喵社区</view>&ndash;&gt;-->
  <!--  </UniNavBar>-->
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
          <!--          <view class="switch-box">-->
          <!--            <view class="switch" @click="onClickSwitch"-->
          <!--              ><text class="font-md">⇌</text> 切换学校-->
          <!--            </view>-->
          <!--          </view>-->
        </view>
      </view>
    </view>
  </view>

  <view class="blue-background">
    <view v-if="!isRefreshing">
      <CarouselFrame />
    </view>
    <view v-if="false">
      <view v-if="cardList.length == 1" class="">
        <view
          class="mx-2 my-2"
          style="
            height: 200rpx;
            background-color: #ececec;
            border-radius: 20rpx;
          "
        ></view>
      </view>
      <view
        v-if="cardList.length > 1 && cardList.length <= 3"
        class="d-flex mx-2 my-2"
      >
        <view
          v-for="(item, index) in cardList"
          :key="index"
          style="
            height: 200rpx;
            background-color: #ececec;
            width: 50%;
            border-radius: 20rpx;
          "
          class="mx-1"
        >
        </view>
      </view>
      <scroll-view
        v-if="cardList.length > 3"
        scroll-x="true"
        class="d-flex mx-2 my-2 w-100 scroll-view_H"
      >
        <view
          v-for="(item, index) in cardList"
          :key="index"
          style="
            height: 200rpx;
            background-color: #ececec;
            width: 40%;
            border-radius: 20rpx;
          "
          class="mx-1 scroll-view-item_H"
        >
        </view>
      </scroll-view>
    </view>
    <view style="padding-bottom: calc(12 / 390 * 100vw)"></view>
    <view v-if="!isRefreshing">
      <MasonryFrame search="default"></MasonryFrame>
      <!--      <MasonryData></MasonryData>-->
    </view>
    <view class="empty-bottom"></view>
  </view>

  <TabBar id="1"></TabBar>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Icons } from "@/utils/url";
import MasonryFrame from "@/pages/community/masonry-frame.vue";
import CarouselFrame from "@/pages/community/carousel-frame.vue";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import { onClickSwitch } from "@/pages/community/utils";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { listCommunity } from "@/apis/community/community";
import { Community } from "@/apis/schemas";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";
import { StorageKeys } from "@/utils/const";
import { onClickMessage } from "./event";

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

// console.log(b);
// navbarHeight.value = ;

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

const types = reactive([
  {
    name: "热门",
    isCurrent: true,
    className: "label current",
    onClick: () => {
      toggleSelf("热门");
      pageRefresh();
    }
  },
  {
    name: "最新",
    isCurrent: false,
    className: "label",
    onClick: () => {
      toggleSelf("最新");
      pageRefresh();
    }
  },
  {
    name: "关注",
    isCurrent: false,
    className: "label",
    onClick: () => {
      toggleSelf("关注");
      pageRefresh();
    }
  }
]);

const toggleSelf = (name: string) => {
  if (!types.filter((type) => type.name === name)[0].isCurrent) {
    types.map((type) => {
      type.isCurrent = false;
      type.className = "label";
    });
    const currentType = types.filter((type) => type.name === name)[0];
    currentType.isCurrent = true;
    currentType.className = "label current";
  }
};

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
@import "@/common/third-party/zcm-main.css";

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}

.blue-background {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
}

.arrow {
  width: 32rpx;
  height: 40rpx;
  margin: 30rpx 0 30rpx 20rpx;
}

.nav-bar {
  background-color: #fafcff;
  width: 100vw;
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
}

.school-select-box {
  height: fit-content;
  display: flex;
  align-items: center;
  //justify-content: space-around;
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

.switch-box {
  margin-left: auto;
  display: flex;
  align-items: center;
  border: solid #1fa1ff calc(1 / 390 * 100vw);
  padding: 0 calc(12 / 390 * 100vw) 0 calc(12 / 390 * 100vw);
  height: calc(22 / 390 * 100vw);
  border-radius: 50rpx;
  margin-right: calc(10 / 390 * 100vw);

  .switch {
    outline-style: none;
    color: #1fa1ff;
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(12 / 390 * 100vw);
  }
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

.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20rpx;
}

.logo {
  height: 200rpx;
  margin: 200rpx auto 50rpx;
  width: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36rpx;
}

.masonry-header {
  border-top: 10px #fafcff solid;
  background-color: #fafcff;
  margin: 0 calc(12 / 390 * 100vw);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #353535;
    font-weight: bold;
    font-size: calc(18 / 390 * 100vw);
  }

  .toggle {
    display: flex;
    align-items: center;
    color: #b8b8b8;
    font-size: calc(10 / 390 * 100vw);
    transform: translateX(calc(9 / 390 * 100vw));

    .label {
      color: #939393;
      font-size: calc(12 / 390 * 100vw);
      padding: 0 calc(9 / 390 * 100vw);

      &:active {
        color: #1e1e1e !important;
      }

      &.current {
        color: #353535;
      }
    }
  }
}

.empty-bottom {
  height: 130rpx;
}
</style>
