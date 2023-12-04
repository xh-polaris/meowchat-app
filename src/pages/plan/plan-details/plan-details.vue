<template>
  <template v-if="!isRefreshing && plan">
    <BackgroundImage :urls="[plan.coverUrl]" />
    <BackButton />
    <view class="background">
      <Cards v-if="isInited" :plan="plan" />
      <view style="height: 20vw" />
    </view>
    <DonatePanel
      v-if="showDonatePanel"
      :plan="plan"
      :my-fish="myFish"
      :fish-i-wanna-donate="fishIWannaDonate"
      @hide-donate-panel="setShowDonatePanel(false)"
      @set-fish-i-wanna-donate="setFishIWannaDonate"
    />
  </template>
  <ToastBoxWithShadow
    v-if="toastStatus === ToastStatus.DONATED"
    bold-normal-text="助力小鱼干"
    :bold-blue-text="'*' + fishIWannaDonate"
    grey-text=""
    @close="closeToastBox"
  />
  <ToastBoxWithShadow
    v-if="toastStatus === ToastStatus.NOT_VALID"
    :bold-normal-text="notValidText"
    bold-blue-text=""
    grey-text=""
    @close="closeToastBox"
  />
  <BottomBar
    v-if="plan?.maxFish > plan?.nowFish"
    @on-help-click="clickDonateButton"
  />
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
import { isNumberObject } from "util/types";

const props = defineProps<{
  id: string;
}>();

const getPlanDetailReq = reactive<GetPlanDetailReq>({
  planId: props.id
});

const plan = ref<Plan>();
const myFish = ref(0);
const fishIWannaDonate = ref<number>(10);
const notValidText = ref("");
const isInited = ref(false);

const setFishIWannaDonate = (num: number) => {
  console.log(num);
  console.log(typeof num);
  // if (num <= 0) num = 1;
  // else if (num > myFish.value) num = myFish.value;
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
  NOT_VALID,
  DONATED
}

const toastStatus = ref(ToastStatus.NO_TOAST);
const showDonatePanel = ref(false);
const setShowDonatePanel = (bool: boolean) => {
  showDonatePanel.value = bool;
};

const clickDonateButton = () => {
  if (showDonatePanel.value) {
    toastStatus.value = ToastStatus.NOT_VALID;
    console.log(fishIWannaDonate.value);
    console.log(typeof fishIWannaDonate.value);
    if (Number.isNaN(fishIWannaDonate.value)) {
      notValidText.value = "输入不合法";
    } else if (fishIWannaDonate.value <= 0) {
      notValidText.value = "不能助力当前数量的小鱼干哦";
    } else if (fishIWannaDonate.value > myFish.value) {
      notValidText.value = "小鱼干不足";
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
  fishIWannaDonate.value = 10;
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
