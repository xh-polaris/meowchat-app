<template>
  <view class="school-box">
    <view class="school-select-box">
      <image
        class="arrow"
        src="/static/images/location.png"
        @click="onClickSwitch"
      />
      <view class="names" @click="onClickSwitch">
        <view class="school-name">
          {{ school.name }}
        </view>
        <view class="campus-name"> ({{ currentNavBtn }})</view>
      </view>
      <view class="switch-box">
        <view class="switch-icon" />
        <view class="switch" @click="onClickSwitch"> 切换学校</view>
      </view>
    </view>
  </view>

  <view>
    <carousel-frame />
  </view>

  <view style="margin-top: 10px">
    <masonry />
  </view>

  <draft-button type="moment" />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Masonry from "@/pages/community/masonry";
import CarouselFrame from "@/pages/community/carousel-frame";
import { onReachBottom } from "@dcloudio/uni-app";
import { onClickSwitch } from "@/pages/community/event";
import DraftButton from "@/components/draft-button/draft-button.vue";

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0
});

const currentNavBtn = ref("中北校区");

// eslint-disable-next-line @typescript-eslint/no-empty-function
onReachBottom(() => {}); //这里的空的onReachBottom别删！！！有了这个masonry.vue的onReachBottom才能生效
</script>

<style lang="scss" scoped>
.arrow {
  width: 44rpx;
  height: 50rpx;
  margin: 30rpx 0 30rpx 20rpx;
}

.navbar {
  background-color: #ffffff;
  display: flex;
  color: #b8b8b8;
  font-size: calc(15 / 390 * 100vw);
  align-items: baseline;
  width: 100vw;
  margin: 0 0 0 60rpx;
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: calc(10 / 390 * 100vw);
  margin: 0 calc(10 / 390 * 100vw);

  &.current {
    color: #ffffff;
    background-color: #1fa1ff;
    padding: 10rpx 15rpx 10rpx 15rpx;
    border-radius: 15rpx;
    font-size: calc(15 / 390 * 100vw);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
}

.school-box {
  height: 14vw;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.school-select-box {
  height: 14vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.names {
  display: flex;
  align-items: baseline;
  font-size: calc(18 / 390 * 100vw);

  .school-name {
    font-weight: bold;
    border-bottom: 2px solid #1fa1ff;
    line-height: calc(18 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
    padding-bottom: calc(4 / 390 * 100vw);
  }

  .campus-name {
    color: #7f7f81;
    font-weight: bold;
    margin-left: calc(8 / 390 * 100vw);
  }
}

.switch-box {
  margin-left: auto;
  display: flex;
  align-items: center;
  border: solid #1fa1ff calc(1 / 390 * 100vw);
  padding: 0 calc(8 / 390 * 100vw);
  height: calc(22 / 390 * 100vw);
  border-radius: calc(11 / 390 * 100vw);
  margin-right: calc(12 / 390 * 100vw);

  .switch-icon {
    width: calc(12 / 390 * 100vw);
    height: calc(12 / 390 * 100vw);
    background-image: url("@/static/images/switch-blue.png");
    background-size: 100% 100%;
  }

  .switch {
    outline-style: none;
    color: #1fa1ff;
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(12 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
  }
}

.swiper-box {
  width: 100vw;
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
