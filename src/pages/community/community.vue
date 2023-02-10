<template>
  <view class="school-box">
    <view class="school-select-box">
      <image
        class="arrow"
        src="/static/images/location.png"
        @click="onClickSwitch"
      />
      <view class="names" @click="onClickSwitch">
        <view class="school-name">
          {{ currentSchool }}
        </view>
        <view class="campus-name"> ({{ currentCampus }})</view>
      </view>
      <view class="switch-box">
        <view class="switch-icon" />
        <view class="switch" @click="onClickSwitch"> 切换学校</view>
      </view>
    </view>
  </view>

  <view>
    <carousel-frame />
  </view>

  <view>
    <view class="masonry-header">
      <view class="title"> 最新动态</view>
      <view class="toggle">
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
      </view>
    </view>
    <masonry v-if="!isRefreshing" search="default" />
  </view>
  <tab-bar id="2"></tab-bar>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Masonry from "@/pages/community/masonry";
import CarouselFrame from "@/pages/community/carousel-frame";
import { onPullDownRefresh, onReachBottom, onShow } from "@dcloudio/uni-app";
import { onClickSwitch } from "@/pages/community/utils";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import { listCommunity } from "@/apis/community/community";
import { Community } from "@/apis/schemas";

const currentSchool = ref("");
const currentCampus = ref("");
let communityId = ref("");
let parentId = ref("");
function init() {
  if (!uni.getStorageSync("communityId")) {
    uni.setStorageSync("communityId", "637ce159b15d9764c31f9c84");
  }
  communityId.value = uni.getStorageSync("communityId");
  console.log(communityId.value);
}

const lists = reactive<{
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

function getCampus() {
  schoolList().then(() => {
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
  });
  console.log(lists.data);
}
getCampus();

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

onShow(() => {
  getCampus();
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
onReachBottom(() => {}); //这里的空的onReachBottom别删！！！有了这个masonry.vue的onReachBottom才能生效
</script>

<style lang="scss" scoped>
.arrow {
  width: 44rpx;
  height: 50rpx;
  margin: 30rpx 0 30rpx 20rpx;
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
  height: 14vw;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.school-select-box {
  height: 14vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.names {
  display: flex;
  align-items: baseline;
  font-size: calc(18 / 390 * 100vw);

  .school-name {
    font-weight: bold;
    border-bottom: 2px solid #1fa1ff;
    line-height: calc(18 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
    padding-bottom: calc(4 / 390 * 100vw);
  }

  .campus-name {
    color: #7f7f81;
    font-weight: bold;
    margin-left: calc(8 / 390 * 100vw);
  }
}

.switch-box {
  margin-left: auto;
  display: flex;
  align-items: center;
  border: solid #1fa1ff calc(1 / 390 * 100vw);
  padding: 0 calc(8 / 390 * 100vw);
  height: calc(22 / 390 * 100vw);
  border-radius: calc(11 / 390 * 100vw);
  margin-right: calc(12 / 390 * 100vw);

  .switch-icon {
    width: calc(12 / 390 * 100vw);
    height: calc(12 / 390 * 100vw);
    background-image: url("@/static/images/switch-blue.png");
    background-size: 100% 100%;
  }

  .switch {
    outline-style: none;
    color: #1fa1ff;
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(12 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
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
</style>
