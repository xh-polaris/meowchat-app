<template>
  <view class="px-4">
    <view style="color: #0d99ff" class="text-right font-md my-1"
      >{{ readCount }}条未读</view
    >
    <!-- 公告 -->
    <view class="" style="background-color: #fafcff">
      <view class="d-flex px-3 py-3 a-center j-sb">
        <view class="d-flex a-center">
          <image
            src="/static/images/notice.png"
            mode="widthFix"
            style="width: 80rpx"
          ></image>
          <view class="font-lg">公告</view>
        </view>
        <view class="">
          <image
            src="/static/images/arrow-right.png"
            mode="widthFix"
            style="width: 50rpx"
          ></image>
        </view>
      </view>
      <view class="font-md px-4 mb-5">{{ publishContent }}</view>
      <view class="font-md px-4 py-3" style="color: #b4b4b4"
        >{{ publishTime }} 发布</view
      >
    </view>
    <!-- 回复 -->
    <view v-for="(item, index) in replyList" :key="index">
      <view class="d-flex mt-2">
        <!-- 左侧 -->
        <view class="">
          <view class="d-flex">
            <!-- 头像 -->
            <view>
              <image
                :src="item.avatar"
                style="
                  width: 85rpx;
                  height: 85rpx;
                  border-radius: 100%;
                  flex-shrink: 0;
                "
              ></image>
            </view>
            <!-- 昵称/内容/时间 -->
            <view class="ml-2">
              <view class="d-flex py-2">
                <view
                  class="font-md mr-2"
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 30%;
                  "
                  >{{ item.userName }}</view
                >
                <view
                  class="font-md"
                  style="color: #b4b4b4; letter-spacing: 3rpx"
                >
                  回复了你的动态</view
                >
              </view>
              <view class="font-md py-2" style="letter-spacing: 4rpx">
                {{ item.content }}
              </view>
              <view class="font-md pb-2" style="color: #b4b4b4">{{
                item.time
              }}</view>
            </view>
          </view>
        </view>
        <!-- 图片 -->
        <view class="">
          <image
            :src="item.cover"
            style="width: 150rpx; height: 150rpx; border-radius: 20rpx"
            class="ml-5"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <Divider></Divider>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Divider from "@/components/divider/divider.vue";
const readCount = ref(2);
const publishTime = ref("2022-3-1");
const publishContent = ref(
  "公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告"
);
const replyList = reactive([
  {
    avatar:
      "https://th.bing.com/th/id/OIP.vzRo7MVPkYrRsUen21TNwwHaHa?pid=ImgDet&rs=1",
    userName: "Pinlunrenyi",
    content: "我做了猫猫月饼，请学校里的猫猫来吃~",
    time: "3小时前",
    cover:
      "https://th.bing.com/th/id/OIP.pbHNaB0PNd2b0O0_qMKWGgHaQD?w=161&h=350&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  },
  {
    avatar:
      "https://th.bing.com/th/id/OIP.vzRo7MVPkYrRsUen21TNwwHaHa?pid=ImgDet&rs=1",
    userName: "Pinlunrenyi",
    content: "我做了猫猫月饼，请学校里的猫猫来吃~",
    time: "3小时前",
    cover:
      "https://th.bing.com/th/id/OIP.pbHNaB0PNd2b0O0_qMKWGgHaQD?w=161&h=350&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  },
  {
    avatar:
      "https://th.bing.com/th/id/OIP.vzRo7MVPkYrRsUen21TNwwHaHa?pid=ImgDet&rs=1",
    userName: "Pinlunrenyi",
    content: "我做了猫猫月饼，请学校里的猫猫来吃~",
    time: "3小时前",
    cover:
      "https://th.bing.com/th/id/OIP.pbHNaB0PNd2b0O0_qMKWGgHaQD?w=161&h=350&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  }
]);
</script>

<style></style>
