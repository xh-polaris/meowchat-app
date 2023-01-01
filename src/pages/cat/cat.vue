<template>
  <view>
    <image :src="mainImgUrl" class="img" />
    <view>
      <ul class="img-ul">
        <li
          v-for="(item,index) in cat.avatars" :key="index"
          class="img-li"
          @click="()=>{mainImgUrl.value = item}"
        >
          <img :src="item" style="width:50px;height:50px">
        </li>
      </ul>
    </view>
    <view class="progress-box">
      <view class="text-box1">
        <text>{{ cat.name }}</text>
      </view>

      <view class="text-box2">
        <progress
          :percent="cat.popularity" :stroke-width="10"
          activeColor="#63A4F9" backgroundColor="#F5F5F5"
          border-radius="6px"
        />
        <text>{{ cat.popularity }}人气值</text>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          年龄
        </view>
        <view class="content">
          {{ cat.age }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          花色
        </view>
        <view class="content">
          {{ cat.color }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          当前地区
        </view>
        <view class="area-content">
          {{ cat.area }}
        </view>
      </view>
    </view>
    <view class="info">
      <view class="combination">
        <view class="attribute">
          性别
        </view>
        <view class="content">
          {{ cat.sex }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          绝育情况
        </view>
        <view class="content">
          {{ Sterilized }}
        </view>
      </view>
      <view class="combination">
        <view class="attribute">
          是否剪耳
        </view>
        <view class="content">
          {{ Snipped }}
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
          {{ cat.details }}
        </text>
      </view>
      <view class="end" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { Cat } from "@/apis/schemas"
import { getCatDetail } from "@/apis/collection/collection"
import { GetCatDetailReq } from "@/apis/collection/collection-interfaces"

const props = defineProps<{
  id: string
}>()
const getCatDetailReq = reactive<GetCatDetailReq>({
  catId: props.id,
})
let Sterilized: string
let Snipped: string
let cat = reactive<Cat>({
  id: "",
  createAt: 0,
  age: "",
  communityId: "",
  color: "",
  details: "",
  name: "",
  popularity: 0,
  sex: "",
  status: 0,
  area: "",
  isSnipped: true,
  isSterilized: true,
  avatars: []
})
const mainImgUrl = ref("")
getCatDetail(getCatDetailReq).then(res => {
      cat.id = res.cat.id
      cat.createAt = res.cat.createAt
      cat.age = res.cat.age
      cat.communityId = res.cat.communityId
      cat.color = res.cat.color
      cat.details = res.cat.details
      cat.name = res.cat.name
      cat.popularity = res.cat.popularity
      cat.sex = res.cat.sex
      cat.status = res.cat.status
      cat.area = res.cat.area
      cat.isSnipped = res.cat.isSnipped
      cat.isSterilized = res.cat.isSterilized
      cat.avatars = res.cat.avatars
      if (res.cat.isSterilized) {
        Sterilized = "是"
      } else {
        Sterilized = "否"
      }
      if (res.cat.isSnipped) {
        Snipped = "是"
      } else {
        Snipped = "否"
      }
      mainImgUrl.value = cat.avatars[0]
    }
)
</script>

<style lang="scss" scoped>
.img-ul {
  position: relative;
  display: flex;
  left: 300rpx;
  width: 360rpx;
  height: 100rpx;
  overflow: hidden;
  list-style: none;
}

.img-li {
  float: left;
  margin: 0 10rpx;
  cursor: pointer;
}

.img-activeBorder {
  border: 3px solid #06abf3;
}

.img {
  width: 100%;
}

.area-content {
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
  margin-top: 20rpx;
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
    margin-top: 20rpx;
    border-radius: 6px !important;
    background: linear-gradient(to right, #CCE9DB, #a40707);
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

  .detail_info {
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
