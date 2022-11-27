<template>
  <view>
    <image src="https://static.xhpolaris.com/dog.jpg" class="img" />
    <view class="selector">
      <image src="https://static.xhpolaris.com/dog.jpg" />
      <image src="https://static.xhpolaris.com/dog.jpg" />
      <image src="https://static.xhpolaris.com/dog.jpg" />
    </view>
    <view class="progress-box">
      <view class="text-box1">
        <text>桥遇</text>
      </view>
      <progress
        :percent="percent" :stroke-width="10"
        backgroundColor="#F5F5F5" border-radius="6px"
      />
      <view class="text-box2">
        <text>{{ percent }}人气值</text>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          生日
        </view>
        <view class="content">
          成猫
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          花色
        </view>
        <view class="content">
          橘色
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          状况
        </view>
        <view class="content">
          在读
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          校区
        </view>
        <view class="content">
          中北
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          绝育情况
        </view>
        <view class="content">
          已绝育
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          出没地区
        </view>
        <view class="content">
          六舍
        </view>
      </view>
    </view>
    <view class="dd">
      撸猫指南：胆小怕生
    </view>
  </view>
</template>

<script lang="ts" setup>

let percent = 73;


const props = defineProps<{
  id: string
}>();

</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}

.selector {
  display: flex;
  padding-left: 300rpx;


  image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
  }
}

.progress-box {
  //border-radius: 10rpx !important;
  margin-top: 50rpx;
  width: 300rpx;
  //text-align: center;
  margin-left: auto;
  margin-right: auto;

  .text-box1 {
    //display: inline-block;
    text-align: center;
    color: #37393a;
    font-size: 50rpx;
  }

  .text-box2 {
    //display: inline-block;
    text-align: center;
    color: #a4a9ab;
    font-size: 20rpx;
  }

  progress {
    border-radius: 6px !important;
    background: linear-gradient(to right, #05A081, #87CBCB);
  }


}

.info {
  display: flex;
  margin-top: 40rpx;

  .combination {
    margin-left: auto;
    margin-right: auto;

    .attribute {
      color: #007aff;
      font-size: 30rpx;
    }

    .content {
      color: #37393a;
      font-size: 40rpx;
    }
  }
}

.dd {
  border-radius: 6px !important;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50rpx;
  width: 90%;
  height: 60rpx;
  color: white;
  background: linear-gradient(90deg, #06abf3, white);
}
</style>
