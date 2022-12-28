<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-bar">
      <view class="search-bar-box">
        <input
          ref="getValue" v-model="keywords"
          type="text"
          placeholder="搜索猫咪"
          class="search-text"
          maxlength="10"
          @input="changevalue($event)"
        >
        <image class="search-span" src="/static/images/search_span.png" />
      </view>
      <view v-show="data.show" class="cancel" @click="onClickCancel">
        取消
      </view>
      <view v-show="!data.show" class="search" @click="onClickSearch">
        搜索
      </view>
    </view>
    <!-- 历史搜索 -->
    <view v-show="data.show" class="history">
      <view class="historySearch">
        <view>历史搜索</view>
        <image src="/static/images/delete.png" @click="del" />
      </view>
      <view class="hisList">
        <view
          v-for="(item,index) in data.hisList"
          :key="index"
          class="word"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {onClickCancel} from "@/pages/collection/event";
import {reactive} from "vue";


const data = reactive({
  show: false,
  hisList: ["123", "ddd"] as any
});

//let show = true;
//let hisList = ["Google", "Runoob", "Taobao"];
try {
  const res = uni.getStorageInfoSync();
  console.log(res.keys);
 
} catch (e) {
  // error
}

function changevalue(e: any) {
  try {
    uni.setStorageSync("storage_key", "e.target.value");
  } catch (e) {
    // error
  }
  data.hisList.push(e.target.value);
  // 获取到输入框的值
  console.log(data.hisList);
  if (e.target.value.length > 0) {
    console.log(data.hisList);
    data.show = false;
  } else {
    data.show = true;
    data.hisList = [];
  }
  /* keywords = e.target.value;
   // 判断
   if (this.keywords.length > 0) {
     this.show = false;
   } else {
     this.show = true;
     this.searchList = [];
   }*/
}


</script>

<style lang="scss" scoped>

.search-bar {
  width: 100%;
  height: 100rpx;
  margin-top: 2%;
  display: flex;
  margin-left: 10rpx;

  .search-bar-box {
    display: flex;
    //margin: 0 auto;
    width: 620rpx;
    height: 70rpx;
    border: 5rpx solid #f3f7f8;
    border-radius: 50rpx;

    .search-text {
      width: 100%;
      margin-top: 10rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
      color: #7f7f81;
    }

    .search-span {
      width: 56rpx;
      height: 56rpx;
      margin-top: 6rpx;
      margin-right: 30rpx;

    }


  }

  .cancel {
    text-align: center;
    color: #8b8f8f;
    font-size: 30rpx;
    margin-top: 15rpx;
    margin-left: 15rpx;
  }

  .search {
    text-align: center;
    color: #06abf3;
    font-size: 30rpx;
    margin-top: 15rpx;
    margin-left: 15rpx;
  }
}

.history {


  .historySearch {
    display: flex;
    margin-top: 10px;
    margin-left: 20rpx;

    image {
      width: 40rpx;
      height: 40rpx;

      margin-left: 20rpx;
    }

  }

  .hisList {
    .word {
      display: inline-block;
      background: #f7f7f7;
      margin-top: 20px;
      margin-left: 20px;
      padding: 10px 20px 10px 20px;
      border-radius: 20px;
    }

  }
}
</style>