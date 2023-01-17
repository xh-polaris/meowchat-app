<template>
  <view :animation="enterMaskData" class="reply-mask" @click="leaveReply()" />

  <view class="header">
    <view class="title">
      {{ post.data.title }}
    </view>
    <view class="head-info">
      {{ displayTime(post.data.createAt) }} · {{ post.data.comments }}条回复
    </view>
    <view class="tags">
      <image class="tagIcon" src="/static/images/tag.png" />
      <view v-for="(item, index) in post.data.tags" :key="index" class="tag">
        {{ item }}
      </view>
    </view>
  </view>

  <view class="post">
    <view class="user">
      <image :src="post.data.user.avatarUrl" class="avatar" />
      <view class="name">
        {{ post.data.user.nickname }}
      </view>
    </view>
    <view class="text">
      {{ post.data.text }}
    </view>

    <view class="comments-box">
      <view
        v-for="(item, index) in comments.data"
        :key="index"
        class="comment-box"
      >
        <view class="commenter-info-box">
          <image :src="item.user.avatarUrl" class="commenter-profile" />
          <text class="commenter-name">
            {{ item.user.nickname }}
          </text>
          <text class="comment-time"> · {{ displayTime(item.createAt) }} </text>
        </view>
        <view class="comment-content">
          {{ item.text }}
        </view>
        <view v-if="item.comments > 0" class="reply-info">
          <text @click="onClickReplies(index)">
            {{ item.comments }}条相关回复
          </text>
          <image
            class="arrow-right"
            src="/static/images/arrow_right_blue.png"
          />
        </view>
        <view class="like-box">
          <view v-if="comments.likeData[index]">
            <image
              :src="comments.likeData[index].likeUrl"
              class="like-icon"
              mode="widthFix"
              @click="commentDoLike(index)"
            />
          </view>
          <text class="like-num">
            {{ comments.likeData[index].count }}
          </text>
        </view>
      </view>
    </view>
    <view style="height: 100px" />
  </view>
  <view class="write-comment-box">
    <input
      v-model="text"
      class="write-comment"
      placeholder="发表评论..."
      type="text"
    />
    <view class="like-box">
      <image
        :src="postLike.likeUrl"
        class="like-icon"
        mode="widthFix"
        @click="postDoLike()"
      />
      <view class="like-num">
        {{ postLike.count }}
      </view>
    </view>
    <view class="send-comment-btn" @click="createComment()"> 发布</view>
  </view>
  <view v-if="isReplyOpened" class="reply">
    <reply @closeReply="closeReply" />
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { enterMask, enterReply } from "../moment/utils";
import Reply from "@/pages/moment/reply";
import { GetPostDetailReq } from "@/apis/post/post-interfaces";
import { Comment, Post, TargetType } from "@/apis/schemas";
import { getPostDetail } from "@/apis/post/post";
import { displayTime } from "@/utils/time";
import { getComments, newComment } from "@/apis/comment/comment";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import {
  GetCommentsReq,
  NewCommentReq
} from "@/apis/comment/comment-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { GetCountReq } from "@/apis/like/like-interface";

const props = defineProps<{
  id: string;
}>();

const getPostDetailReq = reactive<GetPostDetailReq>({
  postId: props.id
});

// Post
const post = reactive<{ data: Post }>({
  data: {
    id: "",
    createAt: 0,
    title: "",
    text: "",
    coverUrl: "",
    tags: [],
    likes: 0,
    user: {
      id: "",
      nickname: "",
      avatarUrl: ""
    },
    comments: 0,
    isAnonymous: false,
    status: 0
  }
});

const getData = async () => {
  post.data = (await getPostDetail(getPostDetailReq)).post;
};

// Like
const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Post
});

const postLike = reactive<LikeStruct>({
  count: 0,
  liked: true,
  likeUrl: "/static/images/like.png"
});

const likedUrl = "/static/images/like.png";
const unlikeUrl = "/static/images/like_grey_0.png";
const getLikeUrl = (liked: boolean) => {
  if (liked) {
    return likedUrl;
  } else {
    return unlikeUrl;
  }
};

const getPostLikeData = async () => {
  postLike.count = (await getCount(likeReq)).count;
  postLike.liked = (await getUserLiked(likeReq)).liked;
  postLike.likeUrl = getLikeUrl(postLike.liked);
};
getPostLikeData();

const postDoLike = async () => {
  await doLike(likeReq);
  await getPostLikeData();
};

