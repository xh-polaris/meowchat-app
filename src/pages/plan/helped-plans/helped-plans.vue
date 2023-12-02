<template>
  <TopBar :has-go-back="true">
    <template #left>我助力过的小鱼干计划</template>
  </TopBar>
  <view class="background" :style="styleStr">
    <view style="height: 3vw"></view>
    <view class="plans">
      <view class="plansColumn">
        <HelpedCard
          v-for="(plan, index) in plansLeft"
          :key="index"
          :plan="plan"
        ></HelpedCard>
      </view>
      <view class="plansColumn">
        <HelpedCard
          v-for="(plan, index) in plansRight"
          :key="index"
          :plan="plan"
        ></HelpedCard>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import HelpedCard from "@/pages/plan/helped-plans/HelpedCard.vue";
//到时候background的min高度还要修
import { ListDonateByUser } from "@/apis/plan/plan";
import { ref } from "vue";
import { PlanPreview } from "@/apis/schemas";
import { navBarHeight } from "@/utils/style";
import { ListDonateByUserReq } from "@/apis/plan/plan-interfaces";
import { onReachBottom } from "@dcloudio/uni-app";
const styleStr = `min-height: calc(100vh - ${navBarHeight}px)`;
const plansRight = ref<PlanPreview[]>([]);
const plansLeft = ref<PlanPreview[]>([]);
let page = 0;
const load = async () => {
  const req: ListDonateByUserReq = {
    page
  };
  page++;
  const res = await ListDonateByUser(req);
  for (let i = 0; i < res?.total; i = i + 2) {
    plansLeft.value.push(res.planPreviews[i]);
  }
  for (let i = 1; i < res?.total; i = i + 2) {
    plansRight.value.push(res.planPreviews[i]);
  }
};
load();

onReachBottom(() => {
  load();
});
</script>

<style scoped lang="scss">
.background {
  background-color: #f4f9ff;
  .plans {
    display: flex;
    width: 91vw;
    margin-left: 4.5vw;
    justify-content: space-between;
    .plansColumn {
      width: fit-content;
    }
  }
}
</style>
