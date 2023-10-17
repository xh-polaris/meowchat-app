<template>
  <TopBar :has-go-back="true">
    <template #center>帖子详情</template>
  </TopBar>
  <view class="reply-mask" @click="leaveReply()" />

  <view
    v-if="post"
    :style="{ height: 'calc(100vh - 16vw - ' - keyboardHeight + 'px)' }"
    class="content-frame"
  >
    <view class="header">
      <view class="title">
        {{ post.title }}
        <view
          v-if="myUserId && myUserId === post.user.id"
          class="delete"
          @click="showDeleteDialogue"
        ></view>
      </view>
      <view class="head-info">
        {{ displayTime(post.createAt) }} · {{ post.comments }}条回复
      </view>
      <view v-if="post.tags" class="tags">
        <image class="tagIcon" :src="Icons.Tag" />
        <view v-for="(item, index) in post.tags" :key="index" class="tag">
          {{ item }}
        </view>
      </view>
    </view>

    <view class="post">
      <view
        v-if="post.user"
        class="user"
        @click="toPersonInfo(post.user.id, myUserId)"
      >
        <image :src="post.user.avatarUrl" class="avatar" />
        <view class="name">
          {{ post.user.nickname }}
        </view>
      </view>
      <view class="text">
        {{ post.text }}
      </view>
      <image
        v-if="post.coverUrl"
        :src="post.coverUrl"
        class="imgs imgs1 clearfix"
        mode="widthFix"
        @click="onClickImage(post.coverUrl)"
      />
      <view v-if="comments.data.length === 0" class="commentNum"> 评论</view>
      <view v-else class="commentNum">
        评论 {{ comments.data.length + comments.replyNumber }}
      </view>
      <view v-if="comments.data.length === 0">
        <view class="nomore">这里还没有评论，快发布第一条评论吧！</view>
      </view>

      <CommentBox
        v-for="(comment, index) in comments.data"
        :key="index"
        :comment="comment"
        @after-delete="init"
        @interact-with-comment="focusReplyComment(comment)"
        @on-click-replies="onClickReplies(comment)"
        @local-do-like="likeComment(comment)"
      />
      <view :style="'padding-bottom:' + wcbHeight.toString() + 'px'"></view>
    </view>
  </view>
  <WriteCommentBox
    v-if="post"
    v-model:placeholder-text="placeholderText"
    :is-liked="post.isLiked || false"
    :like-count="post.likes"
    :parent-type="CommentType.Post"
    :parent-id="post.id"
    :first-level-id="firstLevelId"
    @do-like="likePost(post)"
    @after-create-comment="init"
    @cancel-reply="afterBlur"
  />

  <view v-if="isReplyOpened && selectComment" class="reply">
    <reply :main-comment="selectComment" @close-reply="closeReply" />
  </view>
  <view
    v-if="isShowDeleteDialogue"
    class="confirm-to-delete"
    @touchmove.stop.prevent
  >
    <view class="box">
      <view class="texts">
        <view class="title">确认删除此篇帖子？</view>
        <view class="subtitle">删除后帖子将无法查看</view>
      </view>
      <view class="buttons">
        <view class="button blue" @click="closeDeleteDialogue">我再想想</view>
        <view class="button grey" @click="deleteThisPost">删除</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import {
  enterMask,
  enterReply,
  getCommentsData,
  likeComment
} from "../moment/utils";
import Reply from "@/pages/moment/Reply.vue";
import { toPersonInfo } from "@/pages/profile/utils";
import { GetPostDetailReq } from "@/apis/post/post-interfaces";
import { Comment, Post, TargetType } from "@/apis/schemas";
import { deletePost, getPostDetail } from "@/apis/post/post";
import { displayTime } from "@/utils/time";
import { doLike } from "@/apis/like/like";
import { CommentType, GetCommentsReq } from "@/apis/comment/comment-interfaces";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import WriteCommentBox from "@/pages/moment/WriteCommentBox.vue";
import CommentBox from "@/pages/moment/CommentBox.vue";
import { likePost, onClickImage } from "@/pages/post/utils";
import { Icons, Pages } from "@/utils/url";
import { StorageKeys } from "@/utils/const";

const props = defineProps<{
  id: string;
}>();

const keyboardHeight = ref(0);

const getPostDetailReq = reactive<GetPostDetailReq>({
  postId: props.id
});

// Post
const post = ref<Post>();
const myUserId = uni.getStorageSync(StorageKeys.UserId);

const commentDoLikeMap = new Map<string, number>();

const commentDoLike = async (id: string) => {
  let commentLikeReq = {
    targetId: id,
    targetType: TargetType.Comment
  };
  await doLike(commentLikeReq);
};

const isShowDeleteDialogue = ref(false);

const getData = async () => {
  post.value = (await getPostDetail(getPostDetailReq)).post;
};

const getCommentsReq = reactive<GetCommentsReq>({
  type: CommentType.Post,
  page: 0,
  id: props.id
});

const comments = reactive<{
  data: Comment[];
  replyNumber: number;
}>({
  data: [],
  replyNumber: 0
});
let allCommentsLoaded = false;
let isCommentsLoaded = true;
let page = 0;
const localGetCommentsData = async () => {
  await Promise.all(
    Array.from(commentDoLikeMap.keys()).map((id) => commentDoLike(id))
  );
  commentDoLikeMap.clear();
  isCommentsLoaded = false;
  getCommentsData({
    id: props.id,
    type: CommentType.Post,
    page: page
  }).then((res) => {
    comments.replyNumber = 0;
    for (let i = 0; i < res.data?.length; i++) {
      comments.data.push(res.data[i]);
      comments.replyNumber += res.data[i].comments || 0;
    }
    isCommentsLoaded = true;
    page += 1;
    if (res.data?.length < 10) allCommentsLoaded = true;
  });
};

