<template>
  <TopBar :has-go-back="true" bg-color="#ffffff" :has-shadow="false">
    <template #center>编辑帖子</template>
  </TopBar>
  <view style="height: 6vw" />
  <ChooseImage
    @toggle-is-uploading-images="toggleIsUploadingImages"
    @change-cover-url="changeCoverUrl"
  />
  <view style="height: 4vw" />
  <EditTags @change-tags="changeTags" />
  <view style="height: 4vw" />
  <InputArea @change-title="changeTitle" @change-content="changeContent" />
  <view style="height: 8vw" />
  <view style="height: 36vw" />

  <BottomPanel
    :can-publish="!isUploadingImages"
    text="发布帖子"
    @publish="publish"
  />
  <template v-if="showToastBox">
    <ToastBoxWithShadow
      bold-normal-text="获得小鱼干"
      :bold-blue-text="'*' + gottenFishAmount"
      :grey-text="'今日第' + gottenFishNth + '次发布'"
      @close="closeToastBox"
    />
  </template>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomPanel from "@/pages/draft/BottomPanel.vue";
import InputArea from "@/pages/draft/InputArea.vue";
import ChooseImage from "@/pages/draft/ChooseImage.vue";
import EditTags from "@/pages/draft/EditTags.vue";
import ToastBoxWithShadow from "@/components/ToastBoxWithShadow.vue";

import { ref } from "vue";
import { StorageKeys } from "@/utils/const";
import { newPost } from "@/apis/post/post";
import { Pages } from "@/utils/url";
const isPublished = ref(false);
const title = ref("");
const content = ref("");
const coverUrl = ref("");
const tags = ref([]);
const changeTitle = (text: string) => {
  title.value = text;
};
const changeContent = (text: string) => {
  content.value = text;
};
const changeCoverUrl = (url: string) => {
  coverUrl.value = url;
};
const changeTags = (data: any) => {
  tags.value = data;
};

const isUploadingImages = ref(false);
const toggleIsUploadingImages = (bool: boolean) => {
  isUploadingImages.value = bool;
};

const refresh = () => {
  uni.switchTab({
    url: Pages.World,
    success() {
      uni.reLaunch({
        url: Pages.World
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
  if (title.value === "") {
    uni.showToast({
      title: "请输入标题",
      icon: "none"
    });
    return;
  }
  if (content.value === "") {
    uni.showToast({
      title: "请输入正文",
      icon: "none"
    });
    return;
  }
  uni.setStorageSync(StorageKeys.DraftPost, "");
  isPublished.value = !isPublished.value;
  newPost({
    title: title.value,
    text: content.value,
    coverUrl: coverUrl.value,
    tags: [...tags.value],
    isOfficial: false
  })
    .then((res) => {
      console.log("newPost");
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

<style scoped></style>
