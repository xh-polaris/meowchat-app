<template>
  <view class="">
    <uni-card :cover="cover" class="fa_card" @click="onClick">
      <!--      <image slot="cover" :src="cover"></image>-->
      <image class="tagImage" :src="add"></image>
      <uni-card class="ch_card">
        <text class="card_title">
          帮助
          <text class="card_title_2">小猫</text>
          完成任务
        </text>
        <progress
          :percent="percent_input"
          active
          class="card_progress"
        ></progress>
        <text class="bottom_text">已获得68小鱼干，还需要32小鱼干</text>
        <button type="submit" class="bottom_button">去助力</button>
      </uni-card>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import UniCard from "@/components/third-party/uni-ui/uni-card/uni-card.vue";
import add from "@/static/images/add.png";

const cover = "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg";
const percent_input = 50;
</script>

<style scoped lang="scss">
.fa_card {
  .tagImage {
    height: 10%;
    width: 10%;
    position: absolute;
    top: 40rpx;
    left: 20rpx;
  }

  .ch_card {
    position: absolute;
    bottom: 20rpx;
    width: 600rpx;

    .card_progress {
      width: 200rpx;
    }

    .bottom_text {
      font-size: 20rpx;
    }

    .bottom_button {
      position: absolute;
      top: 30rpx;
      left: 400rpx;
      background-color: #1c74b9;
    }

    .card_title {
      color: black;
      font-size: 30rpx;

      .card_title_2 {
        font-size: 30rpx;
        color: cornflowerblue;
      }
    }
  }
}
</style>
