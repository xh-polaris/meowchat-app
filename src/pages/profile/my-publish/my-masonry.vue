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
              <view v-if="moment.user.id === myUserId && myUserId">
                <view class="delete" @click.stop="onClickDelete(moment.id)">
                  <image class="deletepic" src="/static/images/delete.png" />
                </view>
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
              <view v-if="moment.likedNumber" class="font-sm"
                >{{ moment.likedNumber }}位喵友觉得很赞
              </view>
              <view v-if="moment.comments" class="comment font-sm"
                >{{ moment.comments }}条回复</view
              >
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
  <view style="width: 100%; height: 40rpx"></view>
  <view class="nomore">
    <image
      src="/static/images/nomore.png"
      style="width: 200rpx; height: 186rpx"
    />
  </view>
  <view style="width: 100%; height: 200rpx"></view>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import {
  deleteMoment,
  getMomentDetail,
  getMomentPreviews
} from "@/apis/moment/moment";
import { DeleteMomentReq } from "@/apis/moment/moment-components";
import { Like } from "@/apis/like/like-interface";
import { Moment, MomentData } from "@/apis/schemas";
import { onReachBottom } from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";
import { onClickMoment } from "./utils";
import { doLike, getCount, getUserLikes } from "@/apis/like/like";
import { getComments } from "@/apis/comment/comment";
import { StorageKeys } from "@/utils/const";

interface Props {
  type?: string;
  userId?: string;
  likeType?: string;
}

const props = defineProps<Props>();
const deleteID = reactive<DeleteMomentReq>({ momentId: "" });
const isNoData = ref(true);
const isLikedLoaded = ref(false);
let LikedLoaded = 0;
let LikedList = reactive<Like[]>([]);
let momentsInBatch: MomentData[];
let moments: Moment[];
const leftMoments = reactive<MomentData[]>([]);
const rightMoments = reactive<MomentData[]>([]);
const myUserId = ref("");
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
  myUserId.value = uni.getStorageSync(StorageKeys.UserId);
  if (props.type === "liked") {
    if (isLikedLoaded.value === false) {
      let targetUser = props.userId;
      if (targetUser === undefined) targetUser = myUserId.value;
      LikedList = (
        await getUserLikes({
          userId: targetUser,
          targetType: 4
        })
      ).likes;
      isLikedLoaded.value = true;
    }
    // 塞入五条消息
    for (let i = 0; i < 5; i++) {
      if (!LikedList?.length) {
        continue;
      }
      await getMomentDetail({
        momentId: LikedList[LikedLoaded].targetId
      })
        .then((res) => {
          let momentData = reactive<MomentData>({
            id: res.moment.id,
            createAt: res.moment.createAt,
            title: res.moment.title,
            catId: res.moment.catId,
            communityId: res.moment.communityId,
            text: res.moment.text,
            user: res.moment.user,
            photos: res.moment.photos,
            likedNumber: 0,
            comments: 0
          });
          getCount({ targetId: res.moment.id, targetType: 4 }).then((res1) => {
            momentData.likedNumber = res1.count;
          });
          getComments({ scope: "moment", page: 0, id: res.moment.id }).then(
            (res2) => {
              momentData.comments += res2.total;
              for (let i = 0; i < res2.comments?.length; i++) {
                momentData.comments += res2.comments[i].comments;
              }
            }
          );
          momentsInBatch.push(momentData);
        })
        .catch((res: UniNamespace.RequestSuccessCallbackResult) => {
          if (res.statusCode === 400) {
            doLike({
              targetId: LikedList[LikedLoaded].targetId,
              targetType: 4
            });
          }
        });
      LikedLoaded++;
      if (LikedLoaded >= LikedList.length) break;
    }
  } else {
    if (props.type === "my") {
      const res = await getMomentPreviews({
        page: page,
        communityId: uni.getStorageSync(StorageKeys.CommunityId),
        onlyUserId: myUserId.value
      });
      moments = res.moments;
    } else {
      const res = await getMomentPreviews({
        page: page,
        communityId: uni.getStorageSync(StorageKeys.CommunityId),
        onlyUserId: props.userId
      });
      moments = res.moments;
    }
    for (let i = 0; i < moments?.length; i++) {
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
      getComments({ scope: "moment", page: 0, id: moments[i].id }).then(
        (res) => {
          momentData.comments += res.total;
          for (let i = 0; i < res.comments?.length; i++) {
            momentData.comments += res.comments[i].comments;
          }
        }
      );
      momentsInBatch.push(momentData);
    }
  }

  if (momentsInBatch.length > 0) {
    isNoData.value = false;
    page += 1;
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
  background-color: #ffff;
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

.nomore {
  margin-top: 10rpx;
  line-height: 20rpx;
  text-align: center;
}
</style>
