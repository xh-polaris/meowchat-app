<template>
  <view :animation="enterMaskData" class="reply-mask" @click="leaveReply()" />

  <view class="container">
    <view class="post-info-box">
      <view class="poster-info-box">
        <image :src="moment.data.user.avatarUrl" class="poster-profile" />
        <text class="poster-name">
          {{ moment.data.user.nickname }}
        </text>
        <text class="post-time">
          · {{ displayTime(moment.data.createAt) }}
        </text>
      </view>
      <view class="post-content">
        {{ moment.data.text }}
      </view>
      <view class="like-info"> {{ moment.likeData.count }} 位喵友觉得很赞</view>
      <view :class="chooseImageClass(moment.data.photos.length)">
        <image
          v-for="(item, index) in moment.data.photos"
          :key="index"
          :src="item"
          :mode="chooseImageMode(moment.data.photos.length)"
          @click="onClickImage(item)"
        />
      </view>
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
          <text class="comment-time"> · {{ displayTime(item.createAt) }}</text>
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
        <view v-if="comments.likeData[index]" class="like-box">
          <view
            v-if="!comments.likeData[index].isLike"
            :style="{ backgroundImage: 'url(/static/images/like_grey_0.png)' }"
            class="like-icon"
            @click="commentDoLike(index)"
          />
          <view
            v-else
            :style="{ backgroundImage: 'url(/static/images/like_grey_1.png)' }"
            class="like-icon"
            @click="commentDoLike(index)"
          />
          <text class="like-num">
            {{ comments.likeData[index].count }}
          </text>
        </view>
      </view>
    </view>

    <view class="write-comment-box">
      <input
        v-model="text"
        class="write-comment"
        placeholder="发表评论..."
        type="text"
      />
      <view class="like-box">
        <view
          v-if="!moment.likeData.isLike"
          :style="{ backgroundImage: 'url(/static/images/like_grey_0.png)' }"
          class="like-icon"
          @click="momentDoLike()"
        />
        <view
          v-else
          :style="{ backgroundImage: 'url(/static/images/like_grey_1.png)' }"
          class="like-icon"
          @click="momentDoLike()"
        />
        <view class="like-num">
          {{ moment.likeData.count }}
        </view>
      </view>
      <view class="send-comment-btn" @click="createComment()"> 发布</view>
    </view>
  </view>
  <view v-if="isReplyOpened" class="reply">
    <reply @closeReply="closeReply" />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  enterMask,
  enterReply,
  onClickImage,
  chooseImageClass,
  chooseImageMode,
  getLikeData,
  LikeStruct
} from "@/pages/moment/event";
import { GetMomentDetailReq } from "@/apis/moment/moment-components";
import { getMomentDetail } from "@/apis/moment/moment";
import { Comment, Moment, TargetType } from "@/apis/schemas";
import { displayTime } from "@/utils/time";
import { GetCountReq } from "@/apis/like/like-interface";
import { doLike } from "@/apis/like/like";
import { getComments, newComment } from "@/apis/comment/comment";
import {
  GetCommentsReq,
  NewCommentReq
} from "@/apis/comment/comment-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import Reply from "@/pages/moment/reply";

const props = defineProps<{
  id: string;
}>();
const getMomentDetailReq = reactive<GetMomentDetailReq>({
  momentId: props.id
});
const moment = reactive<{
  data: Moment;
  likeData: LikeStruct;
}>({
  data: {
    id: "",
    createAt: 0,
    title: "",
    catId: "",
    communityId: "",
    text: "",
    user: {
      id: "",
      nickname: "",
      avatarUrl: ""
    },
    photos: []
  },
  likeData: {
    isLike: false,
    count: 0
  }
});

const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Moment
});

const likeUrl = "/static/images/like.png";
const unlikeUrl = "/static/images/like_grey_0.png";

const getData = async () => {
  moment.data = (await getMomentDetail(getMomentDetailReq)).moment;
  moment.likeData = await getLikeData(likeReq);
};

const momentDoLike = async () => {
  await doLike(likeReq);
  moment.likeData = await getLikeData(likeReq);
};

const getCommentsReq = reactive<GetCommentsReq>({
  scope: "moment",
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
      comments.likeData.push(await getLikeData(commentLikeReq));
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

const commentDoLike = async (index: number) => {
  let commentLikeReq = {
    targetId: comments.data[index].id,
    targetType: TargetType.Comment
  };
  await doLike(commentLikeReq);
  comments.likeData[index] = await getLikeData(commentLikeReq);
};

const newCommentReq = reactive<NewCommentReq>({
  id: props.id,
  scope: "moment",
  text: ""
});
const text = ref<string>("");
const createComment = () => {
  if (text.value === "") {
    return;
  }
  newCommentReq.text = text.value;
  newComment(newCommentReq).then((res) => {
    init();
    uni.showToast({
      title: res.msg
    });
  });
};

const init = () => {
  getData();
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

.container {
  padding: 20px 15px;
  background-color: #fafcff;

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
        background-color: #cccccc;
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

    // 根据图片数量自适应图片排版方式
    .imgs {
      position: relative;
      display: flex;
      overflow: hidden;
      flex-wrap: wrap;

      &.imgs1 {
        image {
          width: 680rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }

      &.imgs2 {
        image {
          width: 330rpx;
          height: 330rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }

      &.imgs5 {
        image {
          width: 220rpx;
          height: 220rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }
    }
  }

  .comments-box {
    .comment-box {
      background-color: #fff;
      box-shadow: 0 0 4px #ddd;
      border-radius: 30rpx;
      margin-bottom: 15px;
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
        display: flex;
        align-items: center;

        .like-icon {
          width: calc(16 / 390 * 100vw);
          height: calc(16 / 390 * 100vw);
          background-size: 100% 100%;
        }

        .like-num {
          margin-left: calc(4 / 390 * 100vw);
          font-size: 14px;
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
        width: calc(20 / 390 * 100vw);
        height: calc(20 / 390 * 100vw);
        background-size: 100% 100%;
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
