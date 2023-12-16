<template>
  <TopBar :has-go-back="true">
    <template #center>关注列表</template>
  </TopBar>
  <view class="header">关注中的用户</view>
  <UserList v-if="show" :loader="loader" />
  <view class="background" />
</template>

<script lang="ts" setup>
import UserList from "@/pages/profile/follow/UserList.vue";
import TopBar from "@/components/TopBar.vue";
import { getLikeContents } from "@/apis/like/like";
import { TargetType } from "@/apis/schemas";
import { StorageKeys } from "@/utils/const";
import { GetLikeContentsReq } from "@/apis/like/like-interface";
import { ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { refresh } from "@/utils/utils";

const props = defineProps<{
  userId: string;
}>();

const show = ref(true);
let lastToken = "";
const loader = async () => {
  const req: GetLikeContentsReq = {
    userId: props.userId || uni.getStorageSync(StorageKeys.UserId),
    targetType: TargetType.User
  };
  if (lastToken) {
    req.lastToken = lastToken;
  }
  const res = await getLikeContents(req);
  lastToken = res.token;
  return res.users;
};

onPullDownRefresh(() => {
  refresh(show);
  lastToken = "";
  uni.stopPullDownRefresh();
});
</script>

<style scoped>
@import "@/common/background.scss";
@import "follow.scss";
</style>
