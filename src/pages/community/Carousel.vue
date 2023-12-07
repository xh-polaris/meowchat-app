<template>
    <view class="carousel">
        <view class="carousel-background" />
        <view class="slides" @touchmove="touchEnd" @touchstart="touchStart">
            <template v-for="i in 5" :key="i">
                <view
                        :class="slidesStyle[i - 1]"
                        :style="{
            backgroundImage: 'url(' + displayContents[i - 1].imageUrl + ')'
          }"
                        @click="onClickCarousel(displayContents[i - 1])"
                />
            </template>
            <view class="pagination-dots">
                <view
                        v-for="(content, index) in contents"
                        :key="index"
                        :class="
            'pagination-dot ' + (index === currentContent ? 'current' : '')
          "
                />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { News } from "@/apis/schemas";
import { onClickCarousel } from "@/pages/community/event";

const props = defineProps<{
    contents: News[];
}>();
const contents = reactive(props.contents);

let touchStartX: number;
let isSlidesMoving = false;

const touchStart = (ev: any) => {
    touchStartX = ev.touches[0].clientX;
};

const touchEnd = (ev: any) => {
    if (!isSlidesMoving) {
        if (ev.touches[0].clientX - touchStartX > 50) {
            isSlidesMoving = true;
            rightward();
            setTimeout(() => (isSlidesMoving = false), 1000);
        } else if (ev.touches[0].clientX - touchStartX < -50) {
            isSlidesMoving = true;
            leftward();
            setTimeout(() => (isSlidesMoving = false), 1000);
        }
    }
};
setInterval(leftward, 5000);
const currentContent = ref(0);
const displayContents = reactive([
    contents[(currentContent.value + contents.length - 2) % contents.length],
    contents[(currentContent.value + contents.length - 1) % contents.length],
    contents[currentContent.value],
    contents[(currentContent.value + 1) % contents.length],
    contents[(currentContent.value + 2) % contents.length]
]);

const slidesStyle = reactive([
    "slide slide-leftest",
    "slide slide-left",
    "slide slide-center",
    "slide slide-right",
    "slide slide-rightest"
]);

function leftward() {
    const index = (currentSlide.value + 1) % 5;
    slidesStyle[(index + 3) % 5] = "slide slide-leftest";
    slidesStyle[(index + 4) % 5] = "slide slide-left";
    slidesStyle[index] = "slide slide-center";
    slidesStyle[(index + 1) % 5] = "slide slide-right";
    slidesStyle[(index + 2) % 5] = "slide slide-rightest";
    currentSlide.value = index;
    currentContent.value = (currentContent.value + 1) % contents.length;
    displayContents[(index + 2) % 5] =
        contents[(currentContent.value + contents.length + 2) % contents.length];
}

function rightward() {
    const index = (currentSlide.value + 4) % 5;
    slidesStyle[(index + 3) % 5] = "slide slide-leftest";
    slidesStyle[(index + 4) % 5] = "slide slide-left";
    slidesStyle[index] = "slide slide-center";
    slidesStyle[(index + 1) % 5] = "slide slide-right";
    slidesStyle[(index + 2) % 5] = "slide slide-rightest";
    currentSlide.value = index;
    currentContent.value =
        (currentContent.value - 1 + contents.length) % contents.length;
    displayContents[(index + 3) % 5] =
        contents[(currentContent.value + contents.length - 2) % contents.length];
}

const currentSlide = ref(2);
</script>

<style lang="scss" scoped>
$slideWidthLarge: calc(362 / 390 * 100vw);
$slideHeightLarge: calc(163 / 390 * 100vw);
$horizontalMarginOfSlideCenter: calc((100vw - $slideWidthLarge) / 2);
$verticalPaddingOfCarousel: calc(9 / 390 * 100vw);
$slideGap: calc(17 / 390 * 100vw);
$paginationDotHeight: calc(6 / 390 * 100vw);
$paginationDotMargin: calc(4 / 390 * 100vw);
$paginationCapsuleWidth: calc(15 / 390 * 100vw);

$transitionDuration: 1s;
$backgroundColor: #f5f5f5;

.carousel {
  overflow-x: hidden;
}

.slides {
  overflow-x: hidden;
  display: flex;
  position: relative;
  height: calc($slideHeightLarge + $verticalPaddingOfCarousel * 2);
}

.slide {
  font-family: sans-serif;
  text-align: center;
  line-height: $slideHeightLarge;

  background-size: 100% 100%;
  position: absolute;
  width: $slideWidthLarge;
  height: $slideHeightLarge;
  top: $verticalPaddingOfCarousel;
  transition-duration: $transitionDuration;

  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  transition: transform 0.5s ease-in-out, z-index 0.5s ease-in-out;
}

.slide-leftest {
  transform: translateX(-200%);
  z-index: 0;
}

.slide-left {
  transform: translateX(-100%);
  z-index: 1;
}

.slide-center {
  transform: translateX(0);
  left: $horizontalMarginOfSlideCenter;
  width: $slideWidthLarge;
  height: $slideHeightLarge;
  top: $verticalPaddingOfCarousel;
  z-index: 3;
}

.slide-right {
  transform: translateX(110%);
  z-index: 1;
}

.slide-rightest {
  transform: translateX(200%);
  z-index: 0;
}

.carousel-background {
  background-color: #fafcff;
  position: absolute;
  width: 100vw;
  height: calc($verticalPaddingOfCarousel * 2 + $slideHeightLarge);
  z-index: 2;
}

.none {
  display: none;
}

.pagination-dots {
  background-color: transparent;
  padding: 0;
  display: flex;
  width: 100vw;
  margin-top: 40vw;
  margin-left: -35vw;
  justify-content: center;
  z-index: 99;
}

.pagination-dot {
  width: $paginationDotHeight;
  height: $paginationDotHeight;
  border-radius: calc($paginationDotHeight / 2);
  background-color: #dadada;
  margin: 0 calc($paginationDotMargin / 2);
  transition-duration: calc($transitionDuration / 4);

  &.current {
    width: $paginationCapsuleWidth;
    background-color: #1fa1ff;
  }
}
</style>
