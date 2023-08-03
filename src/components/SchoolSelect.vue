<template>
  <view class="school-box">
    <view class="school-select-box" @click="onClickSwitch">
      <image class="arrow" :src="Icons.Location" />
      <view class="names">
        <view class="school-name">
          {{
            currentSchool !== currentCampus
              ? currentSchool + currentCampus
              : currentSchool
          }}
        </view>
      </view>
      <view class="triangle"></view>
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

<style lang="scss" scoped>
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
    margin-left: 3vw;
    margin-right: 3vw;
  }
}
.arrow {
  width: 4vw;
  height: 5vw;
  margin-left: 1vw;
}
.triangle {
  width: 0;
  height: 0;
  margin-left: 2vw;
  margin-right: 2vw;
  border-left: 1.15vw solid transparent;
  border-right: 1.15vw solid transparent;
  border-top: 2vw solid #1d1d1d;
}
.names {
  display: flex;
  align-items: baseline;

  .school-name {
    font-weight: bold;
    line-height: calc(18 / 390 * 100vw);
    margin-left: calc(8 / 390 * 100vw);
    padding-bottom: calc(4 / 390 * 100vw);
    font-size: calc(18 / 390 * 100vw);
  }
}
</style>
