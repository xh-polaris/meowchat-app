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
        <image class="search-span" src="/static/images/search_span.png" />
      </view>
    </view>

    <view v-if="cats.length > 0">
      <view v-for="cat of cats" :key="cat.id" class="out">
        <view class="row" @click="onClickCatBox(cat.id)">
          <cat-box :cat="cat" />
        </view>
      </view>
    </view>
    <view v-else>
      <image src="https://static.xhpolaris.com/nodata.png" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import CatBox from "@/pages/collection/cat-box"
import { reactive } from "vue"
import { CatPreview } from "@/apis/community/community-components"
import { onClickCatBox } from "@/pages/collection/event"
import { getCatPreviews } from "@/apis/community/community"

const cats = reactive<CatPreview[]>([])
getCatPreviews().then(res => {
  cats.push(...res.cats)
})

</script>

<style lang="scss" scoped>

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

// 搜索框
.search-bar {
  width: 100%;
  height: 100rpx;
  margin-top: 2%;
}

.search-bar-box {
  display: flex;
  margin: 0 auto;
  width: 620rpx;
  height: 70rpx;
  border: 5rpx solid #f3f7f8;
  border-radius: 50rpx;
}

.search-span {
  width: 56rpx;
  height: 56rpx;
  margin-top: 6rpx;
  margin-right: 30rpx;

}

.search-text {
  width: 100%;
  margin-top: 10rpx;
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #7f7f81;
}

.out {
  padding: 20rpx 30rpx 30rpx;

  .row {
    border-radius: 25px;
    border: 1px solid #dad6d6;
    padding: 20rpx 0;

  }
}


</style>
