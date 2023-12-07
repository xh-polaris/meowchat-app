<template>
  <view v-if="props.cardList.length === 1" class="">
    <view
      class="mx-2 my-2"
      style="height: 200rpx; background-color: #ececec; border-radius: 20rpx"
    />
  </view>
  <view
    v-if="props.cardList.length > 1 && props.cardList.length <= 3"
    class="d-flex mx-2 my-2"
  >
    <view
      v-for="(item, index) in props.cardList"
      :key="index"
      class="mx-1"
      style="
        height: 200rpx;
        background-color: #ececec;
        width: 50%;
        border-radius: 20rpx;
      "
    />
  </view>
  <scroll-view
    v-if="props.cardList.length > 3"
    class="d-flex mx-2 my-2 w-100 scroll-view_H"
    scroll-x="true"
  >
    <view
      v-for="(item, index) in props.cardList"
      :key="index"
      class="mx-1 scroll-view-item_H"
      style="
        height: 200rpx;
        background-color: #ececec;
        width: 40%;
        border-radius: 20rpx;
      "
    />
  </scroll-view>
</template>

<script lang="ts" setup>
interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  cardList: Object;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "@/common/third-party/zcm-main.css";

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>
