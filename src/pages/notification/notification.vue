<template>
  <general-status-bar title="我的消息" back-icon="true" />
  <view class="read-all-frame">
    <view class="read-all">全部已读</view>
  </view>

  <view class="public">
    <view class="header">
      <view class="notice-icon"></view>
      <view class="title">公告</view>
      <view class="right-arrow-icon"></view>
    </view>
    <view class="description">公告内容公告内容公告，公告内容公告内容，公告内容公告内容公告内容，公告内容公告内容公告内容。</view>
    <view class="time">2022-3-1 发布</view>
  </view>

  <view class="moment">
    <view class="avatar"></view>
    <view class="content">
      <view class="info">
        <view class="user-name">Username</view>
        <view class="type-text">回复了你的动态</view>
      </view>
      <view class="description">今天我们大家之所以欢聚在这里，是为我们的好朋友小猫猫，庆祝它的生日。</view>
      <view class="time">3小时前</view>
    </view>
    <view class="picture">图片</view>
  </view>

  <view class="moment">
    <view class="avatar"></view>
    <view class="content">
      <view class="info">
        <view class="user-name">Username</view>
        <view class="type-text">点赞了你的动态</view>
      </view>
      <view class="description"></view>
      <view class="time">3小时前</view>
    </view>
    <view class="picture">图片</view>
  </view>

  <view class="horizontal-border-line"></view>

</template>

<script setup>
import GeneralStatusBar from "@/pages/tabbar/general_status_bar";

</script>
<style lang="scss" scoped>

body {
  font-family: sans-serif;
}
.read-all-frame {
  display: flex;
  justify-content: flex-end;
}
.read-all {
  font-size: calc(14 / 390 * 100vw);
  width: fit-content;
  padding: calc(10 / 390 * 100vw);
  margin: calc(6 / 390 * 100vw) 0;
  margin-right: calc(18 / 390 * 100vw);
}
.public {
  background-color: #FAFCFF;
  border-radius: calc(10 / 390 * 100vw);
  margin: 0 calc(22 / 390 * 100vw);
  padding: calc(20 / 390 * 100vw);
  padding-top: calc(6 / 390 * 100vw);
  font-size: calc(14 / 390 * 100vw);
  line-height: calc(20 / 390 * 100vw);
  margin-bottom: calc(16 / 390 * 100vw);

  .header {

    display: flex;
    align-items: center;
    .notice-icon {
      width: calc(36 / 390 * 100vw);
      height: calc(36 / 390 * 100vw);
      background-image: url("../../static/images/notice.png");
      background-size: 100% 100%;
      transform: translateX(calc(-2 / 390 * 100vw));
    }
    .title {
      font-size: calc(16 / 390 * 100vw);
      margin-left: calc(10 / 390 * 100vw);
      flex: auto;
      color: #1D1D1D;
    }
    .right-arrow-icon {
      width: calc(7 / 390 * 100vw);
      height: calc(11 / 390 * 100vw);
      background-image: url("../../static/images/right-grey.png");
      background-size: 100% 100%;
      margin-right: calc(14 / 390 * 100vw);
    }

  }
  .description {
    margin-top: calc(14 / 390 * 100vw);
    color: #696969;
  }
  .time {
    margin-top: calc(4 / 390 * 100vw);
    color: #AFAFAF
  }
}
.moment {
  font-size: calc(12 / 390 * 100vw);
  line-height: calc(18 / 390 * 100vw);
  border-top: #EEEEEE calc(1 / 390 * 100vw) solid;
  display: flex;
  padding: calc(11 / 390 * 100vw) calc(22 / 390 * 100vw);

  .avatar {

    width: calc(32 / 390 * 100vw);
    height: calc(32 / 390 * 100vw);
    border-radius: 50%;
    background-image: url("../../static/images/avatar-default.png");
    background-size: 100% 100%;

  }
  .content {
    width: 60vw;
    margin: 0 calc(11 / 390 * 100vw);
    .info {
      display: flex;
      .user-name {
        color: #353535;
        margin-right: calc(12 / 390 * 100vw);

      }
      .type-text {
        color: #939393;

      }
    }
    .description {
      color: #1D1D1D;
      padding: calc(14 / 390 * 100vw) 0;

    }
    .time {
      color: #B8B8B8;

    }
  }
  .picture {
    width: calc(60 / 390 * 100vw);
    height: calc(60 / 390 * 100vw);
    background-color: #EEE;
    text-align: center;
    line-height: calc(60 / 390 * 100vw);
    color: white;
  }
}
.horizontal-border-line {
  border-bottom: #EEEEEE calc(1 / 390 * 100vw) solid;
}

</style>