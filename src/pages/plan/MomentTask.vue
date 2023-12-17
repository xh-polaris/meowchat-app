<template>
  <view class="moment-task-box">
    <view class="content">
      <text class="title">首次发布动态</text>
      <text class="detail">2023.12.11第二天领取小鱼干</text>
    </view>
    <view class="get-fish-number">
      <img :src="Icons.LittleFish" class="fish-unit" />
      <text class="fish-num">X30</text>
    </view>
    <view class="button" @click="goToCommunity()">
      <view class="option">去完成</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
const goToCommunity = () => {
  uni.navigateTo({
    url: Pages.DraftMoment
  });
};
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
    margin-left: 20vw;
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
