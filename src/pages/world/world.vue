<template>
  <view class="navbar">
    <view :class="'navbtn '+(currentNavBtn==='推荐'?'current':'')" @click.prevent="recommend">
      推荐
    </view>|
    <view :class="'navbtn '+(currentNavBtn==='热门'?'current':'')" @click.prevent="trend">
      热门
    </view>|
    <view :class="'navbtn '+(currentNavBtn==='同城'?'current':'')" @click.prevent="local">
      同城
    </view>|
    <view :class="'navbtn '+(currentNavBtn==='关注'?'current':'')" @click.prevent="followed">
      关注
    </view>
  </view>

  <view class="top-padding" />

  <block v-for="(post) in postsData" :key="post.id">
    <view class="post">
      <view class="upper">
        <view :class="'main '+(post.hasImage?'hasImage':'')">
          <view class="title">一个长长的标题</view>
          <view class="user">
            <block v-if="!post.isAnonymous">
              <view class="avatar"></view>
              <view class="username">Username</view>
            </block>
          </view>
          <view class="description">很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容但是只显示两行而且还可能被图片给挤过来呢应该怎么办呢真的是需要好好想一想呀</view>
          <view class="tags">
            <view class="tag">长长的标签</view>
            <view class="tag">小标签</view>
            <view class="tag">标签</view>
          </view>
        </view>
        <view v-if="post.hasImage" class="image">有图片</view>

      </view>
      <view class="lower">
        <view class="time">2022-10-31</view>
        <view>23条回复</view>
      </view>

    </view>
  </block>

</template>

<script setup>

import { reactive, ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";

const currentNavBtn = ref("推荐")

function recommend() {
  console.log("推荐")
}
function trend() {
  console.log("热门")
}
function local() {
  console.log("同城")
}
function followed() {
  console.log("关注")
}

const postsData = reactive([])

function createPostsDataBatch() {
  let data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: Math.random(),
      isAnonymous: Math.random() > 0.7,
      hasImage: Math.random() > 0.3
    })
  }
  postsData.push(...data)
}

createPostsDataBatch()

onReachBottom(() => {
  createPostsDataBatch()
})

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
  font-size: calc(13/390*100vw);
  align-items: baseline;
  width: 100vw;
  padding-top: calc(10/390*100vw);
  padding-bottom: calc(16/390*100vw);
  transition-duration: 0.4s;
}
.navbtn {
  color: #939393;
  font-size: calc(14/390*100vw);
  margin: 0 calc(20/390*100vw);

  &.current {
    color: #1FA1FF;
    font-size: calc(20/390*100vw);
    padding-bottom: calc(2/390*100vw);
    border-bottom: calc(1/390*100vw) #1FA1FF solid;
    font-weight: bold;
  }
}

.top-padding {
  height: calc(58/390*100vw);
}

.post {
  background-color: #FFFFFF;
  border-top: 1px #EEEEEE solid;
  border-bottom: 1px #EEEEEE solid;
  margin-bottom: calc(6/390*100vw);
  padding: calc(16/390*100vw);
}

.upper {
  display: flex;
  align-items: center;
}

.main {
  color: #353535;

  &.hasImage {
    width: calc(251/390*100vw);
  }

  .title {
    font-size: calc(16/390*100vw);
    font-weight: bold;
  }
  .user {
    display: flex;
    align-items: center;
    padding: calc(8/390*100vw) 0;

    .avatar {
      width: calc(21/390*100vw);
      height: calc(21/390*100vw);
      border-radius: 50%;
      background-color: #CCC;
      margin-right: calc(4/390*100vw);
    }

    .username {
      font-size: calc(8/390*100vw);
      color: #696969;
    }
  }
  .description {
    overflow: hidden;
    height: calc(34/390*100vw);
    font-size: calc(12/390*100vw);
    line-height: calc(17/390*100vw);
    margin-bottom: calc(6/390*100vw);
  }
  .tags {
    display: flex;
    color: #1FA1FF;
    font-size: calc(10/390*100vw);
    height: calc(18/390*100vw);
    line-height: calc(18/390*100vw);

    .tag {
      text-align: center;
      min-width: calc(28/390*100vw);
      padding: 0 calc(6/390*100vw);
      border: #1FA1FF 1px solid;
      border-radius: calc(9/390*100vw);
      margin-right: calc(8/390*100vw);
    }
  }
}

.image {
  background-color: #BAE2FF;
  width: calc(142/390*100vw);
  height: calc(93/390*100vw);
  border-radius: calc(6/390*100vw);
  margin-left: calc(16/390*100vw);

  text-align: center;
  line-height: calc(93/390*100vw);
}

.lower {
  margin-top: calc(12/390*100vw);
  display: flex;
  align-items: baseline;
  color: #B8B8B8;
  font-size: calc(10/390*100vw);

  .time {
    margin-right: calc(16/390*100vw);
  }
}

</style>