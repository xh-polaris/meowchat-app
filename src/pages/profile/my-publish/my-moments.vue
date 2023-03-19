<template>
  <view class="masonry">
    <view
      v-for="i in 2"
      :key="i"
      :class="i === 1 ? 'column-left' : 'column-right'"
    >
      <template
        v-for="moment in i === 1 ? leftMoments : rightMoments"
        :key="moment.id"
      >
        <view class="tile" @click="onClickMoment(moment.id)">
          <view class="img-frame">
            <image
              v-if="i === 1"
              :src="moment.photos[0]"
              class="img"
              mode="widthFix"
              @load.once="onLoadLeft"
            />
            <image
              v-else
              :src="moment.photos[0]"
              class="img"
              mode="widthFix"
              @load.once="onLoadRight"
            />
          </view>

          <view class="tile-info">
            <view class="info">
              <view class="title">{{ moment.title }}</view>
              <view class="delete" @click.stop="onClickDelete(moment.id)">
                <image class="deletepic" src="/static/images/delete.png" />
              </view>
            </view>
            <view class="other-info">
              <view class="user-info">
                <image :src="moment.user.avatarUrl" class="avatar" />
                <view class="username font-md">
                  {{ moment.user.nickname }}
                </view>
              </view>
              <view class="time font-sm">
                {{ displayTime(moment.createAt) }}
              </view>
            </view>
            <view class="other-info">
              <view class="font-sm"
                >{{ moment.likedNumber }}位喵友觉得很赞</view
              >
              <view class="comment font-sm">{{ moment.comments }}条回复</view>
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
  <view v-if="isNoData">
    <image src="https://static.xhpolaris.com/nodata.png" />
  </view>
  <view v-else class="blue-background" />
  <view class="nomore">没有更多喵~</view>
  <view style="width: 100%; height: 40rpx"></view>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import { getOwnMomentPreviews, deleteMoment } from "@/apis/moment/moment";
import { DeleteMomentReq } from "@/apis/moment/moment-components";
import { MomentData } from "@/apis/schemas";
import { onReachBottom } from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";
import { onClickMoment } from "./utils";
import { getCount } from "@/apis/like/like";
import { getComments } from "@/apis/comment/comment";

const deleteID = reactive<DeleteMomentReq>({ momentId: "" });
const isNoData = ref(true);

let momentsInBatch: MomentData[];
const leftMoments = reactive<MomentData[]>([]);
const rightMoments = reactive<MomentData[]>([]);

let leftHeight = 0;
let rightHeight = 0;
const isLeftTallerThanRight = () => {
  return leftHeight > rightHeight;
};

let indexInBatch = 0;
let batchLength: number;
let batchFirstPartLength: number;
const batchSecondPartDefaultLength = 4;

let isNoMoreMoments = false;
let loadedAmount = 0;
let isBatchLoading = false;
let page = 0; //每往下翻页一次page加1直到没有内容
const instance = getCurrentInstance();
const query = uni.createSelectorQuery().in(instance);
let imgWidth = 160;
let isFirstLoadImg = true;

onReachBottom(() => {
  if (!isBatchLoading && !isNoMoreMoments) {
    isBatchLoading = true;
    addBatch();
  }
});

const onLoad = () => {
  loadedAmount += 1;
  // 加完上一步后，表示已经加载好了这一batch中多少moment的图片
  // 所以对于没有firstPart而直接开始onLoad的，要预先讲loadedAmount设为-1，才能使得这里加完是0
  if (loadedAmount >= batchFirstPartLength) {
    if (loadedAmount < batchLength) {
      addTile(indexInBatch, "either");
      indexInBatch += 1;
    } else {
      loadedAmount = 0;
      indexInBatch = 0;
      isBatchLoading = false;
    }
  }
};

const addTile = (tileIndex: number, side: string) => {
  const tile = momentsInBatch[tileIndex];
  if (side === "left") {
    leftMoments.push(tile);
  } else if (side === "right") {
    rightMoments.push(tile);
  } else if (side === "either") {
    if (isLeftTallerThanRight()) {
      rightMoments.push(tile);
    } else {
      leftMoments.push(tile);
    }
  }
};

