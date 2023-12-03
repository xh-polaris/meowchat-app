<template>
  <view class="card" @click="onClick">
    <img :src="props.donation.plan.coverUrl" class="image-cat" />

    <text class="title">
      帮助<text style="color: #1f6bff"
        >{{ props.donation.plan?.cat?.name || "全体猫猫" }} </text
      >{{ props.donation.plan.name }}
    </text>
    <view class="date">{{ displayTime(props.donation.donateTime) }}</view>

    <view class="fish-count">
      <img :src="Icons.LittleFish" class="image-fish" />
      <text class="count">×{{ props.donation.donateNum }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
import { Donation } from "@/apis/schemas";
import { displayTime } from "@/utils/time";

const props = defineProps<{
  donation: Donation;
}>();
const onClick = () => {
  uni.navigateTo({
    url: `${Pages.PlanDetails}?id=${props.donation.plan.id}`
  });
};
</script>

<style scoped lang="scss">
.card {
  background-color: white;
  border-radius: 3vw;
  width: 44vw;
  height: 52vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2vw;
  box-sizing: border-box;
  margin-bottom: 3vw;

  .image-cat {
    width: 40vw;
    height: 29vw;
    border-radius: 2vw;
    margin-bottom: 1vw;
  }

  .title {
    font-size: 3.5vw;
    color: black;
    font-weight: bold;
    letter-spacing: 0.3vw;
  }

  .date {
    font-size: 3vw;
    color: grey;
    letter-spacing: 0.3vw;
    margin-bottom: 1vw;
  }

  .fish-count {
    display: flex;
    .image-fish {
      width: 7vw;
      height: 7vw;
    }
    .count {
      width: fit-content;
      font-size: 4.5vw;
      color: brown;
    }
  }
}
</style>
