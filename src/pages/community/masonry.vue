<template>
<view class="masonry">
  <view class="column-left">
    <block v-for="(tile, index) in leftTiles" :key="tile.index">
      <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
    </block>
  </view>
  <view class="column-right">
    <block v-for="(tile, index) in rightTiles" :key="tile.index">
      <image mode="widthFix" :src="tile.url" class="img" @load.once="tile.onLoad"></image>
    </block>
  </view>
</view>

</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {onReachBottom} from "@dcloudio/uni-app";

function log() {
  console.log("ok")
}

const query = uni.createSelectorQuery()

function isLeftTallerThanRight() {
  try {
    let leftHeight, rightHeight
    query.select(".column-left").boundingClientRect(rect => {
      leftHeight = rect.height
    }).exec()
    query.select(".column-right").boundingClientRect(rect => {
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
    console.log("ok")
    isBatchLoaded = false
    addBatch()
  }
})

const firstLoadingAmount = 4
const secondLoadingAmount = 3

let index = 0
let loadedAmount = 0
let isBatchLoaded = false

function addTile(catUrl, side) {
  console.log("Added a tile")
  const tile = {
    index: index,
    url: catUrl,
    onLoad: () => {
      isBatchLoaded = false
      loadedAmount += 1
      console.log(loadedAmount)
      if (loadedAmount >= firstLoadingAmount) {
        if (loadedAmount < firstLoadingAmount + secondLoadingAmount) {
          executeAddTile("either")
        } else {
          loadedAmount = 0
          isBatchLoaded = true
        }
      }
    }
  }

  index += 1

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


async function executeAddTile(side) {
  addTile(await getCatImgUrl(), side)
}

function addBatch() {
  for (let i = 0; i < firstLoadingAmount/2; i++) {
    executeAddTile("left")
    executeAddTile("right")
  }
}

addBatch()

async function getCatImgUrl() {
  const obj = await fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json())
  return obj[0].url
}


</script>

<style lang="scss" scoped>

$gapWidth: 3vw;

.masonry {
  display: flex;
  background-color: #CCC;
  padding-top: $gapWidth;
}
.column-left {
  width: calc(50vw - $gapWidth*1.5);
  margin-left: $gapWidth;
  margin-right: calc($gapWidth/2);
  height: fit-content;
}
.column-right {
  width: calc(50vw - $gapWidth*1.5);
  margin-left: calc($gapWidth/2);
  margin-right: $gapWidth;
  height: fit-content;
}

.img {
  width: calc(50vw - $gapWidth*1.5);
  margin-bottom: $gapWidth;
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