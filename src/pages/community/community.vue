<template>
  <view class="school-box">
    <view class="school-select-box">
      <view class="school-name">
        {{ school.name }}
      </view>
      <view class="switch-box">
        <button plain="true" style="width:100px; font-size:small; margin:10px 10px;" type="primary">
          切换学校
        </button>
      </view>
    </view>
    <view class="school-select-box">
      <view class="navbar">
        <view
          v-for="item in school.campuses" :key="item"
          :class="'navbtn '+(currentNavBtn===item?'current':'')"
          @click="setBranch(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
  <view>
    <carousel v-if="isCarouselInitialized" :contents="carouselContents" />
  </view>

  <view style="margin-top:10px">
    <masonry />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Masonry from "@/pages/community/masonry"
import Carousel from "@/pages/community/carousel"
import { onReachBottom } from "@dcloudio/uni-app";
import { News } from "@/apis/community/community-components";
import { getNews } from "@/apis/community/community";

const school = reactive({
  name: "华东师范大学",
  campuses: ["中北校区", "闵行校区", "不限"],
  No: 0
})

const currentNavBtn = ref("中北校区")

function setBranch(e: string) {
  currentNavBtn.value = e
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
onReachBottom(() => {
}) //这里的空的onReachBottom别删！！！有了这个masonry.vue的onReachBottom才能生效

const isCarouselInitialized = ref(false)

const carouselContents = reactive<News[]>([])

async function initCarouselContents() {
  let newsAmount = 0
  let newsArray: News[] = []
  while (newsAmount < 3) {
    newsArray = (await getNews()).news
    newsAmount = newsArray.length
  }
  newsArray.map(news => carouselContents.push(news))
  isCarouselInitialized.value = true
}

initCarouselContents()

</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  background-color: #FAFCFF;
  display: flex;
  color: #B8B8B8;
  font-size: calc(13 / 390 * 100vw);
  align-items: baseline;
  width: 100vw;
  padding-top: calc(2 / 390 * 100vw);
  padding-bottom: calc(16 / 390 * 100vw);
  transition-duration: 0.4s;
}

.navbtn {
  color: #939393;
  font-size: calc(10 / 390 * 100vw);
  margin: 0 calc(10 / 390 * 100vw);

  &.current {
    color: #FFFFFF;
    background-color: #1FA1FF;
    padding: 5px;
    border-radius: 1em 1em;
    font-size: calc(10 / 390 * 100vw);
    font-weight: bold;
  }
}

.switch-box {
  margin-left: auto;
}

.school-box {
  height: 12vh;
  display: flex;
  flex-direction: column;
}

.school-select-box {
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.school-name {
  margin: 10px 20px;
  font-weight: bold;
  border-bottom: 4px solid skyblue;
  font-size: large;
}

.swiper-box {
  width: 100vw;
}

.swiper {
  height: 20vh;
}

.swiper-item {
  display: block;
  height: 20vh;
  line-height: 15vh;
  text-align: center;
}

.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200 rpx;
  margin: 200 rpx auto 50 rpx;
  width: 200 rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36 rpx;
}
</style>
