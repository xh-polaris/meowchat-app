<template>
  <view class="header">
    <view style="height: 1vw" />
    <view class="first-line">
      <text>{{ props.cat.name }}</text>
      <!-- <image class="like" mode="widthFix" :src="Icons.Location"/> -->
    </view>
    <view class="second-line">
      {{ props.cat.color }}
    </view>
    <view class="line" />
  </view>
</template>

<script lang="ts" setup>
import { Cat } from "@/apis/schemas";

/* import {Icons} from "@/utils/url"; */
interface Props {
  cat: Cat;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.header {
  margin-top: 4vw;
  margin-left: 6vw;
  margin-right: 6vw;

  .first-line {
    font-size: 6vw;
    color: #1d1d1d;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    margin-top: 6vw;
    /* .like{
		margin-left: 65vw;
		width:5vw;
		height: 5vw;
	} */
  }

  .second-line {
    font-size: 4vw;
    color: #d1d1d1;
    margin-bottom: 3vw;
  }

  .line {
    width: 88vw;
    height: 2vw;
    margin-bottom: 2vw;
    border-bottom: 1vw solid #f3f3f3;
  }
}
</style>
