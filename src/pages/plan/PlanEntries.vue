<template>
  <PlanEntry v-for="(plan, index) in plans" :key="index" :plan="plan" />
</template>

<script lang="ts" setup>
import { getPlanPreviews } from "@/apis/plan/plan";
import { GetPlanPreviewsReq } from "@/apis/plan/plan-interfaces";
import { Plan } from "@/apis/schemas";
import PlanEntry from "@/pages/plan/PlanEntry.vue";
import { ref, reactive } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
import { StorageKeys } from "@/utils/const";
const getPlanPreviewsReq = reactive<GetPlanPreviewsReq>({
  page: 0,
  onlyCommunityId: uni.getStorageSync(StorageKeys.CommunityId)
});

let allPreviewsLoaded = false;
let isPreviewsLoaded = true;

const plans = ref<Plan[]>([]);

const localGetPlanPreviews = async () => {
  let res = await getPlanPreviews(getPlanPreviewsReq);
  isPreviewsLoaded = false;
  for (let i = 0; i < res?.total; i++) {
    plans.value.push(res.plans[i]);
  }
  isPreviewsLoaded = true;
  getPlanPreviewsReq.page += 1;
  if (res?.total < 10) {
    allPreviewsLoaded = true;
  }
};
localGetPlanPreviews();
onReachBottom(() => {
  if (isPreviewsLoaded && !allPreviewsLoaded) {
    localGetPlanPreviews();
  }
});
</script>

<style scoped lang="scss"></style>
