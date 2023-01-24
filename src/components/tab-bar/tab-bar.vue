<template>
  <view class="tab-box">
    <view
      v-for="(item, index) in tabContent"
      :key="index"
      class="tab"
      @click="item.id === '0' ? tabSwitch(item.url) : tabChange(item.url)"
    >
      <image
        v-if="item.id === '0'"
        class="tab-con0"
        :src="selectedId === item.id ? item.activeIcon : item.icon"
      />
      <image
        v-else
        class="tab-con"
        :src="selectedId === item.id ? item.activeIcon : item.icon"
      />
      <text v-if="selectedId === item.id" class="icon-text0">
        {{ item.text }}
      </text>
      <text v-else class="icon-text1">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps<{ id: string }>();
const selectedId = ref(props.id);
const momentUrl = "/pages/draft/draft-moment";
const tabContent = [
  {
    id: "1",
    icon: "/static/images/world-grey.png",
    activeIcon: "/static/images/world-blue.png",
    url: "/pages/world/world",
    text: "世界"
  },
  {
    id: "2",
    icon: "/static/images/community-grey.png",
    activeIcon: "/static/images/community-blue.png",
    url: "/pages/community/community",
    text: "社区"
  },
  {
    id: "0",
    icon: "/static/images/plus-bg-blue.png",
    activeIcon: "/static/images/plus-bg-blue.png",
    url: "/pages/draft/draft-post",
    text: ""
  },
  {
    id: "3",
    icon: "/static/images/collection-grey.png",
    activeIcon: "/static/images/collection-blue.png",
    url: "/pages/collection/collection",
    text: "图鉴"
  },
  {
    id: "4",
    icon: "/static/images/mine-grey.png",
    activeIcon: "/static/images/mine-blue.png",
    url: "/pages/profile/profile",
    text: "我的"
  }
];
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

onMounted(() => {
  uni.hideTabBar({});
});
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
  background: #ffffff;
  border-top: 1px #1d1d1d;
  height: 120rpx;
  .tab {
    display: grid;
  }
  .tab-con {
    width: 70rpx;
    height: 70rpx;
    margin: 0 30rpx 0 30rpx;
  }
  .tab-con0 {
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
