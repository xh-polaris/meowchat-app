<template>
  <view class="write-comment-box">
    <input
      ref="input"
      v-model="text"
      :placeholder="placeholderText"
      class="write-comment"
      type="text"
      @blur="blur"
    />
    <view v-if="likeCount >= 0" class="like-box">
      <view v-if="isLiked" class="like-icon liked" @click="$emit('doLike')" />
      <view v-else class="like-icon" @click="$emit('doLike')" />
      <view class="like-num">
        {{ likeCount }}
      </view>
    </view>
    <view class="send-comment-btn" @click="localCreateComment"> 发布</view>
  </view>
</template>

<script lang="ts" setup>
import { CommentType, NewCommentResp } from "@/apis/comment/comment-interfaces";
import { createComment } from "@/pages/moment/utils";
import { ref } from "vue";

const props = defineProps<{
  parentId: string;
  parentType: CommentType;
  firstLevelId?: string;
  likeCount?: number;
  isLiked: boolean;
  placeholderText: string;
  commentCallback: (res: NewCommentResp) => void;
}>();
const text = ref("");
const emit = defineEmits<{
  (e: "afterCreateComment"): void;
  (e: "cancelReply"): void;
  (e: "doLike"): void;
}>();

const localCreateComment = async () => {
  const req = {
    text: text.value,
    type: props.parentType,
    firstLevelId: props.firstLevelId,
    id: props.parentId
  };
  text.value = "";
  const res = await createComment(req, props.commentCallback);
  if (res) emit("afterCreateComment");
};

const blur = () => {
  if (text.value) {
    return;
  }
  emit("cancelReply");
};
</script>

<style lang="scss" scoped>
@import "@/common/icon.scss";

.write-comment-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  align-items: center;
  height: 16vw;
  box-shadow: 0 -1px 2px #eee;
  padding: 0 30rpx;
  background-color: #fafafa;
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
      background-image: $like-grey-border-url;

      &.liked {
        background-image: $like-blue-url;
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
    background-color: #1fa1ff;
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
