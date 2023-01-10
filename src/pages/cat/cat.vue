<template>
  <view>
    <image :src="mainImgUrl" class="img" />
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
          <img
            :class="index === imgActiveIndex ? 'img_activeBorder' : ''"
            :src="item"
            style="width: 50px; height: 50px"
          />
        </li>
      </scroll-view>
    </view>
    <view class="progress-box">
      <view class="text-box1">
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
        <view class="content">
          {{ cat.age }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 花色</view>
        <view class="content">
          {{ cat.color }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 当前地区</view>
        <view class="area-content">
          {{ cat.area }}
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute"> 性别</view>
        <view class="content">
          {{ cat.sex }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 绝育情况</view>
        <view class="content">
          {{ Sterilized }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute"> 是否剪耳</view>
        <view class="content">
          {{ Snipped }}
        </view>
      </view>
    </view>
    <view class="divider" />
    <view class="photo">
      <text class="maopian"> 猫片</text>
      <view class="dd">
        <text class="detail_info"> 撸猫指南：{{ cat.details }} </text>
        <view
          v-if="spread"
          @click="
            () => {
              spread = !spread;
            }
          "
        >
          <text style="font-size: 25rpx">点击展开 </text>
          <image
            src="../../static/images/open.png"
            style="width: 20rpx; height: 20rpx; margin-right: 40rpx"
          ></image>
        </view>
        <view
          v-if="!spread"
          @click="
            () => {
              spread = !spread;
            }
          "
        >
          <text style="font-size: 25rpx">点击收起 </text>
          <image
            src="../../static/images/back.png"
            style="width: 20rpx; height: 20rpx; margin-right: 40rpx"
          ></image>
        </view>
      </view>
      <view v-if="!spread" class="divider1" />
      <view v-if="!spread" class="end">
        <text class="detail_info">
          {{ cat.details }}
        </text>
      </view>
      <view class="imgs">
        <text> 11月 </text>
        <view class="qz_imgs qz_imgs3 clearfix">
          <li v-for="(item, index) in imgUrlList" :key="index">
            <image :src="item" mode="aspectFill" />
          </li>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Cat } from "@/apis/schemas";
import { getCatDetail } from "@/apis/collection/collection";
import { GetCatDetailReq } from "@/apis/collection/collection-interfaces";

const props = defineProps<{
  id: string;
}>();
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id,
});
let imgUrlList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
let Sterilized: string;
let Snipped: string;
let cat = reactive<Cat>({
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
  avatars: [],
});
const mainImgUrl = ref("");
const imgActiveIndex = ref(0);
const spread = ref(true);
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
      color: #1fa1ff;
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
  // text-align: center;
  margin-top: 40rpx;

  .maopian {
    /* 猫片 */

    //position: absolute;
    width: 100rpx;
    height: 100rpx;
    left: 15rpx;
    top: 677rpx;

    font-family: "Abel";
    font-style: normal;
    font-weight: 400;
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
    border-radius: 30rpx;
  }

  .end {
    text-align: center;
    margin-right: auto;
    margin-left: 20rpx;
    width: 95%;
    height: 200rpx;
    color: white;
    // background: linear-gradient(90deg, #0688f3, white);
    background: #eaf6ff;
    border-radius: 30rpx;
  }

  .detail_info {
    font-size: 28rpx;
    font-weight: 400;
    width: 100%;
    margin-top: 5rpx;
    margin-bottom: 20rpx;
  }

  .imgs {
    margin-top: 30rpx;
    margin-left: 20rpx;

    text {
      /* 11月 */

      //position: absolute;
      //width: 27rpx;
      //height: 17rpx;
      //left: 16rpx;
      margin-left: auto;
      //margin-bottom: 30rpx;

      font-family: "Inter";
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
</style>
