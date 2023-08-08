<template>
  <view class="info">
    <view class="sterilized">
      <view class="attribute"> 绝育情况</view>
      <view class="content font-weight font-big">
        {{ props.cat.isSterilized ? '已绝育' : '未绝育' }}
      </view>
    </view>
    <view class="color">
      <view class="attribute"> 花色</view>
      <view class="content font-weight font-big">
        {{ cat.color }}
      </view>
    </view>
    <view class="sex">
      <view class="attribute"> 性别</view>
      <view class="content font-weight font-big">
        {{ props.cat.sex }}
      </view>
    </view>
  </view>
  <view class="info">
    <view class="age">
      <view class="attribute"> 年龄</view>
      <view class="content font-weight font-big">
        {{ props.cat.age }}
      </view>
    </view>
    <view class="area">
      <view class="attribute"> 出没地区</view>
      <view class="content font-weight font-big">
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
.attribute {
  color: #1fa1ff;
  font-size: 3.5vw;
  text-align: center;
  position: relative;
  top: 5vw;
}
.content {
  font-size: 4vw;
  text-align: center;
  vertical-align: center;
  position: relative;
  top: 8vw;
}
.sterilized {
  background-color: rgb(247,248,252);
  width: 37vw;
  height: 25vw;
  display: inline-block;
  align-items: center;
  border-radius: 15px;
  position: relative;
  top: -3vw;
  left: 3vw;
}
.color {
  background-color: rgb(247,248,252);
  width: 25vw;
  height: 25vw;
  display: inline-block;
  border-radius: 15px;
  position: relative;
  top: -3vw;
  left: 6vw;
}
.sex {
  background-color: rgb(247,248,252);
  width: 25vw;
  height: 25vw;
  display: inline-block;
  border-radius: 15px;
  position: relative;
  top: -3vw;
  left: 9vw;
}

.age {
  background-color: rgb(247,248,252);
  width: 25vw;
  height: 25vw;
  display: inline-block;
  border-radius: 15px;
  position: relative;
  top: 0vw;
  left: 3vw;
}
.area {
  background-color: rgb(247,248,252);
  width: 65vw;
  height: 25vw;
  display: inline-block;
  border-radius: 15px;
  position: relative;
  top: 0vw;
  left: 6vw;
}
</style>
