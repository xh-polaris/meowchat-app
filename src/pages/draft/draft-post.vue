<template>
  <view class="all">
    <view class="main">
      <view class="m-2">
        <fui-button
          v-model="title"
          :border-bottom="true"
          :border-top="false"
          background-color="white"
          border-color="#1FA1FF"
          bottom-left="20"
          bottom-right="20"
          color="black"
          height="50rpx"
          placeholder="输入标题"
          text="默认按钮"
        ></fui-button>
      </view>

      <view class="mx-2 mt-2">
        <fui-button
          v-model="text"
          :border-bottom="false"
          :border-top="false"
          :is-counter="true"
          color="black"
          height="350rpx"
          placeholder="说点什么吧！内容编辑完成后，将通过2-3小时的审核时间，审核通过后即发布成功，请耐心等待"
          text="默认按钮"
        >
        </fui-button>
      </view>

      <view class="">
        <view class="images">
          <template v-for="image in imagesData" :key="image.id">
            <image :src="image.url" class="added-image" />
          </template>
          <view
            v-if="imagesData.length < 1"
            class="new-image"
            @click="addImage"
          />
        </view>
        <view class="image-num w-100">封面{{ imagesData.length }}/1</view>
      </view>
    </view>

    <!-- 添加标签 -->
    <view class="mx-4 tag-box">
      <view class="p-2">
        <robby-tags
          v-model="tags"
          :enable-add="true"
          :enable-del="true"
          :value="tags"
        ></robby-tags>
      </view>
    </view>

    <view class="panel">
      <view class="toggle-bar">
        <view class="toggle-text"> 匿名信息</view>
        <view
          :class="'toggle ' + (isAnonymous ? 'active' : '')"
          @click="toggleAnonymous"
        >
          <view class="toggle-capsule">
            <view class="toggle-circle" />
          </view>
        </view>
      </view>
      <button :disabled="disablePublish" class="publish" @click="publishPost">
        发布帖子
      </button>
      <view class="notice">
        发布前请先阅读
        <navigator class="nobody-will-read" url="">
          《用户服务协议》
        </navigator>
        及
        <navigator class="nobody-will-read" url="">
          《个人信息保护政策》
        </navigator>
        ，一旦发布即被视为同意上述协议和政策
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { newPost } from "@/apis/post/post";
import { Prefixes, putObject } from "@/apis/cos/cos";

import RobbyTags from "@/components/third-party/robby-tags/robby-tags.vue";
import FuiButton from "@/components/third-party/fui-textarea/fui-textarea.vue";
import { Pages } from "@/utils/url";
import { Tag } from "@/apis/schemas";

const imagesData = reactive<
  {
    id: string;
    url: string;
  }[]
>([]);

const isAnonymous = ref(false);

const title = ref("");
const text = ref("");
const coverUrl = ref("");
const disablePublish = ref(false);

let tags = reactive<Tag[]>([]);

watch(tags, (newValue) => {
  if (newValue.length > 3) {
    uni.showToast({
      title: "最多输入三个标签哦",
      icon: "none"
    });
    tags = newValue.slice(0, 3);
  }
});

function toggleAnonymous() {
  isAnonymous.value = !isAnonymous.value;
}

function addImage() {
  disablePublish.value = true;
  uni.chooseImage({
    success: (chooseImageRes) => {
      let isTooManyImages = false;
      let tempFilePaths = chooseImageRes.tempFilePaths as string[];
      if (imagesData.length + tempFilePaths.length > 1) {
        isTooManyImages = true;
        tempFilePaths = tempFilePaths.slice(0, 1 - imagesData.length);
      }
      tempFilePaths.map((path: string) => {
        imagesData.push({
          id: path,
          url: path
        });
        putObject({
          filePath: path,
          prefix: Prefixes.Post
        }).then(function (res) {
          coverUrl.value = res.url;
          disablePublish.value = false;
        });
      });

      if (isTooManyImages) {
        uni.showToast({
          title: "最多可上传1张图片！",
          icon: "error"
        });
      }
    },
    fail: () => {
      disablePublish.value = false;
    }
  });
}

function publishPost() {
  if (title.value === "") {
    uni.showToast({
      title: "请输入标题",
      icon: "none"
    });
    return;
  }
  if (text.value === "") {
    uni.showToast({
      title: "请输入正文",
      icon: "none"
    });
    return;
  }
  newPost({
    title: title.value,
    text: text.value,
    coverUrl: coverUrl.value,
    tags: tags,
    isAnonymous: isAnonymous.value
  }).then(() => {
    uni.switchTab({
      url: Pages.World,
      success() {
        uni.reLaunch({
          url: Pages.World
        });
      }
    });
  });
}
</script>

<style lang="scss" scoped>
$margin: calc(20 / 390 * 100vw);
$imagesWidth: calc(100vw - $margin * 2);
$imageWidth: calc(110 / 390 * 100vw);
$imageGap: calc(($imagesWidth - 3 * $imageWidth) / 2);

body {
  font-family: sans-serif;
}

