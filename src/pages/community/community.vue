<template>
  <!--  -->
  <view class="school-box">
    <view class="school-select-box">
      <view class="school-name">
        {{ school.name }}
      </view>
      <view class="switch-box">
        <button plain="true" style="width:100px; font-size:small; margin:10px 10px;" type="primary">
          切换学校
        </button>
      </view>
    </view>
    <view class="school-select-box">
      <view v-for="item in school.campuses">
        {{ item }}
      </view>
    </view>
  </view>

  <view class="swiper-box">
    <swiper
      :autoplay="swiper.autoplay" :duration="swiper.duration"
      :indicator-dots="swiper.indicatorDots" :interval="swiper.interval"
      circular class="swiper"
    >
      <swiper-item v-for="item in list">
        <view class="swiper-item" style="background:skyblue">
          {{ item }}
        </view>
      </swiper-item>
    </swiper>
  </view>

  <view style="margin-top:10px">
    <water-fall />
  </view>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import WaterFall from "@/pages/community/waterFall.vue";

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0
});

const swiper = reactive({
  // 依次为 自动播放、是否显示面板指示点、自动切换时长、滑动动画时长
  autoplay: true,
  indicatorDots: true,
  interval: 2000,
  duration: 500,
});

const list = ref(["A", "B", "C", "D", "E"]);
const title = ref("Hello");

const onClickImage = () => {
  uni.navigateTo({url: "/pages/moment/moment"});
};

</script>

<style lang="scss" scoped>
.switch-box {
  margin-left: auto;
}

.school-box {
  height: 12vh;
  display: flex;
  flex-direction: column;
}

.school-select-box {
  height: 8vh;
  display: flex;
  flex-direction: row
}

.school-name {
  margin: 10px 20px;
  font-weight: bold;
  border-bottom: 4px solid skyblue;
  font-size: large;
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
