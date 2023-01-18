<template>
  <view class="container">
    <image
      class="bg-set"
      src="https://static.xhpolaris.com/profile_background.png"
    />
    <view class="managerlist-wrap">
      <view
        v-for="(item, index) in managerList"
        :key="index"
        class="manager-wrap"
      >
        <view class="info-wrap">
          <image :src="item.avatarUrl" class="avatar" mode="aspectFill" />
          <view class="right">
            <view class="name">
              {{ item.name }}
            </view>
            <view class="position"> 管理员 </view>
            <view class="content">
              <view class="info"> 微信: {{ item.wechat }} </view>
              <image
                class="copy"
                mode="widthFix"
                src="/static/images/copy.png"
                style="width: 7%"
                @click="CopyToClipboard(item.wechat)"
              />
            </view>
            <view class="content">
              <view class="info"> 电话: {{ item.phone }} </view>
              <image
                class="copy"
                mode="widthFix"
                src="/static/images/copy.png"
                style="width: 7%"
                @click="CopyToClipboard(item.phone)"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { CopyToClipboard } from "@/pages/profile/utils";
import { reactive } from "vue";
import { Admin } from "@/apis/schemas";
import { getAdmins } from "@/apis/notice/notice";

const managerList = reactive<Admin[]>([]);
getAdmins({ communityId: uni.getStorageSync("communityId") }).then((res) => {
  managerList.push(...res.admins);
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
}

.managerlist-wrap {
  margin-top: 150rpx;

  .manager-wrap {
    box-shadow: 0 0 10rpx #eeeeee;
    margin: 60rpx;
    padding: 20rpx;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    background-color: #ffffff;

    .info-wrap {
      display: flex;
      margin-bottom: 10rpx;

      .avatar {
        margin-top: 30rpx;
        float: left;
        margin-left: 10rpx;
        margin-right: 30rpx;
        height: 112rpx;
        width: 112rpx;
        border-radius: 50%;
      }

      .right {
        margin-top: 35rpx;
        margin-left: 20rpx;

        .name {
          font-size: 35rpx;
          margin-bottom: 13rpx;
          font-weight: bold;
        }

        .position {
          font-size: 25rpx;
          margin-bottom: 33rpx;
          color: #939393;
        }

        .content {
          height: 30rpx;
          display: flex;

          .info {
            margin-top: 10rpx;
            font-size: 35rpx;
            float: left;
            height: 30rpx;
            width: 350rpx;
          }

          .copy {
            width: 30rpx;
            height: 30rpx;
            right: 30rpx;
            margin-top: 15rpx;
            float: right;
          }

          border-top: 1px solid #eeeeee;
          margin-bottom: 60rpx;
        }
      }
    }
  }
}
</style>
