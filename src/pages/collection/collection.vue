<template>
  <view class="content">
    <!-- 搜索框 -->
    <view class="search-bar">
      <view class="search-bar-box">

        <input
          type="text" value=""
          placeholder="搜索猫咪"
          class="search-text" maxlength="10"
        >
        <image class="search-span" src="../../static/image/searchSpan.png" />

      </view>
    </view>
    <view class="out" v-for="index of 5" :key="index">
      <view class="row" >
        <catsbox  ></catsbox>
      </view>
    </view>



  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Catsbox from "@/components/catsbox/catsbox.vue";

//const title = ref("Hello");

</script>

<style lang="scss" scoped>

.content {

  display: flex;
  flex-direction: column;
  justify-content: center;
}
// 搜索框
.search-bar{
  width: 100%;
  height: 100rpx;
  margin-top: 2%;
}
.search-bar-box{
  display: flex;
  margin: 0 auto;
  width: 620rpx;
  height: 70rpx;
  border:5rpx solid #f3f7f8;
  border-radius: 50rpx;
}
.search-span{
  width: 56rpx;
  height: 56rpx;
  margin-top: 6rpx;
  margin-right: 30rpx;

}
.search-text{
  width: 100%;
  margin-top: 10rpx;
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #7f7f81;
}
.out{
  padding: 20rpx 30rpx 30rpx;

  .row{
    border-radius: 25px;
    border:1px solid #dad6d6;
    padding:20rpx 0;

  }
}


</style>
