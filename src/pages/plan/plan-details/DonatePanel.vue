<template>
  <view class="shadow" @click="hide">
    <view class="overlay" @click.stop.prevent>
      <view class="pull-up-container">
        <view class="pull-up-header">
          <!-- Header content goes here -->
          <view class="title bold-text">目标小鱼干：{{ plan?.maxFish }}</view>
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
              @click="decrement"
            />
            <input
              ref="input"
              :value="fishIWannaDonate"
              type="number"
              class="count-display"
              @change="(ev) => setFishIWannaDonate(Number(ev.target.value))"
            />
            <image
              :src="Icons.Button_Increment"
              mode="scaleToFill"
              class="counter-button"
              @click="increment"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
import { Plan } from "@/apis/schemas";
import { ref } from "vue";
import { donateFish } from "@/apis/plan/plan";

const props = defineProps<{
  fishIWannaDonate: number;
  plan: Plan;
  myFish: number;
}>();
const emits = defineEmits(["setFishIWannaDonate", "hideDonatePanel"]);
const setFishIWannaDonate = (num: number) => {
  emits("setFishIWannaDonate", num);
};
const hide = () => {
  emits("hideDonatePanel");
};

const count = ref<number>(10); // Initialize the count value
const increment = () => {
  setFishIWannaDonate(props.fishIWannaDonate + 1);
};

const decrement = () => {
  setFishIWannaDonate(props.fishIWannaDonate - 1);
};

// // let intervalId: string | number | NodeJS.Timeout | undefined = undefined;
// let speed = 200; // Initial speed in milliseconds
// // const restartInterval = () => {
// //   clearInterval(intervalId);
// //   intervalId = setInterval(increment, speed);
// // };
//
// const startIncrementing = () => {
//   increment();
//   // intervalId = setInterval(increment, speed);
// };
// const stopIncrementing = () => {
//   // clearInterval(intervalId);
//   // speed = 200;
// };
// const startDecrementing = () => {
//   decrement();
// };
// // eslint-disable-next-line @typescript-eslint/no-empty-function
// const stopDecrementing = () => {};

// 一个基于助力按钮的页面的状态机
// const switchState = (fromButton: boolean) => {
//   if (state.value === 0) {
//     state.value = 1;
//     showHelp.value = true;
//   } else if (state.value === 1) {
//     state.value = 0;
//     if (!fromButton) {
//       showHelp.value = false;
//       return;
//     }
//     if (count.value > myFish.value) {
//       showToast.value = -1;
//       return;
//     }
//     donateFish({ planId: props.id, fish: count.value });
//     showHelp.value = false;
//     showToast.value = 1;
//   }
// };
</script>

<style scoped lang="scss">
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
  background-color: rgba(255, 255, 255, 1);
  border-top-left-radius: 6vw;
  border-top-right-radius: 6vw;
  padding: 10vw;
  // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
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
    border: 0.5vw solid dodgerblue;
    box-shadow: 0 0 2vw rgba(28, 140, 248, 0.5);
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
  //border: 1px solid #000;
  //border-radius: 8vw;
}
</style>
