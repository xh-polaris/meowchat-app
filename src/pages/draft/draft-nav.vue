<template>
  <view class="outer" :style="{ height: height + 'px' }">
    <view class="inner">
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
  </view>

  <view class="empty" :style="{ height: height + 'px' }"></view>

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

// 下面代码是网上搬运的 这个height用来解决自定义顶部导航栏高度多机型适配问题
const res = uni.getSystemInfoSync();
const menu = uni.getMenuButtonBoundingClientRect();
let height =
  (menu.top - res.statusBarHeight) * 2 + menu.height + res.statusBarHeight;
if (res.model.indexOf("iPhone") > -1) {
  height += 4;
}
</script>

<style lang="scss" scoped>
.outer {
  width: 100vw;
  position: fixed;
  background-color: #f8f8f8;
  z-index: 10;

  .inner {
    position: absolute;
    bottom: 8px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.empty {
  width: 100vw;
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
