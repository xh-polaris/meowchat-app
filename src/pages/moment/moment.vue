<template>
  <view :animation="enterMaskData" class="reply-mask" @click="leaveReply()" />
  <!--  <reply-->
  <!--      :animation="enterReplyData"-->
  <!--      :replies="comments[selectedReply]"-->
  <!--      class="more-reply"-->
  <!--  />-->

  <view class="container">
    <view class="post-info-box">
      <view class="poster-info-box">
        <image :src="moment.user.avatarUrl" class="poster-profile" />
        <text class="poster-name">
          {{ moment.user.nickname }}
        </text>
        <text class="post-time">
          · {{ displayTime(moment.createAt * 1000) }}
        </text>
      </view>
      <view class="post-content">
        {{ moment.text }}
      </view>
      <view class="like-info"> {{ momentLike.count }} 位喵友觉得很赞</view>
      <image
        v-for="(item, index) in moment.photos"
        :key="index"
        :src="item"
        class="post-image"
        mode="widthFix"
      />
    </view>

    <view class="comments-box">
      <view v-for="(item, index) in comments" :key="index" class="comment-box">
        <view class="commenter-info-box">
          <image :src="item.user.avatarUrl" class="commenter-profile" />
          <text class="commenter-name">
            {{ item.user.nickname }}
          </text>
          <text class="comment-time">
            · {{ displayTime(item.createAt * 1000) }}
          </text>
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
          <image
            :src="commentLikes[index].likeUrl"
            class="like-icon"
            mode="widthFix"
            @click="commentDoLike(index)"
          />
          <text class="like-num">
            {{ commentLikes[index].count }}
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
        <image
          :src="momentLike.likeUrl"
          class="like-icon"
          mode="widthFix"
          @click="momentDoLike()"
        />
        <view class="like-num">
          {{ momentLike.count }}
        </view>
      </view>
      <view class="send-comment-btn" @click="createComment(text)"> 发布</view>
    </view>
  </view>
  <view v-if="isReplyOpened" class="reply">
    <reply @closeReply="closeReply" />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { enterMask, enterReply } from "@/pages/moment/event";
import { GetMomentDetailReq } from "@/apis/moment/moment-components";
import { getMomentDetail } from "@/apis/moment/moment";
import { Comment, Moment, TargetType } from "@/apis/schemas";
import { displayTime } from "@/utils/time";
import { GetCountReq } from "@/apis/like/like-interface";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import { getComments, newComment } from "@/apis/comment/comment";
import {
  GetCommentsReq,
  NewCommentReq,
} from "@/apis/comment/comment-interfaces";
import { onReachBottom } from "@dcloudio/uni-app";
import Reply from "@/pages/moment/reply";

const props = defineProps<{
  id: string;
}>();
const getMomentDetailReq = reactive<GetMomentDetailReq>({
  momentId: props.id,
});
const moment = ref<Moment>({
  id: "",
  createAt: 0,
  title: "",
  catId: "",
  communityId: "",
  text: "",
  user: {
    id: "",
    nickname: "",
    avatarUrl: "",
  },
  photos: [],
});

const getData = async () => {
  moment.value = (await getMomentDetail(getMomentDetailReq)).moment;
};
getData();

