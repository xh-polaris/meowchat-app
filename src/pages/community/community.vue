<template>
  <view class="uni-margin-wrap">
    <swiper
      :autoplay="true" :indicator-dots="true"
      :interval="2000"
      circular class="swiper"
    >
      <swiper-item>
        <view class="swiper-item" style="background:blue">
          A
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item" style="background:green">
          B
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item" style="background:blue">
          C
        </view>
      </swiper-item>
    </swiper>
  </view>
  <waterfall
    v-for="list in lists" column-count="2"
    column-gap="normal"
    column-width="auto"
  >
    <cell
      v-for="num in list"
      style="background:skyblue"
    >
      <text>{{ num }}</text>
    </cell>
    <cell>
      111
    </cell>
    <cell>
      222
    </cell>
  </waterfall>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const lists = ref([["A", "B", "C", "D", "E"], [1, 2, 3, 4, 5]]);
const title = ref("Hello");
const onClickImage = () => {
  uni.navigateTo({url: "/pages/moment/moment"});
};
</script>
<style>
.uni-margin-wrap {
  width: 690 rpx;
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

</style>

<style lang="scss" scoped>

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
