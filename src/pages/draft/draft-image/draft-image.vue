<template>
  <view class="all">
    <view class="main">
      <view class="images">
        <template v-for="image in imagesData" :key="image.id">
          <view
            :style="{ backgroundImage: 'url(' + image.url + ')' }"
            class="added-image"
          />
        </template>
        <view
          v-if="imagesData.length < 9"
          class="new-image"
          @click="addImage"
        />
      </view>
      <view class="image-num"> {{ imagesData.length }}/9</view>
      <view class="m-2"> </view>
    </view>

    <view class="panel">
      <view class="choose-cats-bar">
        <view class="choose-cats"> 照片将上传至猫咪：{{ props.catName }}</view>
      </view>
      <view class="images1">
        <template v-for="image in imagesData" :key="image.id">
          <view
            :style="{ backgroundImage: 'url(' + image.url + ')' }"
            class="added-cats"
          />
        </template>
      </view>
      <button class="publish" :disabled="disablePublish" @click="createImage">
        上传至照片墙
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
import { reactive, ref } from "vue";
import { putObject } from "@/apis/cos/cos";
import { CatImage } from "@/apis/collection/collection-interfaces";
import { CreateImage } from "@/apis/collection/collection";
import { Pages } from "@/utils/url";
const props = defineProps<{
  catId: string;
  catName: string;
}>();
const imagesData = reactive<any>([]);

const disablePublish = ref(false);

const photos = reactive<any>([]);

function addImage() {
  disablePublish.value = true;
  uni.chooseImage({
    success: (chooseImageRes) => {
      let isTooManyImages = false;
      let tempFilePaths = chooseImageRes.tempFilePaths as string[];
      if (imagesData.length + tempFilePaths.length > 9) {
        isTooManyImages = true;
        tempFilePaths = tempFilePaths.slice(0, 9 - imagesData.length);
      }
      tempFilePaths.map((path) => {
        imagesData.push({
          id: path,
          url: path
        });
        putObject({
          filePath: path
        }).then(function (url) {
          const catImage = reactive<CatImage>({
            catId: props.catId,
            url: url.url
          });
          photos.push(catImage);
          //将返回的信息添加进photos
          disablePublish.value = false;
        });
      });
      if (isTooManyImages) {
        uni.showToast({
          title: "最多可上传9张图片！",
          icon: "error"
        });
      }
    },
    fail: () => {
      disablePublish.value = false;
    }
  });
}
function createImage() {
  CreateImage({
    images: photos
  }).then(() => {
    uni.switchTab({
      url: Pages.Collection,
      success() {
        uni.reLaunch({
          url: Pages.Collection
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
$halfImageWidth: calc(55 / 390 * 100vw);
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
.images1 {
  display: flex;
  width: calc(100vw - $margin * 2 + $imageGap);
  margin: $margin -20rpx 0;
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
.added-cats,
.cat-thumbnail {
  box-sizing: border-box;
  width: $halfImageWidth;
  height: $halfImageWidth;
  border-radius: calc(6 / 390 * 100vw);
  margin-right: $imageGap;
}

.added-image {
  background-size: cover;
  background-position: center;
}
.added-cats {
  background-size: cover;
  background-position: center;
}

.new-image {
  background-color: #fafafa;
  border: #d1d1d1 solid calc(1 / 390 * 100vw);
  background-image: url("../../../static/images/plus-lightgrey.png");
  background-size: 24% 24%;
  background-repeat: no-repeat;
  background-position: center center;
}
.cat-thumbnail {
  background-color: #fafafa;
  border: #d1d1d1 solid calc(1 / 390 * 100vw);
  background-image: url("../../../static/images/plus-lightgrey.png");
  background-size: 24% 24%;
  background-repeat: no-repeat;
  background-position: center center;
}
.choose-text {
  font-size: 20rpx;
  color: #939393;
}

.image-num {
  font-size: calc(12 / 390 * 100vw);
  color: #b8b8b8;
  margin-left: calc(32 / 390 * 100vw);
  margin-bottom: calc(20 / 390 * 100vw);
}

textarea {
  background-color: #fafafa;
  border-radius: calc(10 / 390 * 100vw);
  width: calc(100vw - $margin * 2);
  padding: calc(10 / 390 * 100vw);
  color: black;
  margin: 0 $margin calc(28 / 390 * 100vw);
  font-size: calc(14 / 390 * 100vw);
  box-sizing: border-box;
}

::placeholder {
  color: #939393;
}

textarea ::selection {
  background-color: #939393;
  color: white;
}

.choose-cats-bar {
  display: flex;
  align-items: center;
  margin: 0 $margin calc(10 / 390 * 100vw);

  .choose-cats {
    color: #939393;
    font-size: calc(14 / 390 * 100vw);
    margin-left: -50rpx;
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
</style>
