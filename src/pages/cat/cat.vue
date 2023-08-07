<template>
  <view v-if="!isRefreshing">
    <image
      :src="mainImgUrl"
      class="cat-image"
      mode="aspectFill"
      @click="onClickAvatar(mainImgUrl, cat.avatars)"
    />
    <view class="goBackButton" @click="goBack">
      <view class="left-arrow"></view>
    </view>
    <view class="main">
      <Header :cat="cat" />
      <MetaInfo :cat="cat" />
      <Guide :cat="cat" />
      <Story :cat="cat" />
      <Photos :id="props.id" :cat="cat" />
    </view>

    <!--    <view class="dd">-->
    <!--      <image :src="Icons.Guide" class="guide"></image>-->
    <!--      <view class="detail"> {{ cat.details }} </view>-->
    <!--    </view>-->
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

import Header from "@/pages/cat/header.vue";
import Guide from "@/pages/cat/guide.vue";
import Story from "@/pages/cat/story.vue";
import MetaInfo from "@/pages/cat/meta-info.vue";
import { Cat } from "@/apis/schemas";
import Photos from "@/pages/cat/photos.vue";
import { onClickAvatar } from "@/pages/cat/utils";
import { getCatDetail } from "@/apis/collection/collection";
import { GetCatDetailReq } from "@/apis/collection/collection-interfaces";
import { onPullDownRefresh } from "@dcloudio/uni-app";

const isRefreshing = ref(false);
const props = defineProps<{
  id: string;
}>();
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id
});
const cat = reactive<Cat>({
  id: "",
  createAt: 0,
  age: "",
  communityId: "",
  color: "",
  details: "",
  name: "",
  popularity: 0,
  sex: "",
  status: 0,
  area: "",
  isSnipped: true,
  isSterilized: true,
  avatars: []
});

const mainImgUrl = ref("");
const goBack = () => {
  // eslint-disable-next-line no-undef
  let pages = getCurrentPages(); // 当前页面
  let beforePage = pages[pages.length - 2]; // 上一页
  uni.navigateBack({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    success: function () {}
  });
};
const getCatDetailHandler = () => {
  getCatDetail(getCatDetailReq).then((res) => {
    cat.id = res.cat.id;
    cat.createAt = res.cat.createAt;
    cat.age = res.cat.age;
    cat.communityId = res.cat.communityId;
    cat.color = res.cat.color;
    cat.details = res.cat.details;
    cat.name = res.cat.name;
    cat.popularity = res.cat.popularity;
    cat.sex = res.cat.sex;
    cat.status = res.cat.status;
    cat.area = res.cat.area;
    cat.isSnipped = res.cat.isSnipped;
    cat.isSterilized = res.cat.isSterilized;
    cat.avatars = res.cat.avatars;
    mainImgUrl.value = cat.avatars[0];
    isRefreshing.value = false;
  });
};
getCatDetailHandler();

function pageRefresh() {
  isRefreshing.value = true;
  getCatDetailHandler();
}

onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});
</script>

<style lang="scss" scoped>
.cat-image {
  position: fixed;
  width: 100vw;
  height: 68vw;
  z-index: -1;
  top: 0;
}

.goBackButton {
  position: fixed;
  width: 10vw;
  height: 10vw;
  border-radius: 5vw;
  background-color: #1d1d1d;
  margin-top: -48vw;
  margin-left: 4vw;
  margin-right: 4vw;
  opacity: 0.3;
  z-index: 10;
}

.left-arrow {
  position: fixed;
  border-width: 1vw 1vw 0 0;
  border-color: #ffffff;
  border-style: solid;
  height: 3vw;
  width: 3vw;
  margin-top: 2.7vw;
  margin-left: 3.5vw;
  margin-right: 3.5vw;
  transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
  z-index: 11;
}

.main {
  border-radius: 4vw 4vw 0 0;
  margin-top: 60vw;
  width: 100vw;
  background-color: #ffffff;
}
</style>
