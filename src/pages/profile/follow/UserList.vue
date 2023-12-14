<template>
  <view class="following-users">
    <view v-for="user in users" :key="user.id" class="user-item">
      <view class="user-avatar-outside">
        <image :src="user.avatarUrl" class="user-avatar" />
      </view>

      <view class="user-info">
        <view class="user-name">{{ user.nickname }}</view>
      </view>
    </view>
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
        users.push(...res);
      });
    }
  }
};

load();
onReachBottom(load);
</script>

<style scoped lang="scss">
.following-users {
  margin-top: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
}

.user-avatar {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
  object-fit: contain;
}

.user-avatar-outside {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
  margin-left: 4vw;
}

.user-name {
  margin-bottom: 5px;
  font-size: 4.5vw;
  font-weight: 500;
}

.follow-status {
  color: #777;
  border: 1px solid #777;
  border-radius: 27vw;
  padding: 1vw 4vw;
}

.user-item + .user-item {
  border-top: 1px solid #ddd;
}
</style>
