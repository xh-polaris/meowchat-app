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
<!--        <text>{{cat.name}}</text>-->
      </view>
      <progress
        :percent="data.percent" :stroke-width="10"
        backgroundColor="#F5F5F5" border-radius="6px"
      />
      <view class="text-box2">
        <text>{{ data.percent }}人气值</text>
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
    <view class="divider" />
    <view class="photo">
      <text>
        猫片(99+)
      </text>
      <view class="dd">
        撸猫指南：胆小怕生
      </view>
      <view class="imgs">
        <text>
          11月
        </text>
        <view class="qz_imgs qz_imgs3 clearfix">
          <view :v-for="index in data.num">
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
          </view>
        </view>
      </view>
      <view class="imgs">
        <text>
          11月
        </text>
        <view class="qz_imgs qz_imgs3 clearfix">
          <view :v-for="index in data.num">
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
          </view>
        </view>
      </view>
      <view class="imgs">
        <text>
          11月
        </text>
        <view class="qz_imgs qz_imgs3 clearfix">
          <view :v-for="index in data.num">
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
            <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {Cat} from "@/apis/schemas";
import {getCatDetail, getCatPreviews} from "@/apis/collection/collection";
import {GetCatDetailReq, GetCatPreviewsReq} from "@/apis/collection/collection-interfaces";

const props = defineProps< {
  id: string
} >()
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id,
})

// let cat2: Cat
// const cat = ref<Cat>()
// getCatDetail(getCatDetailReq).then(res => {
//   cat.push = res.cat
//   // cat.value.name = (res.cat.name)
//   console.log(cat)
// })


const data = reactive({
  percent: 73,
  num: [1, 2, 3, 4, 5]
});

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
    width: 250rpx;
    margin-left: auto;
    margin-right: auto;

    .attribute {
      text-align: center;
      color: #007aff;
      font-size: 30rpx;
    }

    .content {
      text-align: center;
      color: #37393a;
      font-size: 40rpx;
    }
  }
}

.divider {
  background: #E0E3DA;
  width: 100%;
  height: 10rpx;
  margin-top: 30rpx;
}

.photo {
  margin-top: 50rpx;

  text {
    color: #212223;
    font-size: 50rpx;
    margin-left: 20rpx;

  }

  .dd {
    border-radius: 6px !important;
    margin-left: 20rpx;
    margin-right: auto;
    margin-top: 40rpx;
    width: 90%;
    height: 60rpx;
    color: white;
    background: linear-gradient(90deg, #0688f3, white);
  }


  .imgs {
    margin-top: 40rpx;

    text {
      color: #212223;
      font-size: 30rpx;
      margin-left: 20rpx;

    }

    .qz_imgs {
      position: relative;
      display: flex;
      overflow: hidden;
      // justify-content: space-between;
      // flex-wrap: wrap;
      &.qz_imgs3 {
        image {
          width: 212rpx;
          height: 212rpx;
          object-fit: cover;
          border-radius: 3px;
          float: left;
          margin: 5px;
        }
      }


    }
  }

}


</style>
