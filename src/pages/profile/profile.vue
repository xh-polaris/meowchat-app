<template>
  <uni-nav-bar :fixed="true" background-color="#f9f9f9" shadow status-bar>
    <view class="font-weight font-md2" style="margin: auto">个人中心</view>
  </uni-nav-bar>
  <view class="container">
    <image
      class="bg-set"
      src="https://static.xhpolaris.com/profile_background.png"
    />
    <view class="content">
      <!-- 用户信息：昵称、权限、单位 -->
      <view class="fot-xh">
        <navigator
          :url="`/pages/profile/edit-info/edit-info?avatarUrl=${userInfo.avatarUrl}&nickname=${userInfo.nickname}`"
          hover-class="none"
        >
          <view class="pic">
            <image
              :src="userInfo.avatarUrl"
              style="width: 100%; height: 100%; border-radius: 50%"
            />
          </view>
          <view class="txt">
            <view class="info">
              <view class="nickname">
                {{ userInfo.nickname }}
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 功能栏 -->
      <view class="com-item">
        <view class="com-wrap">
          <view
            v-for="(item, index) in userOptions"
            :key="index"
            class="cell"
            @click="item.function"
          >
            <navigator :url="item.url" hover-class="none">
              <view class="cell-left">
                <image
                  :src="item.icon"
                  class="cell-icon"
                  mode="widthFix"
                  style="width: 15%; border-radius: 50%"
                />
                <view class="cell-text">
                  {{ item.title }}
                </view>
                <image class="arrow" src="/static/images/arrow_right.png" />
              </view>
              <view class="iconfont" />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
  <tab-bar id="4"></tab-bar>
  <view
    class="font-sm text-center w-100"
    style="position: absolute; bottom: 140rpx; color: #696969"
    >版本号：1.11.0
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { User } from "@/apis/schemas";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";

const userInfo = reactive<User>({
  id: "",
  nickname: "微信用户",
  avatarUrl: "https://static.xhpolaris.com/cat_world.jpg"
});
const refresh = async () => {
  const res = await getUserInfo();
  userInfo.id = res.user.id;
  userInfo.nickname = res.user.nickname;
  userInfo.avatarUrl = res.user.avatarUrl;
};
onShow(refresh);
onPullDownRefresh(() => {
  refresh().then(() => {
    uni.stopPullDownRefresh();
  });
});

function showToast() {
  uni.showToast({
    title: "页面暂未开放",
    icon: "error",
    duration: 2000
  });
}

const userOptions = [
  {
    title: "我的发布",
    icon: "/static/images/my_publish.png",
    url: "/pages/profile/my-publish/my-publish"
  },
  //{
  // title: "我的关注",
  //icon: "/static/images/my_follow.png",
  // url: "/pages/profile/my-follow/my-follow"
  //},
  //{
  //title: "我的点赞",
  //icon: "/static/images/my_follow.png",
  //url: "/pages/profile/my-liked/my-liked"
  //},
  {
    title: "快速联系",
    icon: "/static/images/quick_contact.png",
    url: "/pages/profile/quick-contact/quick-contact"
  },
  {
    title: "申请领养",
    icon: "/static/images/apply_adopt.png",
    url: "",
    function: showToast
  },
  {
    title: "申请管理",
    icon: "/static/images/apply_admin.png",
    url: "",
    function: showToast
  }
];

onLoad(() => {
  uni.showLoading({
    title: "加载中"
  });
});

onReady(() => {
  uni.hideLoading();
});
</script>

<style lang="scss" scoped>
.bg-set {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.9; //设置透明度
}

.fot-xh .pic {
  float: left;
  height: 160rpx;
  width: 160rpx;
  margin-right: 50rpx;
  margin-left: 38rpx;
  margin-top: 60rpx;
}

.fot-xh .txt {
  padding: 15rpx 0;
  overflow: hidden;
  font-family: sans-serif;
}

.fot-xh .txt .info {
  margin-top: 80rpx;
  position: absolute;
  display: block;
}

.fot-xh .txt .info .nickname {
  height: 30rpx;
  width: 600rpx;
  font-size: 40rpx;
  margin-bottom: 30rpx;
  font-weight: bold;
}

.fot-xh .txt .info .right {
  height: 28rpx;
  width: 600rpx;
  font-size: 25rpx;
  margin-bottom: 13rpx;
}

.fot-xh .txt .info .unit {
  color: #696969;
  height: 28rpx;
  width: 600rpx;
  font-size: 23rpx;
  margin-top: 10rpx;
  margin-bottom: 13rpx;
}

.com-item {
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-top: 250rpx;
  margin-bottom: 20rpx;
}

.com-item .com-wrap {
  border-radius: 25rpx;
  overflow: hidden;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
}

.cell {
  height: 100rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid #f8f8f8;
  opacity: 0.85; //设置透明度
  .cell-left {
    display: flex;
    align-items: center;

    .cell-icon {
      width: 50rpx;
      height: 50rpx;
      margin-left: 10rpx;
      float: left;
    }

    .cell-text {
      width: 610rpx;
      color: #353535;
      font-size: 30rpx;
      margin-left: 20rpx;
    }

    .arrow {
      width: 30rpx;
      height: 30rpx;
    }
  }

  .iconfont {
    font-size: 40rpx;
    color: #999;
  }
}

.another {
  padding-left: 45rpx;
  font-size: 30rpx;
  margin-bottom: 13rpx;
  font-weight: bold;
}
</style>
