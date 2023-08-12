<template>
  <view class="guide-area">
    <img :src="Icons.Guide" alt="撸猫指南" class="image-fill" />
    <view class="text-view">
      <text class="sub-heading">{{ subHeading }}</text>
    </view>

    <text>{{ props.cat.details }}</text>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Icons } from "@/utils/url";
import { canvasToTempFilePath } from "@dcloudio/uni-h5"; // 引入图片链接
import { Cat } from "@/apis/schemas";
//const subHeading = "胆小怕生不喜欢摸头";
interface Props {
  cat: Cat;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.image-fill {
  width: 100px;
  height: 35px;
  object-fit: cover;
}

.guide-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(250, 250, 250);

  border-radius: 5px 5px;
  border-radius: 20px;
  width: 98%;

  z-index: 0;
}

.title {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: rgb(14, 171, 244);
  font-family: "黑体", "微软雅黑", sans-serif;

  margin-left: -15rpx;

  z-index: 2;
}

.sub-heading {
  font-weight: bold;
  font-size: 15px;
  font-family: "黑体", "微软雅黑", sans-serif;
  margin-left: -5rpx;
  position: relative;
  z-index: 2;
}

.sub-heading::after {
  content: "";
  position: absolute;
  bottom: 0rpx;

  left: 10rpx;
  width: 100%;
  height: 10rpx;
  background-color: #68bdfd;
  transform: skewX(50deg);
  z-index: -1;
}

.text {
  font-size: 10px;
  color: gray;

  z-index: 2;
}

.text-view {
  margin-top: 10rpx;
  margin-left: 30rpx;
}
</style>
