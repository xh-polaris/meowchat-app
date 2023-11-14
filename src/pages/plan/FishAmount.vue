<template>
  <view class="frame">
    <img :src="Icons.LittleFish" class="small-icon" />
    <text class="text"
      >剩余<text style="color: dodgerblue">{{ fishNum }}</text
      >小鱼干</text
    >
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icons } from "@/utils/url";
import { getUserFish } from "@/apis/plan/plan";

const fishNum = ref(0);
const getFishNum = async () => {
  const data = await getUserFish({});
  fishNum.value = data.fish;
};
getFishNum();
</script>

<style scoped lang="scss">
.frame {
  border-radius: 2vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 46vw;
  height: 12vw;

  .small-icon {
    height: 7vw;
    width: 7vw;
    margin-left: 3vw;
    margin-right: 2vw;
  }

  .text {
    color: #00365c;
    font-size: 4vw;
    margin-right: 2.5vw;
    font-weight: bold;
    letter-spacing: 0.1vw;
  }
}
</style>
