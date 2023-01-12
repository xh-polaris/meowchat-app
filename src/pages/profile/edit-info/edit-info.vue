<template>
  <view class="container">
    <image
      class="bg-set"
      src="https://static.xhpolaris.com/profile_background.png"
    />
    <view class="content">
      <view class="choose-avatar-row">
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image :src="avatarUrl" class="avatar" />
        </button>
        <text>点击选择头像</text>
      </view>
      <view class="choose-nickname-row">
        <text>新昵称:</text>
        <input
          class="title"
          placeholder="请输入昵称"
          type="nickname"
          @blur="onNickName"
        />
      </view>
    </view>
    <button class="confirm-change" @click="onClickConfirm()">确认更改</button>
  </view>
</template>

<script lang="ts">
import { updateUserInfo } from "@/apis/user/user";
import { UpdateUserReq } from "@/apis/user/user-interfaces";

export default {
  data() {
    return {
      avatarUrl: "https://static.xhpolaris.com/cat_world.jpg",
      nickName: "",
    };
  },
  methods: {
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail;
      this.avatarUrl = avatarUrl;
    },
    onNickName(e: any) {
      this.nickName = e.detail.value;
    },
    onClickConfirm() {
      const userInfo: UpdateUserReq = {
        avatarUrl: this.avatarUrl,
        nickname: this.nickName,
      };
      updateUserInfo(userInfo).then((res) => {
        uni.showToast({
          title: res.msg,
        });
      });
      uni.reLaunch({
        url: "/pages/profile/profile",
      });
    },
  },
};
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

.content {
  box-shadow: 0 0 10rpx #eeeeee;
  margin: 60rpx;
  padding: 20rpx;
  margin-top: 30rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
}

.choose-avatar-row {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 2px;
  font-size: 14px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  .avatar-wrapper {
    width: 160rpx;
    height: 160rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
    margin-left: 140rpx;
  }

  .avatar {
    width: 100%;
    height: 100%;
  }
}

.avatar-wrapper {
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  margin-right: 10px;

  .avatar {
    width: 100%;
    height: 100%;
  }
}

.choose-nickname-row {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 2px;
  font-size: 14px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.confirm-change {
  margin-top: 20rpx;
  width: 60%;
  background-color: azure;
}
</style>
