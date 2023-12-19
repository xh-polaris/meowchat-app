<template>
  <view class="checkin-box">
    <view class="checkin-record">
      <view class="checkin-progress">
        <view class="progress-out">
          <view
            class="progress"
            :style="{ width: userData.SignInTime * 14 + 'vw' }"
          />
          <image
            v-for="day in days"
            :key="day"
            :src="
              userData.SignInTime >= day ? Icons.LittleFished : Icons.LittleFish
            "
            class="fish-icon"
            :style="{ marginLeft: calculateMarginLeft(day) + 'vw' }"
          />
        </view>
      </view>
      <view class="fish-number">
        <view
          v-for="(fishCount, index) in userData.SignInFishes"
          :key="index"
          class="first-tag"
          :style="{
            backgroundColor:
              userData.SignInTime >= index + 1 ? '#D3D3D3' : '#6a9dff',
            marginLeft: index === 0 ? '0.8vw' : '5vw'
          }"
        >
          <text class="number">x {{ fishCount }}</text>
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
          >{{ dateString }}第{{ userData.SignInTime }}天领取小鱼干</text
        >
      </view>
      <view class="get-fish-number">
        <img :src="Icons.LittleFish" class="fish-unit" />
        <text class="fish-num"
          >X{{ userData.SignInFishes[userData.SignInTime - 1] }}</text
        >
      </view>
      <view class="button">
        <view class="option">已领取</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from "vue";
import { Icons } from "@/utils/url";
import {
  getMissionResp,
  UserCheckInResp
} from "@/apis/incentive/incentive-interfaces";
import { getUserMission } from "@/apis/incentive/incentive";

const userData = ref<getMissionResp>({
  SignInTime: 0,
  LikeTime: 0,
  CommentTime: 0,
  ContentTime: 0,
  SignInFishes: [],
  LikeFishes: [],
  CommentFishes: [],
  ContentFishes: []
});
// const a = ref([]);
// getUserMission().then((res) => {
//   a.value = res.SignInFishes;
// });

getUserMission().then((res) => {
  userData.value.SignInTime = res.SignInTime;
  userData.value.LikeTime = res.LikeTime;
  userData.value.CommentTime = res.CommentTime;
  userData.value.ContentTime = res.ContentTime;
  userData.value.SignInFishes = res.SignInFishes;
});

const currentDate: Date = new Date();
const year: number = currentDate.getFullYear();
const month: number = currentDate.getMonth() + 1;
const day: number = currentDate.getDate();

// 构建日期字符串
const dateString: string = `${year}.${month}.${day}`;
const days = [1, 2, 3, 4, 5, 6, 7];
const calculateMarginLeft = (day: number): number => {
  const margins: number[] = [-1, 12.5, 26.5, 40.5, 54, 67.5, 81];
  return margins[day - 1] || 0;
};
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
      .fish-icon {
        width: 6vw;
        height: 6vw;
        margin-top: -3.5vw;
        margin-left: -1vw;
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
      margin-left: 22vw;
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
      background-color: #cccccc;
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
