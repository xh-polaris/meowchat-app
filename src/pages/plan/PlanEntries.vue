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
const communityId = uni.getStorageSync(StorageKeys.CommunityId);
const getPlanPreviewsReq = reactive<GetPlanPreviewsReq>({
  page: 0
});
if (communityId) {
  getPlanPreviewsReq.onlyCommunityId = communityId;
}

let allPreviewsLoaded = false;
let isPreviewsLoaded = true;

const plans = ref<Plan[]>([]);

const localGetPlanPreviews = async () => {
  let res = await getPlanPreviews(getPlanPreviewsReq);
  isPreviewsLoaded = false;
  for (const plan of res.plans) {
    plans.value.push(plan);
  }
  isPreviewsLoaded = true;
  getPlanPreviewsReq.page += 1;
  if (res.plans.length) {
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
