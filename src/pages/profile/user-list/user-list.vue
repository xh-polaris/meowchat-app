<template>
  <TopBar :has-go-back="true">
    <template #center>我的关注</template>
  </TopBar>

  <view class="header">正在关注的用户</view>

  <view class="following-users">
    <view
      v-for="(user, index) in followingUsers"
      :key="index"
      class="user-item"
    >
      <view class="user-avatar-outside">
        <img :src="Icons.Avatar_Example" class="user-avatar" />
      </view>

      <view class="user-info">
        <view class="user-name">{{ user.username }}</view>
      </view>
      <view class="follow-status">已关注</view>
    </view>
  </view>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import { Icons } from "@/utils/url";
import { onReachBottom } from "@dcloudio/uni-app";
import { ref } from "vue";
import {
  GetLikeContentsReq,
  GetLikeContentsResp,
  createUsersDataBatch
} from "@/apis/like/like-interface";

export default {
  components: { TopBar },
  setup() {
    const followingUsers = ref([
      { name: "username1", avatar: "user1.jpg" },
      { name: "username2", avatar: "user2.jpg" },
      { name: "username3", avatar: "user3.jpg" },
      { name: "username3", avatar: "user3.jpg" },
      { name: "username4", avatar: "user4.jpg" },
      { name: "username5", avatar: "user5.jpg" },
      { name: "username6", avatar: "user6.jpg" },
      /*{ name: "username7", avatar: "user7.jpg" },*/
      { name: "username8", avatar: "user8.jpg" },
      { name: "username9", avatar: "user9.jpg" },
      { name: "username10", avatar: "user10.jpg" },
      { name: "username11", avatar: "user11.jpg" }
      // 添加更多用户项
    ]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const hasMore = ref(true);

    return {
      followingUsers,
      currentPage,
      pageSize,
      hasMore
    };
  },
  computed: {
    Icons() {
      return Icons;
    }
  },
  methods: { createUsersDataBatch },
  async createUsersDataBatch() {
    const req: GetLikeContentsReq = {
      page: this.currentPage,
      limit: this.pageSize,
      backward: true
    };

    try {
      const followUsers: GetLikeContentsResp = await GetLikeContentsReq;

      if (followUsers.length < this.pageSize) {
        this.hasMore = false;
      }

      this.followingUsers.push(...followUsers);
      this.currentPage++;
    } catch (error) {
      console.error("Error loading more data:", error);
    }
  }
};

onReachBottom(() => {
  if (this.hasMore) {
    void this.createUsersDataBatch();
  }
});
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
