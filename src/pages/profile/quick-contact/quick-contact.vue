<template>
  <TopBar :has-go-back="true">
    <template #center>快速联系</template>
  </TopBar>
  <view class="container">
    <view class="bg-set" />
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
            <view class="position"> {{ item.title }}</view>
            <view class="content">
              <view class="info"> 微信: {{ item.wechat }}</view>
              <image
                class="copy"
                mode="widthFix"
                src="/static/images/copy.png"
                style="width: 7%"
                @click="CopyToClipboard(item.wechat)"
              />
            </view>
            <view class="content">
              <view class="info"> 电话: {{ item.phone }}</view>
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
  <view v-if="!managerList.length" class="nomore">
    <image :src="Pictures.NoMore" style="width: 200rpx; height: 186rpx" />
  </view>
</template>

<script lang="ts" setup>
import { CopyToClipboard } from "@/pages/profile/utils";
import { reactive } from "vue";
import { Admin } from "@/apis/schemas";
import { getAdmins } from "@/apis/notice/notice";
import TopBar from "@/components/TopBar.vue";
import { Pictures } from "@/utils/url";

const managerList = reactive<Admin[]>([]);
getAdmins({ communityId: uni.getStorageSync("communityId") }).then((res) => {
  if (res.Admins) {
    managerList.push(...res.Admins);
  }
});
</script>

<style lang="scss" scoped>
.bg-set {
  position: fixed;
  background-color: #fafcff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.nomore {
  margin-top: 10rpx;
  line-height: 20rpx;
  text-align: center;
}

.managerlist-wrap {
  margin-top: 150rpx;

  .manager-wrap {
    box-shadow: 0 0 10rpx #eeeeee;
    padding: 20rpx;
    margin: 30rpx 60rpx;
    border-radius: 20rpx;
    border: 5rpx solid #f1f1f1;
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
