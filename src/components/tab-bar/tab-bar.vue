<template>
  <view class="tab-box">
    <view
      v-for="(item, index) in tabContent"
      :key="index"
      class="tab"
      @click="item.id === '0' ? tabSwitch(item.url) : tabChange(item.url)"
    >
      <image
        :class="chooseIconClass(item.id)"
        :src="item.id === selectedId ? item.activeIcon : item.icon"
      />
      <text :class="chooseTextClass(item.id)">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Pages } from "@/utils/url";

const props = defineProps<{ id: string }>();
const selectedId = ref(props.id);
const momentUrl = `${Pages.DraftNav}?type=moment`;
const tabContent = [
  {
    id: "1",
    icon: "/static/images/world-grey.png",
    activeIcon: "/static/images/world-blue.png",
    url: Pages.World,
    text: "世界"
  },
  {
    id: "2",
    icon: "/static/images/community-grey.png",
    activeIcon: "/static/images/community-blue.png",
    url: Pages.Community,
    text: "社区"
  },
  {
    id: "0",
    icon: "/static/images/plus-bg-blue.png",
    activeIcon: "/static/images/plus-bg-blue.png",
    url: `${Pages.DraftNav}?type=post`,
    text: ""
  },
  {
    id: "3",
    icon: "/static/images/collection-grey.png",
    activeIcon: "/static/images/collection-blue.png",
    url: Pages.Collection,
    text: "图鉴"
  },
  {
    id: "4",
    icon: "/static/images/mine-grey.png",
    activeIcon: "/static/images/mine-blue.png",
    url: Pages.Profile,
    text: "我的"
  }
];
function chooseIconClass(id: string) {
  if (id === "0") {
    return "tab-con0";
  } else {
    return "tab-con";
  }
}
function chooseTextClass(id: string) {
  if (id === selectedId.value) {
    return "icon-text0";
  } else {
    return "icon-text1";
  }
}
const tabChange = (path: string) => {
  uni.switchTab({
    url: path
  });
};
const tabSwitch = (path: string) => {
  if (selectedId.value === "1") {
    uni.navigateTo({
      url: path
    });
  } else {
    uni.navigateTo({
      url: momentUrl
    });
  }
};
</script>

<style lang="scss" scoped>
.tab-box {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background: #fdfdfd;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 120rpx;
  .tab {
    display: grid;
  }
  .tab-con {
    will-change: auto;
    width: 70rpx;
    height: 70rpx;
    margin: 0 30rpx 0 30rpx;
  }
  .tab-con0 {
    will-change: auto;
    width: 110rpx;
    height: 110rpx;
    margin: 0 30rpx 0 30rpx;
  }
  .icon-text1 {
    font-size: 20rpx;
    color: #7f7f81;
    margin-top: -10rpx;
    margin-left: auto;
    margin-right: auto;
  }
  .icon-text0 {
    font-size: 20rpx;
    color: #1fa1ff;
    margin-top: -10rpx;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
