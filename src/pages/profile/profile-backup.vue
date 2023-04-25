<template>
  <image class="bg-set" :src="Pictures.ProfileBackground" />
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
            <view class="sign">个性签名: 点击这里填上个性签名</view>
            <view class="schoolBubble">华东师范大学</view>
          </view>
        </view>
      </navigator>
    </view>

    <view class="profileBox">
      <view class="dataBox">
        <view class="number"> 13 </view>
        <view class="ele">关注</view>
        <view class="number"> 2 </view>
        <view class="ele">粉丝</view>
        <view class="number"> 7 </view>
        <view class="ele">创作</view>
        <view class="number"> 24 </view>
        <view class="ele">获赞</view>
        <view class="edit"> 编辑资料 </view>
      </view>

      <view class="functionBox">
        <view
          v-for="(item, index) in userOptions"
          :key="index"
          class="function"
          @click="item.function"
        >
          <image class="img" :src="item.icon"></image>
          <view class="right">
            <view class="title">{{ item.title }}</view>
            <view class="brief">{{ item.brief }}</view>
          </view>
        </view>
      </view>
      <my-publish></my-publish>
    </view>
  </view>
  <tab-bar id="4"></tab-bar>
  <view
    v-if="version"
    class="font-sm text-center w-100"
    style="position: absolute; bottom: 140rpx; color: #696969"
    >版本号：{{ version }}
  </view>
  <view
    v-else
    class="font-sm text-center w-100"
    style="position: absolute; bottom: 140rpx; color: #696969"
    >版本号：1.14.2
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { User } from "@/apis/schemas";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import UniNavBar from "@/components/third-party/uni-ui/uni-nav-bar/uni-nav-bar.vue";
import { Pictures } from "@/utils/url";
import MyPublish from "@/pages/profile/my-publish/my-publish.vue";

//获取版本号
const version = uni.getAccountInfoSync().miniProgram.version;

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
  // {
  //   title: "我的发布",
  //   icon: "/static/images/my_publish.png",
  //   url: "/pages/profile/my-publish/my-publish"
  // },
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
    title: "联系喵社区",
    icon: "/static/images/quick_contact.png",
    brief: "联系我们",
    url: "/pages/profile/quick-contact/quick-contact"
  },
  {
    title: "申请领养",
    icon: "/static/images/apply_adopt.png",
    brief: "领养一只小猫咪",
    url: "",
    function: showToast
  },
  {
    title: "申请管理",
    icon: "/static/images/apply_admin.png",
    brief: "成为管理员",
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
  height: 35%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.9; //设置透明度
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.fot-xh {
  position: relative;
  margin-top: 100rpx;
}
.fot-xh .pic {
  float: left;
  height: 160rpx;
  width: 160rpx;
  margin-right: 50rpx;
  margin-left: 38rpx;
  margin-top: 70rpx;
}

.fot-xh .txt {
  //padding: 5rpx 0;
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
.sign {
  font-size: 22rpx;
  color: #939393;
  padding-top: 12rpx;
}
.schoolBubble {
  display: inline-block;
  font-size: 17rpx;
  padding: 5rpx 10rpx 5rpx 10rpx;
  background: rgba(31, 161, 255, 0.33);
  border-radius: 20rpx;
  color: #1fa1ff;
}

.profileBox {
  margin-top: 50rpx;
  width: 100%;
  background-color: #ffffff;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
}
.i {
  display: flex;
  flex-direction: column;
}
// 第一行的数字资料
.dataBox {
  display: flex;
  flex-direction: row;
  margin-left: 20rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;

  .number {
    font-size: 40rpx;
    margin-left: 30rpx;
    color: #353535;
  }
  .ele {
    font-size: 22rpx;
    margin-left: 10rpx;
    color: #696969;
    margin-top: 18rpx;
  }
}
.edit {
  display: flex;
  flex-direction: row;
  font-size: 20rpx;
  margin-left: auto;
  margin-right: 40rpx;
  padding: 10rpx 20rpx 5rpx 20rpx;
  border-radius: 30rpx;
  color: #616161;
  background-color: #e6e6e6;
}

// 功能栏
.functionBox {
  display: flex;
  flex-direction: row;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
}
.function {
  display: flex;
  flex-direction: row;
  .img {
    width: 60rpx;
    height: 60rpx;
    padding: 5rpx;
    background: rgba(217, 217, 217, 0.35);
    border-radius: 10rpx;
    margin-left: 40rpx;
  }
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
    .title {
      font-size: 22rpx;
      font-weight: bold;
      color: #353535;
    }
    .brief {
      font-size: 18rpx;
      margin-top: auto;
      color: #939393;
    }
  }
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
