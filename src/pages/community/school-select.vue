<template>
  <view class="content2">
    <view class="search-bar">
      <image class="cancel" src="/static/images/cancel.png" />
      <view class="search-bar-box">
        <input
          class="search-text"
          maxlength="10"
          placeholder="输入学校名称或拼音查询"
          type="text"
          value=""
        />
      </view>
    </view>
    <view class="search-bar">
      <view class="small"> 当前选择</view>
    </view>
    <view class="school-select-box">
      <view class="current_school">
        <view class="current_school_text">{{ currentSchool }}</view>
      </view>
      <view v-if="sel" class="select" @click="change">
        <text>{{ currentNavBtn }}</text>
        <image class="arrow" src="/static/images/down-black.png" />
      </view>
      <view v-else class="box">
        <view class="select2" @click="change">
          <text>{{ currentNavBtn }}</text>
          <image class="arrow" src="/static/images/up-black.png" />
        </view>
        <view class="option" @click="change">
          <text
            v-for="(item, index) in school.campuses"
            :key="index"
            :src="item"
            @click="changeCampus(item)"
          >
            {{ item }}
          </text>
        </view>
      </view>
    </view>
    <view class="search-bar">
      <view class="small"> 定位/历史记录</view>
    </view>
    <view class="big">
      <view>
        <view class="bubble"> 华东师范大学（中山北路校区）</view>
        <view class="bubble"> 华东师范大学（闵行校区）</view>
      </view>
    </view>
    <view class="search-bar">
      <view class="small"> 热门学校</view>
    </view>
    <view class="big">
      <view>
        <view
          v-for="(item, index) in school.name"
          :key="index"
          :src="item"
          class="bubble"
          @click="changeSchool(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>

  <view class="blank" />

  <view class="content2">
    <view
      v-for="(item, index) in school.alpha"
      :key="index"
      class="school-bar"
      :src="item"
    >
      <view class="small"> {{ item }}</view>
      <view
        v-for="(item1, index1) in school.name"
        :key="index1"
        :src="school"
        class="school"
        @click="changeSchool(item1)"
      >
        {{ item1 }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const school = reactive({
  alpha: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ],
  name: ["华东师范大学", "上海交通大学", "复旦大学", "上海大学"],
  campuses: ["中山北路校区", "闵行校区", "全部"],
  index: 0
});

const sel = ref(true);

function change() {
  sel.value = !sel.value;
}
function changeCampus(name: string) {
  currentNavBtn.value = name;
}
function changeSchool(name: string) {
  currentSchool.value = name;
}

const currentNavBtn = ref("中山北路校区");
const currentSchool = ref("华东师范大学");
</script>

<style lang="scss" scoped>
.top-padding {
  height: calc(58 / 390 * 100vw);
}

.school {
  margin: 30rpx 50rpx 0 50rpx;
  font-size: 25rpx;
  text-align: left;
  display: grid;
  padding-bottom: 15rpx;
  border-bottom: 1px solid #f6f6f6;
}

// 分隔栏
.blank {
  background-color: #f6f6f6;
  margin-top: 40rpx;
  display: flex;
  width: 100%;
  height: 20rpx;
}

.history {
  width: 450rpx;
}

// 气泡
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

.small {
  height: 40rpx;
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 40rpx;
  margin-left: 50rpx;
  font-size: 25rpx;
  color: #afafaf;
}

.big {
  display: flex;
  width: 100%;
  height: auto;
}

.content1 {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cancel {
  width: 40rpx;
  height: 40rpx;
  margin: 8rpx 0 30rpx 30rpx;
}

.search-bar {
  display: flex;
  width: 100%;
  height: 70rpx;
  margin-top: 2%;
}

.school-bar {
  display: grid;
  width: 100%;
  margin-top: 2%;
}

.search-bar-box {
  display: flex;
  width: 620rpx;
  height: 50rpx;
  background-color: #f6f6f6;
  border: 5rpx solid #f3f7f8;
  border-radius: 50rpx;
  margin-left: 30rpx;

  .search-text {
    width: 100%;
    margin-top: 5rpx;
    margin-left: 30rpx;
    font-size: 25rpx;
    color: #dadada;
  }

  .search-span {
    width: 56rpx;
    height: 56rpx;
    margin-top: 6rpx;
    margin-right: 30rpx;
  }
}

// 下拉菜单
.select {
  padding: 10rpx 10rpx 10rpx 20rpx;
  border: black 1px solid;
  border-radius: 20px;
  position: relative;
  margin-top: 10rpx;
  margin-right: 20rpx;
  outline: none;
  display: flex;

  text {
    font-size: 25rpx;
    font-weight: bold;
    width: 200rpx;
  }
}

.select2 {
  padding: 10rpx 10rpx 10rpx 20rpx;
  border: black 1px solid;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  position: relative;
  margin-top: 10rpx;
  margin-right: 20rpx;
  outline: none;
  display: flex;

  text {
    font-size: 25rpx;
    font-weight: bold;
    width: 200rpx;
  }
}

.box {
  flex-direction: column;
}

.arrow {
  width: 25rpx;
  height: 15rpx;
  margin-top: 10rpx;
  margin-right: 10rpx;
}

.option {
  border: black 1px solid;
  border-top: none;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  line-height: 60rpx;
  margin-right: 25rpx;
  flex-direction: row;
  z-index: 100;

  text {
    padding: 0 10rpx 0 20rpx;
    color: #7f7f81;
    font-size: 25rpx;
    font-weight: bold;
    width: 235rpx;
    position: relative;
    display: inline-block;
  }

  text::before {
    content: "";
    position: absolute;
    left: 5%;
    top: 0;
    width: 90%;
    height: 1rpx;
    background-color: #7f7f81;
  }
}
</style>
