<template>
  <TopBar :has-go-back="true" :has-shadow="false" bg-color="#ffffff">
    <template #center>编辑动态</template>
  </TopBar>
  <view style="height: 6vw"></view>
  <ChooseImages
    @toggle-is-uploading-images="toggleIsUploadingImages"
    @change-photos="changePhotos"
  ></ChooseImages>
  <view v-if="isUploadingImages" style="margin: 0 6vw; font-size: 3.8vw"
    >后台上传图片中...</view
  >
  <view style="height: 4vw"></view>
  <InputArea
    @change-title="changeTitle"
    @change-content="changeContent"
  ></InputArea>
  <view style="height: 4vw"></view>
  <ChooseCat></ChooseCat>
  <view style="height: 44vw"></view>
  <BottomPanel
    :can-publish="!isUploadingImages"
    text="发布动态"
    @publish="publish"
  ></BottomPanel>
  <template v-if="showToastBox">
    <ToastBoxWithShadow
      bold-normal-text="获得小鱼干"
      :bold-blue-text="'*' + gottenFishAmount"
      :grey-text="'今日第' + gottenFishNth + '次发布'"
      @close="closeToastBox"
    ></ToastBoxWithShadow>
  </template>
</template>

<script setup lang="ts">
import ChooseImages from "@/pages/draft/ChooseImages.vue";
import ChooseCat from "@/pages/draft/ChooseCat.vue";
import BottomPanel from "@/pages/draft/BottomPanel.vue";
import InputArea from "@/pages/draft/InputArea.vue";
import TopBar from "@/components/TopBar.vue";
import { ref } from "vue";
import { StorageKeys } from "@/utils/const";
import { newMoment } from "@/apis/moment/moment";
import { Pages } from "@/utils/url";
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";
const isUploadingImages = ref(false);
const toggleIsUploadingImages = (bool: boolean) => {
  isUploadingImages.value = bool;
};
const isPublished = ref(false);
const title = ref("");
const content = ref("");
const photos = ref([]);
const changeTitle = (text: string) => {
  title.value = text;
};
const changeContent = (text: string) => {
  content.value = text;
};
const changePhotos = (data: any) => {
  photos.value = data;
};

const refresh = () => {
  uni.switchTab({
    url: Pages.Community,
    success() {
      uni.reLaunch({
        url: Pages.Community
      });
    }
  });
};

const showToastBox = ref(false);
const closeToastBox = () => {
  showToastBox.value = false;
  refresh();
};
const gottenFishAmount = ref(0);
const gottenFishNth = ref(0);

const publish = () => {
  if (isPublished.value) return;
  if (photos.value.length == 0) {
    uni.showToast({
      title: "至少上传一张图片哦",
      icon: "none"
    });
    return;
  }
  isPublished.value = true;
  uni.setStorageSync(StorageKeys.DraftMoment, "");
  newMoment({
    title: title.value,
    communityId: uni.getStorageSync(StorageKeys.CommunityId),
    text: content.value,
    photos: [...photos.value],
    catId: uni.getStorageSync(StorageKeys.IdSelected)
  })
    .then((res) => {
      console.log(res);
      if (res.getFish) {
        gottenFishNth.value = res.getFishTimes;
        gottenFishAmount.value = res.getFishNum;
        showToastBox.value = true;
      } else {
        refresh();
      }
    })
    .catch((reason) => {
      const code = reason.data.Code;
      if (code === 10001) {
        uni.showToast({
          title: "文本含敏感内容",
          icon: "none"
        });
      } else if (code === 10002) {
        uni.showToast({
          title: "图片含敏感内容",
          icon: "none"
        });
      } else {
        uni.showToast({
          title: "发送失败",
          icon: "none"
        });
      }
      isPublished.value = false;
    });
};
</script>

<style scoped lang="scss"></style>
