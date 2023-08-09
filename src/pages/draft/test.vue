<template>
  <TopBar :has-go-back="true">
    <template #center>编辑帖子</template>
  </TopBar>
  <view style="height: 6vw"></view>
  <ChooseImage
    @toggle-is-uploading-images="toggleIsUploadingImages"
    @change-cover-url="changeCoverUrl"
  ></ChooseImage>
  <view style="height: 4vw"></view>
  <EditTags @change-tags="changeTags"></EditTags>
  <view style="height: 4vw"></view>
  <InputArea
    @change-title="changeTitle"
    @change-content="changeContent"
  ></InputArea>
  <view style="height: 8vw"></view>
  <view style="height: 36vw"></view>

  <BottomPanel
    :can-publish="!isUploadingImages"
    text="发布帖子"
    @publish="publish"
  ></BottomPanel>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import BottomPanel from "@/pages/draft/BottomPanel.vue";
import InputArea from "@/pages/draft/InputArea.vue";
import ChooseImage from "@/pages/draft/ChooseImage.vue";
import EditTags from "@/pages/draft/EditTags.vue";

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
  console.log("here");
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

const publish = () => {
  console.log("publish");
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
  console.log([...tags.value]);
  console.log({
    title: title.value,
    text: content.value,
    coverUrl: coverUrl.value,
    tags: [...tags.value],
    isOfficial: false,
    id: ""
  });
  newPost({
    title: title.value,
    text: content.value,
    coverUrl: coverUrl.value,
    tags: [...tags.value],
    isOfficial: false,
    id: ""
  }).then(() => {
    uni.switchTab({
      url: Pages.World,
      success() {
        uni.reLaunch({
          url: Pages.World
        });
      }
    });
  });
};
</script>

<style scoped></style>
