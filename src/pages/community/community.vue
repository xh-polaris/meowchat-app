<template>
  <view class="school-box">
    <view class="school-select-box">
      <image class="arrow" src="../../static/images/location.png" />
      <view class="school-name">
        {{ school.name }}
      </view>
      <view class="switch-box">
        <button class="switch" size="mini">
          ⇌ 切换学校
        </button>
      </view>
    </view>
    <view class="school-select-box">
      <view class="navbar">
        <view @click="setBranch(item)" v-for="item in school.campuses"
                :key="item"
                :class="'navbtn '+(currentNavBtn===item?'current':'')">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
  <view>
    <carousel />
  </view>

  <view style="margin-top:10px">
    <masonry />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Masonry from "@/pages/community/masonry"
import Carousel from "@/pages/community/carousel"
import { onReachBottom } from "@dcloudio/uni-app";

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0
})

const currentNavBtn = ref("中北校区")

function setBranch(e: string) {
  currentNavBtn.value = e
}

onReachBottom(() => {}) //这里的空的onReachBottom别删！！！有了这个masonry.vue的onReachBottom才能生效

</script>

<style lang="scss" scoped>
.arrow {
  width: 50rpx;
  height: 50rpx;
  margin: 25rpx 0rpx 30rpx 20rpx;
}

.switch {
  border-radius: 20px;
  margin-right: 20rpx;
  color: #1fa1ff;
  font-size: 10px;
  background: white;
  border: solid #1fa1ff 1px;
}

.navbar {
  background-color: #FFFFFF;
  display: flex;
  color: #B8B8B8;
  font-size: calc(15 / 390 * 100vw);
  align-items: baseline;
  width: 100vw;
  margin: 0rpx 0rpx 0rpx 60rpx;
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: calc(10 / 390 * 100vw);
  margin: 0 calc(10 / 390 * 100vw);

  &.current {
    color: #FFFFFF;
    background-color: #1FA1FF;
    padding: 10rpx 15rpx 10rpx 15rpx;
    border-radius: 15rpx;
    font-size: calc(15 / 390 * 100vw);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
  }
}

.switch-box {
  margin-left: auto;
  margin-top: 20rpx;
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
  margin: 20rpx 10rpx 30rpx 10rpx;
  font-weight: bold;
  border-bottom: 2px solid skyblue;
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
