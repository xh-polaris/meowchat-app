<template>
  <view :animation="enterMaskData" class="reply-mask" @click="leaveReply()" />
  <!--  <reply-->
  <!--    :animation="enterReplyData"-->
  <!--    :replies="comments[selectedReply]"-->
  <!--    class="more-reply"-->
  <!--  />-->

  <view class="header">
    <view class="title">
      {{ post.title }}
    </view>
    <view class="head-info">
      {{ displayTime(post.createAt * 1000) }} ·{{ post.comments }}条回复
    </view>
    <view class="tags">
      <image class="tagIcon" src="/static/images/tag.png" />
      <view v-for="(item, index) in post.tags" :key="index" class="tag">
        {{ item }}
      </view>
    </view>
  </view>

  <view class="post">
    <view class="user">
      <image :src="post.user.avatarUrl" class="avatar" />
      <view class="name">
        {{ post.user.nickname }}
      </view>
    </view>
    <view class="text">
      {{ post.text }}
    </view>

    <view class="comments-box">
      <view v-for="(item, index) in comments" :key="index" class="comment-box">
        <view class="commenter-info-box">
          <image :src="item.user.avatarUrl" class="commenter-profile" />
          <text class="commenter-name">
            {{ item.user.nickname }}
          </text>
          <text class="comment-time">
            ·{{ displayTime(item.createAt * 1000) }}</text
          >
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
          <view v-if="commentLikes[index]">
            <image
              class="likedUrl"
              mode="widthFix"
              src="/static/images/like.png"
            />
          </view>
          <text class="like-num">
            {{ item.likes }}
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
    <view class="send-comment-btn" @click="createComment(text)"> 发布</view>
  </view>
  <view v-if="isReplyOpened" class="reply">
    <reply @closeReply="closeReply" />
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { enterMask, enterReply } from "../moment/event";
import Reply from "@/pages/moment/reply";
import { GetPostDetailReq } from "@/apis/post/post-interfaces";
import { Comment, Post, TargetType } from "@/apis/schemas";
import { getPostDetail } from "@/apis/post/post";
import { displayTime } from "@/utils/time";
import { getComments, newComment } from "@/apis/comment/comment";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import {
  GetCommentsReq,
  NewCommentReq,
} from "@/apis/comment/comment-interfaces";
import { onReachBottom } from "@dcloudio/uni-app";
import { GetCountReq } from "@/apis/like/like-interface";

const props = defineProps<{
  id: string;
}>();

const getPostDetailReq = reactive<GetPostDetailReq>({
  postId: props.id,
});
console.log(props.id);

// Post
const post = ref<Post>({
  id: "",
  createAt: 0,
  title: "",
  text: "",
  coverUrl: "",
  tag: [],
  likes: 0,
  user: {
    id: "",
    nickname: "",
    avatarUrl: "",
  },
  comments: 0,
  isAnonymous: false,
});

const getData = async () => {
  post.value = (await getPostDetail(getPostDetailReq)).post;
};
getData();

// Like
const likeReq = reactive<GetCountReq>({
  targetId: props.id,
  targetType: TargetType.Post,
});

