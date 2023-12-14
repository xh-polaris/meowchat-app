<template>
  <view class="following-users">
    <view v-for="user in users" :key="user.id" class="user-item">
      <view class="user-avatar-outside">
        <image :src="user.avatarUrl" class="user-avatar" />
      </view>

      <view class="user-info">
        <view class="user-name">{{ user.nickname }}</view>
      </view>
      <view class="follow-status" @click="toggleFollowStatus(user)">
        {{ user.isFollowed ? "已关注" : "关注" }}
      </view>
    </view>
    <view class="separator" />
  </view>
</template>

<script setup lang="ts">
import { onReachBottom } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import { User } from "@/apis/schemas";

const props = defineProps<{
  loader: () => Promise<User[]>;
}>();

const users = reactive<User[]>([]);
const hasMore = ref(true);

const load = () => {
  if (hasMore.value) {
    if (props.loader) {
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
    }
  }
};

const toggleFollowStatus = (user: User) => {
  const isCurrentlyFollowed = user.isFollowed;
  user.isFollowed = !isCurrentlyFollowed;
  if (!user.isFollowed) {
    this.$nextTick(() => {
      const index = users.indexOf(user);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  }
};

load();
onReachBottom(load);
</script>

<style scoped lang="scss">
.following-users {
  margin-top: 1vw;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 3vw;
  border-bottom: 0.3vw solid grey;
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
  margin-bottom: 0vw;
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
