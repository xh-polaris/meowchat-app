<template>
  <view class="moment-task-box">
    <view class="content">
      <text class="title">首次发布动态</text>
      <text class="detail"
        >每日发布首条动态可以获得{{ userData.ContentFishes[0] }}小鱼干</text
      >
    </view>
    <view class="get-fish-number">
      <img :src="Icons.LittleFish" class="fish-unit" />
      <text class="fish-num">X{{ userData.ContentFishes[0] }}</text>
    </view>
    <view
      v-if="userData.ContentTime >= 1"
      class="button"
      style="background-color: #cccccc"
    >
      <view class="option">已完成</view>
    </view>
    <view v-else class="button" @click="goToCommunity()">
      <view class="option">去完成</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
import { ref } from "vue";
import { getMissionResp } from "@/apis/incentive/incentive-interfaces";
import { getUserMission } from "@/apis/incentive/incentive";
const goToCommunity = () => {
  uni.navigateTo({
    url: Pages.DraftMoment
  });
};
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
  userData.value.ContentFishes = res.ContentFishes;
});
</script>

<style scoped lang="scss">
.moment-task-box {
  display: flex;
  flex-direction: row;
  width: 95vw;
  height: 17.43vw;
  border-radius: 3vw;
  background-color: #f4f9ff;
  margin-left: 2.5vw;
  .content {
    display: flex;
    flex-direction: column;
    .title {
      margin-left: 5vw;
      margin-top: 3.5vw;
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
    margin-left: 12vw;
    margin-top: 6.5vw;
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
    margin-top: 5.5vw;
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
</style>
