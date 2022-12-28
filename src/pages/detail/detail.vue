<template>
  <view>
    <image :src="Cat.avatars[0]" class="img" />
    <!-- <view class="selector">
      <image src="https://static.xhpolaris.com/dog.jpg" />
      <image src="https://static.xhpolaris.com/dog.jpg" />
      <image src="https://static.xhpolaris.com/dog.jpg" />
    </view>-->
    <view class="progress-box">
      <view class="text-box1">
        <text>{{Cat.name}}</text>
<!--        <text>{{cat.name}}</text>-->
      </view>
      <!--<progress
        :percent="Cat.popularity" :stroke-width="10"
        backgroundColor="#F5F5F5" border-radius="6px"
      />
      <view class="text-box2">
        <text>{{Cat.popularity}}人气值</text>
      </view> -->
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          年龄
        </view>
        <view class="content">
          {{Cat.age}}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          花色
        </view>
        <view class="content">
          {{Cat.color}}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          当前地区
        </view>
        <view class="area_content">
          {{Cat.area}}
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          性别
        </view>
        <view class="content">
          {{Cat.sex}}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          绝育情况
        </view>
        <view class="content">
          {{Sterilized}}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          是否剪耳
        </view>
        <view class="content">
          {{Snipped}}
        </view>
      </view>
    </view>
    <view class="divider" />
    <view class="photo">
      <text>
        详情
      </text>
      <view class="dd">
        <text class="detail_info">
			{{Cat.details}}
		</text>
      </view>
	  <view class="end">
	  </view>
      <!--<view class="imgs">
        <text>
          11月
        </text>
      </view>
      <view class="imgs">
        <text>
          11月
        </text>
        <view class="qz_imgs qz_imgs3 clearfix">
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                </view>
              </view>
              <view class="imgs">
                <text>
                  11月
                </text>
                <view class="qz_imgs qz_imgs3 clearfix">
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                </view>
              </view>
              <view class="imgs">
                <text>
                  11月
                </text>
                <view class="qz_imgs qz_imgs3 clearfix">
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                    <image src="https://static.xhpolaris.com/dog.jpg" mode="aspectFill" />
                </view>
              </view>-->
            </view>
          </view>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {Cat} from "@/apis/schemas";
import {getCatDetail} from "@/apis/collection/collection";
import {GetCatDetailReq} from "@/apis/collection/collection-interfaces";

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
let Sterilized:String
let Snipped:String
let Cat=reactive<Cat>({id:"",
    createAt:0,
    age: "",
    communityId: "",
    color: "",
    details: "",
    name: "",
    popularity: 0,
    sex:"",
    status: 0,
    area: "",
    isSnipped: true,
    isSterilized:true,
    avatars: []})
getCatDetail(getCatDetailReq).then(res=>{
	Cat.id=res.cat.id
    Cat.createAt=res.cat.createAt
	Cat.age=res.cat.age
	Cat.communityId=res.cat.communityId
	Cat.color=res.cat.color
	Cat.details=res.cat.details
	Cat.name=res.cat.name
	Cat.popularity=res.cat.popularity
	Cat.sex=res.cat.sex
	Cat.status=res.cat.status
	Cat.area=res.cat.area
	Cat.isSnipped=res.cat.isSnipped
	Cat.isSterilized=res.cat.isSterilized
	Cat.avatars=res.cat.avatars
	if(res.cat.isSterilized)
	Sterilized="Yes"
	else
	Sterilized="No"
	if(res.cat.isSnipped)
	Snipped="Yes"
	else
	Snipped="No"
}
)
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}
.area_content{
	text-align: center;
	font-size: 30rpx;
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
  margin-top: 10rpx;
  margin-bottom: 20rpx;
}

.photo {
  text-align: center;
  margin-top: 40rpx;
  text {
    color: #212223;
    font-size: 50rpx;
    margin-left: 20rpx;
  }

  .dd {
	text-align: center;
    margin-right: auto;
    margin-top: 20rpx;
    width: 100%;
    color: white;
    background: linear-gradient(90deg, #0688f3, white);
  }
	.end {
	  text-align: center;
	  margin-right: auto;
	  width: 100%;
	  height: 30rpx;
	  color: white;
	 background: linear-gradient(90deg, #0688f3, white);
	}
.detail_info{
	font-size: 40rpx;
	font-weight: 400;
	 width: 100%;
	 margin-bottom: 30rpx;
	
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
