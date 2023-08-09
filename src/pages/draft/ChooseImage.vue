<template>
  <!--  <view class="image-num">封面{{ imagesData.length }}/1</view>-->
  <!--  <view class="image-num">封面：</view>-->
  <view class="images">
    <template v-for="(image, index) in imagesData" :key="image.id">
      <image
        :src="image.url"
        class="added-image"
        mode="aspectFill"
        @click="showImage(index)"
      />
    </template>
    <view v-if="imagesData.length < 1" class="new-image" @click="addImage"
      >添加封面</view
    >
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { onClickImage } from "@/pages/cat/utils";
import { Prefixes, putObject } from "@/apis/cos/cos";
console.log("image");
const imagesData = reactive<
  {
    id: string;
    url: string;
  }[]
>([]);
const emits = defineEmits(["toggleIsUploadingImages", "changeCoverUrl"]);
function addImage() {
  uni.chooseImage({
    success: (chooseImageRes) => {
      //成功在文件中选择了图片 在这里
      emits("toggleIsUploadingImages", true);
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
          emits("changeCoverUrl", res.url);
          emits("toggleIsUploadingImages", false);
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
      emits("toggleIsUploadingImages", false);
    }
  });
}
function showImage(index: number) {
  const imageUrl = imagesData.map((item: any) => item.url);
  onClickImage(index, imageUrl);
}
</script>

<style scoped lang="scss">
$margin: calc(20 / 390 * 100vw);
$imagesWidth: calc(100vw - $margin * 2);
$imageWidth: calc(110 / 390 * 100vw);
$imageGap: calc(($imagesWidth - 3 * $imageWidth) / 2);

.images {
  display: flex;
  width: calc(100vw - $margin * 2 + $imageGap);
  //margin: $margin $margin 0;
  margin-left: 6vw;
  flex-wrap: wrap;
  height: fit-content;
}
.added-image,
.new-image {
  box-sizing: border-box;
  width: $imageWidth;
  height: $imageWidth;
  border-radius: calc(6 / 390 * 100vw);
  margin-right: $imageGap;
  //margin-bottom: $imageGap;
}

.added-image {
  background-size: cover;
  background-position: center;
}

.new-image {
  background-color: #fafafa;
  border: #d1d1d1 solid calc(1 / 390 * 100vw);
  //background-image: url("../../static/images/plus-lightgrey.png");
  //background-size: 24% 24%;
  //background-repeat: no-repeat;
  //background-position: center center;
  font-size: 4vw;
  font-weight: bold;
  color: #cfcfcf;
  line-height: $imageWidth;
  text-align: center;
}
.image-num {
  //font-size: calc(12 / 390 * 100vw);
  //color: #b8b8b8;
  font-size: 4.7vw;
  margin-left: 6vw;
  //margin-bottom: calc(20 / 390 * 100vw);
  margin-bottom: 3vw;
}
</style>
