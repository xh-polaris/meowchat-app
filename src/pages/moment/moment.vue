<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @click="onClickImage" />
    <view class="text-area">
      <text class="title">
        {{ title }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { signIn } from "@/apis/account/account"

const onClickImage = () => {
  signIn({
    authType: "wechat",
    authValue: "123"
  })
}
const title = ref("Hello")
</script>

<style lang="scss" scoped>
.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200rpx;
  margin: 200rpx auto 50rpx;
  width: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36rpx;
}
</style>
