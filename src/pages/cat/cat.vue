<template>
  <view v-if="!isRefreshing">
    <image
      :src="mainImgUrl"
      class="img"
      mode="widthFix"
      @click="onClickAvatar(mainImgUrl, cat.avatars)"
    />
    <view>
      <scroll-view scroll-x="true" class="scroll-view-item_H" scroll-left="120">
        <li
          v-for="(item, index) in cat.avatars"
          :key="index"
          class="img-li"
          @click="
            () => {
              (mainImgUrl = item), (imgActiveIndex = index);
            }
          "
        >
          <image
            :class="index === imgActiveIndex ? 'img_activeBorder' : ''"
            :src="item"
            style="width: 50px; height: 50px"
          />
        </li>
      </scroll-view>
    </view>
    <view class="progress-box">
      <view class="text-box1 font-weight">
        <text>{{ cat.name }}</text>
      </view>

      <view class="text-box2">
        <progress
          :percent="cat.popularity"
          :stroke-width="10"
          activeColor="#63A4F9"
          backgroundColor="#F5F5F5"
          border-radius="6px"
        />
        <text>{{ cat.popularity }}人气值</text>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute"> 年龄</view>
        <view class="content font-weight font-lg">
          {{ cat.age }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 花色</view>
        <view class="content font-weight font-lg">
          {{ cat.color }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 出没地区</view>
        <view v-for="(item, index) in areaList" :key="index">
          <view class="area-content font-weight font-lg">
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute"> 性别</view>
        <view class="content font-weight font-lg">
          {{ cat.sex }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 绝育情况</view>
        <view class="content font-weight font-lg">
          {{ Sterilized }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 是否剪耳</view>
        <view class="content font-weight font-lg">
          {{ Snipped }}
        </view>
      </view>
    </view>
    <view class="divider" />
    <view class="photo">
      <view class="row">
        <text class="maopian"> 猫片</text>
        <button class="switch" size="mini" @click="draftImage">我要上传</button>
      </view>
      <view class="dd">
        <text class="detail_info"> 撸猫指南：{{ cat.details }}</text>
        <view
          v-if="spread"
          class="spread"
          @click="
            () => {
              spread = !spread;
            }
          "
        >
          <text>点击展开</text>
          <image src="/static/images/open.png"></image>
        </view>
        <view
          v-if="!spread"
          class="spread"
          @click="
            () => {
              spread = !spread;
            }
          "
        >
          <text>点击收起</text>
          <image src="/static/images/back.png"></image>
        </view>
      </view>
      <view v-if="!spread" class="divider1" />
      <view v-if="!spread" class="end">
        <text style="font-size: 30rpx">
          {{ cat.details }}
        </text>
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
                  class="liked"
                  style="
                    background-image: url('/static/images/like_grey_1.png');
                  "
                  @click.prevent="clickLike(image.id, index)"
                >
                </view>
                <view
                  v-else
                  class="liked"
                  style="
                    background-image: url('/static/images/like_grey_0.png');
                  "
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
import { Cat } from "@/apis/schemas";
import { onClickImage, onClickAvatar } from "@/pages/cat/utils";
import { getCatDetail, getCatImage } from "@/apis/collection/collection";
import {
  ImageInfo,
  GetCatDetailReq,
  GetImageByCatReq
} from "@/apis/collection/collection-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { Pages } from "@/utils/url";
import { doLike, getUserLiked, getCount } from "@/apis/like/like";
function draftImage() {
  uni.navigateTo({
    url: `${Pages.DraftImage}?catId=${props.id}&catName=${props.name}`
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
  name: string;
}>();
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id
});
let number = 0;
let getCatImageReq = reactive<GetImageByCatReq>({
  catId: props.id,
  prevId: "",
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
  font-size: 30rpx;
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
    font-size: 40rpx;
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
      font-size: 25rpx;
      margin-bottom: 10rpx;
    }

    .content {
      text-align: center;
      color: #37393a;
      font-size: 30rpx;
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
    font-size: 35rpx;
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

  .dd {
    //text-align: center;
    margin-right: auto;
    margin-left: 20rpx;
    margin-top: 20rpx;
    width: 95%;
    color: white;
    //background: linear-gradient(90deg, #0688f3, white);
    background: #eaf6ff;
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    //padding-left: 30rpx;
    padding-top: 10rpx;
    border-radius: 20rpx 20rpx 5rpx 5rpx;
  }

  .end {
    text-align: center;
    margin-right: auto;
    margin-left: 20rpx;
    width: 95%;
    min-height: 200rpx;
    color: white;
    // background: linear-gradient(90deg, #0688f3, white);
    background: #eaf6ff;
    border-radius: 5rpx 5rpx 20rpx 20rpx;
  }

  .detail_info {
    font-size: 28rpx;
    font-weight: 400;
    width: 70%;
    margin-top: 5rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .imgs {
    margin-top: 30rpx;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    text {
      /* 11月 */

      //position: absolute;
      //width: 27rpx;
      //height: 17rpx;
      //left: 16rpx;
      margin-left: auto;
      //margin-bottom: 30rpx;

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
    .liked {
      width: 28upx;
      height: 28upx;
      background-size: 100% 100%;
      filter: brightness(200%);
      margin-right: 8upx;
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
}
.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
  margin-bottom: 100rpx;
}
</style>
