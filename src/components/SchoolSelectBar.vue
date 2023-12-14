<template>
  <view class="school-select-box" @click="onClickSwitch">
    <image :src="Icons.Location" mode="scaleToFill" class="locationIcon" />
    <view class="school-name">
      {{
        (currentSchool !== currentCampus
          ? currentSchool + currentCampus
          : currentSchool) || "MeowChat大家庭"
      }}
    </view>
    <view class="triangle" />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Icons, Pages } from "@/utils/url";
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
  for (const data of lists.data) {
    if (data.id === communityId.value) {
      currentCampus.value = data.name;
      parentId.value = data.parentId || "";
    }
  }
  for (const data of lists.data) {
    if (data.id === parentId.value) {
      currentSchool.value = data.name;
    }
  }
}

const onClickSwitch = () => {
  uni.navigateTo({
    url: Pages.SchoolSelect
  });
};

getCampus();
</script>

<style lang="scss" scoped>
.school-select-box {
  height: 5vw;
  display: flex;
  align-items: center;
  margin-left: 2vw;
  margin-right: 2vw;

  .locationIcon {
    width: 4vw;
    height: 5vw;
  }
  .school-name {
    font-weight: bold;
    height: 5vw;
    line-height: 5vw;
    font-size: 4.7vw;
    margin-left: 1vw;
  }
  .triangle {
    width: 0;
    height: 0;
    margin-left: 1vw;
    border-left: 1.15vw solid transparent;
    border-right: 1.15vw solid transparent;
    border-top: 2vw solid #1d1d1d;
    transform: translateY(0.2vw);
  }
}
</style>
