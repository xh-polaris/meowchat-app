<template>
  <TopBar :has-go-back="true">
    <template #center>切换社区</template>
  </TopBar>
  <view class="content">
    <view class="d-flex border a-center mx-2 j-sb px-3 search">
      <input
        v-model="searchText"
        class="search-text"
        maxlength="10"
        placeholder="输入学校名称查询"
        type="text"
      />
      <image
        :src="Icons.Search"
        mode="widthFix"
        style="width: 40rpx"
        @click="onClickSearch"
      />
    </view>
    <view class="d-flex">
      <view class="subContent"> 当前选择</view>
      <view v-if="onChoose" class="confirmButton" @click="confirmChoose"
        >确定切换
      </view>
    </view>
    <view class="school-select-box">
      <view class="current_school">
        <view class="current_school_text">{{ currentSchool }}</view>
      </view>
      <view v-if="sel">
        <view class="selectClose" @click="change">
          <view class="text"
            >{{ currentCampus }}
            <image :src="Icons.DownBlack" />
          </view>
        </view>
      </view>
      <view v-else>
        <view class="selectOpen" @click="change">
          <view class="text"
            >{{ currentCampus }}
            <image :src="Icons.UpBlack" />
          </view>
        </view>
        <view class="options" @click="change">
          <view
            v-for="(item, index) in campuses.data"
            :key="index"
            class="text"
            @click="changeCampus(item.name, index)"
          >
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view class="subContent"> 定位/历史记录</view>
    <view
      v-for="(item, index) in historyJSON.histories"
      :key="index"
      class="bubbleBox"
    >
      <view
        class="bubble"
        @click="
          changeCampusByHistory(
            item.campusName,
            item.schoolName,
            item.communityId,
            item.schoolId
          )
        "
      >
        {{ item.schoolName }} ({{ item.campusName }})
      </view>
    </view>
    <view class="subContent"> 热门学校</view>
    <view class="bubbleBox">
      <view>
        <view
          v-for="(item, index) in schools.data.slice(0, 2)"
          :key="index"
          class="bubble"
          @click="changeSchool(item.name, item.id)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>

  <view class="divider" />

  <view class="content">
    <view class="subContent"> 所有学校</view>
    <view
      v-for="item1 in schools.computedData"
      :key="item1.id"
      class="school"
      @click="changeSchool(item1.name, item1.id)"
    >
      {{ item1.name }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Community } from "@/apis/schemas";
import { listCommunity } from "@/apis/community/community";
import { onLoad } from "@dcloudio/uni-app";
import { StorageKeys } from "@/utils/const";
import { Icons } from "@/utils/url";
import TopBar from "@/components/TopBar.vue";

const currentSchool = ref("");
const currentCampus = ref("");
const communityId = ref("");
const parentId = ref("");
const onChoose = ref(false);
let history = reactive({
  campusName: "",
  schoolName: "",
  communityId: "",
  schoolId: ""
});

let historyJSON = reactive({
  histories: reactive<(typeof history)[]>([])
});

function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}

function getHistories() {
  if (uni.getStorageSync(StorageKeys.HistoryCampuses)) {
    historyJSON = JSON.parse(
      decodeURIComponent(uni.getStorageSync(StorageKeys.HistoryCampuses))
    );
  }
  if (checkRepeat(history.communityId)) {
    if (historyJSON.histories.length === 3) {
      historyJSON.histories.pop();
      historyJSON.histories.unshift(history);
    } else {
      historyJSON.histories.unshift(history);
    }
  }
  uni.setStorageSync(
    StorageKeys.HistoryCampuses,
    encodeURIComponent(JSON.stringify(historyJSON))
  );
}

function checkRepeat(id: string) {
  let flag = true;
  for (const history of historyJSON.histories) {
    if (id === history.communityId) {
      flag = false;
    }
  }
  if (id === "") {
    flag = false;
  }
  return flag;
}

onLoad(() => {
  getCampus();
});

const lists = reactive<{
  data: Community[];
}>({
  data: []
});

const campuses = reactive<{
  data: Community[];
}>({
  data: []
});

const schools = reactive<{
  data: Community[];
  computedData: Community[];
}>({
  data: [],
  computedData: []
});

// 所有Community列表
async function schoolList() {
  lists.data = (await listCommunity({})).communities;
}

// 找所有学校
function getSchools() {
  schoolList().then(() => {
    let j = 0;
    for (const data of lists.data) {
      if (!data.parentId) {
        schools.data[j] = data;
        j++;
      }
    }
    schools.computedData = [...schools.data];
  });
}

getSchools();

// 找该学校的所有校区
async function getCampus() {
  if (parentId.value) {
    campuses.data = (
      await listCommunity({
        parentId: parentId.value
      })
    ).communities;
  } else {
    schoolList().then(async () => {
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
      history.campusName = currentCampus.value;
      history.schoolName = currentSchool.value;
      history.communityId = communityId.value;
      history.schoolId = parentId.value;
      getHistories();
      campuses.data = (
        await listCommunity({
          parentId: parentId.value
        })
      ).communities;
    });
  }
}

getCampus();

const sel = ref(true);

