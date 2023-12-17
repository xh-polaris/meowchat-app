<template>
  <view class="goToMyPlans">
    <img
      :src="Icons.HelpedPlans"
      class="small-icon"
      @click="goToHelpedPlans()"
    />
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

// const donateNum = ref(0);
// const getDonateCount = async () => {
//   const data = await getCountDonate({});
//   if (data.total) {
//     donateNum.value = data.total;
//   }
// };
// getDonateCount();
</script>

<style scoped lang="scss">
.goToMyPlans {
  .small-icon {
    width: 18.9vw;
    height: 15vw;
    position: absolute;
    z-index: 99;
  }
}
</style>
