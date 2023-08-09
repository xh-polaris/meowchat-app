<template>
  <view class="images">
    <DraggableItem
      :container-size="{
        width: '100%',
        height:
          Math.ceil(Math.min(imagesData.length + 1, 30) / 3.0) *
            (imageWidth + imageMargin) +
          'px'
      }"
      :controls-size="{
        width: imageWidth,
        height: imageWidth,
        margin: imageMargin
      }"
      :images-data="imagesData"
      :photos="photos"
    >
      <template #content="{ image, index }">
        <div style="position: relative">
          <image
            :src="image.url"
            class="added-image"
            mode="aspectFill"
            @click="showImage(index)"
          />
          <div class="delete-image" @click="deleteImage(index)" />
        </div>
      </template>
      <template #addImage>
        <view
          v-if="imagesData.length < 30"
          class="new-image"
          @click="addImage"
        />
      </template>
    </DraggableItem>
  </view>
</template>

<script setup lang="ts">
import DraggableItem from "@/components/third-party/draggable-item/draggable-item.vue";
import { reactive, ref } from "vue";
import { Prefixes, putObject } from "@/apis/cos/cos";
import { onClickImage } from "@/pages/cat/utils";
const photos = reactive<any>([]);
const imagesData = reactive<any>([]);
const windowWidth = ref(uni.getSystemInfoSync().windowWidth);
// const margin = ref((20.0 / 390) * windowWidth.value);
// 88 28-2-28-2-28
const imagesWidth = ref(windowWidth.value * 0.84);
const imageWidth = ref(windowWidth.value * 0.28);
const imageMargin = ref(windowWidth.value * 0.02);
// const imagesWidth = ref(windowWidth.value - margin.value * 2);
// const imageWidth = ref((110.0 / 390) * windowWidth.value);
// const imageMargin = ref((imagesWidth.value - 3 * imageWidth.value) / 2);
const emits = defineEmits(["toggleIsUploadingImages", "changePhotos"]);
function showImage(index: number) {
  const imageUrl = imagesData.map((item: any) => item.url);
  onClickImage(index, imageUrl);
}
function addImage() {
  //点击+ 选择文件的时候 就到这里

  uni.chooseMedia({
    mediaType: ["image"],
    success: (chooseImageRes) => {
      //成功在文件中选择了图片 在这里
      emits("toggleIsUploadingImages", true);
      let isTooManyImages = false;
      let tempFilePaths = chooseImageRes.tempFiles as Array<any>;
      if (imagesData.length + tempFilePaths.length > 30) {
        isTooManyImages = true;
        tempFilePaths = tempFilePaths.slice(0, 30 - imagesData.length);
      }
      const promises = tempFilePaths.map((item) => {
        imagesData.push({
          id: item.tempFilePath,
          url: item.tempFilePath
        });
        return putObject({
          filePath: item.tempFilePath,
          prefix: Prefixes.Moment
        });
      });
      Promise.all(promises)
        .then((urls) => {
          urls.forEach((url: any, index: number) => {
            //将返回的url添加进photos
            //注意异步添加顺序，urls顺序和tempFilePaths相同
            let changeIndex = -1;
            for (let i = 0; i < imagesData.length; i++) {
              if (imagesData[i].url === tempFilePaths[index].tempFilePath) {
                changeIndex = i;
              }
            }
            photos[changeIndex] = url.url;
          });
        })
        .finally(() => {
          //图片成功在后端上传了 在这里
          // console.log([...photos]);
          emits("changePhotos", [...photos]);
          emits("toggleIsUploadingImages", false);
        });
      if (isTooManyImages) {
        uni.showToast({
          title: "最多可上传30张图片！",
          icon: "error"
        });
      }
    },
    fail: () => {
      emits("toggleIsUploadingImages", false);
    }
  });
}

function deleteImage(index: number) {
  imagesData.splice(index, 1);
  photos.splice(index, 1);
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
  margin: 0 6vw;
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
  background-image: url("/static/images/plus-lightgrey.png");
  background-size: 24% 24%;
  background-repeat: no-repeat;
  background-position: center center;
}
.delete-image {
  background-color: white;
  background-image: url("/static/images/x-black.png");
  background-size: calc($imageWidth / 10) calc($imageWidth / 10);
  background-repeat: no-repeat;
  background-position: center;
  //filter: invert(100%);
  position: absolute;
  border-radius: 50%;
  top: calc($imageWidth / 25);
  right: calc($imageGap + $imageWidth / 25);
  width: calc($imageWidth / 5);
  height: calc($imageWidth / 5);
  opacity: 0.9;
}
</style>
