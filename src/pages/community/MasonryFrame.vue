<template>
  <Masonry v-if="isInitialized" :get-previews="getPreviews"></Masonry>
</template>

<script lang="ts" setup>
import Masonry from "@/pages/community/Masonry.vue";
import { getMomentPreviews } from "@/apis/moment/moment";
import { ref } from "vue";
import { StorageKeys } from "@/utils/const";
import { GetMomentPreviewsReq } from "@/apis/moment/moment-components";
import { getPrefetchData, PrefetchResp } from "@/apis/prefetch";

interface Props {
  keyword?: string;
}
const props = defineProps<Props>();

let lastToken: string; // 每次记录上个token

const isInitialized = ref(false);
const communityId = uni.getStorageSync(StorageKeys.CommunityId);

const fetch = async () => {
  const req: GetMomentPreviewsReq = {
    communityId: communityId
  };
  if (lastToken) {
    req.lastToken = lastToken;
  }
  if (props.keyword) {
    req.keyword = props.keyword;
  }
  const res = await getMomentPreviews(req);
  lastToken = res.token;
  return res.moments;
};

const getPreviews = async () => {
  if (lastToken || props.keyword) {
    return fetch();
  }
  let res: PrefetchResp;
  try {
    res = await getPrefetchData({ communityId: communityId });
  } catch (reason) {
    return fetch();
  }
  if (!res.firstMomentPreviewsResp?.moments) {
    return fetch();
  }
  lastToken = res.firstMomentPreviewsResp.token;
  const moments = res.firstMomentPreviewsResp.moments;
  res.firstMomentPreviewsResp = undefined;
  return moments;
};

isInitialized.value = true;
</script>

<style lang="scss" scoped></style>
