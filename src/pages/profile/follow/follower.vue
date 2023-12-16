<template>
  <TopBar :has-go-back="true">
    <template #center>粉丝列表</template>
  </TopBar>
  <view class="header">正在关注的用户</view>
  <UserList v-if="show" :loader="loader" />
  <view class="background" />
</template>

<script lang="ts" setup>
import UserList from "@/pages/profile/follow/UserList.vue";
import TopBar from "@/components/TopBar.vue";
import { getLikeContents, getLikedUsers } from "@/apis/like/like";
import { TargetType } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";
import {
  GetLikeContentsReq,
  GetLikedUsersReq
} from "@/apis/like/like-interface";
import { ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { refresh } from "@/utils/utils";

const props = defineProps<{
  userId: string;
}>();

const show = ref(true);
let lastToken = "";
const loader = async () => {
  if (lastToken) {
    return;
  }
  const req: GetLikedUsersReq = {
    targetId: props.userId || uni.getStorageSync(StorageKeys.UserId),
    targetType: TargetType.User
  };

  const res = await getLikedUsers(req);
  lastToken = "1";
  return res.users;
};

onPullDownRefresh(() => {
  refresh(show);
  lastToken = "";
  uni.stopPullDownRefresh();
});
</script>

<style scoped lang="scss">
@import "@/common/background.scss";
@import "follow.scss";
</style>
