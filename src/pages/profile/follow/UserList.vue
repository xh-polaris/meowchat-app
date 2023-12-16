<template>
  <view class="following-users">
    <view
      v-for="user in users"
      :key="user.id"
      class="user-item"
      @click="onClickUser(user)"
    >
      <view class="user-avatar-outside">
        <image :src="user.avatarUrl" class="user-avatar" />
      </view>

      <view class="user-info">
        <view class="user-name">{{ user.nickname }}</view>
      </view>
      <view class="follow-status" @click.stop="toggleFollowStatus(user)">
        {{ user.isFollowing ? "已关注" : "关注" }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onReachBottom } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import { TargetType, User } from "@/apis/schemas";
import { doLike } from "@/apis/like/like";
import { Pages } from "@/utils/url";

const props = defineProps<{
  loader: () => Promise<User[]>;
}>();

const users = reactive<User[]>([]);
const hasMore = ref(true);

const load = () => {
  if (!hasMore.value) {
    return;
  }
  if (!props.loader) {
    return;
  }
  props.loader().then((res) => {
    if (!res?.length) {
      hasMore.value = false;
    }
    const usersWithDefaultFollowStatus = res.map((user) => ({
      ...user,
      isFollowed: true
    }));
    users.push(...usersWithDefaultFollowStatus);
  });
};

const toggleFollowStatus = (user: User) => {
  doLike({
    targetId: user.id,
    targetType: TargetType.User
  }).then(() => {
    user.isFollowing = !user.isFollowing;
  });
};

const onClickUser = (user: User) => {
  uni.navigateTo({
    url: `${Pages.Person}?userId=${user.id}`
  });
};

load();
onReachBottom(() => {
  load();
});
</script>

<style scoped lang="scss">
.following-users {
  margin-top: 1vw;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 3vw;
}

.user-avatar {
  max-width: 12vw;
  max-height: 12vw;
  border-radius: 6vw;
  margin-right: 10px;
  overflow: hidden;
  object-fit: contain;
}

.user-avatar-outside {
  width: 12vw;
  height: 12vw;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
  margin-left: 4vw;
}

.user-name {
  margin-bottom: 0;
  font-size: 4.5vw;
  font-weight: 500;
}

.follow-status {
  color: grey;
  border-radius: 27vw;
  padding: 1vw 4vw;
  cursor: pointer;
  border: 0.3vw solid grey;
}
</style>
