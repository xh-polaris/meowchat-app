<template>
  <view class="cats-box">
    <view class="pic">
      <image :src="cat.avatars[0]" mode="aspectFill" />
    </view>
    <view class="text">
      <view class="title">
        <text>{{ cat.name }}</text>
        <view class="collect">
          <image
            :src="cat.isCollected?'/static/images/collect.png':'/static/images/collect_HL.png'"
            mode="aspectFill" @click.stop="onClickCollect(cat)"
          />
        </view>
      </view>
      <view class="data">
        <text>花色：{{ cat.color }}</text>
      </view>
      <view class="data">
        <text>出没地区： {{ cat.area }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { CollectionCat } from "@/apis/community/community-components"
import { onClickCollect } from "@/pages/collection/event"

const props = defineProps<{ cat: CollectionCat }>()
const cat = reactive(props.cat)
</script>

<style lang="scss" scoped>

.cats-box {
  display: flex;

  .pic {
    width: 200rpx;
    height: 200rpx;
  }

  image {
    border-radius: 15px;
    margin-left: 20rpx;
    width: 100%;
    height: 100%;
  }
}

.text {
  padding-left: 20rpx;
  margin-left: 40rpx;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-between;*/
}

.title {
  font-size: 40rpx;
  color: #333;
  margin-top: 20rpx;
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
  -webkit-box-orient: vertical;

  image {
    padding-left: 300rpx;
    margin-top: 10rpx;
    width: 40rpx;
    height: 40rpx;
  }
}

.data {
  font-size: 25rpx;
  color: #999;
  margin-bottom: 10rpx;
}
</style>
