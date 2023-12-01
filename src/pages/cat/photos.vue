<template>
  <view class="photo">
    <view class="row">
      <text class="maopian"> 猫片</text>
      <button class="switch" size="mini" @click="draftImage">我要上传</button>
    </view>
    <view class="imgs">
      <view class="qz_imgs qz_imgs3 clearfix">
        <li v-for="(image, index) in imgUrlList" :key="index">
          <image
            :src="image.url"
            class="cat-image"
            mode="aspectFill"
            @click="onClickImage(index, imgUrls)"
          >
            <view class="shadow" />
            <view class="liked-info">
              <view
                v-if="image.isLiked"
                class="like liked"
                @click.prevent="clickLike(image.id, index)"
              >
              </view>
              <view
                v-else
                class="like"
                @click.prevent="clickLike(image.id, index)"
              >
              </view>
              <span
                class="liked_number"
                @click.prevent="clickLike(image.id, index)"
                >{{ image.likeNumber || 0 }}</span
              >
            </view>
          </image>
        </li>
      </view>
    </view>
    <view v-if="noMore">
      <view class="nomore"> 没有更多喵~</view>
    </view>
    <view style="width: 100%; height: 25rpx"></view>
  </view>
</template>

<script lang="ts" setup>
import { Pages } from "@/utils/url";
import { computed, reactive, ref } from "vue";
import {
  GetImageByCatReq,
  ImageInfo
} from "@/apis/collection/collection-interfaces";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import { onClickImage } from "@/pages/cat/utils";
import { Cat, TargetType } from "@/apis/schemas";
import { getCatImage } from "@/apis/collection/collection";
import { onReachBottom } from "@dcloudio/uni-app";

const props = defineProps<{
  id: string;
  cat: Cat;
}>();
let imgUrlList = reactive<ImageInfo[]>([]);
const imgUrls = computed(() => {
  const tmp = <string[]>[];
  for (const img of imgUrlList) {
    tmp.push(img.url);
  }
  return tmp;
});
let noMore = ref<boolean>(false);

function clickLike(id: string, index: number) {
  if (imgUrlList[index].isLiked) {
    imgUrlList[index].isLiked = false;
    imgUrlList[index].likeNumber--;
    if (imgUrlList[index].likeNumber < 0) imgUrlList[index].likeNumber = 0;
  } else {
    imgUrlList[index].isLiked = true;
    imgUrlList[index].likeNumber++;
  }
  doLike({ targetId: id, targetType: TargetType.Cat_Photo });
}

function draftImage() {
  uni.navigateTo({
    url: `${Pages.DraftImage}?catId=${props.id}&catName=${props.cat.name}`
  });
}

let getCatImageReq = reactive<GetImageByCatReq>({
  catId: props.id,
  limit: 6
});

let number = 0;

const getCatImageHandler = () => {
  if (!noMore.value)
    getCatImage(getCatImageReq).then((res) => {
      for (let i = 0; i < res.images?.length; i++) {
        let imageUrl = reactive<ImageInfo>({
          id: res.images[i].id,
          url: res.images[i].url,
          catId: res.images[i].catId,
          isLiked: false,
          likeNumber: 0
        });
        getUserLiked({ targetId: res.images[i].id, targetType: 5 }).then(
          (res) => {
            imageUrl.isLiked = res.liked;
          }
        );
        getCount({ targetId: res.images[i].id, targetType: 5 }).then((res) => {
          imageUrl.likeNumber = res.count;
        });
        imgUrlList.push(imageUrl);
      }
      //获取得到的images的长度用以判断是否还有尚未加载的照片
      number += res.images?.length;
      if (!number || imgUrlList[number - 1].id === getCatImageReq.prevId) {
        noMore.value = true;
      } else getCatImageReq.prevId = imgUrlList[number - 1].id;
    });
};
getCatImageHandler();
//换成按钮吧
onReachBottom(() => {
  getCatImageHandler();
});
</script>

<style lang="scss" scoped>
@import "@/common/icon.scss";

.photo {
  margin-top: 40rpx;

  .maopian {
    /* 猫片 */
    //position: absolute;
    //width: 100rpx;
    //height: 100rpx;
    //left: 20rpx;
    //top: 677rpx;

    font-family: "Abel", serif;
    font-style: normal;
    font-size: 40rpx;
    font-weight: bold;
    line-height: 41rpx;
    margin-left: 20rpx;
    /* identical to box height, or 205% */
    letter-spacing: 0.374rpx;

    color: #000000;
  }

  text {
    color: #212223;
    font-size: 50rpx;
    margin-left: 20rpx;
  }

  .imgs {
    margin-top: 30rpx;
    margin-left: 20rpx;
    margin-bottom: 30rpx;

    text {
      /* 11月 */
      margin-left: auto;
      font-family: "Inter", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 80rpx;
      /* identical to box height */
      letter-spacing: -0.3rpx;

      /* darkgrey02 */
      color: #353535;
    }

    .qz_imgs {
      position: relative;
      display: flex;
      overflow: hidden;
      //justify-content: space-between;
      flex-wrap: wrap;

      &.qz_imgs3 {
        image {
          width: 225rpx;
          height: 225rpx;
          object-fit: cover;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }
    }
  }
}

.cat-image {
  position: relative;

  .shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80upx;
    width: 100%;
    background: linear-gradient(#22222200, #222222aa);
  }

  .liked-info {
    position: absolute;
    bottom: 12upx;
    right: 12upx;
    display: flex;
    align-items: center;

    .like {
      width: 28upx;
      height: 28upx;
      background-size: 100% 100%;
      margin-right: 8upx;
      background-image: $like-grey-border-url;

      &.liked {
        background-image: $like-blue-url;
      }
    }

    .liked_number {
      font-size: 28upx;
      color: #eeeeee;
    }
  }
}

.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
  margin-bottom: 100rpx;
}

.switch {
  border-radius: 20px;
  margin-top: -10rpx;
  margin-left: auto;
  margin-right: 20rpx;
  color: #1fa1ff;
  font-size: 23rpx;
  background: white;
  border: solid #1fa1ff 1px;
  letter-spacing: 2rpx;
}
</style>
