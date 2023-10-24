<template>
  <view class="helping-card">
    <view class="small-icon">
      <img :src="Icons.Health" class="health-icon" />
      <text class="content">生理健康</text>
    </view>
    <view class="help">
      <text class="context">帮助猫咪进行绝育</text>
    </view>
    <view class="prograss-bar">
      <view class="bar-content">
        <view class="txt1">帮助</view>
        <view class="helped-cat">怂怂</view>
        <view class="txt2">完成绝育手术</view>
      </view>
      <progress
        class="progress"
        percent="68"
        activeColor="#2073fb"
        backgroundColor="e6e6e6"
        stroke-width="6"
        active="true"
        border-radius="3"
      />
      <view class="help_but"> 去助力 </view>
      <view class="fish-prograss">已获得68小鱼干助力，还需要32小鱼干</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.helping-card {
  margin-left: 2.5vw;
  margin-top: 3vw;
  border-radius: 2vw;
  width: 95vw;
  height: 60vw;
  background-color: #a2a4a7;
  display: flex;
  flex-direction: column;
  .small-icon {
    .content {
      position: absolute;
      color: #ffffff;
      font-size: 4vw;
      font-weight: bold;
      letter-spacing: 0.5vw;
      left: 6vw;
      top: 26vw;
    }
    .health-icon {
      position: absolute;
      left: 2.5vw;
      top: 25vw;
      height: 8vw;
      width: 28vw;
    }
  }
  .help {
    display: flex;
    flex-direction: column;
    margin-top: 28vw;
    margin-left: 4vw;
    .context {
      color: #ffffff;
      font-size: 5vw;
      font-weight: bolder;
      letter-spacing: 0.5vw;
    }
  }
  .prograss-bar {
    display: flex;
    flex-direction: column;
    margin-left: 3.5vw;
    background-color: #ffffff;
    border-radius: 2vw;
    width: 88vw;
    height: 20vw;
    margin-top: 2vw;
    .bar-content {
      display: flex;
      flex-direction: row;
      .txt1 {
        margin-left: 3vw;
        margin-top: 1vw;
        color: #000000;
        font-size: 4.5vw;
        font-weight: bold;
      }
      .txt2 {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #000000;
        font-size: 4.5vw;
        font-weight: bold;
      }
      .helped-cat {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f6bff;
        font-size: 4.5vw;
        font-weight: bold;
      }
    }
    .progress {
      margin-top: 2vw;
      margin-left: 3vw;
      position: relative;
      z-index: 1;
      width: 55vw;
    }
    .help_but {
      background-color: #1f6bff;
      color: #ffffff;
      font-size: 3.5vw;
      width: 18vw;
      height: 8vw;
      border-radius: 5vw;
      display: flex;
      position: absolute;
      z-index: 2;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.3vw;
      margin-left: 65vw;
      top: 66vw;
    }
    .fish-prograss {
      color: #aeaeae;
      font-size: 3vw;
      margin-left: 3vw;
      margin-top: 2vw;
    }
  }
}
</style>
