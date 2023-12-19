<template>
  <TopBar :has-go-back="true">
    <template #center>动态详情</template>
  </TopBar>
  <view class="reply-mask" @click="leaveReply()" />

  <view
    v-if="moment"
    :style="{ height: 'calc(100vh - 16vw - ' - keyboardHeight + 'px)' }"
    class="content-frame"
  >
    <view class="container">
      <view class="post-info-box">
        <view class="poster-info-box">
          <image
            :src="getThumbnail(moment.user.avatarUrl)"
            class="poster-profile"
            @click="toPersonInfo(moment.user.id, myUserId)"
          />
          <text
            class="poster-name"
            @click="toPersonInfo(moment.user.id, myUserId)"
          >
            {{ moment.user.nickname }}
          </text>
          <text class="post-time"> · {{ displayTime(moment.createAt) }} </text>
          <view
            v-if="myUserId && myUserId === moment.user.id"
            class="delete"
            @click="showDeleteDialogue"
          />
        </view>
        <view v-if="moment.title" class="post-content font-lg">
          {{ moment.title }}
        </view>
        <!-- 图片区域 -->
        <view :class="chooseImageClass(moment.photos.length)">
          <image
            v-for="(url, index) in moment.photos.slice(0, 9)"
            :key="index"
            :mode="chooseImageMode(moment.photos.length)"
            :src="moment.photos.length > 1 ? getThumbnail(url) : url"
            @click="onClickImage(String(index), moment.photos)"
          />
          <view
            v-if="moment.photos.length > 9"
            class="lastImg"
            @click="onClickImage('8', moment.photos)"
            >+{{ moment.photos.length - 9 }}
          </view>
        </view>
        <view
          v-for="cat of moment.cats"
          :key="cat.id"
          class="font-md mb-2"
          style="color: #5272ff; margin: 10rpx 0 0"
          @click="onClickCatBox(cat.id)"
        >
          @{{ cat.name }}
        </view>
        <view v-if="moment.text" class="post-content font-md">
          {{ moment.text }}
        </view>
        <view v-if="moment.likeCount" class="like-info">
          {{ moment.likeCount }} 位喵友觉得很赞
        </view>
      </view>
      <view v-if="!comments.length" class="commentNum"> 评论</view>
      <view v-else class="commentNum"> 评论 {{ moment.commentCount }} </view>
      <view v-if="!comments.length">
        <view class="nomore">这里还没有评论，快发布第一条评论吧！</view>
      </view>
      <CommentBox
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        @after-delete="init()"
        @interact-with-comment="focusReplyComment(comment)"
        @on-click-replies="onClickReplies(comment)"
        @local-do-like="likeComment(comment, fishAwardEmitter)"
      />
      <view :style="'padding-bottom:' + wcbHeight.toString() + 'px'" />
    </view>
  </view>
  <WriteCommentBox
    v-if="moment"
    :placeholder-text="placeholderText"
    :like-count="moment.likeCount"
    :is-liked="moment.isLiked"
    :parent-id="moment.id"
    :parent-type="CommentType.Moment"
    :first-level-id="firstLevelId"
    :comment-callback="(res) => fishAwardEmitter.triggerCallbacks(res)"
    @do-like="likeMoment(moment, fishAwardEmitter)"
    @after-create-comment="init"
    @cancel-reply="afterBlur"
  />

  <view v-if="isReplyOpened && selectComment" class="reply">
    <Reply
      :main-comment="selectComment"
      :moment="moment"
      :fish-award-emitter="fishAwardEmitter"
      @close-reply="closeReply"
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
  <ToastBoxWithShadow
    v-if="showToastBox"
    bold-normal-text="获得小鱼干"
    :bold-blue-text="'*' + gotFishNum"
    grey-text="每日点评或点赞均可获得小鱼干"
    @close="
      () => {
        showToastBox = false;
      }
    "
  />
</template>

<script lang="ts" setup>
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";
import { reactive, ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import {
  chooseImageClass,
  chooseImageMode,
  enterMask,
  enterReply,
  getCommentsData,
  likeComment,
  likeMoment,
  onClickImage
} from "@/pages/moment/utils";
import { toPersonInfo } from "@/pages/profile/utils";
import { GetMomentDetailReq } from "@/apis/moment/moment-components";
import { deleteMoment, getMomentDetail } from "@/apis/moment/moment";
import { Comment, FishAward, Moment, TargetType } from "@/apis/schemas";
import { displayTime } from "@/utils/time";
import { doLike } from "@/apis/like/like";
import { CommentType, GetCommentsReq } from "@/apis/comment/comment-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import Reply from "@/pages/moment/Reply.vue";
import WriteCommentBox from "@/pages/moment/WriteCommentBox.vue";
import CommentBox from "@/pages/moment/CommentBox.vue";
import { Pages } from "@/utils/url";
import { StorageKeys } from "@/utils/const";
import { EventEmitter, getThumbnail } from "@/utils/utils";

const props = defineProps<{
  id: string;
}>();

const fishAwardEmitter = new EventEmitter((res: FishAward) => {
  if (res.getFish) {
    gotFishNum.value = res.getFishNum;
    showToastBox.value = true;
  }
});

const keyboardHeight = ref(0);

const getMomentDetailReq = reactive<GetMomentDetailReq>({
  momentId: props.id
});
const moment = ref<Moment>();

const myUserId = uni.getStorageSync(StorageKeys.UserId);
const isShowDeleteDialogue = ref(false);

function onClickCatBox(id?: string) {
  if (id) {
    uni.navigateTo({
      url: `${Pages.Cat}?id=${id}`
    });
  }
}

const showToastBox = ref(false);
const gotFishNum = ref(0);

const getData = async () => {
  moment.value = (await getMomentDetail(getMomentDetailReq)).moment;
};

const getCommentsReq = reactive<GetCommentsReq>({
  type: CommentType.Moment,
  page: 0,
  id: props.id
});

const comments = ref<Comment[]>([]);
let allCommentsLoaded = false;
let isCommentsLoaded = true;
let page = 0;
const localGetCommentsData = () => {
  isCommentsLoaded = false;
  getCommentsData({
    id: props.id,
    type: CommentType.Moment,
    page: page
  }).then((res) => {
    for (const data of res.data) {
      comments.value.push(data);
    }
    isCommentsLoaded = true;
    page += 1;
    if (res.data?.length < 10) allCommentsLoaded = true;
  });
};

const defaultPlaceholderText = "发布评论";
const placeholderText = ref(defaultPlaceholderText);
const firstLevelId = ref();
const afterBlur = () => {
  placeholderText.value = defaultPlaceholderText;
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
const deleteThisMoment = () => {
  if (!moment.value) {
    return;
  }
  deleteMoment({
    momentId: moment.value.id
  }).then(
    () => {
      relaunchCurrentPage();
    },
    (reason) => {
      console.log("reject-reason", reason);
    }
  );
};

const relaunchCurrentPage = () => {
  uni.reLaunch({
    url: Pages.Community
  });
};

let initLock = false;
const init = () => {
  if (initLock) return;
  initLock = true;
  getData();
  page = 0;
  getCommentsReq.page = 0;
  comments.value = [];
  allCommentsLoaded = false;
  isCommentsLoaded = true;
  localGetCommentsData();
  initLock = false;
};

const wcbHeight = ref(81);

uni.onKeyboardHeightChange((res) => {
  keyboardHeight.value = res.height;
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

init();

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
  height: 100vh;
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

.write-comment-box-frame {
  position: fixed;
  bottom: 0;
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

.content-frame {
  overflow-y: scroll;
}
</style>
