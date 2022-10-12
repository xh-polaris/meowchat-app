<template>
  <view class="catsbox">
    <view class="pic" >
      <image :src="item.picture" mode="aspectFill"></image>
    </view>
    <view class="text">
      <view class="title">
        <text>{{item.title}}</text>
        <view class="collect">
          <image :src="item.collect_src" mode="aspectFill" ></image>
        </view>
      </view>
        <view class="data">
          <text>花色：{{item.color}}</text>
        </view>
        <view class="data"> 
         <text>出没地区： {{item.place}}</text>
        </view>

   </view>

  </view>
</template>

<script lang="ts">
export default {
  name: "catsbox",
  props:{
    item:{
      type:Object,
      default(){
        return {
          title:"默认猫咪",
          color:"无色",
          place:"中北校区",
          picture:"../../static/image/dog0.jpg",
          collect_src:"../../static/image/collect.png"

        }
      }
    }
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>

.catsbox{
  display: flex;

.pic{

  width: 200rpx;
  height: 200rpx;

image{
  border-radius: 15px;
  margin-left: 20rpx;
  width: 100%;
  height: 100%;
}
}
.text{
  //flex:1;
  padding-left:20rpx;
  margin-left: 40rpx;
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
.title{
  font-size: 40rpx;
  color:#333;
  margin-top: 20rpx;
  margin-bottom: 10rpx;
  //text-overflow: -o-ellipsis-lastline;
  overflow: hidden;				//溢出内容隐藏
text-overflow: ellipsis;		//文本溢出部分用省略号表示
display: -webkit-box;			//特别显示模式
-webkit-line-clamp: 2;			//行数
line-clamp: 2;
  -webkit-box-orient: vertical;	//盒子中内容竖直排列
  image{
    padding-left: 300rpx;
    margin-top: 10rpx;
    width:40rpx;
    height: 40rpx;
  }
}
.data{
  font-size: 25rpx;
  color:#999;
 margin-bottom: 10rpx;

}

}

}
</style>