.all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 48px);
}

.images {
  display: flex;
  width: calc(100vw - $margin * 2 + $imageGap);
  margin: $margin $margin 0;
  flex-wrap: wrap;
}

.added-image,
.new-image {
  box-sizing: border-box;
  width: $imageWidth;
  height: $imageWidth;
  border-radius: calc(6 / 390 * 100vw);
  margin-right: $imageGap;
  margin-bottom: $imageGap;
}

.added-image {
  background-size: cover;
  background-position: center;
}

.new-image {
  background-color: #fafafa;
  border: #d1d1d1 solid calc(1 / 390 * 100vw);
  background-image: url("../../static/images/plus-lightgrey.png");
  background-size: 24% 24%;
  background-repeat: no-repeat;
  background-position: center center;
}

.image-num {
  font-size: calc(12 / 390 * 100vw);
  color: #b8b8b8;
  margin-left: calc(32 / 390 * 100vw);
  margin-bottom: calc(20 / 390 * 100vw);
}

input,
textarea {
  background-color: #fafafa;
  border-radius: calc(10 / 390 * 100vw);
  width: calc(100vw - $margin * 2);
  margin: 0 $margin;
  padding: calc(10 / 390 * 100vw);
  color: black;
  font-size: calc(14 / 390 * 100vw);
}

input {
  margin-top: calc(20 / 390 * 100vw);
  margin-bottom: calc(10 / 390 * 100vw);
  padding: 0 calc(10 / 390 * 100vw);
  height: calc(40 / 390 * 100vw);
}

textarea {
  box-sizing: border-box;
  margin-bottom: calc(10 / 390 * 100vw);
}

textarea ::selection {
  background-color: #939393;
  color: white;
}

::placeholder {
  color: #939393;
}

.choose-cats-bar {
  display: flex;
  align-items: center;
  margin: 0 $margin calc(10 / 390 * 100vw);

  .choose-cats {
    color: #1fa1ff;
    font-size: calc(14 / 390 * 100vw);
    margin-right: calc(5 / 390 * 100vw);
  }

  .right-arrow {
    width: calc(7 / 390 * 100vw);
    height: calc(11 / 390 * 100vw);
    background-image: url("../../static/images/right-blue.png");
    margin-right: calc(16 / 390 * 100vw);
  }

  .choose-followed-cats {
    color: #b8b8b8;
    font-size: calc(12 / 390 * 100vw);
  }
}

.cat-names {
  display: flex;
  align-items: center;
  margin: 0 $margin;

  .cat-name {
    color: #939393;
    font-size: calc(14 / 390 * 100vw);
    border: #d1d1d1 calc(1 / 390 * 100vw) solid;
    line-height: calc(16 / 390 * 100vw);
    height: calc(16 / 390 * 100vw);
    border-radius: calc(8 / 390 * 100vw);
    padding: 0 calc(4 / 390 * 100vw);
    margin-right: calc(8 / 390 * 100vw);
    text-align: center;
    min-width: calc(36 / 390 * 100vw);

    &.selected {
      color: #1fa1ff;
      border: #1fa1ff calc(1 / 390 * 100vw) solid;
    }
  }
}

.panel {
  padding: calc(33 / 390 * 100vw) calc(33 / 390 * 100vw) calc(60 / 390 * 100vw);
}

.toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: calc(8 / 390 * 100vw);

  .toggle-text {
    font-size: calc(14 / 390 * 100vw);
    font-weight: bold;
  }

  .toggle {
    .toggle-capsule {
      width: calc(38 / 390 * 100vw);
      height: calc(20 / 390 * 100vw);
      border-radius: calc(19 / 390 * 100vw);
      background-color: #eeeeee;
      display: flex;
      align-items: center;
      transition-duration: 0.1s;

      .toggle-circle {
        width: calc(18 / 390 * 100vw);
        height: calc(18 / 390 * 100vw);
        margin-left: calc(1 / 390 * 100vw);
        border-radius: 50%;
        background-color: #ffffff;
        transition-duration: 0.1s;
      }
    }

    &.active {
      .toggle-capsule {
        background-color: #1fa1ff;
      }

      .toggle-circle {
        margin-left: calc(19 / 390 * 100vw);
      }
    }
  }
}

.publish {
  margin-top: calc(25 / 390 * 100vw);
  margin-bottom: calc(19 / 390 * 100vw);
  width: 100%;
  background-color: #1fa1ff;
  color: #ffffff;
  font-size: calc(16 / 390 * 100vw);
  text-align: center;
  height: calc(44 / 390 * 100vw);
  border-radius: calc(22 / 390 * 100vw);
  line-height: calc(44 / 390 * 100vw);
  transition-duration: 0.05s;
  letter-spacing: 5rpx;
}

.publish:active {
  background-color: #bae2ff;
}

.notice {
  font-size: calc(10 / 390 * 100vw);
}

.nobody-will-read {
  display: inline;
  color: #1fa1ff;
}

.tag-box {
  background-color: #f3f3f3;
  border-radius: 20rpx;
}
</style>
