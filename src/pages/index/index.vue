<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"/>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const title = ref("Hello");
</script>

//<style scoped >
.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200px;
  margin: 200px auto 50px;
  width: 200px;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36px;
}
</style>
