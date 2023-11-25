<template>
  <template v-if="!isRefreshing">
    <BackgroundImage
      :url="plan?.coverUrl"
      :urls="[plan?.coverUrl]"
    ></BackgroundImage>
    <BackButton></BackButton>
    <view class="background">
      <template v-if="isInited">
        <Cards :plan="plan"></Cards>
      </template>
      <view style="height: 20vw"></view>
    </view>
    <template v-if="showHelp && isInited">
      <view class="shadow" @click="switchState(false)">
        <view class="overlay" @click.stop.prevent>
          <view class="pull-up-container">
            <view class="pull-up-header">
              <!-- Header content goes here -->
              <view class="title bold-text"
                >目标小鱼干：{{ plan?.maxFish }}</view
              >
              <view class="subtitle grey-text">
                <text>距离完成目标还剩</text>
                <text class="blue">{{ plan?.maxFish - plan?.nowFish }}</text>
                <text>小鱼干</text>
              </view>
              <view class="my-balance bold-text">我的余额：{{ myFish }}</view>
            </view>

            <view class="counter">
              <view class="now-fish grey-text">当前捐赠</view>
              <view class="input-bar">
                <image
                  :src="Icons.Button_Decrement"
                  mode="scaleToFill"
                  class="counter-button"
                  @touchstart="startDecrementing"
                  @touchend="stopDecrementing"
                  @touchcancel="stopDecrementing"
                />
                <input
                  ref="input"
                  v-model="count"
                  type="number"
                  class="count-display"
                />
                <image
                  :src="Icons.Button_Increment"
                  mode="scaleToFill"
                  class="counter-button"
                  @touchstart="startIncrementing"
                  @touchend="stopIncrementing"
                  @touchcancel="stopIncrementing"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>
  </template>
  <template v-if="showToast === 1">
    <ToastBoxWithShadow
      bold-normal-text="助力小鱼干"
      :bold-blue-text="'*' + count"
      grey-text=""
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
  <template v-if="showToast === -1">
    <ToastBoxWithShadow
      bold-normal-text="小鱼干不足"
      :bold-blue-text="count"
      grey-text=""
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
  <BottomBar @on-help-click="switchState(true)"></BottomBar>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import Cards from "@/pages/plan/plan-details/Cards.vue";
import BottomBar from "@/pages/plan/plan-details/BottomBar.vue";
import BackButton from "@/components/BackButton.vue";
import { GetPlanDetailReq } from "@/apis/plan/plan-interfaces";
import { Plan } from "@/apis/schemas";
import { getPlanDetail, getUserFish, donateFish } from "@/apis/plan/plan";
import BackgroundImage from "@/components/BackgroundImage.vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";
import { clearInterval, setInterval } from "timers";
import { Icons } from "@/utils/url";

const showToast = ref<number>(0);

const closeToastBox = () => {
  let refresh = false;
  if (showToast.value === 1) refresh = true;
  showToast.value = 0;
  if (refresh) pageRefresh();
};

const state = ref<number>(0);
const showHelp = ref<boolean>(false);

const count = ref<number>(10); // Initialize the count value

const increment = () => {
  if (count.value < myFish.value) {
    count.value++;
    // if (speed > 50) {
    //   speed -= 10;
    //   restartInterval();
    // }
  } // Increment count
};

const decrement = () => {
  if (count.value > 0) {
    count.value--; // Decrement count
  }
};

// let intervalId: string | number | NodeJS.Timeout | undefined = undefined;
let speed = 200; // Initial speed in milliseconds
// const restartInterval = () => {
//   clearInterval(intervalId);
//   intervalId = setInterval(increment, speed);
// };

const startIncrementing = () => {
  increment();
  // intervalId = setInterval(increment, speed);
};
const stopIncrementing = () => {
  // clearInterval(intervalId);
  // speed = 200;
};
const startDecrementing = () => {
  decrement();
};
const stopDecrementing = () => {};

const props = defineProps<{
  id: string;
}>();

const getPlanDetailReq = reactive<GetPlanDetailReq>({
  planId: props.id
});

const plan = ref<Plan>();
const myFish = ref<number>(0);

let isInited = ref<boolean>(false);

const getData = async () => {
  plan.value = (await getPlanDetail(getPlanDetailReq)).plan;
  myFish.value = (await getUserFish({})).fish;
  count.value = 10;
  isInited.value = true;
};

// 一个基于助力按钮的页面的状态机
const switchState = (fromButton: boolean) => {
  if (state.value === 0) {
    state.value = 1;
    showHelp.value = true;
  } else if (state.value === 1) {
    state.value = 0;
    if (!fromButton) {
      showHelp.value = false;
      return;
    }
    if (count.value > myFish.value) {
      showToast.value = -1;
      return;
    }
    donateFish({ planId: props.id, fish: count.value });
    showHelp.value = false;
    showToast.value = 1;
  }
};

const isRefreshing = ref(false);

function pageRefresh() {
  isRefreshing.value = true;
  getData();
  nextTick(() => {
    isRefreshing.value = false;
  });
}

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
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 20vh;
  width: 100vw;
  height: 80vh;
  background-color: #22222288;
  display: flex;
  z-index: 1;
}
.overlay {
  position: fixed;
  bottom: 20vw;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top-left-radius: 6vw;
  border-top-right-radius: 6vw;
  padding: 10vw;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.pull-up-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .pull-up-header {
    .bold-text {
      font-weight: bold;
    }
    .grey-text {
      color: #9a9a9a;
      font-size: 3.8vw;
      .blue {
        color: #1f5fff;
      }
    }
    .my-balance {
      margin-top: 2vh;
      margin-bottom: 1vh;
    }
  }
  .counter {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    border: 1vw solid skyblue;
    border-radius: 5vw;
    height: 20vh;
    width: 80vw;
    .grey-text {
      color: #9a9a9a;
      font-size: 3.8vw;
    }
    .now-fish {
      margin-bottom: 1vh;
    }
    .input-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .count-display {
        font-size: 24px;
        width: 30vw;
        height: 5vh;
        text-align: center;

        background-color: #dedede;
      }
    }
  }
}

.counter-button {
  display: inline-block;
  width: 16vw;
  height: 16vw;
  line-height: 16vw;
  text-align: center;
  border: 1px solid #000;
  border-radius: 8vw;
}
</style>
