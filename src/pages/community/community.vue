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
      <view v-for="item in school.campuses" :key="item">
        {{ item }}
      </view>
    </view>
  </view>

  <view class="swiper-box">
    <swiper
      autoplay indicator-dots
      circular class="swiper"
    >
      <swiper-item v-for="carousel in carousels" :key="carousel">
        <view
          class="swiper-item" :style="`background-image: url('${carousel.imageUrl}')`"
          @click="onClickCarousel(carousel.linkUrl)"
        />
      </swiper-item>
    </swiper>
  </view>

  <view style="margin-top:10px">
    <water-fall />
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import WaterFall from "@/pages/community/water-fall"
import { Carousel, getCarousel } from "@/apis/community/community"
import { onClickCarousel } from "@/pages/community/event"

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0
})

const carousels: Carousel[] = reactive([])
getCarousel().then(res => {
  for (const carousel of res.carousels) {
    carousels.push(carousel)
  }
})

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