const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Moment,
});
const momentLike = ref({
  count: 0,
  liked: true,
  likeUrl: "/static/images/like.png",
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
const getMomentLikeData = async () => {
  momentLike.value.count = (await getCount(likeReq)).count;
  momentLike.value.liked = (await getUserLiked(likeReq)).liked;
  momentLike.value.likeUrl = getLikeUrl(momentLike.value.liked);
};
getMomentLikeData();

const momentDoLike = async () => {
  await doLike(likeReq);
  await getMomentLikeData();
};

const getCommentsReq = reactive<GetCommentsReq>({
  scope: "moment",
  page: 0,
  id: props.id,
});

interface likeStruct {
  count: number;
  liked: boolean;
  likeUrl: string;
}

const comments = reactive<Comment[]>([]);
const commentLikes = reactive<likeStruct[]>([]);
let allCommentsLoaded = false;
let isCommentsLoaded = false;
let pageStart = 0;
const getCommentsData = async () => {
  let commentsTemp = (await getComments(getCommentsReq)).comments;
  if (commentsTemp.length > pageStart) {
    for (let i = pageStart; i < commentsTemp.length; i++) {
      comments.push(commentsTemp[i]);
      const commentLikeReq = {
        targetId: commentsTemp[i].id,
        targetType: TargetType.Comment,
      };
      commentLikes.push(await getCommentLikeData(commentLikeReq));
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
  let commentLike = (await getUserLiked(req)).liked;
  let likeCount = (await getCount(req)).count;
  let commentLikeUrl = unlikeUrl;
  if (commentLike) commentLikeUrl = likedUrl;
  return {
    count: likeCount,
    liked: commentLike,
    likeUrl: commentLikeUrl,
  };
};
const commentDoLike = async (index: number) => {
  let commentLikeReq = {
    targetId: comments[index].id,
    targetType: TargetType.Comment,
  };
  await doLike(commentLikeReq);
  commentLikes[index] = await getCommentLikeData(commentLikeReq);
};
getCommentsData();

const newCommentReq = reactive<NewCommentReq>({
  id: props.id,
  scope: "moment",
  text: "",
});
const text = ref("");
const createComment = (text: string) => {
  if (text === "") {
    return;
  }
  newCommentReq.text = text;
  newComment(newCommentReq).then((res) => {
    getNewComment();
    uni.showToast({
      title: res.msg,
    });
  });
};
const getNewComment = async () => {
  let tmpPage = getCommentsReq.page;
  getCommentsReq.page = 0;
  let commentsTemp = (await getComments(getCommentsReq)).comments;
  getCommentsReq.page = tmpPage;
  comments.unshift(commentsTemp[0]);
  pageStart += 1;
  if (pageStart === 10) {
    getCommentsReq.page += 1;
    pageStart = 0;
  }
};

onReachBottom(() => {
  if (isCommentsLoaded && !allCommentsLoaded) {
    isCommentsLoaded = false;
    getCommentsData();
  }
});

const comments2 = reactive([
  {
    id: "Pinlunrenyi",
    profile: "https://static.xhpolaris.com/cat_world.jpg",
    time: " 3小时前",
    text: "我做了猫猫月饼，请学校的猫猫来吃!",
    likes: 666,
    reply: [
      {
        id: "Jiezheshuo1",
        profile: "https://static.xhpolaris.com/cat_world.jpg",
        time: " 2小时前",
        text: "猫居然也有月饼吃",
        likes: 333,
      },
      {
        id: "Jiezheshuo2",
        profile: "https://static.xhpolaris.com/cat_world.jpg",
        time: " 2小时前",
        text: "猫为啥没有月饼吃",
        likes: 888,
      },
      {
        id: "Jiezheshuo3",
        profile: "https://static.xhpolaris.com/cat_world.jpg",
        time: " 1小时前",
        text: "猫当然有月饼吃",
        likes: 222222,
      },
    ],
  },
  {
    id: "Dianpinger",
    profile: "https://static.xhpolaris.com/cat_world.jpg",
    time: " 4小时前",
    text: "祝大家中秋节快乐哦~",
    likes: 8888,
    reply: [],
  },
]);

let selectedReply = ref(0);
let enterMaskData = ref(null);
let enterReplyData = ref(null);

const isReplyOpened = ref(false);

function onClickReplies(idx: number) {
  // selectedReply.value = idx;
  // enterMask.width("100%").height("100%").opacity(0.5).step();
  // enterMaskData.value = enterMask.export();
  // enterReply.height("70%").step();
  // enterReplyData.value = enterReply.export();

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
  height: 0rpx;
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

    .post-image {
      width: 90%;
      margin-bottom: 10px;
      border-radius: 15px;
    }
  }

  .comments-box {
    .comment-box {
      background-color: #fff;
      box-shadow: 0px 0px 4px #ddd;
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

        .like-icon {
          width: 15px;
          margin-right: 8px;
        }

        .like-num {
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
}
</style>
