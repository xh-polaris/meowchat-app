<template>
  <view>
    <view class="free-WaterfallFlow">
      <view
        v-for="(item,index) in imgList"
        :key="index"
        class="flex-wrap"
      >
        <image
          :src="srcURL+item"
          mode="widthFix"
          @click="clickImg"
        />
        <view>评论</view>
        <view>时间</view>
      </view>
    </view>
    <!--返回顶部-->
    <!--    <view :style="{'display':(flag===true? 'block':'none')}" class="top">-->
    <!--      <image class="topc" src="../../static/top.png" @click="top" />-->
    <!--    </view>-->
  </view>
</template>

<script setup>
import {ref} from "vue";

const imgList = ref(["collect.png", "collect_HL.png", "collection.png"]);
const srcURL = ref("/static/images/");
// const src = ref("https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg");

const clickImg = (event) => {
  let imgURL = event.currentTarget.dataset.src;
  let currentUrl = event.currentTarget.dataset.src;   //获取点击图片的地址, **对应<template>里面的 :data-src="item.src"
  uni.previewImage({
    urls: [imgURL],    //这里是单图 . 需要预览的全部图片地址,这个数组是必须的,要用[]
    current: currentUrl, //当前显示图片的地址
  });
};
</script>

<style>
.free-WaterfallFlow {
  width: 96%;
  column-count: 2; /* 分隔的列数 */
}

.free-WaterfallFlow .flex-wrap {
  display: inline-block;
  width: 98%;
  margin-left: 3%;
  margin-bottom: 3%;
  padding: 5% 2% 2%;
  border: 0 solid #cc22b0; /* 边框 */
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(34, 25, 25, 0.4); /* 框阴影 */
  text-align: center; /* 框内元素居中对齐 */
}

.flex-wrap image {
  width: 95%;
  margin: 0 auto;
}

.flex-wrap view:nth-child(2) {
  font-size: 15px;
  padding: 2% 0;
  color: #717171;
}

.flex-wrap view:nth-child(3) {
  font-size: 13px;
  padding: 2% 0;
  color: #aaa;
  text-align: right;
}

/* 回到顶部
.top {
  position: relative;
  display: none; /* 先将元素隐藏
}

.topc {
  height: 30px;
  width: 30px;
  position: fixed;
  right: 0;
  top: 70%;
}*/
</style>

