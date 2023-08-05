<template>
  <view class="container">
    <image
      class="bg-set"
      src="https://static.xhpolaris.com/profile_background.png"
    />
    <view class="title"> 欢迎来到喵世界，喵~</view>
    <view class="app-intro">
      华师喵世界是一款致力于校园猫咪保护和管理的小程序，我们希望通过图鉴的方式让大家更直观的了解学校里的猫咪，并鼓励大家为喜欢的猫咪拍下属于ta的美好时刻，希望每一只猫猫都可以被友好对待！
    </view>
    <view class="develop-team"> from: 开发团队 华师小世界</view>
    <view class="version-wrap">
      <view class="version-text"> 当前版本</view>
      <view
        v-for="(item, index) in versionInformation.slice(0, 1)"
        :key="index"
        class="version-info"
      >
        <view class="version-number">
          {{ item.createAt }}
        </view>
        <view class="update-time"> 更新时间:{{ item.createAt }}</view>
        <view class="content">
          {{ item.text }}
        </view>
      </view>
      <view class="version-text"> 历史版本</view>
      <view
        v-for="(item, index) in versionInformation.slice(1)"
        :key="index"
        class="version-info"
      >
        <view class="version-number">
          {{ item.createAt }}
        </view>
        <view class="update-time"> 更新时间:{{ item.createAt }}</view>
        <view class="content">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
//暂时用公告替代
import { reactive } from "vue";
import { Notice } from "@/apis/schemas";
import { getNotices } from "@/apis/notice/notice";

const versionInformation = reactive<Notice[]>([]);
getNotices().then((res) => {
  versionInformation.push(...res.notices);
});
</script>

<style lang="scss" scoped>
.bg-set {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.title {
  width: 700rpx;
  height: 56rpx;
  margin-left: 74rpx;
  margin-top: 50rpx;
  font-style: normal;
  font-weight: bold;
  font-size: 40rpx;
  line-height: 56rpx;
  letter-spacing: -0.6rpx;
  color: #1d1d1d;
}

.app-intro {
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
  line-height: 165%;
  letter-spacing: -0.6px;
  width: 650rpx;
  height: 184rpx;
  margin-left: 74rpx;
  margin-top: 50rpx;
  margin-bottom: 50rpx;
}

.develop-team {
  width: 650rpx;
  height: 46rpx;
  margin-left: 74rpx;
  margin-bottom: 30rpx;
  font-style: normal;
  font-weight: 400;
  font-size: 28rpx;
  line-height: 165%;
  letter-spacing: -0.3px;
  color: #696969;
}

.version-wrap {
  margin-top: 50rpx;
  margin-left: 74rpx;

  .version-text {
    font-style: normal;
    font-weight: bold;
    font-size: 32rpx;
    line-height: 44rpx;
    letter-spacing: -0.3px;
    color: #1d1d1d;
    width: 600rpx;
    height: 44rpx;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
  }

  .version-info {
    width: 600rpx;
    height: 218rpx;
    box-shadow: 0 0 10rpx #eeeeee;
    padding: 20rpx;
    border-radius: 21rpx;
    background-color: #ffffff;

    .version-number {
      font-style: normal;
      font-weight: bold;
      font-size: 40rpx;
      line-height: 48rpx;
      letter-spacing: -0.3px;
      color: #353535;
      width: 600rpx;
      height: 48rpx;
      margin-bottom: 15rpx;
      margin-left: 20rpx;
    }

    .update-time {
      width: 600rpx;
      height: 40rpx;
      font-style: normal;
      font-weight: bold;
      font-size: 24rpx;
      line-height: 165%;
      letter-spacing: -0.3px;
      color: #353535;
      margin-bottom: 5rpx;
      margin-left: 20rpx;
    }

    .content {
      width: 600rpx;
      height: 72rpx;
      font-style: normal;
      font-weight: 500;
      font-size: 24rpx;
      line-height: 150%;
      color: #939393;
      margin-left: 20rpx;
      max-lines: 1;
    }
  }
}
</style>
