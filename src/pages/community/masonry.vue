<template>
  <view class="masonry">
    <view v-for="i in 2" :key="i" :class="i===1?'column-left':'column-right'">
      <block v-for="moment in i===1?leftMoments:rightMoments" :key="moment.id">
        <view class="tile" @click="onClickMoment(moment.id)">
          <image
            mode="widthFix" :src="moment.coverUrl"
            class="img"
            @load.once="onLoad"
          />
          <view class="tile-info">
            <view class="title">
              {{ moment.title }}
            </view>
            <view class="other-info">
              <view class="user-info">
                <view class="avatar" />
                <view class="username">
                  {{ moment.user.nickname }}
                </view>
              </view>
              <view class="time">
                {{ moment.createAt }}
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { getMomentPreviews, MomentPreview } from "@/apis/community/community"
import { onClickMoment } from "@/pages/community/event"

const isLeftTallerThanRight = () => {
  try {
    let leftHeight = 0, rightHeight = 0
    uni.createSelectorQuery().in(this).select(".column-left").boundingClientRect(rect => {
      console.log(rect)
      const info = rect as UniNamespace.NodeInfo
      leftHeight = info.height as number
    }).exec()
    uni.createSelectorQuery().in(this).select(".column-right").boundingClientRect(rect => {
      const info = rect as UniNamespace.NodeInfo
      rightHeight = info.height as number
    }).exec()
    return leftHeight > rightHeight
  } catch (e) {
    console.log(e)
    return false
  }
}

const leftMoments = reactive<MomentPreview[]>([])
const rightMoments = reactive<MomentPreview[]>([])

const onMasonryReachBottom = () => {
  if (isBatchLoaded) {
    isBatchLoaded = false
    addBatch()
  }
}

const batchLoadingAmount = 20
const firstLoadingAmount = 16
const secondLoadingAmount = batchLoadingAmount - firstLoadingAmount

let index = 0
let loadedAmount = 0
let isBatchLoaded = false

const onLoad = () => {
  isBatchLoaded = false
  loadedAmount += 1
  if (loadedAmount >= firstLoadingAmount) {
    if (loadedAmount < firstLoadingAmount + secondLoadingAmount) {
      addTile(index, "either")
      index += 1
    } else {
      loadedAmount = 0
      index = 0
      isBatchLoaded = true
    }
  }
}

const addTile = (tileIndex: number, side: string) => {
  const tile = moments[tileIndex]

  if (side === "left") {
    leftMoments.push(tile)
  } else if (side === "right") {
    rightMoments.push(tile)
  } else if (side === "either") {
    if (isLeftTallerThanRight()) {
      rightMoments.push(tile)
    } else {
      leftMoments.push(tile)
    }
  }
}

let moments: MomentPreview[]

const addBatch = async () => {
  moments = (await getMomentPreviews()).moments
  for (let i = 0; i < firstLoadingAmount / 2; i++) {
    addTile(index, "left")
    index += 1
    addTile(index, "right")
    index += 1
  }
}

addBatch()


</script>

<style lang="scss" scoped>

$sideMargin: calc(12 / 390 * 100vw);
$horizontalGap: calc(8 / 390 * 100vw);
$verticalGap: calc(10 / 390 * 100vw);

$radius: calc(6 / 390 * 100vw);
$titleFontSize: calc(12 / 390 * 100vw);
$smallFontSize: calc(8 / 390 * 100vw);
$avatarWidth: calc(21 / 390 * 100vw);

.masonry {
  display: flex;
  background-color: transparent;
  padding-top: 10vw;
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

  .img {
    width: calc(50vw - $sideMargin - $horizontalGap / 2);
    display: block;
    border-radius: $radius $radius 0 0;
  }

  .tile-info {
    transform: translateY(-2px);
    background-color: #FFFFFF;
    border-radius: 0 0 $radius $radius;
    font-size: $smallFontSize;
    color: #696969;
    font-weight: 500;
    padding: calc(12 / 390 * 100vw) calc(12 / 390 * 100vw) calc(6 / 390 * 100vw);

    .title {
      font-size: $titleFontSize;
      color: #000000;
      line-height: $titleFontSize;
      margin-bottom: calc(12 / 390 * 100vw);
    }

    .other-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user-info {
        display: flex;
        align-items: center;

        .avatar {
          width: $avatarWidth;
          height: $avatarWidth;
          border-radius: 50%;
          background-color: #CCCCCC;
          margin-right: calc(4 / 390 * 100vw);
        }
      }
    }
  }


}

.debug {
  position: absolute;
  color: gold;
  transform: translateY(-12vw);
  font-family: sans-serif;
  font-size: 10vw;
  z-index: 100
}


</style>
