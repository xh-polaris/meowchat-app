<template>
  <view class="tab-box">
    <view
      v-for="item in tabContent"
      :key="item.id"
      class="tab"
      @click="item.id === 'draft' ? draft() : tabChange(item.url)"
    >
      <image
        :class="chooseIconClass(item.id)"
        :src="item.id === props.id ? item.activeIcon : item.icon"
      />
      <text :class="chooseTextClass(item.id)">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Pages } from "@/utils/url";
interface Props {
  id: string;
}
const props = defineProps<Props>();
const emits = defineEmits(["toggleShowingDraft"]);
const tabContent = [
  {
    id: "community",
    icon: "/static/images/bubble_grey.png",
    activeIcon: "/static/images/bubble_blue.png",
    url: Pages.Community,
    text: "社区"
  },
  {
    id: "collection",
    icon: "/static/images/collection-grey.png",
    activeIcon: "/static/images/collection-blue.png",
    url: Pages.Collection,
    text: "图鉴"
  },
  {
    id: "draft",
    icon: "/static/images/plus-bg-blue.png",
    activeIcon: "/static/images/plus-bg-blue.png",
    url: `${Pages.DraftNav}?type=post`,
    text: ""
  },
  {
    id: "world",
    icon: "/static/images/mark_grey.png",
    activeIcon: "/static/images/mark_blue.png",
    url: Pages.World,
    text: "世界"
  },
  {
    id: "profile",
    icon: "/static/images/cat_grey.png",
    activeIcon: "/static/images/cat_blue.png",
    url: Pages.Profile,
    text: "我的"
  }
];

function chooseIconClass(id: string) {
  if (id === "draft") {
    return "tab-con0";
  } else {
    return "tab-con";
  }
}

function chooseTextClass(id: string) {
  if (id === props.id) {
    return "icon-text0";
  } else {
    return "icon-text1";
  }
}

const tabChange = (path: string) => {
  emits("toggleShowingDraft", false);
  uni.switchTab({
    url: path
  });
};
const draft = () => {
  emits("toggleShowingDraft", true);
};
</script>

<style scoped lang="scss">
.tab-box {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: #fdfdfd;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 18vw;

  .tab {
    display: grid;
  }

  .tab-con {
    will-change: auto;
    width: 70rpx;
    height: 54rpx;
    margin: 0 30rpx 16rpx 30rpx;
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
