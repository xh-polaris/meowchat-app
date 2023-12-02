<template>
  <template v-if="!isRefreshing && plan">
    <BackgroundImage
      :url="plan.coverUrl"
      :urls="[plan.coverUrl]"
    ></BackgroundImage>
    <BackButton></BackButton>
    <view class="background">
      <template v-if="isInited && plan">
        <Cards :plan="plan"></Cards>
      </template>
      <view style="height: 20vw"></view>
    </view>
    <template v-if="showDonatePanel && plan">
      <DonatePanel
        :plan="plan"
        :my-fish="myFish"
        :fish-i-wanna-donate="fishIWannaDonate"
        @hide-donate-panel="setShowDonatePanel(false)"
        @set-fish-i-wanna-donate="setFishIWannaDonate"
      />
    </template>
  </template>
  <template v-if="toastStatus === ToastStatus.DONATED">
    <ToastBoxWithShadow
      bold-normal-text="助力小鱼干"
      :bold-blue-text="'*' + fishIWannaDonate"
      grey-text=""
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
  <template v-if="toastStatus === ToastStatus.NOT_ENOUGH">
    <ToastBoxWithShadow
      bold-normal-text="小鱼干不足"
      bold-blue-text=""
      grey-text=""
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
  <template v-if="plan?.maxFish > plan?.nowFish">
    <BottomBar @on-help-click="clickDonateButton"></BottomBar>
  </template>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import Cards from "@/pages/plan/plan-details/Cards.vue";
import BottomBar from "@/pages/plan/plan-details/BottomBar.vue";
import BackButton from "@/components/BackButton.vue";
import { GetPlanDetailReq } from "@/apis/plan/plan-interfaces";
import { Plan } from "@/apis/schemas";
import { donateFish, getPlanDetail, getUserFish } from "@/apis/plan/plan";
import BackgroundImage from "@/components/BackgroundImage.vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";

import DonatePanel from "@/pages/plan/plan-details/DonatePanel.vue";

const props = defineProps<{
  id: string;
}>();

const getPlanDetailReq = reactive<GetPlanDetailReq>({
  planId: props.id
});

const plan = ref<Plan>();
const myFish = ref(0);
const fishIWannaDonate = ref(10);
const isInited = ref(false);

const setFishIWannaDonate = (num: number) => {
  if (num < 0) return;
  if (num > myFish.value) return;
  fishIWannaDonate.value = num;
};

const getData = async () => {
  plan.value = (await getPlanDetail(getPlanDetailReq)).plan;
  myFish.value = (await getUserFish({})).fish;
  isInited.value = true;
};

const isRefreshing = ref(false);

function pageRefresh() {
  isRefreshing.value = true;
  isInited.value = false;
  getData();
  nextTick(() => {
    isRefreshing.value = false;
  });
}

const enum ToastStatus {
  NO_TOAST,
  DONATED,
  NOT_ENOUGH
}

const toastStatus = ref(ToastStatus.NO_TOAST);
const showDonatePanel = ref(false);
const setShowDonatePanel = (bool: boolean) => {
  showDonatePanel.value = bool;
};

const clickDonateButton = () => {
  if (showDonatePanel.value) {
    if (fishIWannaDonate.value > myFish.value) {
      toastStatus.value = ToastStatus.NOT_ENOUGH;
    } else {
      toastStatus.value = ToastStatus.DONATED;
      donateFish({ planId: props.id, fish: fishIWannaDonate.value });
    }
  } else {
    setShowDonatePanel(true);
  }
};

const closeToastBox = () => {
  let refresh = false;
  if (toastStatus.value === ToastStatus.DONATED) refresh = true;
  toastStatus.value = ToastStatus.NO_TOAST;
  showDonatePanel.value = false;
  if (refresh) pageRefresh();
};

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

getData();
</script>

<style scoped lang="scss">
.background {
  margin-top: 60vw;
  background-color: #f6f6f6;
  min-height: 80vh;
}

.cat-image {
  position: fixed;
  width: 100vw;
  height: 68vw;
  z-index: -1;
  top: 0;
}
</style>
