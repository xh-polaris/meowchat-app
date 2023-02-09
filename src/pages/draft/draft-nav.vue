<template>
  <view class="frame">
    <view class="close" @click="close"></view>

    <template v-if="type === 'post'">
      <view class="nav current">发帖子</view>
      <view class="nav" @click="type = 'moment'">发动态</view>
    </template>
    <template v-if="type === 'moment'">
      <view class="nav" @click="type = 'post'">发帖子</view>
      <view class="nav current">发动态</view>
    </template>
  </view>

  <view class="empty"></view>

  <draft-post v-if="type === 'post'"></draft-post>
  <draft-moment v-if="type === 'moment'"></draft-moment>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import DraftPost from "@/pages/draft/draft-post.vue";
import DraftMoment from "@/pages/draft/draft-moment.vue";

const type = ref("发帖子");
onLoad((option) => {
  type.value = option.type;
});

const close = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.frame {
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  align-items: center;
  padding-top: 44px;
  padding-bottom: 4vw;
  z-index: 10;
}

.empty {
  width: 100vw;
  height: 20vw;
}

.close {
  width: calc(18 / 390 * 100vw);
  height: calc(18 / 390 * 100vw);
  background-image: url("@/static/images/cancel.png");
  background-size: 100% 100%;
  position: absolute;
  left: calc(28 / 390 * 100vw);
  z-index: 12;
}

.nav {
  color: #b8b8b8;
  font-size: calc(18 / 390 * 100vw);
  margin: 0 calc(12 / 390 * 100vw);
  padding-bottom: calc(4 / 390 * 100vw);
  border-bottom: #b8b8b8 calc(1 / 390 * 100vw) solid;

  &.current {
    color: #1d1d1d;
    border-bottom: #0094ff calc(1 / 390 * 100vw) solid;
  }
}
</style>
