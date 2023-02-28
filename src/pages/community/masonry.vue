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
              @load.once="(ev) => onLoadLeft(ev, moment.title)"
            />
            <image
              v-else
              :src="moment.photos[0]"
              class="img"
              mode="widthFix"
              @load.once="(ev) => onLoadRight(ev, moment.title)"
            />
          </view>

          <view class="tile-info">
            <view class="title">
              {{ moment.title }}
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
          </view>
        </view>
      </template>
    </view>
  </view>
  <view v-if="leftHeight === 0 && rightHeight === 0">
    <image src="https://static.xhpolaris.com/nodata.png" />
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue";
import { getMomentPreviews, searchMomentPreviews } from "@/apis/moment/moment";
import { Moment } from "@/apis/schemas";
import { onClickMoment } from "@/pages/community/utils";
import { onReachBottom } from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";

interface Props {
  search?: string;
  keyword?: string;
}
const props = withDefaults(defineProps<Props>(), {
  search: "default",
  keyword: "cat"
});

/**
 * 在父组件用<masonry :search="{...}"/>
 * search.type --- "default"
 */

let momentsInBatch: Moment[];
const leftMoments = reactive<Moment[]>([]);
const rightMoments = reactive<Moment[]>([]);

let leftHeight = 0;
let rightHeight = 0;
const isLeftTallerThanRight = () => {
  return leftHeight > rightHeight;
};

let indexInBatch = 0;
let batchLength: number;
let batchFirstPartLength: number;
let batchSecondPartLength: number;
const batchSecondPartDefaultLength = 4;

let isNoMoreMoments = false;
let loadedAmount = 0;
let isBatchLoading = false;

let page = 0; //每往下翻页一次page加1直到没有内容

/**
 * 大致逻辑：
 * batch是每一批加上去的moment，分为first和second
 * first是左边n个右边n个直接放
 * first放上去但图片还没加载完，放的那些图片加载完毕时触发来放second的东西
 *
 * 具体步骤：batch 20, first 16, second 4
 * 最开始index=0, loadedAmount=0, isBatchLoaded=true
 * 这时addBatch()，moments变成新的20个moments
 * 放first，左边8个右边8个，每放一个就加一下index，很快index加到16
 * 具体每一个放上去调用的是addTile()
 * 这些放上去的tile在图片加载出来时都会触发公共的onLoad()函数
 * onLoad()函数每次都会把isBatchLoaded变成false，同时loadedAmount+1
 * 当loadedAmount达到第一批的量，又还没达到第二批的量时，就开始把剩下的moment加上去
 * 第16个tile加载好了，才触发放第17个；第17个加载好后，才触发第18个……直到第二批放完
 * 第二次每次放的时候都会判断之前左右高低情况
 * 所有的moment都放完后，又初始化为index=0, loadedAmount=0, isBatchLoaded=true
 */

onReachBottom(() => {
  if (!isBatchLoading && !isNoMoreMoments) {
    isBatchLoading = true;
    addBatch();
  }
});

const addBatch = async () => {
  momentsInBatch = [];
  if (props.search === "default") {
    momentsInBatch = (
      await getMomentPreviews({
        page,
        communityId: uni.getStorageSync("communityId")
      })
    ).moments;
  } else if (props.search === "moment") {
    momentsInBatch = (
      await searchMomentPreviews({
        page: page,
        communityId: uni.getStorageSync("communityId"),
        keyword: props.keyword
      })
    ).moments;
  }

  if (momentsInBatch.length > 0) {
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

const onLoadLeft = (ev: Event, title: any) => {
  console.log(title);
  const target = ev.target as HTMLImageElement;
  leftHeight =
    target.offsetTop + (target?.offsetHeight ? target.offsetHeight : 0);
  onLoad();
};
const onLoadRight = (ev: Event, title: any) => {
  console.log(title);
  const target = ev.target as HTMLImageElement;
  rightHeight =
    target.offsetTop + (target?.offsetHeight ? target.offsetHeight : 0);
  onLoad();
};

const onLoad = () => {
  console.log(leftHeight, rightHeight);
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

onBeforeMount(() => {
  isBatchLoading = true;
  addBatch();
});

// onPullDownRefresh(() => {
//   pageRefresh();
// });

// function pageRefresh() {
//   leftMoments.splice(0);
//   rightMoments.splice(0);
//   isLastBatch = false;
//   index = 0;
//   loadedAmount = 0;
//   isBatchLoaded = false;
//   isBatchLoadedAll = false;
//   page = 0;
//   leftHeight = 0;
//   rightHeight = 0;
//   addBatch();
//   uni.stopPullDownRefresh();
// }
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
  padding-top: calc(12 / 390 * 100vw);
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

    .title {
      font-size: 30rpx;
      color: #000000;
      line-height: calc ($titleFontSize * 1.5);
      margin-top: calc(5 / 390 * 100vw);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .other-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time {
        margin-top: 18rpx;
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
</style>
