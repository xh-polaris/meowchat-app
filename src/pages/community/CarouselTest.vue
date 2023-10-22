<template>
  <view class="carouseltest">
    <uni-swiper-dot
      :info="info"
      :current="current"
      :field="content"
      :mode="mode"
      :dots-styles="dotsStyles"
    >
      <swiper class="swiper-box">
        <swiper-item v-for="(item, index) in info()" :key="index">
          <view class="swiper-item">
            {{ item.content }}
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script>
//import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
import { info } from "sass";
//import Swiper from "swiper/bundle";
//import "swiper/swiper-bundle.css";
export default {
  //components: { uniSwiperDot },
  methods: {
    info() {
      return info;
    },
    change(e) {
      this.current = e.detail.current;
    }
  }
};
</script>

<style>
.swiper-box {
  border-radius: 0px;
  padding: 0px;
}
</style>
