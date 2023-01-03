<template>
  <view class="carousel">
    <view class="carousel-background" />
    <view class="slides" @touchmove="touchEnd" @touchstart="touchStart">
      <block v-for="i in 5" :key="i">
        <view
          :class="slidesStyle[i - 1]"
          :style="{
            backgroundImage: 'url(' + displayContents[i - 1].imageUrl + ')',
          }"
        />
      </block>
    </view>
    <view class="pagination-dots">
      <view
        v-for="(content, index) in contents"
        :key="index"
        :class="'pagination-dot ' + (index === currentContent ? 'current' : '')"
      />
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  contents: {
    type: Array,
    default() {
      return [];
    },
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const contents = props.contents;

let touchStartX;
let isSlidesMoving = false;

const touchStart = (ev) => {
  touchStartX = ev.touches[0].clientX;
};

const touchEnd = (ev) => {
  if (!isSlidesMoving) {
    if (ev.touches[0].clientX - touchStartX > 30) {
      isSlidesMoving = true;
      rightward();
      setTimeout(() => (isSlidesMoving = false), 1000);
    } else if (ev.touches[0].clientX - touchStartX < -30) {
      isSlidesMoving = true;
      leftward();
      setTimeout(() => (isSlidesMoving = false), 1000);
    }
  }
};

const currentContent = ref(0);
const displayContents = reactive([
  contents[(currentContent.value + contents.length - 2) % contents.length],
  contents[(currentContent.value + contents.length - 1) % contents.length],
  contents[currentContent.value],
  contents[(currentContent.value + 1) % contents.length],
  contents[(currentContent.value + 2) % contents.length],
]);

const slidesStyle = reactive([
  "slide slide-leftest",
  "slide slide-left",
  "slide slide-center",
  "slide slide-right",
  "slide slide-rightest",
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
$slideWidthLarge: calc(272 / 390 * 100vw);
$slideHeightLarge: calc(131 / 390 * 100vw);
$slideWidthSmall: calc(216 / 390 * 100vw);
$slideHeightSmall: calc(105 / 390 * 100vw);
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
  display: flex;
  position: relative;
  height: calc($slideHeightLarge + $verticalPaddingOfCarousel * 2);
}

.slide {
  font-family: sans-serif;
  text-align: center;
  line-height: $slideHeightLarge;

  //background-color: #E5E9EE;
  background-size: 100% 100%;
  position: absolute;
  width: $slideWidthSmall;
  height: $slideHeightSmall;
  top: calc(
    ($slideHeightLarge - $slideHeightSmall) / 2 + $verticalPaddingOfCarousel
  );
  transition-duration: $transitionDuration;

  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

.slide-leftest {
  left: calc(
    $horizontalMarginOfSlideCenter - ($slideWidthSmall + $slideGap) * 2
  );
  z-index: 0;
}

.slide-left {
  left: calc($horizontalMarginOfSlideCenter - ($slideWidthSmall + $slideGap));
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
  left: calc($horizontalMarginOfSlideCenter + ($slideWidthLarge + $slideGap));
  z-index: 2;
}

.slide-rightest {
  left: calc(
    $horizontalMarginOfSlideCenter + ($slideWidthLarge + $slideGap) +
      ($slideWidthSmall + $slideGap)
  );
  z-index: 0;
}

.carousel-background {
  background-color: white;
  position: absolute;
  width: 100vw;
  height: calc($verticalPaddingOfCarousel * 2 + $slideHeightLarge);
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
