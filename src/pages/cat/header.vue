<template>
  <view class="header">
    <view style="height: 3vh"></view>
    <view class="first-line">
      <text>{{ props.cat.name }}</text>
      <!-- <image class="like" mode="widthFix" :src="Icons.Location"/> -->
    </view>
    <view class="second-line">
      {{ props.cat.name }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { Cat } from "@/apis/schemas";
/* import {Icons} from "@/utils/url"; */
interface Props {
  cat: Cat;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.header {
  margin-top: 5vh;
  margin-left: 4vw;
  .first-line {
    font-size: 24px;
    color: #1d1d1d;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    /* .like{
		margin-left: 65vw;
		width:5vw;
		height: 5vw;
	} */
  }
  .second-line {
    font-size: 14px;
    color: #d1d1d1;
    margin-bottom: 5vw;
  }
}
</style>
