<template>
  <view class="status-bar">
    <image
      v-if="backIcon==='true'" class="back-icon"
      src="/static/images/left-black.png"
      @click="back"
    />
    <view class="title">
      {{ title }}
    </view>
  </view>
  <view class="place-holder" />
</template>
  
<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps<{ title: string, backIcon: string }>()
const title = ref(props.title)
const backIcon = ref(props.backIcon)

const back = () => { 
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
$nav-height: 44px;

.status-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: #ffffff;
    height: $nav-height;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;

    .back-icon {
      width: 7px;
      height: 14px;
      margin-left: 15px;
    }

    .title {
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.place-holder{
  height: $nav-height;
}
</style>

