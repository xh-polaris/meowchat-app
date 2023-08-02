<template>
  <view class="school-box">
    <view class="school-select-box">
      <image class="arrow" :src="Icons.Location" @click="onClickSwitch" />
      <view class="names" @click="onClickSwitch">
        <view class="school-name">
          {{ currentSchool }}
        </view>
        <view v-if="currentSchool !== currentCampus" class="campus-name">
          ({{ currentCampus }})</view
        >
        <view v-else class="campus-name"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Icons } from "@/utils/url";
import { onClickSwitch } from "@/pages/community/utils";
import { listCommunity } from "@/apis/community/community";
import { StorageKeys } from "@/utils/const";
import { Community } from "@/apis/schemas";
const currentSchool = ref("");
const currentCampus = ref("");
const communityId = ref("");
const parentId = ref("");
function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}
const lists = reactive<{
  data: Community[];
}>({
  data: []
});
async function schoolList() {
  lists.data = (await listCommunity({})).communities;
}
async function getCampus() {
  await schoolList();
  init();
  for (let i = 0; i < lists.data.length; i++) {
    if (lists.data[i].id === communityId.value) {
      currentCampus.value = lists.data[i].name;
      parentId.value = <string>lists.data[i].parentId;
    }
  }
  for (let j = 0; j < lists.data.length; j++) {
    if (lists.data[j].id === parentId.value) {
      currentSchool.value = lists.data[j].name;
    }
  }
}
getCampus();
</script>

<style scoped lang="scss">
.school-box {
  background-color: #fafcff;
  height: fit-content;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  .school-select-box {
    height: fit-content;
    display: flex;
    align-items: center;
  }
}
.arrow {
  width: 32rpx;
  height: 40rpx;
  margin-left: 20rpx;
}
.names {
  display: flex;
  align-items: baseline;

  .school-name {
    font-weight: bold;
    border-bottom: 2px solid #1fa1ff;
    line-height: calc(18 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
    padding-bottom: calc(4 / 390 * 100vw);
    font-size: calc(18 / 390 * 100vw);
  }

  .campus-name {
    color: #939393;
    font-weight: bold;
    letter-spacing: calc(0.5 / 390 * 100vw);
    font-size: calc(16 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
  }
}
</style>
