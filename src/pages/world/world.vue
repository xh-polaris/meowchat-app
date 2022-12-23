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

  <block v-for="(post) in postsData" :key="post.id">
    <view class="post" @click="onClickPost(post.id)">
      <view class="upper">
        <view :class="'main '+(post.coverUrl?'hasImage':'')">
          <view class="title">
            {{ post.title }}
          </view>
          <view class="user">
            <block v-if="!post.isAnonymous">
              <view class="avatar" />
              <view class="username">
                {{ post.user.nickname }}
              </view>
            </block>
          </view>
          <view class="description">
            {{ post.text }}
          </view>
          <view class="tags">
            <block v-if="post.tags.length > 4">
              <view class="tag">
                {{ post.tags[0] }}
              </view>
              <view class="tag">
                {{ post.tags[1] }}
              </view>
              <view class="tag">
                {{ post.tags[2] }}
              </view>
            </block>
            <block v-else>
              <block v-for="(tag) in post.tags" :key="tag.id">
                <view class="tag">
                  {{ tag }}
                </view>
              </block>
            </block>
          </view>
        </view>
        <view v-if="post.coverUrl" :style="{backgroundImage: 'url('+post.coverUrl+')'}" class="image" />
      </view>
      <view class="lower">
        <view class="time">
          {{ post.createAt }}
        </view>
        <view>{{ post.comments }}条回复</view>
      </view>
    </view>
  </block>
</template>

<script setup>

import { reactive } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { onClickPost } from "./event";
import { getPostPreviews } from "../../apis/post/post";

const postsData = reactive([]);


const getPostPreviewsAsync = async () => {
  return (await getPostPreviews()).posts
}

async function createPostsDataBatch() {
  const posts = await getPostPreviewsAsync()
  postsData.push(...posts);
}

createPostsDataBatch();

onReachBottom(() => {
  createPostsDataBatch();
});

const types = reactive([
  {
    name: "官方",
    isCurrent: false,
    className: "navbtn",
    onClick: ev => {
      toggleSelf("官方")
    }
  },
  {
    name: "热度",
    isCurrent: true,
    className: "navbtn current",
    onClick: ev => {
      toggleSelf("热度")
    }
  },
  {
    name: "最新",
    isCurrent: false,
    className: "navbtn",
    onClick: ev => {
      toggleSelf("最新")
    }
  },
  {
    name: "关注",
    isCurrent: false,
    className: "navbtn",
    onClick: ev => {
      toggleSelf("关注")
    }
  }
])

const toggleSelf = name => {
  if (!types.filter(type => type.name === name)[0].isCurrent) {
    types.map(type => {
      type.isCurrent = false;
      type.className = "navbtn"
    })
    const currentType = types.filter(type => type.name === name)[0]
    currentType.isCurrent = true
    currentType.className = "navbtn current"
  }
}

</script>

<style lang="scss" scoped>

body {
  font-family: sans-serif;
  background-color: #FAFCFF;
}

.navbar {
  position: fixed;
  background-color: #FAFCFF;
  display: flex;
  color: #B8B8B8;
  font-size: calc(13 / 390 * 100vw);
  align-items: center;
  width: 100vw;
  padding-top: calc(10 / 390 * 100vw);
  padding-bottom: calc(16 / 390 * 100vw);
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: calc(14 / 390 * 100vw);
  margin: 0 calc(20 / 390 * 100vw);

  &.current {
    color: #1FA1FF;
    font-size: calc(20 / 390 * 100vw);
    padding-bottom: calc(2 / 390 * 100vw);
    border-bottom: calc(1 / 390 * 100vw) #1FA1FF solid;
    font-weight: bold;
  }
}

.search {
  width: calc(35 / 390 * 100vw);
  height: calc(35 / 390 * 100vw);
  background-image: url('../../static/images/search-grey.png');
  background-size: 100% 100%;
  position: fixed;
  z-index: 10;
  right: calc(18 / 390 * 100vw);
  transform: translateY(calc(-4 / 390 * 100vw));
}

.top-padding {
  height: calc(58 / 390 * 100vw);
}

.post {
  background-color: #FFFFFF;
  border-top: 1px #F5F5F5 solid;
  border-bottom: 1px #F5F5F5 solid;
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
  }

  .user {
    display: flex;
    align-items: center;
    padding: calc(8 / 390 * 100vw) 0;

    .avatar {
      width: calc(21 / 390 * 100vw);
      height: calc(21 / 390 * 100vw);
      border-radius: 50%;
      background-color: #CCC;
      margin-right: calc(4 / 390 * 100vw);
    }

    .username {
      font-size: calc(8 / 390 * 100vw);
      color: #696969;
    }
  }

  .description {
    overflow: hidden;
    height: calc(34 / 390 * 100vw);
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(17 / 390 * 100vw);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    color: #1FA1FF;
    font-size: calc(10 / 390 * 100vw);
    //height: calc(18 / 390 * 100vw);
    line-height: calc(18 / 390 * 100vw);

    .tag {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      min-width: calc(28 / 390 * 100vw);
      padding: 0 calc(6 / 390 * 100vw);
      border: #1FA1FF 1px solid;
      border-radius: calc(9 / 390 * 100vw);
      margin-right: calc(8 / 390 * 100vw);
      margin-top: calc(6 / 390 * 100vw);
    }
  }
}

.image {
  width: calc(142 / 390 * 100vw);
  height: calc(93 / 390 * 100vw);
  border-radius: calc(6 / 390 * 100vw);
  margin-left: calc(16 / 390 * 100vw);
  background-size: 100% 100%;

  //text-align: center;
  //line-height: calc(93 / 390 * 100vw);
}

.lower {
  margin-top: calc(12 / 390 * 100vw);
  display: flex;
  align-items: baseline;
  color: #B8B8B8;
  font-size: calc(10 / 390 * 100vw);

  .time {
    margin-right: calc(16 / 390 * 100vw);
  }
}

</style>