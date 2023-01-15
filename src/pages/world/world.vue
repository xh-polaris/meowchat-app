<template>
  <view class="navbar">
    <view :class="types[0].className" @click.prevent="types[0].onClick">
      {{ types[0].name }}
    </view>
    |
    <view :class="types[1].className" @click.prevent="types[1].onClick">
      {{ types[1].name }}
    </view>
    |
    <view :class="types[2].className" @click.prevent="types[2].onClick">
      {{ types[2].name }}
    </view>
    |
    <view :class="types[3].className" @click.prevent="types[3].onClick">
      {{ types[3].name }}
    </view>
    <view class="search" @click.prevent="search" />
  </view>

  <view class="top-padding" />

  <template v-for="post in postsData" :key="post.id">
    <view class="post" @click="onClickPost(post.id)">
      <view class="upper">
        <view :class="'main ' + (post.coverUrl ? 'hasImage' : '')">
          <view class="title">
            {{ post.title }}
          </view>
          <view class="user-info">
            <template v-if="!post.isAnonymous">
              <image :src="post.user.avatarUrl" class="avatar" />
              <view class="username">
                {{ post.user.nickname }}
              </view>
            </template>
          </view>
          <view class="description">
            {{ post.text }}
          </view>
          <view v-if="post.tags" class="tags">
            <template v-if="post.tags.length > 4">
              <view class="tag">
                {{ post.tags[0] }}
              </view>
              <view class="tag">
                {{ post.tags[1] }}
              </view>
              <view class="tag">
                {{ post.tags[2] }}
              </view>
            </template>
            <template v-else>
              <template v-for="tag in post.tags" :key="tag.id">
                <view class="tag">
                  {{ tag }}
                </view>
              </template>
            </template>
          </view>
        </view>
        <view
          v-if="post.coverUrl"
          :style="{ backgroundImage: 'url(' + post.coverUrl + ')' }"
          class="image"
        />
      </view>
      <view class="lower">
        <view class="time font-sm">
          {{ displayTime(post.createAt * 1000) }}
        </view>
        <view class="font-sm">{{ post.comments }}条回复</view>
      </view>
    </view>
  </template>

  <draft-button type="post" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { onClickPost } from "./event";
import { getPostPreviews } from "@/apis/post/post";
import DraftButton from "@/components/draft-button/draft-button.vue";
import { displayTime } from "@/utils/time";
import { Post } from "@/apis/schemas";

import { init } from "@/utils/init";

let postsData = reactive<Post[]>([]);
let page = 0;
const getPostPreviewsAsync = async () => {
  const posts = (
    await getPostPreviews({
      page: page
    })
  ).posts;
  if (posts.length === 0) {
    uni.stopPullDownRefresh();
  }
  page++;
  return posts;
};

async function createPostsDataBatch() {
  const posts = await getPostPreviewsAsync();
  postsData.push(...posts);
}

onReachBottom(() => {
  createPostsDataBatch();
});

const types = reactive([
  {
    name: "官方",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("官方");
    }
  },
  {
    name: "热度",
    isCurrent: true,
    className: "navbtn current",
    onClick: () => {
      toggleSelf("热度");
    }
  },
  {
    name: "最新",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("最新");
    }
  },
  {
    name: "关注",
    isCurrent: false,
    className: "navbtn",
    onClick: () => {
      toggleSelf("关注");
    }
  }
]);

const toggleSelf = (name: string) => {
  if (!types.filter((type) => type.name === name)[0].isCurrent) {
    types.map((type) => {
      type.isCurrent = false;
      type.className = "navbtn";
    });
    const currentType = types.filter((type) => type.name === name)[0];
    currentType.isCurrent = true;
    currentType.className = "navbtn current";
  }
};

onPullDownRefresh(() => {
  postsData.splice(0);
  page = 0;
  createPostsDataBatch();
  uni.stopPullDownRefresh();
});

init().then(() => {
  createPostsDataBatch();
});
</script>

<style lang="scss" scoped>
@import "@/common/user-info.scss";

body {
  font-family: sans-serif;
  background-color: #fafcff;
}

.navbar {
  position: fixed;
  top: -1px;
  background-color: #fafcff;
  display: flex;
  color: #b8b8b8;
  font-size: calc(13 / 390 * 100vw);
  align-items: center;
  width: 100vw;
  padding-top: calc(10 / 390 * 100vw);
  padding-bottom: calc(16 / 390 * 100vw);
  transition-duration: 0.4s;
  z-index: 99999;
}

.navbtn {
  color: #939393;
  font-size: calc(14 / 390 * 100vw);
  margin: 0 calc(20 / 390 * 100vw);

  &.current {
    color: #1fa1ff;
    font-size: calc(20 / 390 * 100vw);
    padding-bottom: calc(2 / 390 * 100vw);
    border-bottom: calc(1 / 390 * 100vw) #1fa1ff solid;
    font-weight: bold;
  }
}

.search {
  width: calc(35 / 390 * 100vw);
  height: calc(35 / 390 * 100vw);
  background-image: url("/static/images/search-grey.png");
  background-size: 100% 100%;
  position: fixed;
  z-index: 10;
  right: calc(18 / 390 * 100vw);
}

.top-padding {
  height: calc(58 / 390 * 100vw);
}

.post {
  background-color: #ffffff;
  border-top: 1px #f5f5f5 solid;
  border-bottom: 1px #f5f5f5 solid;
  margin-bottom: calc(6 / 390 * 100vw);
  padding: calc(16 / 390 * 100vw);
}

.upper {
  display: flex;
  align-items: center;
}

.main {
  color: #353535;

  &.hasImage {
    width: calc(251 / 390 * 100vw);
  }

  .title {
    font-size: calc(16 / 390 * 100vw);
    font-weight: bold;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .description {
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(17 / 390 * 100vw);
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    color: #1fa1ff;
    font-size: calc(10 / 390 * 100vw);
    //height: calc(18 / 390 * 100vw);
    // line-height: calc(18 / 390 * 100vw);
    padding-top: 10rpx;

    .tag {
      margin-top: 0;
      font-style: normal;
      font-weight: bold;
      font-size: 10px;
      line-height: 13px;
      /* or 170% */
      text-align: center;
      letter-spacing: 0.5px;
      /* blue02 */
      color: #1fa1ff;

      min-width: 28px;
      padding: 5rpx 10rpx 5rpx 10rpx;
      border: #1fa1ff 1px solid;
      border-radius: 9px;
      margin-right: 8px;
    }
  }
}

.image {
  width: calc(142 / 390 * 100vw);
  height: calc(93 / 390 * 100vw);
  border-radius: calc(6 / 390 * 100vw);
  margin-left: calc(16 / 390 * 100vw);
  background-size: cover;
  background-position: center;

  //text-align: center;
  //line-height: calc(93 / 390 * 100vw);
}

.lower {
  margin-top: calc(12 / 390 * 100vw);
  display: flex;
  align-items: baseline;
  color: #b8b8b8;
  font-size: calc(10 / 390 * 100vw);

  .time {
    margin-right: calc(16 / 390 * 100vw);
  }
}
</style>
