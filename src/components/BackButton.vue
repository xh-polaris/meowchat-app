<template>
    <view class="goBackButton" @click="goBack">
        <view class="left-arrow"></view>
    </view>
</template>
  
<script setup lang="ts">
const goBack = () => {
    // eslint-disable-next-line no-undef
    // let pages = getCurrentPages(); // 当前页面
    //   let beforePage = pages[pages.length - 2]; // 上一页
    uni.navigateBack({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        success: function () { }
    });
};
</script>
  
<style scoped lang="scss">
.goBackButton {
    position: fixed;
    width: 10vw;
    height: 10vw;
    border-radius: 5vw;
    background-color: #1d1d1d;
    margin-top: -48vw;
    margin-left: 4vw;
    margin-right: 4vw;
    opacity: 0.3;
    z-index: 10;
}

.left-arrow {
    position: fixed;
    border-width: 1vw 1vw 0 0;
    border-color: #ffffff;
    border-style: solid;
    height: 3vw;
    width: 3vw;
    margin-top: 2.7vw;
    margin-left: 3.5vw;
    margin-right: 3.5vw;
    transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
    z-index: 11;
}
</style>
  