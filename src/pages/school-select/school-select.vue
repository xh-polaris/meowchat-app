<template>
  <TopBar :has-go-back="true">
    <template #center>切换社区</template>
  </TopBar>
  <view style="height: 4vw"></view>
  <SearchBar place-holder="输入学校名称"></SearchBar>
  <view class="list-title">当前选择</view>
  <CommunityList
    :schools="getCurrentSchools(allSchools, selectedCampusId)"
    :selected-campus-id="selectedCampusId"
    :selected-school-id="selectedSchoolId"
    @select-campus="selectCampus"
  ></CommunityList>
  <template v-if="filterText === ''">
    <view class="list-title">全部社区</view>
    <CommunityList
      :schools="allSchools"
      :selected-campus-id="selectedCampusId"
      :selected-school-id="selectedSchoolId"
      @select-campus="selectCampus"
    ></CommunityList>
  </template>
  <!--  <template v-else>-->
  <!--    <view class="list-title">搜索结果</view>-->
  <!--    <CommunityList :schools="allSchools"></CommunityList>-->
  <!--  </template>-->
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import TopBar from "@/components/TopBar.vue";
import { ref } from "vue";
import { listCommunity } from "@/apis/community/community";
import CommunityList from "@/pages/school-select/CommunityList.vue";
import { StorageKeys } from "@/utils/const";
import { School, Campus } from "@/pages/school-select/Interfaces";
import { getCurrentSchools } from "@/pages/school-select/SchoolSelect";

const allSchools = ref<School[]>([]);
const selectedCampusId = ref("");
const selectedSchoolId = ref("");
const filterText = ref("");
const init = async () => {
  // 获取selectedCampusId
  const campusId = uni.getStorageSync(StorageKeys.CommunityId);
  selectedCampusId.value = campusId;

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

const selectCampus = (campusId: string, schoolId: string) => {
  selectedCampusId.value = campusId;
  selectedSchoolId.value = schoolId;
};
</script>

<style scoped lang="scss">
.list-title {
  margin: 2vw 3vw;
  font-size: 4.8vw;
  color: #1fa1ff;
}
</style>
