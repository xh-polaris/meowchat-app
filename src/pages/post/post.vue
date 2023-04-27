<template>
  <view class="reply-mask" @click="leaveReply()" />

  <view
    class="content-frame"
    :style="{ height: 'calc(100vh - 16vw - ' + keyboardHeight + 'px)' }"
  >
    <view class="header">
      <view class="title">
        {{ post.data.title }}
        <view
          v-if="myUserId && myUserId === post.data.user.id"
          class="delete"
          @click="showDeleteDialogue"
        ></view>
      </view>
      <view class="head-info">
        {{ displayTime(post.data.createAt) }} · {{ post.data.comments }}条回复
      </view>
      <view v-if="post.data.tags" class="tags">
        <image class="tagIcon" src="/static/images/tag.png" />
        <view v-for="(item, index) in post.data.tags" :key="index" class="tag">
          {{ item }}
        </view>
      </view>
    </view>

    <view class="post">
      <view class="user" @click="toPersonInfo(post.data.user.id, myUserId)">
        <image :src="post.data.user.avatarUrl" class="avatar" />
        <view class="name">
          {{ post.data.user.nickname }}
        </view>
      </view>
      <view class="text">
        {{ post.data.text }}
      </view>
      <image
        :src="post.data.coverUrl"
        class="imgs imgs1 clearfix"
        mode="widthFix"
        @click="onClickImage(post.data.coverUrl)"
      />
      <view v-if="comments.data.length === 0" class="commentNum"> 评论 </view>
      <view v-else class="commentNum">
        评论 {{ comments.data.length + comments.replyNumber }}
      </view>
      <view v-if="comments.data.length === 0">
        <view class="nomore">这里还没有评论，快发布第一条评论吧！</view>
      </view>

      <comment-box
        v-for="(item, index) in comments.data"
        :key="index"
        :comment="item"
        :like="comments.likeData[index]"
        @after-delete="init"
        @interact-with-comment="focusReplyComment(index)"
        @on-click-replies="onClickReplies(index)"
        @local-do-like="asyncCommentDoLike(index)"
      />
      <view :style="'padding-bottom:' + wcbHeight.toString() + 'px'"></view>
      <!--    <view class="out-write-comment-box">-->
      <!--      <write-comment-box-->
      <!--        v-model:placeholder-text="placeholderText"-->
      <!--        :focus="newCommentFocus"-->
      <!--        :like-data="post.likeData"-->
      <!--        :new-comment-req="newCommentReq"-->
      <!--        @update-text="-->
      <!--          (newText) => {-->
      <!--            newCommentReq.text = newText;-->
      <!--          }-->
      <!--        "-->
      <!--        @do-like="asyncDoLike"-->
      <!--        @after-create-comment="init"-->
      <!--        @after-blur="afterBlur"-->
      <!--      />-->
      <!--    </view>-->
    </view>
  </view>
  <view class="input-frame">
    <write-comment-box
      v-model:placeholder-text="placeholderText"
      :focus="newCommentFocus"
      :like-data="post.likeData"
      :new-comment-req="newCommentReq"
      @update-text="
        (newText) => {
          newCommentReq.text = newText;
        }
      "
      @do-like="asyncDoLike"
      @after-create-comment="init"
      @after-blur="afterBlur"
    />
  </view>

  <view v-if="isReplyOpened" class="reply">
    <reply
      :like-data="comments.likeData[selectIndex]"
      :main-comment="comments.data[selectIndex]"
      @close-reply="closeReply"
      @update-like-data="updateLikeData(selectIndex)"
    />
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
import { onMounted, reactive, ref } from "vue";
import {
  enterMask,
  enterReply,
  getCommentsData,
  getLikeData,
  LikeStruct,
  localDoLike
} from "../moment/utils";
import Reply from "@/pages/moment/reply.vue";
import { toPersonInfo } from "@/pages/profile/utils";
import { GetPostDetailReq } from "@/apis/post/post-interfaces";
import { Comment, Post, TargetType } from "@/apis/schemas";
import { deletePost, getPostDetail } from "@/apis/post/post";
import { displayTime } from "@/utils/time";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import { getUserInfo } from "@/apis/user/user";
import {
  GetCommentsReq,
  NewCommentReq
} from "@/apis/comment/comment-interfaces";
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onUnload
} from "@dcloudio/uni-app";
import { GetCountReq } from "@/apis/like/like-interface";
import WriteCommentBox from "@/pages/moment/write-comment-box.vue";
import CommentBox from "@/pages/moment/comment-box.vue";
import { onClickImage } from "@/pages/post/utils";

const props = defineProps<{
  id: string;
}>();

const keyboardHeight = ref(0);

const getPostDetailReq = reactive<GetPostDetailReq>({
  postId: props.id
});

