<template>
  <TopBar :has-go-back="true">
    <template #center>我的关注</template>
  </TopBar>
  <view class="header">正在关注的用户</view>
  <UserList :loader="loader" />
</template>

<script lang="ts" setup>
import UserList from "@/pages/profile/follow/UserList.vue";
import TopBar from "@/components/TopBar.vue";
import { getLikeContents } from "@/apis/like/like";
import { TargetType } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";
import { GetLikeContentsReq } from "@/apis/like/like-interface";

let lastToken = "";
const loader = async () => {
  const req: GetLikeContentsReq = {
    userId: uni.getStorageSync(StorageKeys.UserId),
    targetType: TargetType.User
  };
  if (lastToken) {
    req.lastToken = lastToken;
  }
  const res = await getLikeContents(req);
  lastToken = res.token;
  return res.users;
};
</script>

<style scoped>
.header {
  color: black;
  text-align: left;
  padding: 1vw;
  margin-top: 5vw;
  margin-left: 2vw;
  letter-spacing: 0.5vw;
  font-size: 3.6vw;
}
</style>
