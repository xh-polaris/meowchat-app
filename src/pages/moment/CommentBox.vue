<template>
  <view class="comment-box">
    <view
      v-if="myUserId && myUserId === comment.user.id"
      class="delete"
      @click="showDeleteDialogue"
    />
    <view class="commenter-info-box">
      <view
        class="d-flex a-start"
        @click="toPersonInfo(comment.user.id, myUserId)"
      >
        <image
          :src="getThumbnail(comment.user.avatarUrl)"
          class="commenter-profile"
        />
      </view>
      <view style="margin-top: 12rpx; margin-left: 12rpx; width: 100%">
        <view class="d-flex a-center">
          <view
            class="commenter-name"
            @click="toPersonInfo(comment.user.id, myUserId)"
          >
            {{ comment.user.nickname }}
          </view>
          <view class="comment-time">
            · {{ displayTime(comment.createAt) }}
          </view>
        </view>
        <view>
          <view class="comment-content" @click="emit('interactWithComment')">
            {{ comment.text }}
          </view>
          <view v-if="comment.comments > 0" class="reply-info">
            <text @click="emit('onClickReplies')">
              {{ comment.comments }}条相关回复
            </text>
            <image
              class="arrow-right"
              src="/static/images/arrow_right_blue.png"
            />
          </view>
          <view
            v-if="comment?.likeCount || comment?.likeCount === 0"
            class="like-box"
          >
            <text class="reply" @click="emit('interactWithComment')">回复</text>
            <view class="d-flex a-center" style="margin-right: 11rpx">
              <view
                v-if="comment?.isLiked"
                class="like-icon liked"
                @click="emit('localDoLike')"
              />
              <view v-else class="like-icon" @click="$emit('localDoLike')" />
              <text class="like-num">
                {{ comment.likeCount }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view
    v-if="isShowDeleteDialogue"
    class="confirm-to-delete"
    @touchmove.stop.prevent
  >
    <view class="box">
      <view class="texts">
        <view class="title">确认删除这条评论？</view>
        <view class="subtitle">删除后评论将无法查看</view>
      </view>
      <view class="buttons">
        <view class="button blue" @click="closeDeleteDialogue">我再想想</view>
        <view class="button grey" @click="deleteThisPost">删除</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Comment } from "@/apis/schemas";
import { displayTime } from "@/utils/time";
import { deleteComment } from "@/apis/comment/comment";
import { ref } from "vue";
import { toPersonInfo } from "@/pages/profile/utils";
import { StorageKeys } from "@/utils/const";
import { getThumbnail } from "@/utils/utils";

const props = defineProps<{
  comment: Comment;
}>();
const myUserId = uni.getStorageSync(StorageKeys.UserId);
const isShowDeleteDialogue = ref(false);

const emit =
  defineEmits<
    (
      e:
        | "interactWithComment"
        | "onClickReplies"
        | "localDoLike"
        | "afterDelete"
    ) => void
  >();

const showDeleteDialogue = () => {
  isShowDeleteDialogue.value = true;
};
const closeDeleteDialogue = () => {
  isShowDeleteDialogue.value = false;
};
const deleteThisPost = () => {
  deleteComment({
    commentId: props.comment.id
  }).then(
    () => {
      emit("afterDelete");
    },
    (reason) => {
      console.log("reject-reason", reason);
    }
  );
};
</script>

<style lang="scss" scoped>
@import "@/common/like-box.scss";
@import "@/common/icon.scss";

.comment-box {
  background-color: #fff;
  box-shadow: 0 0 4px #ddd;
  border-radius: 15rpx;
  margin-bottom: 15px;
  margin-left: -10rpx;
  margin-right: -10rpx;
  padding: 40rpx 40rpx;
  position: relative;

  .delete {
    background-image: $dustbin-url;
    width: 30upx;
    height: 30upx;
    background-size: 100%;
    position: absolute;
    line-height: 2;
    right: 45upx;
    top: 30upx;
  }

  .commenter-info-box {
    display: flex;

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
    line-height: 1.5em;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
    letter-spacing: 0.05em;
    font-weight: 500;
    font-size: 14px;
  }

  .reply-info {
    color: #63bdff;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .arrow-right {
      margin-left: 5px;
      width: 6px;
      height: 10px;
    }
  }
}

.confirm-to-delete {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: calc(279 / 390 * 100vw);
    height: calc(125 / 390 * 100vw);
    background-color: #ffffff;
    border-radius: calc(15 / 390 * 100vw);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: calc(14 / 390 * 100vw);
    box-sizing: border-box;

    .texts {
      .title {
        color: #353535;
        font-size: calc(18 / 390 * 100vw);
      }

      .subtitle {
        color: #353535;
        font-size: calc(12 / 390 * 100vw);
      }
    }

    .buttons {
      display: flex;
      width: calc(250 / 390 * 100vw);
      color: #ffffff;
      margin: 0 auto;
      justify-content: space-between;

      .button {
        width: calc(121 / 390 * 100vw);
        height: calc(40 / 390 * 100vw);
        border-radius: calc(6 / 390 * 100vw);
        line-height: calc(40 / 390 * 100vw);

        &.blue {
          background-color: #1fa1ff;

          &:active {
            background-color: #0579d0;
          }
        }

        &.grey {
          background-color: #d1d1d1;

          &:active {
            background-color: #949494;
          }
        }
      }
    }
  }
}

.reply {
  color: #1fa1ff;
  font-size: 28upx;

  &:active {
    color: #077cce;
  }
}
</style>
