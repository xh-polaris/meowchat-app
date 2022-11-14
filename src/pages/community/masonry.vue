<template>
<view class="masonry">
  <view class="column-left">
    <block v-for="(tile, index) in leftTiles" :key="tile.index">
      <view class="tile">
        <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
        <view class="description">{{tile.title}}</view>
      </view>
    </block>
  </view>
  <view class="column-right">
    <block v-for="(tile, index) in rightTiles" :key="tile.index">
      <view class="tile">
        <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
        <view class="description">{{tile.title}}</view>
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

const leftTiles = reactive([]);
const rightTiles = reactive([]);


onReachBottom(() => {
  if (isBatchLoaded) {
    isBatchLoaded = false;
    addBatch();
  }
});

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

$gapWidth: 3vw;

.masonry {
  display: flex;
  background-color: transparent;
  padding-top: $gapWidth;
}

.column-left {
  width: calc(50vw - $gapWidth * 1.5);
  margin-left: $gapWidth;
  margin-right: calc($gapWidth / 2);
  height: fit-content;
}

.column-right {
  width: calc(50vw - $gapWidth * 1.5);
  margin-left: calc($gapWidth / 2);
  margin-right: $gapWidth;
  height: fit-content;
}

.tile {
  margin-bottom: calc($gapWidth - 2px);

  .img {
    width: calc(50vw - $gapWidth * 1.5);
    display: block;
    border-radius: 4vw 4vw 0 0;
  }

  .description {
    background-color: #BBB;
    font-size: 4vw;
    padding: 2vw;
    border-radius: 0 0 4vw 4vw;
    transform: translateY(-2px);
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