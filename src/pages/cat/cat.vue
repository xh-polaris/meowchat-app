<template>
  <view v-if="!isRefreshing">
    <image
      :src="mainImgUrl"
      class="cat-image"
      mode="aspectFill"
      @click="onClickAvatar(mainImgUrl, cat.avatars)"
    />
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
  height: 48vw;
  z-index: -1;
  top: 0;
}
.main {
  border-radius: 4vw 4vw 0 0;
  margin-top: 43vw;
  width: 100vw;
  background-color: #ffffff;
}
</style>
