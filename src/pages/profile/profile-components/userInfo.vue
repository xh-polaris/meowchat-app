<template>
  <view class="fot-xh">
    <view class="pic">
      <image
        :src="userInfo.avatarUrl"
        style="width: 100%; height: 100%; border-radius: 50%"
      />
    </view>
    <view class="txt">
      <view class="info">
        <view class="nickname">
          {{ userInfo.nickname }}
        </view>
        <view class="motto"> 个性签名:{{ userInfo.motto }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getUserInfo } from "@/apis/user/user";
import { User } from "@/apis/schemas";
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";

interface Props {
  type?: string;
  userId?: string;
}

const props = defineProps<Props>();
const userInfo = reactive<User>({
  id: "",
  nickname: "微信用户",
  avatarUrl: "https://static.xhpolaris.com/cat_world.jpg",
  motto: "暂无个性签名",
  article: 0,
  follower: 0,
  following: 0
});
const isFollowed = ref(false);
const refresh = async () => {
  const res = await getUserInfo(
    props.type === "other"
      ? {
          userId: props.userId
        }
      : {}
  );
  userInfo.id = res.user.id;
  userInfo.nickname = res.user.nickname;
  userInfo.avatarUrl = res.user.avatarUrl;
  userInfo.motto = res.user.motto;
  userInfo.motto = res.user.motto;
  userInfo.follower = res.user.follower;
  userInfo.following = res.user.following;
  userInfo.article = res.user.article;
};
onShow(refresh);
onPullDownRefresh(() => {
  refresh().then(() => {
    uni.stopPullDownRefresh();
  });
});
</script>

<style lang="scss" scoped>
.fot-xh .pic {
  float: left;
  height: 160rpx;
  width: 160rpx;
  margin-right: 50rpx;
  margin-left: 38rpx;
  margin-top: 60rpx;
}

.fot-xh .txt {
  overflow: hidden;
  font-family: sans-serif;
}

.fot-xh .txt .info {
  margin-top: 70rpx;
  position: absolute;
  display: block;
}

.fot-xh .txt .info .nickname {
  height: 30rpx;
  width: 600rpx;
  font-size: 40rpx;
  margin-bottom: 30rpx;
  font-weight: bold;
}

.fot-xh .txt .info .motto {
  height: 34rpx;
  width: 348rpx;
  font-size: 24rpx;
  color: #939393;
  margin-bottom: 10rpx;
}
</style>
