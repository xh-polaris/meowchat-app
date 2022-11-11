<template>
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
      <view v-for="(item,index) in school.campuses" :key="index">
        <view
          :class="(index===school.No)?'campus-select checkLabel':'campus-select uncheckLabel'"
          @click="switchCampus(index)"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>

  <view class="swiper-box">
    <swiper
      autoplay circular
      class="swiper" indicator-dots
    >
      <swiper-item v-for="carousel in carousels" :key="carousel.id">
        <view
          :style="`background-image: url('${carousel.imageUrl}')`" class="swiper-item"
          @click="onClickCarousel(carousel.linkUrl)"
        />
      </swiper-item>
    </swiper>
  </view>

  <view style="margin-top:10px">
    <masonry />
  </view>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import Masonry from "@/pages/community/masonry";
import {Carousel, getCarousel} from "@/apis/community/community";
import {onClickCarousel} from "@/pages/community/event";
import {onReachBottom} from "@dcloudio/uni-app";

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 1
});

const carousels = reactive<Carousel[]>([]);
getCarousel().then(res => {
  carousels.push(...res.carousels);
});

onReachBottom(() => {
}); //哪怕是空的 父组件也得有这个 才能让子组件的onReachBottom生效

const switchCampus = (index: number) => {
  school.No = index;
};

</script>

<style lang="scss" scoped>
.campus-select {
  vertical-align: center;
  margin: 10px;
  border: 2px solid;
  border-radius: 10px;
  width: 75px;
  height: 30px;
  text-align: center;
}

.checkLabel {
  background: #1989fa;
  color: white;
}

.uncheckLabel {
  background: white;
  color: gray;

}

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
  flex-direction: row;
  justify-content: space-around;
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