const postLike = ref({
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

const getPostLikeData = async () => {
  postLike.value.count = (await getCount(likeReq)).count;
  postLike.value.liked = (await getUserLiked(likeReq)).liked;
  postLike.value.likeUrl = getLikeUrl(postLike.value.liked);
};
getPostLikeData();

const postDoLike = async () => {
  await doLike(likeReq);
  await getPostLikeData();
};

// Comments
const getCommentsReq = reactive<GetCommentsReq>({
  scope: "post",
  page: 0,
  id: props.id,
});

const comments = reactive<Comment[]>([]);
const commentLikes = reactive<boolean[]>([]);
let allCommentsLoaded = false;
let isCommentsLoaded = false;
const getCommentsData = async () => {
  let commentsTemp = (await getComments(getCommentsReq)).comments;
  if (commentsTemp.length > 0) {
    for (let i = 0; i < commentsTemp.length; i++) {
      comments.push(commentsTemp[i]);
      let commentLike = (
        await getUserLiked({
          targetId: commentsTemp[i].id,
          targetType: TargetType.Comment,
        })
      ).liked;
      commentLikes.push(commentLike);
    }
    getCommentsReq.page += 1;
  } else {
    allCommentsLoaded = true;
  }
  isCommentsLoaded = true;
};
getCommentsData();

const newCommentReq = reactive<NewCommentReq>({
  id: props.id,
  scope: "post",
  text: "",
});
const text = ref("");
const createComment = async (text: string) => {
  console.log(text);
  newCommentReq.text = text;
  console.log(await newComment(newCommentReq));
};

onReachBottom(() => {
  if (isCommentsLoaded && !allCommentsLoaded) {
    isCommentsLoaded = false;
    getCommentsData();
  }
});

const post1 = ref({
  id: "111",
  title: "如何应对校园流浪猫",
  createTime: "2022-10-31",
  commentsNum: 23,
  tags: [{ tagName: "流浪猫" }, { tagName: "新手" }],
  isAnonymous: true,
  user: {
    avatar: "https://static.xhpolaris.com/cat_world.jpg",
    name: "111",
  },
  text:
    "首先针对回答说几点:\n" +
    "①别见猫就撸\n" +
    "  猫没那么可怕，但是每只猫的性格不一样，有的温顺有的易怒。对于接触一只流浪猫，最好还是先给吃的，不摸。多给几次，每天给，等猫咪对你有了信任，有了安全感，再去撸猫，别说背，(*~3)心肚子轻而易举就摸到啦~\n" +
    "就像我们校园，有只小花猫，不对，这只大花猫(具体原因看后文)就比较温顺，见谁让谁撸;但还有只橘猫就不一样了，平时也不发脾气，但要逼他做自己不喜欢的事，就开始上爪了……无比锋利的爪子(x_x)……不愧是公的。\n" +
    "\n" +
    "2结孔\n" +
    " 很多回合里有提到结孔。这的确是一个好的措施，只是对于校园里的学生来说，没几个人有能力花钱给猫咪结扎，可能有钱的没爱心，可能有爱心的没钱，我就属于后者吧……学校对于流浪动物有不给予保护。因此，只能说，可以靠学生自己组织小团体专门为流浪猫狗结扎，但估计只能是一个公益项目了。\n" +
    "\n" +
    "③能喂就喂别乱喂\n" +
    "  曾经我为了校园里的童鞋们不爱心泛滥乱投食，在表白墙上发过一篇注意事项，解释了猫不能吃的种种东西。有些东西对猫咪是致命的，有些虽不致命，但也是对身体有害，人体需要的营养猫咪不一定需要。因此，希望每个人在要喂猫咪之前先想想自己喂的东西，对猫咪有没有好处。\n" +
    "\n" +
    "④喜欢请善待，不喜勿伤害\n" +
    "  很多流浪猫狗对人类持以戒心，原因大家心知肚明，总是有些内心不正常的人对流浪猫狗施以残忍的虐待，才让许多流浪动物们不敢接近人类。好好善待他们，让他们感受一份温暖。他们也是生命，世界不仅仅属于人类，也有它们的一份!\n" +
    "\n" +
    "⑤不要对他们带有偏见\n" +
    '  许多人觉得猫咪不好，特别是流浪猫。平时它们也被我们叫一个很难听的名字:"野猫子"，说不要招惹野猫\n' +
    "子。尤其有些人对于黑猫，是更觉得不好的。但是恰恰相反，就算是迷信，黑猫也是吉祥之物。当然，不迷信最好。\n" +
    "匿名用户 知乎 \n" +
    "\n" +
    "应如何对待校园里的流浪猫?长按识别二维码阅读全文",
  likes: 123,
});

function isAnonymous() {
  if (post.value.isAnonymous) {
    post.value.user.nickname = "匿名用户";
    post.value.user.avatarUrl = "/static/images/anonymous.png";
  }
}

isAnonymous();

const comments1 = reactive([
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
      font-weight: 400;
      font-size: 10px;
      line-height: 17px;
      /* or 170% */
      text-align: center;
      letter-spacing: 0.5px;
      /* blue02 */
      color: #1fa1ff;

      min-width: 28px;
      padding: 0 6px;
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
    font-size: 14px;
    line-height: 22px;
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
      margin-bottom: 15px;
      padding: 30rpx 20rpx;

      &:last-child {
        margin-bottom: 120rpx;
      }

      .commenter-info-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .commenter-profile {
          width: 80rpx;
          height: 80rpx;
          margin-right: 24rpx;
        }

        .commenter-name {
          margin-right: 12px;
          font-weight: bold;
          font-size: 14px;
        }

        .comment-time {
          color: #aaa;
          font-size: 12px;
        }
      }

      .comment-content {
        margin-left: 104rpx;
        margin-bottom: 15px;
        line-height: 1.5em;
        letter-spacing: 0.05em;
        font-weight: 500;
        font-size: 14px;
      }

      .reply-info {
        margin-left: 104rpx;
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
        margin-left: 104rpx;

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