const placeholderText = ref("发布评论");
const firstLevelId = ref<string>();

const afterBlur = () => {
  firstLevelId.value = undefined;
};

const focusReplyComment = (comment: Comment) => {
  placeholderText.value = "回复 @" + comment.user.nickname + ": ";
  firstLevelId.value = comment.id;
};

const showDeleteDialogue = () => {
  isShowDeleteDialogue.value = true;
};
const closeDeleteDialogue = () => {
  isShowDeleteDialogue.value = false;
};
const deleteThisPost = () => {
  if (!post.value) {
    return;
  }
  deletePost({
    id: post.value.id
  }).then(
    () => {
      uni.reLaunch({
        url: Pages.World
      });
    },
    (reason) => {
      console.log("reject-reason", reason);
    }
  );
};

let initLock = false;
const init = async () => {
  if (initLock) return;
  initLock = true;
  await getData();
  page = 0;
  getCommentsReq.page = 0;
  comments.data = [];
  allCommentsLoaded = false;
  isCommentsLoaded = true;
  await localGetCommentsData();
  initLock = false;
};

const wcbHeight = ref(81);

onLoad(() => {
  init();
});

onReachBottom(() => {
  if (isCommentsLoaded && !allCommentsLoaded) {
    localGetCommentsData();
  }
});

onPullDownRefresh(() => {
  setTimeout(function () {
    uni.stopPullDownRefresh();
  }, 1000);
  if (!initLock) init();
});

uni.onKeyboardHeightChange((res) => {
  keyboardHeight.value = res.height;
});

const selectComment = ref<Comment>();

let enterMaskData = ref(null);
let enterReplyData = ref(null);

const isReplyOpened = ref(false);

function onClickReplies(comment: Comment) {
  selectComment.value = comment;
  isReplyOpened.value = true;
}

function closeReply() {
  isReplyOpened.value = false;
}

function leaveReply() {
  enterMask.width("0%").height("0%").opacity(0).step();
  enterMaskData.value = enterMask.export();
  enterReply.height("0%").step();
  enterReplyData.value = enterReply.export();
}
</script>

<style lang="scss" scoped>
$headerHeight: 113px;
$headerPadding: 21px;

.header {
  padding: $headerPadding $headerPadding 15px;
  border-bottom: #d8d8d8 1px solid;

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: calc(22 / 390 * 100vw);
    line-height: calc(27 / 390 * 100vw);
    /* identical to box height, or 142% */

    letter-spacing: 1px;
    position: relative;

    .delete {
      position: absolute;
      width: calc(15 / 390 * 100vw);
      height: calc(15 / 390 * 100vw);
      background-size: 100% 100%;
      background-image: url("@/static/images/dustbin.png");
      right: 0;
      top: calc((27 - 15) / 2 / 390 * 100vw);
    }
  }

  .head-info {
    margin-top: 5px;
    display: flex;
    align-items: baseline;
    font-size: 12px;
    line-height: 17px;
    /* or 142% */

    letter-spacing: 0.5px;

    /* grey03 */

    color: #b8b8b8;
  }

  .tags {
    display: flex;
    color: #1fa1ff;
    height: 21px;
    line-height: 18px;
    margin-top: 5px;

    .tagIcon {
      width: 23px;
      height: 21px;
      margin-right: 10px;
    }

    .tag {
      margin-top: 3px;
      font-style: normal;
      font-weight: bold;
      font-size: 10px;
      line-height: 13px;
      /* or 170% */
      text-align: center;
      letter-spacing: 0.5px;
      /* blue02 */
      color: #1fa1ff;

      min-width: 28px;
      padding: 5rpx 10rpx 5rpx 10rpx;
      border: #1fa1ff 1px solid;
      border-radius: 9px;
      margin-right: 8px;
    }
  }
}

$postPadding: 15px 27px 0 21px;
.post {
  padding: $postPadding;

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .avatar {
      width: 80rpx;
      height: 80rpx;
      max-width: 45px;
      max-height: 45px;
      min-width: 35px;
      min-height: 35px;
      background-color: #cccccc;
      margin-right: 9px;
      border-radius: 50%;
    }

    .name {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      /* or 121% */

      letter-spacing: 0.5px;

      /* darkgrey02 */

      color: #353535;
    }
  }

  .text {
    white-space: pre-line;
    font-size: 16px;
    line-height: 25px;
    /* or 157% */

    /* darkgrey02 */
    color: #353535;
    margin-bottom: 50rpx;
  }
}

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
  height: 0;
  bottom: 56px;
  opacity: 1;
  overflow-y: scroll;
}

.commentNum {
  white-space: pre-line;
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
  /* or 157% */

  /* darkgrey02 */
  color: #353535;
  margin-bottom: 20rpx;
}

.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
  color: #b8b8b8;
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

.imgs {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  margin-bottom: 50rpx;
  width: 670rpx;

  &.imgs1 {
    image {
      object-fit: none;
      border-radius: 3px;
      float: left;
      margin: 5rpx 5rpx 5rpx 5rpx;
    }
  }
}

.content-frame {
  overflow-y: scroll;
}

.input-frame {
  height: 16vw;
}
</style>
