<template>
  <view
    :style="{ height: navBarHeight + 'px', backgroundColor: props.bgColor }"
    :class="'nav-bar ' + (props.hasShadow ? 'shadow' : '')"
  >
    <view :style="{ height: topBarHeight + 'px' }" class="top-bar"></view>
    <view :style="{ height: capsuleBarHeight + 'px' }" class="capsule-bar">
      <view class="center">
        <slot name="center"></slot>
      </view>
      <view v-if="props.hasGoBack" class="left">
        <image
          class="goBackImage"
          mode="scaleToFill"
          :src="Icons.GoBack"
          @click="goBack"
        ></image>
      </view>
      <view v-else class="left">
        <slot name="left"></slot>
      </view>
    </view>
  </view>
  <view :style="{ height: navBarHeight + 'px' }"></view>
</template>

<script lang="ts" setup>
import { Icons } from "@/utils/url";
const topBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const capsuleData = uni.getMenuButtonBoundingClientRect();
const capsuleBarHeight =
  capsuleData.height + (capsuleData.top - topBarHeight) * 2;
const navBarHeight = topBarHeight + capsuleBarHeight;
interface Props {
  bgColor: string;
  hasShadow: boolean;
  hasGoBack: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  bgColor: "#fdfdfd",
  hasShadow: true,
  hasGoBack: false
});
const goBack = () => {
  let pages = getCurrentPages(); // 当前页面
  let beforePage = pages[pages.length - 2]; // 上一页
  uni.navigateBack({
    success: function () {
      // beforePage.onLoad(); // 执行上一页的onLoad方法
    }
  });
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100vw;
  z-index: 100;
  //box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.2), 0 -3px 10px 0 rgba(0, 0, 0, 0.19);
  &.shadow {
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.2),
      0 -3px 10px 0 rgba(0, 0, 0, 0.19);
  }
  .top-bar {
    width: 100vw;
  }

  .capsule-bar {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    .center {
      font-size: 4.7vw;
      font-weight: bold;
    }
    .left {
      position: fixed;
      left: 0;
      .goBackImage {
        margin-left: 3vw;
        width: 2.4vw;
        height: 4vw;
      }
    }
  }
}
</style>
