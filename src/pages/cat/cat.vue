<template>
  <view v-if="show && cat">
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
      <!--      <Story :cat="cat" />-->
      <Photos :id="props.id" :cat="cat" />
    </view>
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
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { refresh } from "@/utils/utils";

const show = ref(false);
const props = defineProps<{
  id: string;
}>();
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id
});
const cat = ref<Cat>();

const mainImgUrl = ref("");
const goBack = () => {
  uni.navigateBack({
    delta: 1
  });
};
const loadCat = async () => {
  const res = await getCatDetail(getCatDetailReq);
  cat.value = res.cat;
  mainImgUrl.value = cat.value.avatars[0];
};

onShow(() => {
  loadCat().then(() => {
    refresh(show);
  });
});

onPullDownRefresh(() => {
  loadCat().then(() => {
    refresh(show);
    uni.stopPullDownRefresh();
  });
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
