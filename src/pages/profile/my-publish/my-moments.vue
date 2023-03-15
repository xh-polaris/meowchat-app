<template v-if="momentsData">
  <template>
    <template v-for="Moment in momentsData" :key="Moment.id">
      <view class="post" @click="onClickMoment(Moment.id)">
        <view class="post-info-box">
          <view class="poster-info-box">
            <image :src="Moment.user.avatarUrl" class="poster-profile" />
            <text class="poster-name">
              {{ Moment.user.nickname }}
            </text>
            <text class="post-time">
              {{ displayTime(Moment.createAt) }}
            </text>
          </view>
          <view class="post-content font-md">
            {{ Moment.text }}
          </view>
          <view :class="chooseImageClass(Moment.photos.length)">
            <image
              v-for="(item, index) in Moment.photos"
              :key="index"
              :mode="chooseImageMode(Moment.photos.length)"
              :src="item"
              @click="onClickImage(index, Moment.photos)"
            />
          </view>
          <view class="lower">
            <view class="comment font-sm">{{ Moment.comments }}条回复</view>
            <view class="font-sm">{{ Moment.likedNumber }}位喵友觉得很赞</view>
            <view class="delete" @click.stop="onClickDelete(Moment.id)">
              <image class="deletepic" :src="Icons.Delete" />
              <view class="font-sm">删除动态</view>
            </view>
          </view>
        </view>
      </view>
    </template>
    <view v-if="momentsData.length === 0">
      <image :src="Pictures.NoData" />
    </view>
    <view class="nomore">没有更多喵~</view>
    <view style="width: 100%; height: 40rpx"></view>
  </template>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getOwnMomentPreviews, deleteMoment } from "@/apis/moment/moment";
import { DeleteMomentReq } from "@/apis/moment/moment-components";
import { MomentData } from "@/apis/schemas";
import { onReachBottom } from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";
import { Pictures, Pages, Icons } from "@/utils/url";
import {
  chooseImageClass,
  chooseImageMode,
  onClickImage
} from "@/pages/moment/utils";
import { onClickMoment } from "./utils";
import { getCount } from "@/apis/like/like";
import { getComments } from "@/apis/comment/comment";
import { StorageKeys } from "@/utils/const";

const deleteID = reactive<DeleteMomentReq>({ momentId: "" });
let momentsData = ref<MomentData[]>([]);
let page = 0;
const getMomentsPreviewsAsync = async () => {
  let moments = (
    await getOwnMomentPreviews({
      page: page,
      communityId: uni.getStorageSync(StorageKeys.CommunityId)
    })
  ).moments;
  page++;
  return moments;
};

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
          url: Pages.MyPublish
        });
      }
    }
  });
}

async function createMomentsDataBatch() {
  const moments = await getMomentsPreviewsAsync();
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
      momentData.comments = res.total;
    });
    momentsData.value.push(momentData);
  }
}

createMomentsDataBatch();

onReachBottom(() => {
  createMomentsDataBatch();
});
</script>

<style lang="scss" scoped>
@import "@/common/user-info.scss";

.post {
  background-color: #ffffff;
  //border-top: 2px #f4f9ff solid;
  border-bottom: 15rpx #fafcff solid;
  padding: 32rpx;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  .post-info-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    .poster-info-box {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .poster-profile {
        width: 80rpx;
        height: 80rpx;
        max-width: 50px;
        max-height: 50px;
        min-width: 36px;
        min-height: 36px;
        background-color: #cccccc;
        margin-right: 12px;
        border-radius: 50%;
      }

      .poster-name {
        margin-right: 12px;
        font-weight: bold;
        font-size: 16px;
      }

      .post-time {
        margin-left: 300rpx;
        color: #aaa;
        font-size: 14px;
      }

      .delete {
        position: absolute;
        width: calc(15 / 390 * 100vw);
        height: calc(15 / 390 * 100vw);
        background-size: 100% 100%;
        background-image: url("@/static/images/dustbin.png");
        right: calc(21 / 390 * 100vw);
      }
    }

    .post-content {
      margin-bottom: 15px;
      line-height: 1.5em;
      letter-spacing: 0.05em;
      font-weight: 500;
    }

    .like-info {
      margin-bottom: 15px;
      color: #aaa;
      font-size: 12px;
    }

    // 根据图片数量自适应图片排版方式
    .imgs {
      position: relative;
      display: flex;
      overflow: hidden;
      flex-wrap: wrap;

      &.imgs1 {
        image {
          width: 680rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }

      &.imgs2 {
        image {
          width: 330rpx;
          height: 330rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }

      &.imgs5 {
        image {
          width: 220rpx;
          height: 220rpx;
          object-fit: none;
          border-radius: 3px;
          float: left;
          margin: 5rpx 5rpx 5rpx 5rpx;
        }
      }
    }
    .lower {
      margin-top: calc(12 / 390 * 100vw);
      display: flex;
      align-items: center;
      color: #b8b8b8;
      font-size: calc(10 / 390 * 100vw);
      .delete {
        display: flex;
        align-items: center;
        .deletepic {
          height: 20rpx;
          width: 20rpx;
          margin-left: 50rpx;
          margin-right: 10rpx;
          float: left;
        }
      }

      .comment {
        margin-right: calc(16 / 390 * 100vw);
      }
    }
  }
}

.nomore {
  margin-top: 50rpx;
  font-size: 20rpx;
  line-height: 20rpx;
  text-align: center;
}
</style>
