<template>
  <view class="cats-box">
    <view>
      <image :src="cat.avatarUrl" mode="aspectFill" />
    </view>
    <view class="text">
      <view class="title">
        <view class="name">
          {{ cat.name }}
        </view>
        <view class="collect">
          <image
            :src="
              cat.isCollected
                ? '/static/images/collect.png'
                : '/static/images/collect_HL.png'
            "
            mode="widthFix"
            @click.stop="onClickCollect"
          />
        </view>
      </view>
      <view class="data">
        <text>花色：{{ cat.color }}</text>
      </view>
      <view class="data">
        <text>当前地区： {{ cat.area }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { CatPreview } from "@/apis/schemas";
import { onClickCollect } from "@/pages/collection/utils";

const props = defineProps<{
  cat: CatPreview;
}>();
const cat = reactive(props.cat);
</script>

<style lang="scss" scoped>
.cats-box {
  display: flex;
  font-family: sans-serif;

  image {
    width: 150rpx;
    height: 150rpx;
    border-radius: 15px;
    margin-left: 30rpx;
    margin-top: 10rpx;
  }
}

.name {
  width: 380rpx;
}

.text {
  margin-left: 30rpx;
  margin-top: 10rpx;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-between;*/
}

.title {
  font-size: 35rpx;
  color: #333;
  margin-top: 15rpx;
  margin-bottom: 10rpx;
  /*text-overflow: -o-ellipsis-lastline;*/
  /*溢出内容隐藏*/
  overflow: hidden;
  /*文本溢出部分用省略号表示*/
  text-overflow: ellipsis;
  /*特别显示模式*/
  display: -webkit-box;
  /*行数*/
  -webkit-line-clamp: 2;
  line-clamp: 2;
  /*盒子中内容竖直排列*/
  -webkit-box-orient: horizontal;

  .collect {
    image {
      margin-top: 0rpx;
      width: 45rpx;
      height: 45rpx;
    }
  }
}

.data {
  font-size: 20rpx;
  color: #999;
  margin-bottom: 5rpx;
}
</style>
