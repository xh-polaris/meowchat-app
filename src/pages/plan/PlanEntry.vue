<template>
  <view
    class="helping-card"
    :style="`background-image: url('${props.plan.coverUrl}')`"
    @click="onClickPlan(props.plan.id)"
  >
    <view class="small-icon">
      <image
        :src="
          props.plan.planType === PlanType.TypeFeed ||
          props.plan.planType === PlanType.TypeSupply
            ? Icons.Plan_PlanSnacksTag
            : Icons.Plan_PlanHealthTag
        "
        class="plan-tag"
      />
      <text class="content">{{ planTypeMap(props.plan.planType) }}</text>
    </view>
    <view class="progress-bar">
      <view>
        <view class="bar-content">
          <text class="txt1">帮助</text>
          <text
            :class="`helped-cat-${planKeyMap[props.plan.planType] || 'health'}`"
            >{{ props.plan?.cat?.name || "全体猫猫" }}</text
          >
          <text class="txt2">{{ props.plan.name }}</text>
        </view>
        <view class="progress-out"
          ><view
            :class="`progress-${planKeyMap[props.plan.planType] || 'health'}`"
            :style="{
              width: (55 * props.plan.nowFish) / props.plan.maxFish + 'vw'
            }"
        /></view>
        <view class="fish-progress"
          >已获得{{ props.plan.nowFish }}小鱼干助力，还需要{{
            props.plan.maxFish - props.plan.nowFish
          }}小鱼干
        </view>
      </view>
      <view :class="`help-but-${planKeyMap[props.plan.planType] || 'health'}`">
        去助力
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Plan, PlanType } from "@/apis/schemas";
import { Icons } from "@/utils/url";
import { onClickPlan, planTypeMap } from "@/pages/plan/utils";

const props = defineProps<{
  plan: Plan;
}>();

const planKeyMap: Record<PlanType, string> = {
  [PlanType.TypeCastrate]: "castrate",
  [PlanType.TypeHeal]: "health",
  [PlanType.TypeFeed]: "snacks",
  [PlanType.TypeSupply]: "supply"
};
</script>

<style scoped lang="scss">
.helping-card {
  margin-left: 2.5vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
  border-radius: 2vw;
  width: 95vw;
  height: 60vw;
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

  .progress-bar::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0vw 15vw 5vw rgba(0, 0, 0, 0.8);
    border-radius: 2vw;
    z-index: 0;
  }
  .progress-bar {
    display: flex;
    flex-direction: column;
    margin-left: 3.5vw;
    background-color: #ffffff;
    border-radius: 2vw;
    width: 88vw;
    height: 20vw;
    margin-top: 36.5vw;
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
      .helped-cat-castrate {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f6bff;
        font-size: 4.5vw;
        font-weight: bold;
      }
      .helped-cat-health {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f6bff;
        font-size: 4.5vw;
        font-weight: bold;
      }
      .helped-cat-snacks {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f86ff;
        font-size: 4.5vw;
        font-weight: bold;
      }
      .helped-cat-supply {
        margin-left: 0.1vw;
        margin-top: 1vw;
        color: #1f86ff;
        font-size: 4.5vw;
        font-weight: bold;
      }
    }

    .progress-out {
      margin-left: 2vw;
      margin-right: 5vw;
      width: 55vw;
      height: 2vw;
      border-radius: 1vw;
      background: #dcdcdc;
      margin-top: 2.5vw;

      .progress-castrate {
        width: 55vw;
        height: 2vw;
        background: linear-gradient(90deg, #1f28ff 10.92%, #1f86ff 84.48%);
        border-radius: 1vw;
      }
      .progress-health {
        width: 55vw;
        height: 2vw;
        background: linear-gradient(90deg, #1f28ff 10.92%, #1f86ff 84.48%);
        border-radius: 1vw;
      }
      .progress-snacks {
        width: 55vw;
        height: 2vw;
        background: linear-gradient(270deg, #1fc9ff 4.2%, #1f86ff 100%);
        border-radius: 1vw;
      }
      .progress-supply {
        width: 55vw;
        height: 2vw;
        background: linear-gradient(270deg, #1fc9ff 4.2%, #1f86ff 100%);
        border-radius: 1vw;
      }
    }

    .help-but-castrate {
      background-color: #1f6bff;
      color: #ffffff;
      font-size: 3.7vw;
      font-weight: bolder;
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
    .help-but-health {
      background-color: #1f6bff;
      color: #ffffff;
      font-size: 3.7vw;
      font-weight: bolder;
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
    .help-but-snacks {
      background-color: #1fa1ff;
      color: #ffffff;
      font-size: 3.7vw;
      font-weight: bolder;
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
    .help-but-supply {
      background-color: #1fa1ff;
      color: #ffffff;
      font-size: 3.7vw;
      font-weight: bolder;
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
    .fish-progress {
      color: #aeaeae;
      font-size: 3vw;
      margin-left: 3vw;
      margin-top: 2vw;
    }
  }
}
</style>
