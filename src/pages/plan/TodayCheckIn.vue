<template>
  <view class="checkin-box">
    <view class="checkin-record">
      <view class="checkin-progress">
        <view class="progress-out">
          <view
            class="progress"
            :style="{ width: (userData.getFishTimes + 1) * 14 + 'vw' }"
          />
          <img
            :src="
              userData.getFishTimes >= 0 && userData.getFish === false
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="first-day"
          />
          <img
            :src="
              userData.getFishTimes >= 1 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="second-day"
          />
          <img
            :src="
              userData.getFishTimes >= 2 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="third-day"
          />
          <img
            :src="
              userData.getFishTimes >= 3 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="fourth-day"
          />
          <img
            :src="
              userData.getFishTimes >= 4 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="fifth-day"
          />
          <img
            :src="
              userData.getFishTimes >= 5 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="sixth-day"
          />
          <img
            :src="
              userData.getFishTimes >= 6 && userData.getFish
                ? Icons.LittleFished
                : Icons.LittleFish
            "
            class="seventh-day"
          />
        </view>
      </view>
      <view class="fish-number">
        <view
          class="first-tag"
          :style="{
            backgroundColor: userData.getFishTimes >= 0 ? '#D3D3D3' : '#6a9dff'
          }"
        >
          <text class="number">x 30</text>
        </view>
        <view class="first-tag" style="margin-left: 5vw">
          <text class="number">x 30</text>
        </view>
        <view class="first-tag" style="margin-left: 5.5vw">
          <text class="number">x 50</text>
        </view>
        <view class="first-tag" style="margin-left: 5.5vw">
          <text class="number">x 30</text>
        </view>
        <view class="first-tag" style="margin-left: 5vw">
          <text class="number">x 30</text>
        </view>
        <view class="first-tag" style="margin-left: 5.5vw">
          <text class="number">x 30</text>
        </view>
        <view class="first-tag" style="margin-left: 5vw">
          <text class="number">x 100</text>
        </view>
      </view>
      <view class="data">
        <view class="first-date" style="margin-left: 3vw">第1天</view>
        <view class="first-date" style="margin-left: 6vw">第2天</view>
        <view class="first-date" style="margin-left: 6vw">第3天</view>
        <view class="first-date" style="margin-left: 6.5vw">第4天</view>
        <view class="first-date" style="margin-left: 6.5vw">第5天</view>
        <view class="first-date" style="margin-left: 6vw">第6天</view>
        <view class="first-date" style="margin-left: 5vw">第7天</view>
      </view>
    </view>
    <view class="divider" />
    <view class="today-checkin">
      <view class="content">
        <text class="title">今日签到</text>
        <text class="detail"
          >2023.12.11第{{ userData.getFishTimes + 1 }}天领取小鱼干</text
        >
      </view>
      <view class="get-fish-number">
        <img :src="Icons.LittleFish" class="fish-unit" />
        <text class="fish-num">X{{ userData.getFishTimes }}</text>
      </view>
      <view class="button">
        <view class="option">领取</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from "vue";
import { Icons } from "@/utils/url";
import { UserCheckInResp } from "@/apis/user/user-interfaces";
import { userCheckIn } from "@/apis/user/user";
import { getUserFish } from "@/apis/plan/plan";

const userData = ref({
  getFish: false,
  getFishTimes: 0,
  getFishNum: 0
});

userCheckIn().then((res) => {
  userData.value.getFish = res.getFish;
  userData.value.getFishNum = res.getFishNum;
  userData.value.getFishTimes = res.getFishTimes;
});

// const fetchData = () => {
//   // try {
//   //   userData.value = await userCheckIn();
//   // } catch (error) {
//   //   console.log("Failed to fetch user data");
//   // }
//   userCheckIn().then(res);
// };
// fetchData();

const fishValues = [30, 30, 50, 30, 30, 30, 100];
const getFishValue = ref(fishValues[userData.value.getFishTimes]);
</script>

<style scoped lang="scss">
.checkin-box {
  display: flex;
  flex-direction: column;
  width: 95vw;
  height: 38vw;
  border-radius: 3vw;
  background-color: #f4f9ff;
  margin-left: 2.5vw;
  .checkin-record {
    .progress-out {
      margin-top: 5vw;
      margin-left: 4vw;
      width: 84vw;
      height: 1.5vw;
      border-radius: 2vw;
      background-color: #cfdfff;
      position: relative;
      z-index: 0;
      .progress {
        width: 14vw;
        height: 1.5vw;
        border-radius: 2vw;
        background-color: #d3d3d3;
        position: relative;
        z-index: 1;
      }
      .first-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: -1vw;
        position: absolute;
        z-index: 99;
      }
      .second-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 12.5vw;
        position: absolute;
        z-index: 100;
      }
      .third-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 26.5vw;
        position: absolute;
        z-index: 99;
      }
      .fourth-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 40.5vw;
        position: absolute;
        z-index: 99;
      }
      .fifth-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 54vw;
        position: absolute;
        z-index: 99;
      }
      .sixth-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 67.5vw;
        position: absolute;
        z-index: 99;
      }
      .seventh-day {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: 81vw;
        position: absolute;
        z-index: 99;
      }
    }
    .fish-number {
      display: flex;
      flex-direction: row;
      .first-tag {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4.5vw;
        background-color: #6a9dff;
        width: 9vw;
        height: 4vw;
        border-radius: 4vw;
        margin-left: 2.5vw;
        .number {
          color: #ffffff;
          font-size: 2.8vw;
          //font-weight: bold;
        }
      }
    }
    .data {
      display: flex;
      flex-direction: row;
      .first-date {
        margin-top: 1vw;
        color: #084e8163;
        font-size: 3vw;
        font-weight: bold;
      }
    }
  }
  .divider {
    border: 1px solid #0c327b17;
    width: 94vw;
    margin-top: 2vw;
  }
  .today-checkin {
    display: flex;
    flex-direction: row;
    .content {
      display: flex;
      flex-direction: column;
      .title {
        margin-left: 5vw;
        margin-top: 2vw;
        font-weight: bold;
        font-size: 4.5vw;
        letter-spacing: 0.1vw;
      }
      .detail {
        color: #00000078;
        font-size: 2.8vw;
        font-weight: bold;
        margin-left: 5vw;
      }
    }
    .get-fish-number {
      margin-left: 20vw;
      margin-top: 5vw;
      display: flex;
      flex-direction: row;
      .fish-unit {
        width: 6vw;
        height: 6vw;
      }
      .fish-num {
        color: #48282d;
        font-size: 3.5vw;
        font-weight: bold;
        margin-top: 0.5vw;
      }
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 4vw;
      margin-left: 2vw;
      width: 16.15vw;
      height: 6.67vw;
      background-color: #1f6bff;
      border-radius: 5.89vw;
      .option {
        color: #ffffff;
        font-size: 3.5vw;
        font-weight: bold;
        letter-spacing: 0.1vw;
      }
    }
  }
}
</style>
