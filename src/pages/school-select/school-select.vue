<template>
  <TopBar :has-go-back="true">
    <template #center>切换社区</template>
  </TopBar>
  <view
    style="
      background-color: #fcfcfc;
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: -10;
    "
  ></view>
  <view style="height: 4vw"></view>
  <SearchBar
    place-holder="输入学校名称"
    @clear-search="clearSearch"
    @search="search"
  ></SearchBar>
  <view style="height: 2vw"></view>
  <view
    style="display: flex; justify-content: space-between; align-items: center"
  >
    <view class="list-title">当前选择</view>
    <view
      v-if="originalCampusId !== selectedCampusId"
      class="confirm-button"
      @click="changeCampus"
      >确认切换</view
    >
  </view>

  <CommunityList
    :schools="getCurrentSchools(allSchools, selectedCampusId)"
    :selected-campus-id="selectedCampusId"
    :selected-school-id="selectedSchoolId"
    @select-campus="selectCampus"
  ></CommunityList>
  <view style="height: 2vw"></view>
  <template v-if="filterText === ''">
    <view class="list-title">全部社区</view>
    <CommunityList
      :schools="allSchools"
      :selected-campus-id="selectedCampusId"
      :selected-school-id="selectedSchoolId"
      @select-campus="selectCampus"
    ></CommunityList>
  </template>
  <template v-else>
    <view class="list-title">搜索结果</view>
    <CommunityList
      :schools="getFilteredSchools(allSchools, filterText)"
      :selected-campus-id="selectedCampusId"
      :selected-school-id="selectedSchoolId"
      @select-campus="selectCampus"
    ></CommunityList>
  </template>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import TopBar from "@/components/TopBar.vue";
import { ref } from "vue";
import { listCommunity } from "@/apis/community/community";
import CommunityList from "@/pages/school-select/CommunityList.vue";
import { StorageKeys } from "@/utils/const";
import { School, Campus } from "@/pages/school-select/Interfaces";
import {
  getCurrentSchools,
  getFilteredSchools
} from "@/pages/school-select/SchoolSelect";

const allSchools = ref<School[]>([]);
const originalCampusId = ref("");
const selectedCampusId = ref("");
const selectedSchoolId = ref("");
const filterText = ref("");
const init = async () => {
  // 获取selectedCampusId
  const campusId = uni.getStorageSync(StorageKeys.CommunityId);
  selectedCampusId.value = campusId;
  originalCampusId.value = campusId;

  // 获取allSchools和selectedSchoolId
  const communities = (await listCommunity({})).communities;
  const campuses: Campus[] = [];
  const allSchoolsObj = {};
  communities.forEach((community) => {
    // eslint-disable-next-line no-prototype-builtins
    if (community.parentId) {
      campuses.push(community);
      if (community.id === campusId) {
        selectedSchoolId.value = community.parentId;
      }
    } else {
      allSchoolsObj[community.id] = {
        id: community.id,
        name: community.name,
        campuses: []
      };
    }
  });
  campuses.forEach((campus) => {
    allSchoolsObj[campus.parentId].campuses.push({
      id: campus.id,
      name: campus.name
    });
  });
  allSchools.value = Object.values(allSchoolsObj);
};
init();

const clearSearch = () => {
  filterText.value = "";
};
const search = (text: string) => {
  filterText.value = text;
};
const selectCampus = (campusId: string, schoolId: string) => {
  selectedCampusId.value = campusId;
  selectedSchoolId.value = schoolId;
};
const changeCampus = () => {
  uni.setStorageSync(StorageKeys.CommunityId, selectedCampusId.value);
  uni.navigateBack({
    delta: 1
  });
};
</script>

<style scoped lang="scss">
.list-title {
  width: fit-content;
  margin: 2vw 6vw;
  font-size: 3vw;
  color: #939393;
}
.confirm-button {
  margin-right: 4vw;
  box-sizing: border-box;
  background-color: #478ef6;
  width: fit-content;
  height: 8vw;
  text-align: center;
  line-height: 8vw;
  padding: 0 4vw;
  color: #f5f7fa;
  border-radius: 4vw;
}
</style>