// 更改下拉选框状态
function change() {
  sel.value = !sel.value;
}

// 选择学校
function changeCampus(name: string, index: number) {
  onChoose.value = true;
  currentCampus.value = name;
  uni.setStorageSync(StorageKeys.CommunityId, campuses.data[index].id);
}

function changeCampusByHistory(
  campus: string,
  school: string,
  id: string,
  parent: string
) {
  onChoose.value = true;
  sel.value = true;
  currentCampus.value = campus;
  currentSchool.value = school;
  parentId.value = parent;
  uni.setStorageSync("communityId", id);
  getCampus();
}

// 选择校区
function changeSchool(name: string, id: string) {
  currentSchool.value = name;
  parentId.value = id;
  currentCampus.value = "请选择校区";
  sel.value = false;
  getCampus();
}

let searchText = ref("");

// 搜索学校
function onClickSearch() {
  schools.computedData.splice(0);
  if (searchText.value === "") {
    schools.computedData.push(...schools.data);
  } else {
    schools.computedData.push(
      ...schools.data.filter((school) => school.name.includes(searchText.value))
    );
  }
}

// 确认选择校区操作
function confirmChoose() {
  uni.navigateBack({
    delta: 1
  });
}
</script>

<style lang="scss" scoped>
// 全局样式
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

// 搜索框
.search {
  border-radius: 70rpx;
  height: 60rpx;
  border-color: #938b8e;
  border-width: 2rpx;
  margin: 10rpx 50rpx 0 50rpx;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}

// 小字
.subContent {
  height: 40rpx;
  width: 40%;
  display: flex;
  position: relative;
  margin-top: 40rpx;
  margin-left: 50rpx;
  font-size: 25rpx;
  color: #afafaf;
}

//学校名
.school {
  margin: 30rpx 50rpx 0 50rpx;
  font-size: 25rpx;
  text-align: left;
  display: grid;
  padding-bottom: 15rpx;
  border-bottom: 1px solid #f6f6f6;
}

// 确认键
.confirmButton {
  padding: 0 30rpx 0 30rpx;
  height: 40rpx;
  display: flex;
  border: #1fa1ff 1px solid;
  color: #1fa1ff;
  font-size: 25rpx;
  border-radius: 50rpx;
  position: relative;
  margin-top: auto;
  margin-left: auto;
  margin-right: 50rpx;
  align-items: center;
}

// 分隔栏
.divider {
  background-color: #f6f6f6;
  margin-top: 40rpx;
  display: flex;
  width: 100%;
  height: 20rpx;
}

// 气泡
.bubbleBox {
  display: flex;
  width: 100%;
  height: auto;
}

.bubble {
  background-color: #f6f6f6;
  margin-left: 50rpx;
  margin-top: 20rpx;
  font-size: 25rpx;
  text-align: center;
  display: inline-block;
  padding: 20rpx 30rpx 20rpx 30rpx;
  border-radius: 50rpx;
}

// 校区选择
.school-select-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.current_school {
  width: 450rpx;
}

.current_school_text {
  margin-left: 50rpx;
  margin-top: 20rpx;
  font-weight: bold;
  border-bottom: 2px solid skyblue;
  display: inline-block;
  font-size: 35rpx;
}

.cancel {
  width: 40rpx;
  height: 40rpx;
  margin: 8rpx 0 30rpx 30rpx;
}

.school-bar {
  display: grid;
  width: 100%;
  margin-top: 2%;
}

// 下拉菜单收起时
.selectClose {
  padding: 10rpx 10rpx 10rpx 20rpx;
  border: black 1px solid;
  border-radius: 15px;
  position: relative;
  margin-top: 15rpx;
  margin-right: 50rpx;
  display: flex;
  align-items: center;
  background-color: #ffffff;

  image {
    width: 26rpx;
    height: 15rpx;
    padding-right: 10rpx;
    margin-top: 8rpx;
    float: right;
  }

  .text {
    font-size: 25rpx;
    font-weight: bold;
    width: 225rpx;
  }
}

// 下拉菜单展开时
.selectOpen {
  padding: 10rpx 10rpx 10rpx 20rpx;
  border: black 1px solid;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  position: relative;
  margin-top: 15rpx;
  margin-right: 50rpx;
  display: flex;
  align-items: center;
  background-color: #ffffff;

  image {
    width: 26rpx;
    height: 15rpx;
    padding-right: 10rpx;
    margin-top: 8rpx;
    float: right;
  }

  .text {
    font-size: 25rpx;
    font-weight: bold;
    width: 225rpx;
  }
}

// 选项
.options {
  padding: 2rpx 10rpx 2rpx 20rpx;
  border: black 1px solid;
  border-top: none;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  line-height: 60rpx;
  margin-right: 20rpx;
  background-color: #ffffff;
  z-index: 100;

  .text {
    color: #7f7f81;
    font-size: 25rpx;
    font-weight: bold;
    width: 225rpx;
    position: relative;
    display: flex;
  }

  .text::before {
    content: "";
    position: absolute;
    width: 98%;
    height: 1rpx;
    background-color: #7f7f81;
  }
}
</style>
