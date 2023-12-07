<template>
  <view class="background" />
  <view class="container">
    <image :src="Pictures.ProfileBackground" class="bg-set" />
    <view class="app-version" @click="clickAppVersion">{{
      clickedTimes < 5 ? appVersion : "ID: " + user.id
    }}</view>
    <view style="height: 110rpx; z-index: -999" />
    <UserInfo type="my" />
    <!-- 功能栏 -->
    <view class="com-item">
      <view class="com-wrap">
        <view class="line-info">
          <view class="number">{{ user.following }}</view>
          <view class="info">关注</view>
          <view class="number">{{ user.follower }}</view>
          <view class="info">粉丝</view>
          <view class="number">{{ user.article }}</view>
          <view class="info">创作</view>
          <navigator
            :url="`${Pages.EditInfo}?avatarUrl=${user.avatarUrl}&nickname=${user.nickname}`"
            hover-class="none"
          >
            <view class="edit-info">
              <view class="edit">编辑资料</view>
            </view>
          </navigator>
        </view>
        <view class="cell-line">
          <view
            v-for="(item, index) in userOptions"
            :key="index"
            class="cell"
            @click="item.function"
          >
            <navigator :url="item.url" hover-class="none">
              <view class="cell-content">
                <image
                  :src="item.icon"
                  class="cell-icon"
                  mode="widthFix"
                  style="width: 100rpx; border-radius: 10%"
                />
                <view class="cell-text">
                  <view class="title">{{ item.title }}</view>
                  <view class="des">{{ item.des }}</view>
                </view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
  <UserPublished v-if="show" type="my" />
  <view style="width: 100%; height: 18vw" />
  <BottomBar id="profile" />
  <template v-if="enableDebug">
    <DebugPanel />
  </template>
</template>

<script lang="ts" setup>
import BottomBar from "@/components/BottomBar.vue";
import { reactive, ref } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { User } from "@/apis/schemas";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import UserInfo from "@/pages/profile/profile-components/userInfo.vue";
import DebugPanel from "@/components/DebugPanel.vue";
import UserPublished from "@/pages/profile/profile-components/userPublished.vue";
import { Pages, Pictures } from "@/utils/url";
import { StorageKeys } from "@/utils/const";
import { refresh } from "@/utils/utils";

const user = reactive<User>({
  id: "",
  nickname: "微信用户",
  avatarUrl: "https://static.xhpolaris.com/cat_world.jpg",
  motto: "暂无自我介绍",
  article: 0,
  follower: 0,
  following: 0
});
const show = ref(true);
const enableDebug = uni.getStorageSync(StorageKeys.EnabledDebug);

const loadUser = async () => {
  const res = await getUserInfo({});
  user.id = res.user.id;
  user.nickname = res.user.nickname;
  user.avatarUrl = res.user.avatarUrl;
  user.motto = res.user.motto;
  user.article = res.user.article || 0;
  user.follower = res.user.follower || 0;
  user.following = res.user.following || 0;
};
const clickedTimes = ref(0);
const clickAppVersion = () => {
  if (clickedTimes.value >= 5) {
    uni.setClipboardData({
      data: user.id,
      success: () => {
        uni.showToast({
          title: "已复制至剪贴板"
        });
      }
    });
    return;
  }
  clickedTimes.value++;
};
const accountInfo = uni.getAccountInfoSync();
const appVersion = accountInfo.miniProgram.version
  ? "version: " + accountInfo.miniProgram.version
  : "version: 体验版";

onShow(loadUser);
onPullDownRefresh(() => {
  loadUser().then(() => {
    refresh(show);
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

interface UserOption {
  title: string;
  icon: string;
  des: string;
  url: string;
  function: () => void;
}

const userOptions = [
  {
    title: "联系我们",
    icon: "/static/images/quick_contact.png",
    des: "联系喵社区",
    url: "/pages/profile/quick-contact/quick-contact"
  },
  {
    title: "申请领养",
    icon: "/static/images/apply_adopt.png",
    des: "领养一只小猫咪",
    url: "",
    function: showToast
  },
  {
    title: "申请管理",
    icon: "/static/images/apply_admin.png",
    des: "成为管理员",
    url: "",
    function: showToast
  }
] as UserOption[];

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
@import "@/common/search-input.scss";
.background {
  height: 100vh;
  width: 100vw;
  background-color: #fafcff;
  z-index: -10;
  position: absolute;
}
.container {
  position: relative;
  .app-version {
    z-index: 3;
    position: absolute;
    right: 5vw;
    top: 310rpx;
    user-select: text;
    font-size: 3vw;
    color: #8a8a8a;
  }
}

.wrap {
  margin-top: 20rpx;
  color: #999999;
  font-size: 24rpx;
  height: 260rpx;
}

.bg-set {
  position: fixed;
  background-size: cover;
  width: 750rpx;
  height: 1115rpx;
  z-index: -1;
}

.com-item {
  margin-top: 250rpx;
  margin-bottom: 0rpx;
}

.com-item .com-wrap {
  border-radius: 50rpx 50rpx 0 0;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  background: #ffff;

  .line-info {
    margin-top: 24rpx;
    margin-left: 36rpx;
    display: flex;
    align-items: center;

    .number {
      height: 50rpx;
      font-size: 36rpx;
      color: #353535;
      font-weight: 400;
    }

    .info {
      margin-left: 10rpx;
      margin-right: 42rpx;
      width: 48rpx;
      height: 34rpx;
      font-size: 24rpx;
      color: #212121;
      font-weight: 400;
    }

    .edit-info {
      width: 110rpx;
      height: 33rpx;
      margin-left: 200rpx;
      border-radius: 20rpx;
      background-color: #d1d1d1;

      .edit {
        line-height: 33rpx;
        text-align: center;
        color: #616161;
        font-size: 20rpx;
        font-weight: 400;
      }
    }
  }

  .cell-line {
    display: flex;
    align-items: center;
    margin: 40rpx 30rpx 32rpx;
    overflow-x: scroll;
    overflow-y: scroll;

    .cell {
      height: 100rpx;
      width: 240rpx;
      margin-top: 0;
      display: inline-block;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid #ececec;

      .cell-content {
        display: flex;
        align-items: center;

        .cell-icon {
          margin-left: 10rpx;
          align-items: center;
        }

        .cell-text {
          width: 200rpx;
          height: 80rpx;
          margin-left: 14rpx;

          .title {
            width: 120rpx;
            height: 45rpx;
            color: #353535;
            font-size: 28rpx;
            font-weight: 400;
            margin-bottom: 8rpx;
          }

          .des {
            width: 140rpx;
            height: 45rpx;
            color: #939393;
            font-size: 20rpx;
            font-weight: 400;
          }
        }
      }
    }
  }

  .cell-line::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    display: none;
  }
}
</style>
