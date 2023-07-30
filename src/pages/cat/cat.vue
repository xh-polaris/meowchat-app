<template>
  <view v-if="!isRefreshing">
    <image
      :src="mainImgUrl"
      class="img"
      mode="widthFix"
      @click="onClickAvatar(mainImgUrl, cat.avatars)"
    />
    <view>
      <text>{{ cat.name }}</text>
    </view>
    <meta-info :cat="cat" />
    <guide :cat="cat" />
    <story :cat="cat" />

    <view class="info">
      <view class="combination">
        <view class="attribute"> 年龄</view>
        <view class="content font-weight font-big">
          {{ cat.age }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 花色</view>
        <view class="content font-weight font-big">
          {{ cat.color }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 出没地区</view>
        <view v-for="(item, index) in areaList" :key="index">
          <view class="area-content font-weight font-big">
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute"> 性别</view>
        <view class="content font-weight font-big">
          {{ cat.sex }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 绝育情况</view>
        <view class="content font-weight font-big">
          {{ Sterilized }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 是否剪耳</view>
        <view class="content font-weight font-big">
          {{ Snipped }}
        </view>
      </view>
    </view>
    <view class="dd">
      <image :src="Icons.Guide" class="guide"></image>
      <!--      <view class="brief">-->
      <!--        <view class="text"> 胆小怕生，不喜欢摸头 </view>-->
      <!--      </view>-->
      <view class="detail"> {{ cat.details }} </view>
    </view>
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
              mode="aspectFill"
              class="cat-image"
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
                  @click.prevent="ClickLike(image.id, index)"
                  >{{ image.likeNumber }}</span
                >
              </view>
            </image>
          </li>
        </view>
      </view>
      <view v-if="noMore">
        <view class="nomore"> 没有更多喵~ </view>
      </view>
      <view style="width: 100%; height: 25rpx"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

import Guide from "@/pages/cat/guide.vue";
import Story from "@/pages/cat/story.vue";
import MetaInfo from "@/pages/cat/meta-info.vue";
import { Cat } from "@/apis/schemas";
import { onClickImage, onClickAvatar } from "@/pages/cat/utils";
import { getCatDetail, getCatImage } from "@/apis/collection/collection";
import {
  ImageInfo,
  GetCatDetailReq,
  GetImageByCatReq
} from "@/apis/collection/collection-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { Icons, Pages } from "@/utils/url";
import { doLike, getUserLiked, getCount } from "@/apis/like/like";
function draftImage() {
  uni.navigateTo({
    url: `${Pages.DraftImage}?catId=${props.id}&catName=${cat.name}`
  });
}

function clickLike(id: string, index: number) {
  if (imgUrlList[index].isLiked) {
    imgUrlList[index].isLiked = false;
    imgUrlList[index].likeNumber--;
    if (imgUrlList[index].likeNumber < 0) imgUrlList[index].likeNumber = 0;
  } else {
    imgUrlList[index].isLiked = true;
    imgUrlList[index].likeNumber++;
  }
  doLike({ targetId: id, targetType: 5 });
}
const isRefreshing = ref(false);
const props = defineProps<{
  id: string;
}>();
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id
});
let number = 0;
let getCatImageReq = reactive<GetImageByCatReq>({
  catId: props.id,
  limit: 6
});
let imgUrlList = reactive<ImageInfo[]>([]);
const imgUrls = computed(() => {
  const tmp = <string[]>[];
  for (const img of imgUrlList) {
    tmp.push(img.url);
  }
  return tmp;
});
let Sterilized: string;
let Snipped: string;
let noMore = ref<boolean>(false);
const cat = reactive<Cat>({
  id: "",
  createAt: 0,
  age: "",
  communityId: "",
  color: "",
  details: "",
  name: "",
  popularity: 0,
  sex: "",
  status: 0,
  area: "",
  isSnipped: true,
  isSterilized: true,
  avatars: []
});

const mainImgUrl = ref("");
const imgActiveIndex = ref(0);
const spread = ref(true);
let areaList = reactive<string[]>([]);
const getCatDetailHandler = () => {
  getCatDetail(getCatDetailReq).then((res) => {
    cat.id = res.cat.id;
    cat.createAt = res.cat.createAt;
    cat.age = res.cat.age;
    cat.communityId = res.cat.communityId;
    cat.color = res.cat.color;
    cat.details = res.cat.details;
    cat.name = res.cat.name;
    cat.popularity = res.cat.popularity;
    cat.sex = res.cat.sex;
    cat.status = res.cat.status;
    cat.area = res.cat.area;
    let list = cat.area.split(",");
    areaList = [];
    for (let i of list) {
      areaList.push(i);
    }
    cat.isSnipped = res.cat.isSnipped;
    cat.isSterilized = res.cat.isSterilized;
    cat.avatars = res.cat.avatars;
    if (res.cat.isSterilized) {
      Sterilized = "是";
    } else {
      Sterilized = "否";
    }
    if (res.cat.isSnipped) {
      Snipped = "是";
    } else {
      Snipped = "否";
    }
    mainImgUrl.value = cat.avatars[0];
    isRefreshing.value = false;
  });
};
getCatDetailHandler();

const getCatImageHandler = () => {
  if (!noMore.value)
    getCatImage(getCatImageReq).then((res) => {
      for (let i = 0; i < res.images.length; i++) {
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
      let arr = Object.keys(res.images);
      //获取得到的images的长度用以判断是否还有尚未加载的照片
      number += arr.length;
      if (number === 0 || imgUrlList[number - 1].id === getCatImageReq.prevId) {
        noMore.value = true;
      } else getCatImageReq.prevId = imgUrlList[number - 1].id;
    });
};
getCatImageHandler();
function pageRefresh() {
  isRefreshing.value = true;
  getCatDetailHandler();
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

onReachBottom(() => {
  getCatImageHandler();
});
</script>

<style lang="scss" scoped>
@import "@/common/icon.scss";
.scroll-view-item_H {
  display: inline-block;
  width: 330rpx;
  height: 150rpx;
  line-height: 100rpx;
  white-space: nowrap;
  margin-left: 300rpx;
}

.img-ul {
  position: relative;
  display: flex;
  left: 300rpx;
  width: 360rpx;
  height: 300rpx;
  overflow: hidden;
  list-style: none;
}

.img-li {
  //float: left;
  margin: 0 20rpx;
  cursor: pointer;
  display: inline-block;
}

.img_activeBorder {
  padding: 5rpx 5rpx 5rpx 5rpx;
  border: 5rpx solid #a4a9ab;
}

.img {
  width: 100%;
}

.area-content {
  text-align: center;
  font-size: 35rpx;
}

.selector {
  display: flex;
  padding-left: 300rpx;

  image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
  }
}

.progress-box {
  //border-radius: 10rpx !important;
  margin-top: 20rpx;
  width: 300rpx;
  //text-align: center;
  margin-left: auto;
  margin-right: auto;

  .text-box1 {
    //display: inline-block;
    text-align: center;
    color: #37393a;
    font-size: 48rpx;
  }

  .text-box2 {
    //display: inline-block;
    text-align: center;
    color: #a4a9ab;
    font-size: 20rpx;
  }

  progress {
    margin-top: 20rpx;
    border-radius: 6px !important;
    background: linear-gradient(to right, #cce9db, #a40707);
  }
}

.info {
  display: flex;
  margin-top: 40rpx;

  .combination {
    width: 250rpx;
    margin-left: auto;
    margin-right: auto;

    .attribute {
      text-align: center;
      color: #6fc2ff;
      font-size: 27rpx;
      margin-bottom: 10rpx;
    }

    .content {
      text-align: center;
      color: #37393a;
      font-size: 35rpx;
    }
  }
}

.divider {
  background: #e0e3da;
  width: 100%;
  height: 10rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}

.divider1 {
  width: 100%;
  height: 1rpx;
  border: 1rpx solid #ffffff;
}

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

// 撸猫指南样式
.dd {
  margin: 100rpx 20rpx 80rpx 20rpx;
  width: 95%;
  color: #000000;
  background: #f8f8f8;
  display: grid;
  justify-content: space-between;
  padding-top: 10rpx;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.09);
}
.guide {
  margin: 20rpx 20rpx 20rpx 10rpx;
  width: 250rpx;
  height: 70rpx;
}

.brief {
  position: relative;
  width: 70%;
  margin-top: 10rpx;
  margin-bottom: 20rpx;
  margin-left: 40rpx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 100;
}
.text {
  display: inline-block;
  position: relative;
  font-size: 33rpx;
  height: 50rpx;
  z-index: 100;
}
.text::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 2rpx; /* 调整倾斜矩形的位置 */
  left: 20rpx;
  width: 100%;
  height: 15rpx; /* 调整倾斜矩形的高度 */
  background: rgba(31, 161, 255, 0.67);
  transform: skew(30deg, 0);
  z-index: -1;
}

.title {
  font-size: 40rpx;
  font-weight: 400;
  width: 70%;
  margin-top: 10rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail {
  margin: 5rpx 20rpx 20rpx 10rpx;
  border-radius: 5rpx 5rpx 20rpx 20rpx;
  padding: 10rpx 0 20rpx 20rpx;
  line-height: 40rpx;
  font-size: 25rpx;
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

.spread {
  text {
    font-size: 25rpx;
  }

  image {
    width: 20rpx;
    height: 20rpx;
    margin-right: 40rpx;
  }
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
.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
  margin-bottom: 100rpx;
}
</style>
