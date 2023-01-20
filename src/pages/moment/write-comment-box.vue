<template>
  <view class="write-comment-box">
    <input
      ref="input"
      :focus="focus"
      :placeholder="placeholderText"
      :value="newCommentReq.text"
      class="write-comment"
      type="text"
      @blur="blur"
      @input="$emit('updateText', $event.target.value)"
    />
    <view class="like-box">
      <view
        v-if="likeData.isLike"
        class="like-icon liked"
        @click="$emit('doLike')"
      />
      <view v-else class="like-icon" @click="$emit('doLike')" />
      <view class="like-num">
        {{ likeData.count }}
      </view>
    </view>
    <view
      class="send-comment-btn"
      @click="
        createComment(newCommentReq).then((res) => {
          if (res) $emit('afterCreateComment');
        })
      "
    >
      发布
    </view>
  </view>
</template>

<script lang="ts" setup>
import { NewCommentReq } from "@/apis/comment/comment-interfaces";
import { createComment } from "@/pages/moment/utils";

// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  newCommentReq: NewCommentReq;
  likeData: {
    count: number;
    isLike: boolean;
  };
  placeholderText: string;
  focus: boolean;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "updateText", newText: string): void;
  // eslint-disable-next-line no-unused-vars
  (e: "update:placeholderText", newText: string): void;
  // eslint-disable-next-line no-unused-vars
  (e: "doLike"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "afterCreateComment"): void;
  // eslint-disable-next-line no-unused-vars
  (e: "customBlur"): void;
}>();

const blur = () => {
  emit("update:placeholderText", "发布评论");
  setTimeout(() => {
    emit("customBlur");
  }, 10);
};
</script>

<style lang="scss" scoped>
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
      width: calc(20 / 390 * 100vw);
      height: calc(20 / 390 * 100vw);
      background-size: 100% 100%;
      background-image: url("/static/images/like_grey_0.png");

      &.liked {
        background-image: url("/static/images/like_grey_1.png");
      }
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
</style>
