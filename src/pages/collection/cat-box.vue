<template>
  <view class="cats-box">
    <image class="avatar" :src="cat.avatarUrl" mode="aspectFill" />
    <view class="text">
      <view class="title">{{ cat.name }}</view>
      <view class="details">
        <view class="info">花色：{{ cat.color }}</view>
        <view class="info">出没地区： {{ cat.area }}</view>
      </view>
    </view>
    <!--    <view v-if="cat.isCollected" class="star collected"></view>-->
    <!--    <view v-else class="star"></view>-->
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { CatPreview } from "@/apis/schemas";

const props = defineProps<{ cat: CatPreview }>();
const cat = reactive(props.cat);
</script>

<style lang="scss" scoped>
@import "@/common/cat-box.scss";
</style>
