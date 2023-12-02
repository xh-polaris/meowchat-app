<template>
  <TopBar bg-color="#fafcff" :has-shadow="false">
    <template #left>
      <view v-if="!isRefreshing">
        <SchoolSelectBar />
      </view>
    </template>
  </TopBar>

  <view class="background">
    <!--    <view v-if="!isRefreshing">-->
    <!--      <CarouselTest />-->
    <!--    </view>-->

    <view v-if="!isRefreshing">
      <CarouselFrame />
    </view>

    <view style="height: 2vw"></view>

    <CollectionEntry></CollectionEntry>

    <!--cards是未使用的功能，暂时不管-->
    <view v-if="false">
      <Cards :card-list="cardList" />
    </view>

    <view style="height: 4vw"></view>

    <view v-if="!isRefreshing">
      <Masonry :get-previews="buildLoader()"></Masonry>
    </view>

    <view style="height: 18vw"></view>
  </view>

  <BottomBar id="community"></BottomBar>

  <template v-if="showToastBox">
    <ToastBoxWithShadow
      bold-normal-text="获得小鱼干"
      :bold-blue-text="'*' + gottenFishAmount"
      grey-text="今日首次上线"
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
</template>

<script lang="ts" setup>
import { userCheckIn } from "@/apis/user/user";
import CollectionEntry from "@/pages/community/CollectionEntry.vue";
import BottomBar from "@/components/BottomBar.vue";
import { nextTick, reactive, ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import SchoolSelectBar from "@/components/SchoolSelectBar.vue";
import Cards from "@/pages/community/cards/cards.vue";
import CarouselFrame from "@/pages/community/CarouselFrame.vue";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import { StorageKeys } from "@/utils/const";
import { needChooseCommunity } from "@/utils/init";
import { Pages } from "@/utils/url";
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";
import { buildLoader } from "@/pages/community/utils";
import Masonry from "@/pages/community/Masonry.vue";
const communityId = ref(uni.getStorageSync(StorageKeys.CommunityId));
const cardList = reactive(["", "", "", "", "", ""]);

const isRefreshing = ref(true);

const showToastBox = ref(false);
const closeToastBox = () => {
  showToastBox.value = false;
};
const gottenFishAmount = ref(0);

function pageRefresh() {
  isRefreshing.value = true;
  nextTick(() => {
    isRefreshing.value = false;
  });
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

onLoad(() => {
  if (needChooseCommunity.value) {
    uni.navigateTo({ url: Pages.SchoolSelect });
  }
  uni.showLoading({
    title: "加载中"
  });
  isRefreshing.value = false;
});

onReady(() => {
  uni.hideLoading();
  //签到获取小鱼干
  const checkIn = async () => {
    const resp = await userCheckIn();
    console.log(resp);
    if (resp.isFirst) {
      gottenFishAmount.value = resp.getFishNum;
      showToastBox.value = true;
    }
  };
  checkIn();
});

onShow(() => {
  if (
    !communityId.value ||
    communityId.value !== uni.getStorageSync(StorageKeys.CommunityId)
  ) {
    communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
    pageRefresh();
  }
});
</script>

<style lang="scss" scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
}
</style>
