<template>
  <view class="goToMyPlans" @click="goToHelpedPlans()">
    <img :src="Icons.GoToPath_Tag" class="small-icon" />
    <text class="goTo_text">已助力{{ donateNum }}个计划</text>
    <!--    <img :src="Icons.GoToArrow" class="arrow" />-->
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
import { ref } from "vue";
import { getCountDonate } from "@/apis/plan/plan";
const goToHelpedPlans = () => {
  uni.navigateTo({
    url: Pages.HelpedPlans
  });
};

const donateNum = ref(0);
const getDonateCount = async () => {
  const data = await getCountDonate({});
  if (data.total) {
    donateNum.value = data.total;
  }
};
getDonateCount();
</script>

<style scoped lang="scss">
.goToMyPlans {
  border-radius: 2vw;
  height: 12vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 3vw;
  width: 46vw;

  .small-icon {
    height: 7vw;
    width: 7vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }

  .goTo_text {
    color: #00365c;
    font-size: 4vw;
    margin-right: 2vw;
    font-weight: bold;
    letter-spacing: 0.1vw;
  }

  .arrow {
    height: 3vw;
    width: 1.8vw;
    margin-right: 2.5vw;
  }
}
</style>