interface LikeStruct {
  count: number;
  liked: boolean;
  likeUrl: string;
}

// Comments
const getCommentsReq = reactive<GetCommentsReq>({
  scope: "post",
  page: 0,
  id: props.id
});

const comments = reactive<{
  data: Comment[];
  likeData: LikeStruct[];
}>({
  data: [],
  likeData: []
});
// const commentLikes = reactive<boolean[]>([]);
let allCommentsLoaded = false;
let isCommentsLoaded = false;
let pageStart = 0;
const getCommentsData = async () => {
  let commentsTemp = (await getComments(getCommentsReq)).comments;
  if (commentsTemp.length > pageStart) {
    for (let i = pageStart; i < commentsTemp.length; i++) {
      comments.data.push(commentsTemp[i]);
      const commentLikeReq = {
        targetId: commentsTemp[i].id,
        targetType: TargetType.Comment
      };
      comments.likeData.push(await getCommentLikeData(commentLikeReq));
    }
    if (commentsTemp.length === 10) {
      getCommentsReq.page += 1;
      pageStart = 0;
    } else {
      pageStart = commentsTemp.length;
    }
  } else {
    allCommentsLoaded = true;
  }
  isCommentsLoaded = true;
};
const getCommentLikeData = async (req: GetCountReq) => {
  const commentLike = (await getUserLiked(req)).liked;
  const likeCount = (await getCount(req)).count;
  const commentLikeUrl = getLikeUrl(commentLike);
  return {
    count: likeCount,
    liked: commentLike,
    likeUrl: commentLikeUrl
  };
};
const commentDoLike = async (index: number) => {
  let commentLikeReq = {
    targetId: comments.data[index].id,
    targetType: TargetType.Comment
  };
  await doLike(commentLikeReq);
  comments.likeData[index] = await getCommentLikeData(commentLikeReq);
};

const newCommentReq = reactive<NewCommentReq>({
  id: props.id,
  scope: "post",
  text: ""
});
const text = ref<string>("");
const createComment = () => {
  if (text.value === "") {
    return;
  }
  newCommentReq.text = text.value;
  newComment(newCommentReq).then((res) => {
    getNewComment();
    text.value = "";
    uni.showToast({
      title: res.msg
    });
  });
};
const getNewComment = async () => {
  let tmpPage = getCommentsReq.page;
  getCommentsReq.page = 0;
  let commentsTemp = (await getComments(getCommentsReq)).comments;
  getCommentsReq.page = tmpPage;
  comments.data.unshift(commentsTemp[0]);
  let commentLikeReq = {
    targetId: commentsTemp[0].id,
    targetType: TargetType.Comment
  };
  comments.likeData.unshift(await getCommentLikeData(commentLikeReq));
  pageStart += 1;
  if (pageStart === 10) {
    getCommentsReq.page += 1;
    pageStart = 0;
  }
};
const init = () => {
  getData();
  getPostLikeData();
  text.value = "";
  pageStart = 0;
  comments.data = [];
  comments.likeData = [];
  allCommentsLoaded = false;
  isCommentsLoaded = false;
  getCommentsData();
};
init();

onReachBottom(() => {
  if (isCommentsLoaded && !allCommentsLoaded) {
    isCommentsLoaded = false;
    getCommentsData();
  }
});

onPullDownRefresh(() => {
  setTimeout(function () {
    uni.stopPullDownRefresh();
  }, 1000);
  init();
});
function isAnonymous() {
  if (post.data.isAnonymous) {
    post.data.user.nickname = "匿名用户";
    post.data.user.avatarUrl = "/static/images/anonymous.png";
  }
}
isAnonymous();

let enterMaskData = ref(null);
let enterReplyData = ref(null);

const isReplyOpened = ref(false);

function onClickReplies() {
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
  border-bottom: #c0c0c0 1px solid;

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height, or 142% */

    letter-spacing: 1px;
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
    margin-bottom: 30px;
  }

  .comments-box {
    .comment-box {
      background-color: #fff;
      box-shadow: 0 0 4px #ddd;
      border-radius: 30rpx;
      margin-bottom: 10px;
      padding: 20rpx 20rpx;

      &:last-child {
        margin-bottom: 120rpx;
      }

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

      .like-box {
        margin-left: 50px;
        align-items: center;
        flex-direction: row;
        display: flex;
        margin-right: 12px;

        .like-icon {
          width: 15px;
          margin-right: 8px;
        }

        .like-num {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #aaa;
        }
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
</style>
