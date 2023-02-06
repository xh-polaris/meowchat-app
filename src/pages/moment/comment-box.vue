<template>
  <view class="comment-box">
    <view class="commenter-info-box">
      <image :src="comment.user.avatarUrl" class="commenter-profile" />
      <text class="commenter-name">
        {{ comment.user.nickname }}
      </text>
      <text class="comment-time"> · {{ displayTime(comment.createAt) }}</text>
    </view>
    <view class="comment-content" @click="$emit('interactWithComment')">
      {{ comment.text }}
    </view>
    <view v-if="comment.comments > 0" class="reply-info">
      <text @click="$emit('onClickReplies')">
        {{ comment.comments }}条相关回复
      </text>
      <image class="arrow-right" src="/static/images/arrow_right_blue.png" />
    </view>
    <view v-if="like" class="like-box">
      <view
        v-if="like.isLike"
        class="like-icon liked"
        @click="$emit('localDoLike')"
      />
      <view v-else class="like-icon" @click="$emit('localDoLike')" />
      <text class="like-num">
        {{ like.count }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { LikeStruct } from "@/pages/moment/utils";
import { Comment } from "@/apis/schemas";
import { displayTime } from "@/utils/time";

// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  like: LikeStruct;
  comment: Comment;
}>();

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "interactWithComment"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "onClickReplies"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "localDoLike"): void;
}>();
</script>

<style lang="scss" scoped>
@import "@/common/like-box.scss";

.comment-box {
  background-color: #fff;
  box-shadow: 0 0 4px #ddd;
  border-radius: 30rpx;
  margin-bottom: 15px;
  padding: 20rpx 20rpx;

  .commenter-info-box {
    display: flex;
    align-items: center;
    margin-bottom: 5rpx;

    .commenter-profile {
      width: 70rpx;
      height: 70rpx;
      border-radius: 35rpx;
      margin-right: 24rpx;
      background-color: #cccccc;
    }

    .commenter-name {
      margin-right: 30rpx;
      color: #7f7f81;
      font-size: 14px;
    }

    .comment-time {
      color: #aaa;
      font-size: 12px;
    }
  }

  .comment-content {
    margin-left: 100rpx;
    margin-bottom: 30rpx;
    line-height: 1.5em;
    letter-spacing: 0.05em;
    font-weight: 500;
    font-size: 14px;
  }

  .reply-info {
    margin-left: 100rpx;
    color: #63bdff;
    font-size: 12px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .arrow-right {
      margin-left: 5px;
      width: 6px;
      height: 10px;
    }
  }
}
</style>
