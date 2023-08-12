<template>
  <view class="info">
    <view class="tile" style="width: 32vw">
      <view class="key">绝育情况</view>
      <view class="value">
        {{ props.cat.isSterilized ? "已绝育" : "未绝育" }}
      </view>
    </view>
    <view class="tile" style="width: 25vw">
      <view class="key">花色</view>
      <view class="value">
        {{ props.cat.color }}
      </view>
    </view>
    <view class="tile" style="width: 25vw">
      <view class="key">性别</view>
      <view class="value">
        {{ props.cat.sex }}
      </view>
    </view>
  </view>
  <view class="info">
    <view class="tile" style="width: 25vw">
      <view class="key">年龄</view>
      <view class="value">
        {{ props.cat.age }}
      </view>
    </view>
    <view class="tile" style="width: 60vw">
      <view class="key">出没地区</view>
      <view class="value">
        {{ props.cat.area }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Cat } from "@/apis/schemas";

interface Props {
  cat: Cat;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.info {
  margin-left: 6vw;
  margin-top: 3vw;
  width: 88vw;
  display: flex;
  justify-content: space-between;
  .tile {
    border-radius: 2vw;
    background-color: #f7f8fc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25vw;
    .key {
      color: #1fa1ff;
      font-size: 3.5vw;
      width: fit-content;
      margin-bottom: 4vw;
    }
    .value {
      font-size: 4vw;
      font-weight: bold;
      width: fit-content;
    }
  }
}
</style>
