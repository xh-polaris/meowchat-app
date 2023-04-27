<template>
  <uni-nav-bar :fixed="true" background-color="#f9f9f9" shadow status-bar>
    <view class="font-weight font-md2" style="margin: auto">个人中心</view>
  </uni-nav-bar>
  <view class="container">
    <image
      src="https://static-1308722423.cos.ap-shanghai.myqcloud.com/profile_background.png"
      class="bg-set"
    />
    <UserInfo type="my"></UserInfo>
    <!-- 功能栏 -->
    <view class="com-item">
      <view class="com-wrap">
        <view class="line-info">
          <view class="number">{{ userInfo.following }}</view>
          <view class="info">关注</view>
          <view class="number">{{ userInfo.follower }}</view>
          <view class="info">粉丝</view>
          <view class="number">{{ userInfo.article }}</view>
          <view class="info">创作</view>
          <navigator
            :url="`/pages/profile/edit-info/edit-info?avatarUrl=${userInfo.avatarUrl}&nickname=${userInfo.nickname}`"
            hover-class="none"
          >
            <view class="edit-info"><view class="edit">编辑资料</view></view>
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
  <UserPublished type="my"></UserPublished>
  <tab-bar id="4"></tab-bar>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { User } from "@/apis/schemas";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";
import UserInfo from "@/pages/profile/profile-components/userInfo.vue";
//获取版本号
import UserPublished from "@/pages/profile/profile-components/userPublished.vue";
import { StorageKeys } from "@/utils/const";
const version = uni.getAccountInfoSync().miniProgram.version;
const userInfo = reactive<User>({
  id: "",
  nickname: "微信用户",
  avatarUrl: "https://static.xhpolaris.com/cat_world.jpg",
  motto: "暂无个性签名",
  article: 0,
  follower: 0,
  following: 0
});

const refresh = async () => {
  const res = await getUserInfo({
    userId: ""
  });
  userInfo.id = res.user.id;
  userInfo.nickname = res.user.nickname;
  userInfo.avatarUrl = res.user.avatarUrl;
  userInfo.article = res.user.article;
  userInfo.follower = res.user.follower;
  userInfo.following = res.user.following;
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
@import "@/common/search-input.scss";
.wrap {
  margin-top: 20rpx;
  color: #999999;
  font-size: 24rpx;
  height: 260rpx;
}
.bg-set {
  position: fixed;
  width: 750rpx;
  height: 600rpx;
  z-index: -1;
  opacity: 0.9; //设置透明度
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
    margin-left: 30rpx;
    margin-top: 40rpx;
    margin-bottom: 32rpx;
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
      border-bottom: 1px solid #f8f8f8;
      .cell-content {
        display: flex;
        align-items: center;
        .cell-icon {
          margin-left: 10rpx;
          align-items: center;
          background: #ececec;
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
