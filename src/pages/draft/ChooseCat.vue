<template>
  <view class="all">
    <view class="header">
      <text>关联猫咪：</text>
      <text class="cat-name">{{ catName ? catName : "[无]" }}</text>
    </view>
    <view v-if="!catId" class="button" @click="chooseCats">选择...</view>
    <view v-else class="cat-box">
      <image :src="catImage" class="image" @click="chooseCats"></image>
      <view>
        <view class="button" @click="chooseCats">重选</view>
        <view class="button" @click="clearCat">取消</view>
      </view>
    </view>
  </view>

  <!--  <view class="d-flex wrap">-->
  <!--    <view @click="chooseCats">-->
  <!--      <view style="margin-left: calc(10 / 390 * 100vw)">-->
  <!--        <image-->
  <!--          :src="Icons.NewImage"-->
  <!--          style="width: 200rpx; height: 200rpx"-->
  <!--        ></image>-->
  <!--      </view>-->
  <!--    </view>-->
  <!--    <view v-if="catImage">-->
  <!--      <image-->
  <!--        :src="catImage"-->
  <!--        class="border mx-1 mt-2"-->
  <!--        style="-->
  <!--          width: 160rpx;-->
  <!--          height: 160rpx;-->
  <!--          border-radius: 30rpx;-->
  <!--          border-color: #1fa1ff;-->
  <!--          border-width: 0.1em;-->
  <!--        "-->
  <!--        @click="onClickCat()"-->
  <!--      ></image>-->
  <!--    </view>-->
  <!--  </view>-->
</template>

<script lang="ts" setup>
import { Icons, Pages } from "@/utils/url";
import { ref } from "vue";
import { onShow, onUnload } from "@dcloudio/uni-app";
import { StorageKeys } from "@/utils/const";
const catId = ref("");
const catImage = ref("");
const catName = ref("猫猫");
function chooseCats() {
  uni.navigateTo({
    url: Pages.ChooseCat
  });
}
onUnload(() => {
  uni.removeStorageSync(StorageKeys.IdSelected);
  uni.removeStorageSync(StorageKeys.NameSelected);
  uni.removeStorageSync(StorageKeys.AvatarSelected);
});
onShow(() => {
  catId.value = uni.getStorageSync(StorageKeys.IdSelected);
  catName.value = uni.getStorageSync(StorageKeys.NameSelected);
  catImage.value = uni.getStorageSync(StorageKeys.AvatarSelected);
});
const clearCat = () => {
  catId.value = "";
  catImage.value = "";
  catName.value = "";
};
</script>

<style scoped lang="scss">
.all {
  margin-left: 6vw;
  margin-right: 6vw;
  .header {
    margin-bottom: 2vw;
    font-size: 4.8vw;
    .cat-name {
      color: #1fa1ff;
      font-weight: bold;
    }
  }
  .cat-box {
    display: flex;
    align-items: flex-start;
    .image {
      box-sizing: border-box;
      width: 20vw;
      height: 20vw;
      border-radius: 1vw;
      box-shadow: 0 0 2px #1d1d1d;
      margin-right: 3vw;
    }
  }
  .button {
    width: fit-content;
    padding: 1vw 3vw;
    border-radius: 1vw;
    background-color: #1fa1ff;
    color: white;
    margin-bottom: 2vw;
    &:active {
      filter: brightness(80%);
    }
  }
}
</style>
