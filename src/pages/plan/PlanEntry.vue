<template>
  <view
    class="helping-card"
    :style="`background-image: url('${props.plan.coverUrl}')`"
    @click="onClickPlan(props.plan.id)"
  >
    <view class="small-icon">
      <img :src="Icons.Plan_PlanTag" class="plan-tag" />
      <text class="content">{{ planTypeMap(props.plan.planType) }}</text>
    </view>
    <view class="help">
      {{ props.plan.summary }}
    </view>
    <view class="prograss-bar">
      <view>
        <view class="bar-content">
          <text class="txt1">帮助</text>
          <!--            <text class="helped-cat">{{ props.plan.catId }}</text>-->
          <text class="helped-cat">{{ props.plan.catName }}</text>
          <text class="txt2">{{ props.plan.name }}</text>
        </view>
        <progress
          class="progress"
          :percent="(100 * props.plan.nowFish) / props.plan.maxFish"
          activeColor="#2073fb"
          backgroundColor="e6e6e6"
          stroke-width="6"
          active="true"
          border-radius="3"
        />
        <view class="fish-prograss"
          >已获得{{ props.plan.nowFish }}小鱼干助力，还需要{{
            props.plan.maxFish - props.plan.nowFish
          }}小鱼干
        </view>
      </view>
      <view class="help_but"> 去助力 </view>
    </view>
  </view>
  <!--  </div>-->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Plan, PlanType } from "@/apis/schemas";
import { Icons } from "@/utils/url";
import { planTypeMap, onClickPlan } from "@/pages/plan/utils";
import BackgroundImage from "@/components/BackgroundImage.vue";

const props = defineProps<{
  plan: Plan;
}>();
console.log(props.plan);
</script>

<style scoped lang="scss">
.helping-card {
  margin-left: 2.5vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
  border-radius: 2vw;
  width: 95vw;
  height: 60vw;
  //background-color: #a2a4a7;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .small-icon {
    transform: translateY(3vw);

    .plan-tag {
      position: absolute;
      top: 0;
      height: 8vw;
      width: 28vw;
    }

    .content {
      position: absolute;
      color: #ffffff;
      font-size: 4vw;
      font-weight: bold;
      letter-spacing: 0.5vw;
      left: 4vw;
      top: 1vw;
    }
  }

  .help {
    margin-top: 28vw;
    margin-left: 4vw;
    z-index: 1;
    width: 88vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
    font-size: 5vw;
    font-weight: bolder;
    letter-spacing: 0.5vw;
  }
  .prograss-bar::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0vw 15vw 5vw rgba(0, 0, 0, 0.8);
    z-index: 0;
  }
  .prograss-bar {
    display: flex;
    flex-direction: column;
    margin-left: 3.5vw;
    background-color: #ffffff;
    border-radius: 2vw;
    width: 88vw;
    height: 20vw;
    margin-top: 2vw;
    position: relative;
    .bar-content {
      display: flex;
      flex-direction: row;

      .txt1 {
        margin-left: 3vw;
        margin-top: 1vw;
        color: #000000;
        font-size: 4.5vw;
        font-weight: bold;
      }

      .txt2 {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #000000;
        font-size: 4.5vw;
        font-weight: bold;
      }

      .helped-cat {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f6bff;
        font-size: 4.5vw;
        font-weight: bold;
      }
    }

    .progress {
      margin-top: 2vw;
      margin-left: 3vw;
      position: relative;
      z-index: 1;
      width: 55vw;
    }

    .help_but {
      background-color: #1f6bff;
      color: #ffffff;
      font-size: 3.5vw;
      width: 18vw;
      height: 8vw;
      border-radius: 5vw;
      display: flex;
      position: absolute;
      z-index: 2;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.3vw;
      margin-left: 65vw;
      top: 6vw;
    }

    .fish-prograss {
      color: #aeaeae;
      font-size: 3vw;
      margin-left: 3vw;
      margin-top: 2vw;
    }
  }
}
</style>
