<template>
  <TopBar :has-go-back="true">
    <template #center>用户详情</template>
  </TopBar>
  <view class="container">
    <image :src="Pictures.ProfileBackground" class="bg-set" />
    <UserInfo :user-id="props.userId" type="other"></UserInfo>
  </view>
  <view class="com-item">
    <view class="line-info">
      <view class="number">{{ userInfo.following }}</view>
      <view class="info">关注</view>
      <view class="number">{{ userInfo.follower }}</view>
      <view class="info">粉丝</view>
      <view class="number">{{ userInfo.article }}</view>
      <view class="info">创作</view>
      <view v-if="!followInfo.followed">
        <view class="subscribe" @click="onClickFollow()">
          <view class="follow">+关注</view>
        </view>
      </view>
      <view v-else>
        <view class="unsubscribe" @click="onClickFollow()">
          <view class="unfollow">取消关注</view>
        </view>
      </view>
    </view>
  </view>
  <UserPublished :user-id="props.userId" type="other"></UserPublished>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, reactive } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { doLike, getUserLiked } from "@/apis/like/like";
import { TargetType, User } from "@/apis/schemas";
import { onLoad, onPullDownRefresh, onReady, onShow } from "@dcloudio/uni-app";
import UserPublished from "@/pages/profile/profile-components/userPublished.vue";
import { Pictures } from "@/utils/url";
import TopBar from "@/components/TopBar.vue";

const props = defineProps<{
  userId?: string;
}>();

interface FollowedInfo {
  followed: boolean;
  originFollow: boolean;
}

const followInfo = reactive<FollowedInfo>({
  followed: true,
  originFollow: true
});
const userInfo = reactive<User>({
  id: "",
  nickname: "微信用户",
  avatarUrl: "https://static.xhpolaris.com/cat_world.jpg",
  motto: "暂无个性签名",
  article: 0,
  follower: 0,
  following: 0
});
const onClickFollow = async () => {
  if (followInfo.followed === true) {
    userInfo.follower--;
    followInfo.followed = false;
  } else {
    userInfo.follower++;
    followInfo.followed = true;
  }
};
const refresh = async () => {
  const res = await getUserInfo({
    userId: props.userId
  });
  userInfo.id = res.user.id;
  userInfo.nickname = res.user.nickname;
  userInfo.avatarUrl = res.user.avatarUrl;
  userInfo.follower = res.user.follower || 0;
  userInfo.following = res.user.following || 0;
  userInfo.article = res.user.article;
  let commentLikeReq = {
    targetId: userInfo.id,
    targetType: 6
  };
  const userLiked = await getUserLiked(commentLikeReq);

  followInfo.followed = userLiked.liked;
  followInfo.originFollow = userLiked.liked;
};
onShow(refresh);
onPullDownRefresh(() => {
  refresh().then(() => {
    uni.stopPullDownRefresh();
  });
});
onLoad(() => {
  uni.showLoading({
    title: "加载中"
  });
});

onReady(() => {
  uni.hideLoading();
});
onBeforeUnmount(() => {
  if (Boolean(followInfo.followed) !== Boolean(followInfo.originFollow)) {
    doLike({
      targetId: userInfo.id,
      targetType: TargetType.User
    });
  }
});
</script>

<style lang="scss" scoped>
@import "@/common/search-input.scss";

.wrap {
  margin-top: 20rpx;
  color: #999999;
  font-size: 24rpx;
  height: 260rpx;
}

.bg-set {
  position: fixed;
  width: 750rpx;
  height: 600rpx;
  left: 0;
  z-index: -1;
  opacity: 0.9; //设置透明度
}

.com-item {
  margin-top: 250rpx;
  margin-bottom: 50rpx;
  border-radius: 50rpx 50rpx 0 0;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;

  .line-info {
    margin-left: 36rpx;
    display: flex;
    align-items: center;

    .number {
      height: 50rpx;
      font-size: 36rpx;
      color: #353535;
      font-weight: 400;
    }

    .info {
      margin-left: 10rpx;
      margin-right: 42rpx;
      width: 48rpx;
      height: 34rpx;
      font-size: 24rpx;
      color: #212121;
      font-weight: 400;
    }

    .subscribe {
      width: 125rpx;
      height: 50rpx;
      margin-left: 170rpx;
      border-radius: 30rpx;
      background-color: #1fa1ff;

      .follow {
        line-height: 50rpx;
        text-align: center;
        color: #ffffff;
        font-size: 26rpx;
        font-weight: 400;
      }
    }

    .unsubscribe {
      width: 130rpx;
      height: 50rpx;
      margin-left: 170rpx;
      border-radius: 20rpx;
      background-color: #dfdfdf;

      .unfollow {
        line-height: 50rpx;
        text-align: center;
        color: #aaaaaa;
        font-size: 26rpx;
        font-weight: 400;
      }
    }
  }
}
</style>
