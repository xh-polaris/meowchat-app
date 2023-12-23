<template>
  <view class="write-comment-box">
    <input
      ref="input"
      v-model="text"
      :placeholder="placeholder"
      class="write-comment"
      type="text"
      :focus="focus"
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
import {
  CommentType,
  NewCommentReq,
  NewCommentResp
} from "@/apis/comment/comment-interfaces";
import { createComment } from "@/pages/moment/utils";
import { computed, ref } from "vue";
import { Comment, User } from "@/apis/schemas";

const props = defineProps<{
  parentId: string;
  parentType: CommentType;
  firstLevelComment?: Comment;
  replyComment?: Comment;
  likeCount?: number;
  isLiked: boolean;
  commentCallback: (res: NewCommentResp) => void;
  focus: boolean;
}>();
const text = ref("");
const placeholder = computed(() => {
  let placeholder = "";
  if (props.replyComment) {
    placeholder = "回复 @" + props.replyComment.user?.nickname + ": ";
  } else if (props.firstLevelComment) {
    return "回复 @" + props.firstLevelComment.user?.nickname + ": ";
  }
  return placeholder || "发布评论";
});
const emit = defineEmits(["doLike", "afterCreateComment", "blur"]);

const localCreateComment = async () => {
  const req: NewCommentReq = {
    text: text.value,
    type: props.parentType,
    firstLevelId: props.firstLevelComment?.id,
    replyToUserId: props.replyComment?.user?.id,
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
  emit("blur");
};
</script>

<style lang="scss" scoped>
@import "@/common/icon.scss";

.write-comment-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 102;
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
    margin-top: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 24rpx;

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
