<template>
  <view class="main">
    <text class="first-title">猫咪故事</text>
    <view class="checkmore">点击查看更多故事</view>
    <view class="follow-btn">+ 关注</view>
    <!--    <text>{{ props.cat.name }}</text>-->
    <view class="user-info">
      <image :src="src / common / img / photo2.png" class="head-img"></image>
      <text class="nickname">用户名xxxx</text>
      <text class="time">7天前</text>
    </view>
    <view class="storycontent"
      >这只猫曾经上刀山下火海、无所不能，是天下的祸患。因此被王母娘娘绝育了，绝育后变得乖巧懂事，会主动找人贴贴，但是切记不要让他拿到金箍棒，否则魔头将重现天下。</view
    >
    <image :src="src / common / img / cat.png" class="decoration"></image>
    <view class="addstory">我要添加猫咪故事</view>
  </view>
</template>

<script lang="ts" setup>
import { Cat } from "@/apis/schemas";
import { ref } from "vue/dist/vue";

interface Props {
  cat: Cat;
}
// const headimgUrl = ref("../../common/img/photo2.png");

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
//@import url("../../common/font.css");
.main {
  margin: 0 6vw;
  background-color: #f8f8f8b5;
  border-radius: 11px;
  position: relative;
  padding-bottom: 22px;
  .first-title {
    font-size: 20px;
    font-weight: 400;
    line-height: 41px;
    letter-spacing: 0.37400001287460327px;
    text-align: left;
    color: #1fa1ff;
    margin-top: 10px;
    margin-left: 16px;
  }
  .checkmore {
    font-size: 10px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
    text-align: right;
    color: #bbbbbb;
    position: absolute;
    right: 15px;
    top: 12px;
  }
  .follow-btn {
    background: #1fa1ff;
    width: 58px;
    height: 21px;
    top: 790px;
    left: 297px;
    border-radius: 17px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: -0.30000001192092896px;
    text-align: left;
    color: white;
    text-align: center;
    padding-top: 3px;
    position: absolute;
    left: 74%;
    top: 47px;
  }
  .user-info {
    position: relative;
    .head-img {
      border-radius: 50%;
      width: 37px;
      height: 37px;
      background: #1c74b9;
      margin-left: 17px;
    }
    .nickname {
      font-size: 12px;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: -0.30000001192092896px;
      text-align: left;
      position: absolute;
      top: 2px;
      left: 60px;
    }
    .time {
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: -0.30000001192092896px;
      text-align: left;
      color: #bababa;
      position: absolute;
      bottom: 5px;
      left: 60px;
    }
  }
  .storycontent {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-size: 10px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: -0.30000001192092896px;
    text-align: left;
    color: #3c3c3c;
    margin-top: 8px;
  }
  .decoration {
    width: 56px;
    height: 75px;
    right: 5px;
    position: absolute;
    background: #1fa1ff;
  }
  .addstory {
    width: 134px;
    height: 24px;
    top: 906px;
    left: 45px;
    border-radius: 17px;
    background: #1f5eff;
    font-size: 13px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: white;
    padding-top: 6px;
    margin-top: 26px;
    margin-left: 16px;
  }
}
</style>
