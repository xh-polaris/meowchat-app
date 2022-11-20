<template>
    <view class="reply-container">
      <view class="comment-box">
        <view class="commenter-info-box">
          <image class="commenter-profile" :src="replies.profile" />
          <text class="commenter-name">
            {{ replies.id }}
          </text>
          <text class="comment-time">
            ·{{ replies.time }}
          </text>
        </view>
        <view class="comment-content">
          <view class="comment-text">
            {{ replies.text }}
          </view>
          <view class="like-box">
            <image src="/static/images/like.png" class="like-icon" mode="widthFix" />
            <text class="like-num">
              {{ replies.likes }}
            </text>
          </view>
        </view>
      </view>
  
      <view class="replies-box">
        <view v-for="(item, index) in replies.reply" :key="index" class="reply-box">
          <view class="replier-info-box">
            <image class="replier-profile" :src="item.profile" />
            <text class="replier-name">
              {{ item.id }}
            </text>
            <text class="reply-time">
              ·{{ item.time }}
            </text>
          </view>
          <view class="reply-content">
            <view class="reply-text">
              {{ item.text }}
            </view>
            <view class="like-box">
              <image src="/static/images/like.png" class="like-icon" mode="widthFix" />
              <text class="like-num">
                {{ item.likes }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { Comment } from "@apis/moment/moment-components"
  import { reactive } from "vue";
  
  const props = defineProps<{ replies: Comment }>();
  
  const replies = reactive(props.replies);
  
  </script>
  
  <style lang="scss" scoped>
  .reply-container {
      border-radius: 8% 8% 0 0;
      background-color: #eee;
      padding: 0;
  
      .comment-box {
          margin-bottom: 16rpx;
          background-color: #fff;
          border-radius: 8% 8% 0 0;
          padding: 20px 10px 20px 20px;
  
          .commenter-info-box {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
  
              .commenter-profile {
                  width: 80rpx;
                  height: 80rpx;
                  margin-right: 24rpx;
                  border-radius: 50%;
              }
  
              .commenter-name {
                  max-width: 360rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-weight: bold;
                  margin-right: 12px;
                  font-size: 14px;
              }
  
              .comment-time {
                  color: #aaa;
                  max-width: 240rpx;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 12px;
              }
          }
  
          .comment-content {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-left: 104rpx;
              line-height: 1.3em;
              letter-spacing: 0.05em;
  
  
              .comment-text {
                  width: 75%;
              }
  
              .like-box {
                  width: 25%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
  
                  .like-icon {
                      width: 16px;
                      margin-right: 6px;
                  }
  
                  .like-num {
                      width: 40px;
                      font-size: 12px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      color: #aaa;
                  }
              }
          }
      }
  
  
  
      .replies-box {
          background: #fff;
  
          .reply-box {
              padding: 15px 10px 0 20px;
  
              .replier-info-box {
                  display: flex;
                  align-items: center;
                  margin-bottom: 15px;
  
                  .replier-profile {
                      width: 80rpx;
                      height: 80rpx;
                      margin-right: 24rpx;
                      border-radius: 50%;
                  }
  
                  .replier-name {
                      max-width: 360rpx;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      font-weight: bold;
                      margin-right: 12px;
                      font-size: 14px;
                  }
  
                  .reply-time {
                      color: #aaa;
                      max-width: 240rpx;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      font-size: 12px;
                  }
              }
  
  
              .reply-content {
                  display: flex;
                  align-items: flex-start;
                  justify-content: space-between;
                  margin-left: 104rpx;
                  line-height: 1.3em;
                  letter-spacing: 0.05em;
  
                  padding-bottom: 30rpx;
                  border-bottom: 1px solid #eee;
  
  
                  .reply-text {
                      width: 75%;
                  }
  
                  .like-box {
                      width: 25%;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
  
                      .like-icon {
                        width: 16px;
                        margin-right: 6px;
                      }
  
                      .like-num {
                        width: 40px;
                        font-size: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #aaa;
                      }
                  }
              }
  
              &:last-child {
                  .reply-content {
                      border-bottom: none;
                  }
              }
          }
      }
  }
  </style>