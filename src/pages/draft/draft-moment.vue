<template>
  <view class="all">
    <view class="main">
      <view class="images">
        <DraggableItem
          :images-data="imagesData"
          :photos="photos"
          :controls-size="{
            width: imageWidth,
            height: imageWidth,
            margin: imageMargin
          }"
          :container-size="{
            width: '100%',
            height:
              Math.ceil(Math.min(imagesData.length + 1, 9) / 3.0) *
                (imageWidth + imageMargin) +
              'px'
          }"
        >
          <template #content="{ image, index }">
            <image
              :src="image.url"
              class="added-image"
              @click="showImage(index)"
            />
          </template>
          <template #addImage>
            <view
              v-if="imagesData.length < 9"
              class="new-image"
              @click="addImage"
            />
          </template>
        </DraggableItem>
      </view>
      <view class="image-num"> {{ imagesData.length }}/9</view>
      <view class="m-2">
        <FuiTextArea
          v-model="title"
          text="默认按钮"
          height="50rpx"
          color="black"
          background-color="white"
          placeholder="填写标题能获得更多赞哦~"
          border-color="#1FA1FF"
          :border-top="false"
          bottom-left="20"
          bottom-right="20"
          :border-bottom="true"
        ></FuiTextArea>
      </view>

      <view class="mx-2 mt-2">
        <FuiTextArea
          v-model="text"
          text="默认按钮"
          color="black"
          maxlength="2000"
          :is-counter="true"
          :border-top="false"
          :border-bottom="false"
          placeholder="说点什么吧!"
          height="350rpx"
        ></FuiTextArea>
      </view>

      <view class="choose-cats-bar">
        <view class="choose-cats"> 选择猫咪</view>
        <view class="right-arrow" />
        <view class="choose-followed-cats"> 不选择猫咪</view>
      </view>
    </view>

    <view class="d-flex wrap">
      <view style="margin-left: calc(10 / 390 * 100vw)" @click="chooseCats">
        <view>
          <image
            :src="Icons.NewImage"
            style="width: 150rpx; height: 150rpx"
          ></image>
        </view>
        <view class="font-md text-center" style="color: #b8b8b8">
          {{ catImage ? "重新选择" : "选择猫咪" }}
        </view>
      </view>
      <view v-if="catImage">
        <image
          :src="catImage"
          mode="widthFix"
          style="width: 150rpx; border-radius: 30rpx"
          class="border mx-1"
          @click="onClickCat()"
        ></image>
        <view class="font-md text-center">{{ catName }}</view>
      </view>
    </view>

    <view class="panel">
      <button class="publish" :disabled="disablePublish" @click="publishMoment">
        发布动态
      </button>
      <view class="notice">
        发布前请先阅读
        <view class="nobody-will-read" @click="showDeal">
          《用户服务协议》
        </view>
        及
        <view class="nobody-will-read" @click="showPolicy">
          《个人信息保护政策》
        </view>
        ，一旦发布即被视为同意上述协议和政策
      </view>
    </view>
  </view>
  <deal v-if="isShow && type === 1" @click="change"></deal>
  <policy v-if="isShow && type === 2"></policy>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Prefixes, putObject } from "@/apis/cos/cos";
import { onShow, onUnload } from "@dcloudio/uni-app";

import { newMoment } from "@/apis/moment/moment";
import FuiTextArea from "@/components/third-party/fui-textarea/fui-textarea.vue";
import { Pages, Icons } from "@/utils/url";
import { StorageKeys } from "@/utils/const";
import Deal from "@/components/deal-policy/deal.vue";
import Policy from "@/components/deal-policy/policy.vue";
import { onClickImage } from "@/pages/cat/utils";
import DraggableItem from "@/components/third-party/draggable-item/draggable-item.vue";

const imagesData = reactive<any>([]);

const title = ref("");
const text = ref("");
const disablePublish = ref(false);

const photos = reactive<any>([]);

const catImage = ref("");
const catName = ref("猫猫");
const catId = ref("");

/*
$margin: calc(20 / 390 * 100vw);
$imagesWidth: calc(100vw - $margin * 2);
$imageWidth: calc(110 / 390 * 100vw);
$imageGap: calc(($imagesWidth - 3 * $imageWidth) / 2);
*/
const windowWidth = ref(uni.getSystemInfoSync().windowWidth);
const margin = ref((20.0 / 390) * windowWidth.value);
const imagesWidth = ref(windowWidth.value - margin.value * 2);
const imageWidth = ref((110.0 / 390) * windowWidth.value);
const imageMargin = ref((imagesWidth.value - 3 * imageWidth.value) / 2);

onShow(() => {
  catId.value = uni.getStorageSync("idSelected");
  catName.value = uni.getStorageSync("nameSelected");
  catImage.value = uni.getStorageSync("avatarSelected");
});

onUnload(() => {
  uni.removeStorageSync("idSelected");
  uni.removeStorageSync("nameSelected");
  uni.removeStorageSync("avatarSelected");
});

function chooseCats() {
  uni.navigateTo({
    url: Pages.ChooseCat
  });
}

const onClickCat = () => {
  catName.value = "";
  catImage.value = "";
  catName.value = "";
};

function addImage() {
  disablePublish.value = true;
  uni.chooseMedia({
    mediaType: ["image"],
    success: (chooseImageRes) => {
      let isTooManyImages = false;
      let tempFilePaths = chooseImageRes.tempFiles as Array<any>;
      if (imagesData.length + tempFilePaths.length > 9) {
        isTooManyImages = true;
        tempFilePaths = tempFilePaths.slice(0, 9 - imagesData.length);
      }
      tempFilePaths.map((item) => {
        imagesData.push({
          id: item.tempFilePath,
          url: item.tempFilePath
        });
        putObject({
          filePath: item.tempFilePath,
          prefix: Prefixes.Moment
        }).then(function (url) {
          //将返回的url添加进photos
          //注意异步添加顺序
          let index = -1;
          for (let i = 0; i < imagesData.length; i++) {
            if (imagesData[i].url === item.tempFilePath) {
              index = i;
            }
          }
          photos[index] = url.url;
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

function publishMoment() {
  if (photos.length == 0) {
    uni.showToast({
      title: "至少上传一张图片哦",
      icon: "none"
    });
    return;
  }
  newMoment({
    title: title.value,
    communityId: uni.getStorageSync(StorageKeys.CommunityId),
    text: text.value,
    photos: photos,
    catId: catId.value
  }).then(() => {
    uni.switchTab({
      url: Pages.Community,
      success() {
        uni.reLaunch({
          url: Pages.Community
        });
      }
    });
  });
}

function showImage(index: number) {
  const imageUrl = imagesData.map((item: any) => item.url);
  onClickImage(index, imageUrl);
}

// 控制协议和政策区域
const isShow = ref(false);
const type = ref(0);
function showDeal() {
  type.value = 1;
  isShow.value = !isShow.value;
}
function showPolicy() {
  type.value = 2;
  isShow.value = !isShow.value;
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
  object-fit: none;
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

.panel {
  padding: calc(33 / 390 * 100vw) calc(33 / 390 * 100vw) calc(60 / 390 * 100vw);
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
</style>
