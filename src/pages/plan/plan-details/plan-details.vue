<template>
  <template v-if="!isRefreshing">
    <BackgroundImage
      :url="plan?.coverUrl"
      :urls="[plan?.coverUrl]"
    ></BackgroundImage>
    <BackButton></BackButton>
    <view class="background">
      <template v-if="isInited">
        <Cards :plan="plan"></Cards>
      </template>
      <view style="height: 20vw"></view>
    </view>
  </template>

  <BottomBar></BottomBar>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import Cards from "@/pages/plan/plan-details/Cards.vue";
import BottomBar from "@/pages/plan/plan-details/BottomBar.vue";
import BackButton from "@/components/BackButton.vue";
import { GetPlanDetailReq } from "@/apis/plan/plan-interfaces";
import { Plan } from "@/apis/schemas";
import { getPlanDetail } from "@/apis/plan/plan";
import BackgroundImage from "@/components/BackgroundImage.vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";

const props = defineProps<{
  id: string;
}>();

const getPlanDetailReq = reactive<GetPlanDetailReq>({
  planId: props.id
});
const plan = ref<Plan>();

let isInited = ref<boolean>(false);

const getData = async () => {
  plan.value = (await getPlanDetail(getPlanDetailReq)).plan;
  isInited.value = true;
};

const isRefreshing = ref(false);
function pageRefresh() {
  isRefreshing.value = true;
  nextTick(() => {
    isRefreshing.value = false;
  });
}
onPullDownRefresh(() => {
  pageRefresh();
  uni.stopPullDownRefresh();
});

getData();
</script>

<style scoped lang="scss">
.background {
  margin-top: 60vw;
  background-color: #f6f6f6;
  min-height: 80vh;
}

.cat-image {
  position: fixed;
  width: 100vw;
  height: 68vw;
  z-index: -1;
  top: 0;
}
</style>
