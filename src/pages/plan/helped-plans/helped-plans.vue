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
import { list_donate_by_user } from "@/apis/plan/plan";
import { ref } from "vue";
import { planpreviews } from "@/apis/schemas";
import { navBarHeight } from "@/utils/style";
const styleStr = `min-height: calc(100vh - ${navBarHeight}px)`;
console.log(styleStr);
const plansRight = ref<planpreviews[]>([]);
const plansLeft = ref<planpreviews[]>([]);
const ListDonateByUser = async () => {
  const res = await list_donate_by_user({
    limit: 999,
    page: 0
  });
  for (let i = 0; i < res?.total; i = i + 2) {
    plansLeft.value.push(res.planPreviews[i]);
  }
  for (let i = 1; i < res?.total; i = i + 2) {
    plansRight.value.push(res.planPreviews[i]);
  }
};
ListDonateByUser();
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
