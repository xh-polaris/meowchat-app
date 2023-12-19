<template>
  <view class="goToMyPlans">
    <image
      :src="Pictures.HelpedPlanLogo"
      class="small-icon"
      @click="goToHelpedPlans()"
    />
  </view>
</template>

<script setup lang="ts">
import { Pages, Pictures } from "@/utils/url";
const goToHelpedPlans = () => {
  uni.navigateTo({
    url: Pages.HelpedPlans
  });
};
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
