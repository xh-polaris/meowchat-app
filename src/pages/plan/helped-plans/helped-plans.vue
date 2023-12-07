<template>
  <TopBar :has-go-back="true">
    <template #left>我助力过的小鱼干计划</template>
  </TopBar>
  <view class="background" :style="styleStr">
    <view style="height: 3vw" />
    <view class="plans">
      <view
        v-for="(donations, i) in [donationsLeft, donationsRight]"
        :key="i"
        class="plansColumn"
      >
        <HelpedCard
          v-for="(donation, index) in donations"
          :key="index"
          :donation="donation"
        />
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
import { Donation } from "@/apis/schemas";
import { navBarHeight } from "@/utils/style";
import { ListDonateByUserReq } from "@/apis/plan/plan-interfaces";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
const styleStr = `min-height: calc(100vh - ${navBarHeight}px)`;
const donationsRight = ref<Donation[]>([]);
const donationsLeft = ref<Donation[]>([]);
let page = 0;
const load = async () => {
  const req: ListDonateByUserReq = {
    page
  };
  page++;
  const res = await ListDonateByUser(req);
  for (let i = 0; i < res?.donations?.length; i += 2) {
    donationsLeft.value.push(res.donations[i]);
  }
  for (let i = 1; i < res?.donations?.length; i += 2) {
    donationsRight.value.push(res.donations[i]);
  }
};
load();

onPullDownRefresh(() => {
  donationsLeft.value = [];
  donationsRight.value = [];
  page = 0;
  load();
  uni.stopPullDownRefresh();
});

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
