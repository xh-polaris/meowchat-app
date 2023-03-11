<template>
  <view class="background">
    <view class="toggles">
      <view
        :class="currentToggle === '用户' ? 'toggle current' : 'toggle'"
        @click="setToggle('用户')"
        >用户</view
      >
      <view
        :class="currentToggle === '猫咪' ? 'toggle current' : 'toggle'"
        @click="setToggle('猫咪')"
        >猫咪</view
      >
    </view>
    <view class="searchBar">
      <view class="searchIcon"></view>
      <input
        class="searchInput"
        type="text"
        :placeholder="'搜索已经关注的' + currentToggle"
      />
    </view>
    <view class="prompt">正在关注的{{ currentToggle }}</view>
    <view v-if="currentToggle === '用户'" class="users">
      <template v-for="user in followingsData" :key="user.id">
        <view class="user">
          <view class="user-info">
            <view
              class="avatar"
              :style="{ backgroundImage: 'url(' + user.imageUrl + ')' }"
            ></view>
            <view class="username">{{ user.username }}</view>
          </view>
          <view
            v-if="user.isFollowing"
            class="button followed"
            @click="changeUserIsFollwing(user, false)"
            >已关注</view
          >
          <view
            v-else
            class="button follow"
            @click="changeUserIsFollwing(user, true)"
            >关 注</view
          >
        </view>
      </template>
    </view>
    <view v-if="currentToggle === '猫咪'" class="cats">
      <search-cats search="default"></search-cats>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import SearchCats from "@/pages/search/search-cats.vue";

const currentToggle = ref("用户");
const setToggle = (toggleName: string) => {
  currentToggle.value = toggleName;
};
const followingsData = reactive([
  {
    id: Math.random(),
    imageUrl: "",
    username: "Paimon",
    isFollowing: true
  },
  {
    id: Math.random(),
    imageUrl: "",
    username: "Mona",
    isFollowing: true
  },
  {
    id: Math.random(),
    imageUrl: "",
    username: "Lisa",
    isFollowing: true
  }
]);

const changeUserIsFollwing = (user: any, isFollowing: boolean) => {
  // 完全只是目前没有api下的演示效果 后续逻辑要改的
  user.isFollowing = isFollowing;
};
</script>

<style lang="scss" scoped>
:root {
  font-size: 28upx;
}
.background {
  background-color: #fafcff;
  min-height: 100vh;
}
.toggles {
  display: flex;
  width: 268upx;
  justify-content: space-between;
  margin: 40upx auto 0;
  color: #1d1d1d;

  .toggle {
    padding-bottom: 4upx;
    border-bottom: transparent 2upx solid;
    &.current {
      border-bottom: #1fa1ff 4upx solid;
    }
  }
}
.searchBar {
  display: flex;
  width: 680upx;
  height: 72upx;
  background-color: #f5f7fa;
  border-radius: 36upx;
  margin: 26upx auto 0;
  align-items: center;
  .searchIcon {
    width: 60upx;
    height: 60upx;
    margin-left: 12upx;
    background-size: 100% 100%;
    background-image: url("/static/images/search-grey.png");
  }
  .searchInput {
    flex: 1;
    margin-left: 20upx;
    margin-right: 40upx;
  }
}
.prompt {
  color: #1d1d1d;
  margin-left: 38upx;
  margin-top: 32upx;
  font-size: 24upx;
  margin-bottom: 32upx;
}

.users {
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 148upx;
    border-bottom: #e3e3e3 2upx solid;
    margin: 0 38upx;
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        width: 84upx;
        height: 84upx;
        border-radius: 42upx;
        background-color: #eee;
        background-size: 100% 100%;
        margin-right: 28upx;
      }
      .username {
        color: #353535;
      }
    }
    .button {
      height: 44upx;
      width: 124upx;
      border-radius: 22upx;
      border-style: solid;
      border-width: 2upx;
      text-align: center;
      line-height: 44upx;
      font-size: 24upx;
      &.followed {
        color: #cfcfcf;
        border-color: #cfcfcf;
      }
      &.follow {
        color: #1fa1ff;
        border-color: #1fa1ff;
      }
    }
  }
}
</style>
