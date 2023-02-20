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
            mode="aspectFill"
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

const props = defineProps<{ cat: CatPreview }>();
const cat = reactive(props.cat);
</script>

<style lang="scss" scoped>
@import "@/common/cat-box.scss";
</style>