// Post
const post = reactive<{ data: Post; likeData: LikeStruct }>({
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
  },
  likeData: {
    isLike: false,
    count: 0
  }
});
const myUserId = ref("");

const commentDoLikeMap = new Map<string, number>();
const asyncCommentDoLike = (index: number) => {
  if (commentDoLikeMap.has(comments.data[index].id)) {
    commentDoLikeMap.delete(comments.data[index].id);
  } else {
    commentDoLikeMap.set(comments.data[index].id, index);
  }
  if (comments.likeData[index].isLike) {
    comments.likeData[index].count--;
  } else {
    comments.likeData[index].count++;
  }
  comments.likeData[index].isLike = !comments.likeData[index].isLike;
};

const commentDoLike = async (id: string) => {
  let commentLikeReq = {
    targetId: id,
    targetType: TargetType.Comment
  };
  await doLike(commentLikeReq);
};

const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Post
});

const isShowDeleteDialogue = ref(false);

const getData = async () => {
  post.data = (await getPostDetail(getPostDetailReq)).post;
  post.likeData = await getLikeData(likeReq);
  getUserInfo().then((res) => {
    myUserId.value = res.user.id;
  });
};

const getCommentsReq = reactive<GetCommentsReq>({
  scope: "post",
  page: 0,
  id: props.id
});

const comments = reactive<{
  data: Comment[];
  likeData: LikeStruct[];
  replyNumber: number;
}>({
  data: [],
  likeData: [],
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
    scope: "post",
    page: page
  }).then((res) => {
    comments.replyNumber = 0;
    for (let i = 0; i < res.data.length; i++) {
      comments.data.push(res.data[i]);
      comments.likeData.push(res.likeData[i]);
      comments.replyNumber += res.data[i].comments;
    }
    isCommentsLoaded = true;
    page += 1;
    if (res.data.length < 10) allCommentsLoaded = true;
  });
};

let commentReplyIndex = ref(-1);
const placeholderText = ref("发布评论");
const newCommentFocus = ref<boolean>(false);

const newCommentReq = reactive<NewCommentReq>({
  id: props.id,
  scope: "post",
  text: ""
});

const refreshReplyIndex = (index: number) => {
  if (index != -1) {
    commentReplyIndex.value = index;
    newCommentReq.id = comments.data[commentReplyIndex.value].id;
    newCommentReq.scope = "comment";
  } else {
    newCommentReq.id = props.id;
    commentReplyIndex.value = -1;
  }
};

const afterBlur = () => {
  newCommentFocus.value = false;
  refreshReplyIndex(-1);
};

// 判断是否改变了点赞状态，如果改变了则在onUnload阶段进行提交
let isDoLike = false;
const asyncDoLike = () => {
  isDoLike = !isDoLike;
  if (post.likeData.isLike) {
    post.likeData.count--;
  } else {
    post.likeData.count++;
  }
  post.likeData.isLike = !post.likeData.isLike;
};

onUnload(() => {
  if (isDoLike) {
    localDoLike({
      targetId: props.id,
      targetType: TargetType.Post
    });
  }
  Promise.all(
    Array.from(commentDoLikeMap.keys()).map((id) => commentDoLike(id))
  ).finally(() => {
    commentDoLikeMap.clear();
  });
});

const focusReplyComment = (index: number) => {
  placeholderText.value = "回复 @" + comments.data[index].user.nickname + ": ";
  newCommentFocus.value = true;
  refreshReplyIndex(index);
};

const updateLikeData = async (index: number) => {
  asyncCommentDoLike(index);
};

const showDeleteDialogue = () => {
  isShowDeleteDialogue.value = true;
};
const closeDeleteDialogue = () => {
  isShowDeleteDialogue.value = false;
};
const deleteThisPost = () => {
  deletePost({
    id: post.data.id
  }).then(
    () => {
      uni.reLaunch({
        url: "/pages/world/world"
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
  comments.likeData = [];
  allCommentsLoaded = false;
  isCommentsLoaded = true;
  await localGetCommentsData();
  commentReplyIndex.value = -1;
  newCommentReq.text = "";
  newCommentReq.scope = "post";
  newCommentReq.id = props.id;
  initLock = false;
};

const wcbHeight = ref(81);

onMounted(() => {
  const query = uni.createSelectorQuery();
  const dom = query.select(".out-write-comment-box >>> .write-comment-box");
  dom
    .boundingClientRect((data) => {
      wcbHeight.value = data.height;
    })
    .exec();
});

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

const selectIndex = ref(0);

let enterMaskData = ref(null);
let enterReplyData = ref(null);

const isReplyOpened = ref(false);

function onClickReplies(index: number) {
  selectIndex.value = index;
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
