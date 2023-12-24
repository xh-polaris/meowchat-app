<template>
  <view class="moment-task-box">
    <view class="content">
      <text class="title">每日评论</text>
      <text class="detail"
        >评论可以获得{{
          userData.CommentFishes[0]
        }}小鱼干，每日可共获得3次</text
      >
      <view class="finish-times">
        <text class="times">完成情况：</text>
        <image
          v-for="commenttime in commentTimes"
          :key="commenttime"
          :src="
            userData.CommentTime >= commenttime
              ? Icons.FinishedTask
              : Icons.UnFinishedTask
          "
          class="icon"
          :style="{ marginLeft: commenttime === 1 ? '0' : '1vw' }"
        />
      </view>
    </view>
    <view class="get-fish-number">
      <img :src="Icons.LittleFish" class="fish-unit" />
      <text class="fish-num">X{{ userData.CommentFishes[0] }}</text>
    </view>
    <view
      v-if="userData.CommentTime >= 3"
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
    url: Pages.FirstPage
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
  userData.value.LikeFishes = res.LikeFishes;
  userData.value.CommentFishes = res.CommentFishes;
});

const commentTimes = Array.from({ length: 3 }, (_, index) => index + 1);
</script>

<style scoped lang="scss">
.moment-task-box {
  display: flex;
  flex-direction: row;
  width: 95vw;
  height: 21.28vw;
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
      margin-top: 1vw;
    }
    .finish-times {
      margin-left: 5vw;
      display: flex;
      flex-direction: row;
      .times {
        color: #00000078;
        font-size: 2.8vw;
        font-weight: bold;
      }
      .icon {
        margin-top: 1vw;
        width: 2.56vw;
        height: 2.56vw;
      }
    }
  }
  .get-fish-number {
    margin-left: 8vw;
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
    margin-left: 2.5vw;
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
