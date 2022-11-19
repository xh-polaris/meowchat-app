<template>
<view class="masonry">
  <view class="column-left">
    <block v-for="(tile, index) in leftTiles" :key="tile.index">
      <view class="tile">
        <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
        <view class="tile-info">
          <view class="title">{{tile.title}}</view>
          <view class="other-info">
            <view class="user-info">
              <view class="avatar"></view>
              <view class="username">Username</view>
            </view>
            <view class="time">1小时前</view>
          </view>
        </view>
      </view>
    </block>
  </view>
  <view class="column-right">
    <block v-for="(tile, index) in rightTiles" :key="tile.index">
      <view class="tile">
        <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
        <view class="tile-info">
          <view class="title">{{tile.title}}</view>
          <view class="other-info">
            <view class="user-info">
              <view class="avatar"></view>
              <view class="username">Username</view>
            </view>
            <view class="time">1小时前</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</view>

</template>

<script lang="ts" setup>

import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { getCatPreviews, getMomentPreviews } from "../../apis/community/community";

function isLeftTallerThanRight() {
  try {
    let leftHeight, rightHeight
    uni.createSelectorQuery().in(this).select(".column-left").boundingClientRect(rect => {
      leftHeight = rect.height
    }).exec()
    uni.createSelectorQuery().in(this).select(".column-right").boundingClientRect(rect => {
      rightHeight = rect.height
    }).exec()
    return leftHeight > rightHeight
  } catch (e) {
    return false
  }
}

const leftTiles = reactive([])
const rightTiles = reactive([])


onReachBottom(() => {
  if (isBatchLoaded) {
    isBatchLoaded = false
    addBatch()
  }
})

const batchLoadingAmount = 20
const firstLoadingAmount = 16
const secondLoadingAmount = batchLoadingAmount - firstLoadingAmount

let index = 0
let loadedAmount = 0
let isBatchLoaded = false

function addTile(tileIndex, side) {
  const tileData = batchTilesData[tileIndex]
  const tile = {
    index: tileData.id,
    url: tileData.coverUrl,
    title: tileData.area,
    onLoad: () => {
      isBatchLoaded = false
      loadedAmount += 1
      if (loadedAmount >= firstLoadingAmount) {
        if (loadedAmount < firstLoadingAmount + secondLoadingAmount) {
          executeAddTile(index,"either")
          index += 1
        } else {
          loadedAmount = 0
          index = 0
          isBatchLoaded = true
        }
      }
    }
  }

  if (side === "left") {
    leftTiles.push(tile)
  } else if (side === "right") {
    rightTiles.push(tile)
  } else if (side === "either") {
    if (isLeftTallerThanRight()) {
      rightTiles.push(tile)
    } else {
      leftTiles.push(tile)
    }
  }
}


let batchTilesData

async function executeAddTile(index, side) {
  addTile(index, side)
}

async function addBatch() {
  batchTilesData = (await getCatPreviews()).cats
  for (let i = 0; i < firstLoadingAmount/2; i++) {
    executeAddTile(index,"left")
    index += 1
    executeAddTile(index,"right")
    index += 1
  }
}

addBatch()




</script>

<style lang="scss" scoped>

$sideMargin: 12/390*100vw;
$horizontalGap: 8/390*100vw;
$verticalGap: 10/390*100vw;

$radius: 6/390*100vw;
$titleFontSize: 12/390*100vw;
$smallFontSize: 8/390*100vw;
$avatarWidth: 21/390*100vw;

.masonry {
  display: flex;
  background-color: transparent;
  padding-top: 10vw;
}
.column-left {
  width: calc(50vw - $sideMargin - $horizontalGap/2);
  margin-left: $sideMargin;
  margin-right: calc($horizontalGap/2);
  height: fit-content;
}
.column-right {
  width: calc(50vw - $sideMargin - $horizontalGap/2);
  margin-left: calc($horizontalGap/2);
  margin-right: $sideMargin;
  height: fit-content;
}

.tile {
  margin-bottom: calc($verticalGap - 2px);
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.25);
  border-radius: $radius;
  font-family: sans-serif;
  
  .img {
    width: calc(50vw - $sideMargin - $horizontalGap/2);
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
    padding: 12/390*100vw;
    padding-bottom: 6/390*100vw;

    .title {
      font-size: $titleFontSize;
      color: #000000;
      line-height: $titleFontSize;
      margin-bottom: 12/390*100vw;
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
          margin-right: 4/390*100vw;
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