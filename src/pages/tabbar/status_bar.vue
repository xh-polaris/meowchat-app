<template>
  <view class="status-bar">
    <view class="message-box">
      <view class="badge">
        {{ messageCount }}
      </view>
    </view>

    <view class="title">
      {{ title }}
    </view>
  </view>
  <view class="place-holder"></view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{ messageCount: string, title: string }>()
let messageCount = ref(Number(props.messageCount));
let title = ref(props.title)
</script>


<style lang="scss" scoped>
$nav-height: 44px;

.status-bar {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 999;
    background-color: #ffffff;
    height: $nav-height;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;

    .message-box {
        width: 23px;
        height: 17px;
        margin-left: 15px;
        background: url("../../static/images/status_message.svg");
        position: relative;

        .badge{
            position: absolute;
            left:50%;
            top: 25%;
            font-size: 10px;
            background-color: #DF1A1A;
            border: 1px solid #fff;
            border-radius: 10px;
            width: 20px;
            height: 13px;
            line-height: 13px;
            text-align: center;
            color: #fff;
        }
    }

    .title {
      font-size:18px;
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

