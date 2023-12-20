<template>
  <view class="frame">
    <img :src="Icons.LittleFish" class="small-icon" />
    <text class="text"
      >剩余<text
        style="color: dodgerblue; font-size: 3.8vw; font-style: italic"
        >{{ fishNum }}</text
      ></text
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
  border-radius: 5vw;
  //border: 0.5px solid;
  background: #ecf2ff;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 26.41vw;
  height: 9.23vw;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 4px -1px #1f6bff1f;
  .small-icon {
    height: 8.46vw;
    width: 8.46vw;
    margin-top: -2.5vw;
    position: absolute;
    z-index: 2;
  }
  .text {
    color: #00365c;
    font-size: 3.2vw;
    margin-left: 9vw;
    font-weight: bold;
    letter-spacing: 0.1vw;
  }
}
</style>
