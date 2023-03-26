<template>
  <view class="reply-mask" @click="leaveReply()" />

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
        <view
          v-if="myUserId && myUserId === moment.data.user.id"
          class="delete"
          @click="showDeleteDialogue"
        ></view>
      </view>
      <view v-if="moment.data.title" class="post-content font-lg">
        {{ moment.data.title }}
      </view>
      <!-- 图片区域 -->
      <view :class="chooseImageClass(moment.data.photos.length)">
        <image
          v-for="(item, index) in moment.data.photos.slice(0, 9)"
          :key="index"
          :mode="chooseImageMode(moment.data.photos.length)"
          :src="item"
          @click="onClickImage(index, moment.data.photos)"
        />
        <view
          v-if="moment.data.photos.length > 9"
          class="lastImg"
          @click="onClickImage('8', moment.data.photos)"
          >+{{ moment.data.photos.length - 9 }}</view
        >
      </view>
      <view
        v-if="catName"
        class="font-md mb-2"
        style="color: #5272ff; margin: 10rpx 0 0"
        @click="onClickCatBox(moment.data.catId)"
      >
        @{{ catName }}
      </view>
      <view v-if="moment.data.text" class="post-content font-md">
        {{ moment.data.text }}
      </view>
      <view class="like-info"> {{ moment.likeData.count }} 位喵友觉得很赞</view>
    </view>
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
      @interact-with-comment="focusReplyComment(index)"
      @on-click-replies="onClickReplies(index)"
      @local-do-like="asyncCommentDoLike(index)"
    />
    <view :style="'padding-bottom:' + wcbHeight.toString() + 'px'"></view>
    <view class="out-write-comment-box">
      <write-comment-box
        v-model:placeholder-text="placeholderText"
        :focus="newCommentFocus"
        :like-data="moment.likeData"
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
        <view class="title">确认删除此条动态？</view>
        <view class="subtitle">删除后动态将无法查看</view>
      </view>
      <view class="buttons">
        <view class="button blue" @click="closeDeleteDialogue">我再想想</view>
        <view class="button grey" @click="deleteThisMoment">删除</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import {
  chooseImageClass,
  chooseImageMode,
  enterMask,
  enterReply,
  getCommentsData,
  getLikeData,
  LikeStruct,
  localDoLike,
  onClickImage
} from "@/pages/moment/utils";
import { GetMomentDetailReq } from "@/apis/moment/moment-components";
import { getCatDetail } from "@/apis/collection/collection";
import { getUserInfo } from "@/apis/user/user";
import { deleteMoment, getMomentDetail } from "@/apis/moment/moment";
import { Comment, Moment, TargetType } from "@/apis/schemas";
import { displayTime } from "@/utils/time";
import { GetCountReq } from "@/apis/like/like-interface";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
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
import Reply from "@/pages/moment/reply.vue";
import WriteCommentBox from "@/pages/moment/write-comment-box.vue";
import CommentBox from "@/pages/moment/comment-box.vue";
import { Pages } from "@/utils/url";

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

const myUserId = ref("");

const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Moment
});

const isShowDeleteDialogue = ref(false);

let catName = ref("");

function onClickCatBox(id: string) {
  uni.navigateTo({
    url: `${Pages.Cat}?id=${id}`
  });
}

const getData = async () => {
  moment.data = (await getMomentDetail(getMomentDetailReq)).moment;
  moment.likeData = await getLikeData(likeReq);
  getUserInfo().then((res) => {
    myUserId.value = res.user.id;
  });
  if (moment.data.catId) {
    getCatDetail({
      catId: moment.data.catId
    }).then((res) => {
      catName.value = res.cat.name;
    });
  }
};

const getCommentsReq = reactive<GetCommentsReq>({
  scope: "moment",
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
    scope: "moment",
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
  text: "",
  id: props.id,
  scope: "moment"
});

const refreshReplyIndex = (index: number) => {
  if (index != -1) {
    commentReplyIndex.value = index;
    newCommentReq.id = comments.data[commentReplyIndex.value].id;
    newCommentReq.scope = "comment";
  } else {
    newCommentReq.id = props.id;
    newCommentReq.scope = "moment";
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
  if (moment.likeData.isLike) {
    moment.likeData.count--;
  } else {
    moment.likeData.count++;
  }
  moment.likeData.isLike = !moment.likeData.isLike;
};

onUnload(() => {
  if (isDoLike) {
    localDoLike({
      targetId: props.id,
      targetType: TargetType.Moment
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
const deleteThisMoment = () => {
  deleteMoment({
    momentId: moment.data.id
  }).then(
    () => {
      uni.reLaunch({
        url: Pages.Community
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
  newCommentReq.scope = "moment";
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
  // 出现“确认删除”的对话框后，下拉背后的黑幕还是会触发页面下拉，暂时的解决办法就是让这时候的页面下拉无效（下拉就自己下拉吧）
  // 对着黑幕上拉是不会有反应的，这个没问题
  if (!isShowDeleteDialogue.value) {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
    if (!initLock) init();
  } else {
    uni.stopPullDownRefresh();
  }
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

      .delete {
        position: absolute;
        width: calc(15 / 390 * 100vw);
        height: calc(15 / 390 * 100vw);
        background-size: 100% 100%;
        background-image: url("@/static/images/dustbin.png");
        right: calc(21 / 390 * 100vw);
      }
    }

    .post-content {
      margin-top: 20rpx;
      margin-bottom: 40rpx;
      line-height: 1.5em;
      letter-spacing: 0.05em;
      font-weight: 500;
    }

    .like-info {
      color: #aaa;
      font-size: 12px;
      margin-top: 10rpx;
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
      .lastImg {
        width: 220rpx;
        height: 220rpx;
        border-radius: 3px;
        color: #ffffff;
        background: rgb(0, 0, 0, 0.5);
        font-size: 70rpx;
        line-height: 220rpx;
        text-align: center;
        margin: -225rpx 5rpx 5rpx 460rpx;
        z-index: 100;
      }
    }
  }
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
  margin: 50rpx 0;
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
</style>