const addBatch = async () => {
  momentsInBatch = [];
  let moments = (
    await getOwnMomentPreviews({
      page: page,
      communityId: uni.getStorageSync("communityId")
    })
  ).moments;
  page += 1;
  for (let i = 0; i < moments.length; i++) {
    let momentData = reactive<MomentData>({
      id: moments[i].id,
      createAt: moments[i].createAt,
      title: moments[i].title,
      catId: moments[i].catId,
      communityId: moments[i].communityId,
      text: moments[i].text,
      user: moments[i].user,
      photos: moments[i].photos,
      likedNumber: 0,
      comments: 0
    });
    getCount({ targetId: moments[i].id, targetType: 4 }).then((res) => {
      momentData.likedNumber = res.count;
    });
    getComments({ scope: "moment", page: 0, id: moments[i].id }).then((res) => {
      momentData.comments += res.total;
      for (let i = 0; i < res.comments.length; i++) {
        momentData.comments += res.comments[i].comments;
      }
    });
    momentsInBatch.push(momentData);
  }
  if (momentsInBatch.length > 0) {
    isNoData.value = false;
    batchLength = momentsInBatch.length;
    if (batchSecondPartDefaultLength < batchLength) {
      batchFirstPartLength = batchLength - batchSecondPartDefaultLength;
      // batchSecondPartLength = batchSecondPartDefaultLength;
      if (batchFirstPartLength % 2 !== 0) {
        batchFirstPartLength -= 1;
        // batchSecondPartLength += 1;
      }
      if (batchFirstPartLength > 0) {
        for (let i = 0; i < batchFirstPartLength / 2; i++) {
          addTile(indexInBatch, "left");
          indexInBatch += 1;
          addTile(indexInBatch, "right");
          indexInBatch += 1;
        }
      } else {
        loadedAmount = -1;
        onLoad();
      }
    } else {
      batchFirstPartLength = 0;
      // batchSecondPartLength = batchLength;
      loadedAmount = -1;
      onLoad();
    }
  } else {
    isNoMoreMoments = true;
    isBatchLoading = false;
  }
};
const onLoadLeft = (ev: Event) => {
  const target = ev.target as HTMLImageElement;
  if (isFirstLoadImg) {
    isFirstLoadImg = false;
    query.select(".img").boundingClientRect();
    query.exec((res: any) => {
      if (res.length != 0) {
        imgWidth = res[0].width;
      }
    });
  }

  let height = (target.height / target.width) * imgWidth;
  leftHeight = target.offsetTop + height;
  onLoad();
};
const onLoadRight = (ev: Event) => {
  const target = ev.target as HTMLImageElement;
  if (isFirstLoadImg) {
    isFirstLoadImg = false;
    query.select(".img").boundingClientRect();
    query.exec((res: any) => {
      if (res.length != 0) {
        imgWidth = res[0].width;
      }
    });
  }

  let height = (target.height / target.width) * imgWidth;
  rightHeight = target.offsetTop + height;
  onLoad();
};

onBeforeMount(() => {
  isBatchLoading = true;
  addBatch();
});

async function onClickDelete(id: string) {
  deleteID.momentId = id;
  uni.showModal({
    title: "确认删除",
    content: "是否删除该动态",
    success: function (res) {
      if (res.confirm) {
        deleteMoment(deleteID).then((res) => {
          uni.showToast({
            title: res.msg
          });
        });
        uni.reLaunch({
          url: "/pages/profile/my-publish/my-publish?id=${userInfo.id}"
        });
      }
    }
  });
}
</script>

<style lang="scss" scoped>
$sideMargin: calc(12 / 390 * 100vw);
$horizontalGap: calc(8 / 390 * 100vw);
$verticalGap: calc(10 / 390 * 100vw);

$radius: calc(6 / 390 * 100vw);
$titleFontSize: calc(12 / 390 * 100vw);
$smallFontSize: calc(8 / 390 * 100vw);
$avatarWidth: calc(21 / 390 * 100vw);

@import "@/common/user-info.scss";

.masonry {
  background-color: #fafcff;
  display: flex;
}

.column-left {
  width: calc(50vw - $sideMargin - $horizontalGap / 2);
  margin-left: $sideMargin;
  margin-right: calc($horizontalGap / 2);
  height: fit-content;
}

.column-right {
  width: calc(50vw - $sideMargin - $horizontalGap / 2);
  margin-left: calc($horizontalGap / 2);
  margin-right: $sideMargin;
  height: fit-content;
}

.tile {
  margin-bottom: calc($verticalGap - 2px);
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.25);
  border-radius: $radius;
  font-family: sans-serif;

  .img-frame {
    max-height: calc((50vw - $sideMargin - $horizontalGap / 2) * 1.8);
    overflow: hidden;

    .img {
      width: calc(50vw - $sideMargin - $horizontalGap / 2);
      display: block;
      border-radius: $radius $radius 0 0;
      height: 1px;
    }
  }

  .tile-info {
    transform: translateY(-2px);
    background-color: #ffffff;
    border-radius: 0 0 $radius $radius;
    font-size: $smallFontSize;
    color: #696969;
    font-weight: 500;
    padding: calc(4 / 390 * 100vw) calc(12 / 390 * 100vw) calc(6 / 390 * 100vw);
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 30rpx;
        color: #000000;
        line-height: calc ($titleFontSize * 1.5);
        margin-top: calc(5 / 390 * 100vw);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .delete {
        display: flex;
        align-items: center;
        .deletepic {
          height: 20rpx;
          width: 20rpx;
          margin-top: 15rpx;
          margin-left: 50rpx;
          margin-right: 10rpx;
          float: left;
        }
      }
    }
    .other-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #b8b8b8;
      .time {
        font-size: calc(6 / 390 * 150vw);
        color: #939393;
      }
    }
  }
}

.username {
  max-width: calc(60 / 390 * 100vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.get-dom {
  width: 1px;
  height: 1px;
}

.blue-background {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}
.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
}
</style>
