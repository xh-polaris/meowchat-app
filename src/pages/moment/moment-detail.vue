<template>
    <view class="reply-mask" :animation="enterMaskData" @click="leaveReply()" />
    <reply :replies="comments[selectedReply]" class="more-reply" :animation="enterReplyData" />
  
    <view class="container">
      <view class="post-info-box">
        <view class="poster-info-box">
          <image class="poster-profile" :src="post.profile" />
          <text class="poster-name">
            {{ post.id }}
          </text>
          <text class="post-time">
            ·{{ post.time }}
          </text>
        </view>
        <view class="post-content">
          {{ post.text }}
        </view>
        <view class="like-info">
          {{ post.likes }} 位喵友觉得很赞
        </view>
        <image
          v-for="(item, index) in post.images" :key="index"
          class="post-image"
          :src="item" mode="widthFix"
        />
      </view>
  
      <view class="comments-box">
        <view v-for="(item, index) in comments" :key="index" class="comment-box">
          <view class="commenter-info-box">
            <image class="commenter-profile" :src="item.profile" />
            <text class="commenter-name">
              {{ item.id }}
            </text>
            <text class="comment-time">
              ·{{ item.time }}
            </text>
          </view>
          <view class="comment-content">
            {{ item.text }}
          </view>
          <view v-if="item.reply.length > 0" class="reply-info">
            <text @click="onClickReplies(index)">
              {{ item.reply.length }}条相关回复
            </text>
            <image class="arrow-right" src="/static/images/arrow_right_blue.png" />
          </view>
          <view class="like-box">
            <image class="like-icon" src="/static/images/like.png" mode="widthFix" />
            <text class="like-num">
              {{ item.likes }}
            </text>
          </view>
        </view>
      </view>
  
      <view class="write-comment-box">
        <input class="write-comment" type="text" placeholder="发表评论...">
        <view class="like-box">
          <image class="like-icon" src="/static/images/like.png" mode="widthFix" />
          <view class="like-num">
            {{ post.likes }}
          </view>
        </view>
        <view class="send-comment-btn">
          发布
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from "vue";
  import { Comment } from "@/apis/moment/moment-components";
  import reply from "@/pages/moment/reply";
  import { enterReply, enterMask } from "@/pages/moment/event";
  
  
  const post = reactive({
      id: "Gnomeshgh",
      profile: "https://static.xhpolaris.com/cat_world.jpg",
      time: " 3小时前",
      text: "睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!睡前祝大家中秋节快乐!",
      images: [
          "https://static.xhpolaris.com/cat_world.jpg"
      ],
      likes: 3333333
  });
  
  const comments = reactive([
      {
          id: "Pinlunrenyi",
          profile: "https://static.xhpolaris.com/cat_world.jpg",
          time: " 3小时前",
          text: "我做了猫猫月饼，请学校的猫猫来吃!",
          likes: 666,
          reply: [
              {
                  id: "Jiezheshuo1",
                  profile: "https://static.xhpolaris.com/cat_world.jpg",
                  time: " 2小时前",
                  text: "猫居然也有月饼吃",
                  likes: 333,
              },
              {
                  id: "Jiezheshuo2",
                  profile: "https://static.xhpolaris.com/cat_world.jpg",
                  time: " 2小时前",
                  text: "猫为啥没有月饼吃",
                  likes: 888,
              },
              {
                  id: "Jiezheshuo3",
                  profile: "https://static.xhpolaris.com/cat_world.jpg",
                  time: " 1小时前",
                  text: "猫当然有月饼吃",
                  likes: 222222,
              }
          ]
      },
      {
          id: "Dianpinger",
          profile: "https://static.xhpolaris.com/cat_world.jpg",
          time: " 4小时前",
          text: "祝大家中秋节快乐哦~",
          likes: 8888,
          reply: []
      },
  ]);
  
  let selectedReply = ref(0);
  let enterMaskData = ref(null);
  let enterReplyData = ref(null);
  
  function onClickReplies(idx: number) {
      console.log(selectedReply);
      selectedReply.value = idx;
      enterMask.width("100%").height("100%").opacity(0.5).step();
      enterMaskData.value = enterMask.export();
      enterReply.height("70%").step();
      enterReplyData.value = enterReply.export();
  }
  
  function leaveReply() {
      enterMask.width("0%").height("0%").opacity(0).step();
      enterMaskData.value = enterMask.export();
      enterReply.height("0%").step();
      enterReplyData.value = enterReply.export();
  }
  
  
  </script>
  
  <style lang="scss" scoped>
  .reply-mask {
      position: fixed;
      z-index: 20;
      width: 0;
      height: 0;
      background-color: #000;
      opacity: 0;
  }
  
  .more-reply {
      position: fixed;
      z-index: 30;
      left: 0;
      right: 0;
      height: 0rpx;
      bottom: 56px;
      opacity: 1;
      overflow-y: scroll;
  }
  
  .container {
      padding: 20px 15px;
      background-color: #FAFCFF;
  
  
      .post-info-box {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
  
  
          .poster-info-box {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
  
              .poster-profile {
                  width: 80rpx;
                  height: 80rpx;
                  max-width: 50px;
                  max-height: 50px;
                  min-width: 36px;
                  min-height: 36px;
  
                  margin-right: 12px;
                  border-radius: 50%;
              }
  
              .poster-name {
                  margin-right: 12px;
                  font-weight: bold;
                  font-size: 16px;
              }
  
              .post-time {
                  color: #aaa;
                  font-size: 14px;
              }
          }
  
          .post-content {
              margin-bottom: 15px;
              font-size: 16px;
              line-height: 1.5em;
              letter-spacing: 0.05em;
              font-weight: 500;
          }
  
          .like-info {
              margin-bottom: 15px;
              color: #aaa;
              font-size: 12px;
          }
  
          .post-image {
              width: 90%;
              margin-bottom: 10px;
              border-radius: 15px;
          }
      }
  
      .comments-box {
  
          .comment-box {
              background-color: #fff;
              box-shadow: 0px 0px 4px #ddd;
              border-radius: 30rpx;
              margin-bottom: 15px;
              padding: 30rpx 20rpx;
  
              &:last-child {
                  margin-bottom: 120rpx;
              }
  
              .commenter-info-box {
                  display: flex;
                  align-items: center;
                  margin-bottom: 10px;
  
                  .commenter-profile {
                      width: 80rpx;
                      height: 80rpx;
                      margin-right: 24rpx;
                  }
  
                  .commenter-name {
                      margin-right: 12px;
                      font-weight: bold;
                      font-size: 14px;
                  }
  
                  .comment-time {
                      color: #aaa;
                      font-size: 12px;
                  }
              }
  
              .comment-content {
                  margin-left: 104rpx;
                  margin-bottom: 15px;
                  line-height: 1.5em;
                  letter-spacing: 0.05em;
                  font-weight: 500;
                  font-size: 14px;
              }
  
              .reply-info {
                  margin-left: 104rpx;
                  color: #63bdff;
                  font-size: 12px;
                  margin-bottom: 10px;
                  display: flex;
                  align-items: center;
  
                  .arrow-right {
                      width: 15px;
                      height: 15px;
                  }
              }
  
              .like-box {
                  margin-left: 104rpx;
  
                  .like-icon {
                      width: 15px;
                      margin-right: 8px;
                  }
  
                  .like-num {
                      overflow: hidden;
                      text-overflow: ellipsis;
                      color: #aaa;
                  }
  
              }
          }
      }
  
      .write-comment-box {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          background-color: #fff;
          box-shadow: 0 -1px 2px #eee;
          padding: 10px;
  
          .write-comment {
              width: 64%;
              height: 36px;
              background-color: #fafafa;
              border-radius: 35rpx;
              padding-left: 30rpx;
              margin-right: 12px;
  
              .uni-input-placeholder {
                  color: #d1d1d1;
              }
          }
  
          .like-box {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              margin-right: 12px;
  
              .like-icon {
                  width: 22px;
              }
  
              .like-num {
                  max-width: 40px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 12px;
                  color: #c8c8c8;
              }
          }
  
          .send-comment-btn {
              background-color: #63bdff;
              border-radius: 39rpx;
              width: 132rpx;
              padding: 0 10rpx;
              line-height: 35px;
              font-size: 16px;
              text-align: center;
              color: #fff;
          }
  
      }
  
  }
  </style>
  