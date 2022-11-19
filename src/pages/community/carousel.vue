<template>

  <view class="carousel-background"></view>
  <view class="slides" @touchstart="touchStart" @touchmove="touchEnd">
    <view :class="slidesStyle[0]">{{displayContents[0]}}</view>
    <view :class="slidesStyle[1]">{{displayContents[1]}}</view>
    <view :class="slidesStyle[2]">{{displayContents[2]}}</view>
    <view :class="slidesStyle[3]">{{displayContents[3]}}</view>
    <view :class="slidesStyle[4]">{{displayContents[4]}}</view>
  </view>

  <view class="pagination-dots">
    <view :class="'pagination-dot ' + (index === currentContent ? 'current' : '')"
          v-for="(content, index) in contents" :key="index"></view>
  </view>

</template>

<script setup>

import { onMounted, reactive, ref } from "vue";

const contents = [
  {
    id: 1
  },{
    id: 2
  },{
    id: 3
  },{
    id: 4
  },{
    id: 5
  },{
    id: 6
  },{
    id: 7
  },{
    id: 8
  },
]

const currentContent = ref(0)
const displayContents = [
  contents[(currentContent.value + contents.length - 2) % contents.length].id,
  contents[(currentContent.value + contents.length - 1) % contents.length].id,
  contents[currentContent.value].id,
  contents[(currentContent.value + 1) % contents.length].id,
  contents[(currentContent.value + 2) % contents.length].id,
]

let touchStartX
let isSlidesMoving = false

function touchStart(ev) {
  touchStartX = ev.touches[0].clientX
}
function touchEnd(ev) {
  if (!isSlidesMoving) {
    if (ev.touches[0].clientX - touchStartX > 30) {
      isSlidesMoving = true
      rightward()
      setTimeout(() => isSlidesMoving = false, 1000)
    } else if (ev.touches[0].clientX - touchStartX < -30) {
      isSlidesMoving = true
      leftward()
      setTimeout(() => isSlidesMoving = false, 1000)
    }
  }

}

const slidesStyle = reactive([
  "slide slide-leftest",
  "slide slide-left",
  "slide slide-center",
  "slide slide-right",
  "slide slide-rightest"
])

function leftward() {
  const index = (currentSlide.value+1)%5
  slidesStyle[(index+3)%5] = "slide slide-leftest"
  slidesStyle[(index+4)%5] = "slide slide-left"
  slidesStyle[index] = "slide slide-center"
  slidesStyle[(index+1)%5] = "slide slide-right"
  slidesStyle[(index+2)%5] = "slide slide-rightest"
  currentSlide.value = index
  currentContent.value = (currentContent.value + 1)%contents.length
  displayContents[(index + 2)%5] = contents[(currentContent.value + contents.length + 2)%contents.length].id
}
function rightward() {
  const index = (currentSlide.value+4)%5
  slidesStyle[(index+3)%5] = "slide slide-leftest"
  slidesStyle[(index+4)%5] = "slide slide-left"
  slidesStyle[index] = "slide slide-center"
  slidesStyle[(index+1)%5] = "slide slide-right"
  slidesStyle[(index+2)%5] = "slide slide-rightest"
  currentSlide.value = index
  currentContent.value = (currentContent.value - 1 + contents.length)%contents.length
  displayContents[(index + 3)%5] = contents[(currentContent.value + contents.length - 2)%contents.length].id
}

const currentSlide = ref(2)

</script>

<style lang="scss" scoped>

$slideWidthLarge: 272/390*100vw;
$slideHeightLarge: 131/390*100vw;
$slideWidthSmall: 216/390*100vw;
$slideHeightSmall: 105/390*100vw;
$horizontalMarginOfSlideCenter: (100vw - $slideWidthLarge)/2;
$verticalPaddingOfCarousel: 9/390*100vw;
$slideGap: 17/390*100vw;
$paginationDotHeight: 6/390*100vw;
$paginationDotMargin: 4/390*100vw;
$paginationCapsuleWidth: 15/390*100vw;

$transitionDuration: 1s;
$backgroundColor: #F5F5F5;

.slides {
  display: flex;
  position: relative;
  height: $slideHeightLarge + $verticalPaddingOfCarousel*2;
}
.slide {
  font-family: sans-serif;
  text-align: center;
  line-height: $slideHeightLarge;

  background-color: #E5E9EE;
  position: absolute;
  width: $slideWidthSmall;
  height: $slideHeightSmall;
  top: ($slideHeightLarge - $slideHeightSmall)/2 + $verticalPaddingOfCarousel;
  transition-duration: $transitionDuration;

  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

.slide-leftest {
  left: $horizontalMarginOfSlideCenter - ($slideWidthSmall + $slideGap)*2;
  z-index: 0;
}
.slide-left {
  left: $horizontalMarginOfSlideCenter - ($slideWidthSmall + $slideGap);
  z-index: 2;
}
.slide-center {
  left: $horizontalMarginOfSlideCenter;
  width: $slideWidthLarge;
  height: $slideHeightLarge;
  z-index: 2;
  top: $verticalPaddingOfCarousel;
}
.slide-right {
  left: $horizontalMarginOfSlideCenter + ($slideWidthLarge + $slideGap);
  z-index: 2;
}
.slide-rightest {
  left: $horizontalMarginOfSlideCenter + ($slideWidthLarge + $slideGap) + ($slideWidthSmall + $slideGap);
  z-index: 0;
}
.carousel-background {
  background-color: white;
  position: absolute;
  width: 100vw;
  height: $verticalPaddingOfCarousel * 2 + $slideHeightLarge;
  z-index: 1;
}

.none {
  display: none;
}

.pagination-dots {
  padding: 0;
  display: flex;
  width: 100vw;
  justify-content: center;
}
.pagination-dot {
  width: $paginationDotHeight;
  height: $paginationDotHeight;
  border-radius: $paginationDotHeight/2;
  background-color: #DADADA;
  margin: 0 $paginationDotMargin/2;
  transition-duration: $transitionDuration/4;

  &.current {
    width: $paginationCapsuleWidth;
    background-color: #1FA1FF;
  }
}

</style>