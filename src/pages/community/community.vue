<template>
  <!--  -->
  <view>
    <view class="uni-margin-wrap">
      <swiper
        :autoplay="true" :indicator-dots="true"
        :interval="2000"
        circular class="swiper"
      >
        <swiper-item>
          <view class="swiper-item" style="background:skyblue">
            A
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item" style="background:green">
            B
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item" style="background:pink">
            C
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
  <view style="margin-top:10px">
    <water-fall />
    <view />
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import WaterFall from "@/pages/community/waterFall.vue";

const list = ref(["A", "B", "C", "D", "E"]);
const title = ref("Hello");

const onClickImage = () => {
  uni.navigateTo({url: "/pages/moment/moment"});
};

</script>

<style lang="scss" scoped>
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}

.swiper {
  height: 20vh;
}

.swiper-item {
  display: block;
  height: 20vh;
  line-height: 15vh;
  text-align: center;
}

.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200rpx;
  margin: 200rpx auto 50rpx;
  width: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36rpx;
}
</style>
