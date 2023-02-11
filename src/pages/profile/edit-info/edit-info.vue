<template>
  <view class="container">
    <image
      class="bg-set"
      src="https://static.xhpolaris.com/profile_background.png"
    />
    <view class="choose-avatar-row">
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image
          :src="userInfo.avatarUrl ? userInfo.avatarUrl : props.avatarUrl"
          class="avatar"
        />
      </button>
      <text class="avatar-hint">点击更换头像</text>
    </view>
    <text class="nickname">昵称</text>
    <view class="choose-nickname-row">
      <input
        class="update-nickname"
        placeholder="请输入昵称"
        type="nickname"
        :value="userInfo.nickname ? userInfo.nickname : props.nickname"
        @blur="onNickName"
      />
    </view>
    <text class="nickname">学校名</text>
    <view class="choose-nickname-row">
      <input
        class="update-nickname"
        placeholder="请输入学校"
        :value="school"
        @blur="onSchool"
      />
    </view>
    <button class="confirm-change" @click="onClickConfirm()">
      <text class="save">确认</text>
    </button>
  </view>
</template>

<script lang="ts" setup>
import { updateUserInfo } from "@/apis/user/user";
import { UpdateUserInfoReq } from "@/apis/user/user-interfaces";
import { putObject } from "@/apis/cos/cos";
import { reactive, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const props = defineProps<{
  avatarUrl: string;
  nickname: string;
}>();

let school = ref("");
function getSchool() {
  if (!uni.getStorageSync("school")) {
    uni.setStorageSync("school", "华东师范大学");
  }
  school.value = uni.getStorageSync("school");
}
function setSchool() {
  uni.setStorageSync("school", school.value);
}

const userInfo = reactive<UpdateUserInfoReq>({});
function onChooseAvatar(e: any) {
  putObject({
    filePath: e.detail.avatarUrl
  }).then((res) => {
    userInfo.avatarUrl = res.url;
  });
}

function onNickName(e: any) {
  userInfo.nickname = e.detail.value;
}

function onSchool(e: any) {
  school.value = e.detail.value;
}

function onClickConfirm() {
  updateUserInfo(userInfo).then((res) => {
    uni.showToast({
      title: res.msg
    });
  });
  setSchool();
  uni.reLaunch({
    url: "/pages/profile/profile"
  });
}
onShow(() => {
  getSchool();
});
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 40%;
  background-color: #eeeeee;
}
.bg-set {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.9; //设置透明度
}
.choose-avatar-row {
  width: 100%;
  height: 80%;
  align-items: center;
  text-align: center;
  font-size: 28rpx;
  margin-bottom: 10%;
  .avatar-wrapper {
    width: 260rpx;
    height: 260rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
    border-radius: 50%;
    .avatar {
      width: 260rpx;
      height: 260rpx;
      border-radius: 50%;
      margin-left: -25rpx;
    }
  }
}
.avatar-hint {
  font-size: 30rpx;
  color: #888888;
}
.nickname {
  margin-left: 70rpx;
  font-size: 40rpx;
  color: #858585;
}

.choose-nickname-row {
  width: 92%;
  height: 60rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20rpx 4rpx;
  margin-top: 20rpx;
  margin-left: 30rpx;
  margin-bottom: 40rpx;
  background-color: #f8f8f8;
  border: 5rpx solid #f1f1f1;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
  border-radius: 25rpx;
  .update-nickname {
    margin-left: 40rpx;
    font-size: 40rpx;
  }
}

.confirm-change {
  margin-top: 30rpx;
  margin-left: 30rpx;
  height: 100rpx;
  width: 93%;
  border-radius: 25rpx;
  background-color: #1fa1ff;
  .save {
    color: #fcfcfc;
    font-size: 40rpx;
  }
}
</style>
