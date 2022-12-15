<template xmlns="http://www.w3.org/1999/html">
  <view class="content2">
    <view class="search-bar">
      <image class="cancel" src="../../static/images/cancel.png" />
      <view class="search-bar-box" @click="onClickSearch">
        <input
          type="text" value=""
          placeholder="输入学校名称或拼音查询"
          class="search-text" maxlength="10"
        >
      </view>
    </view>
    <view class="search-bar">
      <view class="small">
        当前选择
      </view>
    </view>
    <view class="school-select-box">
      <view class="current_school">
        <view class="current_school_text">
          华东师范大学
        </view>
      </view>
<!--      目前效果不够理想-->
      <select class="select">
        <option class="select" value="中山北路校区">中山北路校区</option>
        <option class="select" value="闵行校区">闵行校区</option>
        <option class="select" value="全部">全部</option>
      </select>
<!--      暂时废弃的下拉选框-->
<!--      <view class="container" tabIndex=-1>-->
<!--        <view class="menu-button">中山北路校区</view>-->
<!--        <view class="menu-list">-->
<!--          <view class="menu">中山北路校区</view>-->
<!--          <view class="menu">全部</view>-->
<!--          <view class="menu">闵行校区</view>-->
<!--          <view class="menu">闵行校区</view>-->
<!--          <view class="menu">闵行校区</view>-->
<!--        </view>-->
<!--      </view>-->

    </view>
    <view class="search-bar">
      <view class="small">
        定位/历史记录
      </view>
    </view>
    <view class="big">
      <view>
        <view class="bubble">
          华东师范大学（中山北路校区）
        </view>
        <view class="bubble">
          华东师范大学（闵行校区）
        </view>
      </view>
    </view>
    <view class="search-bar">
      <view class="small">
        热门学校
      </view>
    </view>
    <view class="big">
      <view>
        <view class="bubble">
          华东师范大学
        </view>
        <view class="bubble">
          上海交通大学
        </view>
        <view class="bubble">
          上海大学
        </view>
        <view class="bubble">
          上海工程技术大学
        </view>
      </view>
    </view>
  </view>

  <view class="blank"></view>

  <view class="content2">
    <view class="search-bar">
      <view class="small">
        A
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>
    <view class="search-bar">
      <view class="small">
        B
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>
    <view class="search-bar">
      <view class="small">
        C
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>
    <view class="search-bar">
      <view class="small">
        D
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>
    <view class="search-bar">
      <view class="small">
        E
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>
    <view class="search-bar">
      <view class="small">
        F
      </view>
    </view>
    <view
        class="school"
        v-for="item in school.name" :key="item"
    >
      {{ item }}
    </view>


  </view>
</template>

<script lang="ts" setup>
import {reactive} from "vue";

const school = reactive({
  alpha: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",],
  name: ["华东师范大学", "上海交通大学", "复旦大学", "上海大学"],
  No: 0
});

</script>

<style lang="scss" scoped>
.top-padding {
  height: calc(58 / 390 * 100vw);
}

.school {
  margin: 30rpx 50rpx 0rpx 50rpx;
  font-size: 5rpx;
  text-align: left;
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
  font-size: 5rpx;
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
  margin-left: 40rpx;
  margin-top: 20rpx;
  font-weight: bold;
  border-bottom: 2px solid skyblue;
  display: inline-block;
  font-size: 35rpx;
}

.small {
  height: 50rpx;
  width: 100%;
  display: flex;
  position: absolute;
  margin-top: 40rpx;
  margin-left: 50rpx;
  font-size: 5rpx;
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
  width: 50rpx;
  height: 50rpx;
  margin: 5rpx 0rpx 30rpx 30rpx;
}

.search-bar {
  display: flex;
  width: 100%;
  height: 70rpx;
  margin-top: 2%;
}

.school-bar {
  position: fixed;
  display: flex;
  width: 100%;
  height: 70rpx;
  margin-top: 2%;
}

.search-bar-box {
  display: flex;
  width: 600rpx;
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
  font-size: 1rpx;
  padding-left: 10rpx;
  border-radius: 20px;
  position: relative;
  width: 250rpx;
  margin-top: 20rpx;
  margin-right: 20rpx;
}

.container {
  position: relative;
  width: 250rpx;
  margin-top: 20rpx;
  margin-right: 20rpx;
}

.container:focus {
  outline: none;
}

.menu-list {
  display: none;
  background: #fff;
  position: absolute;
  font-size: 5rpx;
  left: 0;
  right: 0;
  line-height: 1.5;
  text-align: left;
  padding-left: 20rpx;
  border-radius: 10px;
  border: 1px solid #1D1D1D;
}

.container:focus .menu-list {
  display: block;
}

.menu-button {
  background: #FFFFFF;
  text-align: left;
  padding-left: 20rpx;
  font-size: 5rpx;
  color: #000000;
  line-height: 1.5;
  border-radius: 20px;
  border: 1px solid #1D1D1D;

}

.menu:hover {
  background: #eee;
  cursor: pointer;
  user-select: none;
  padding: 0 4px;
}

</style>
