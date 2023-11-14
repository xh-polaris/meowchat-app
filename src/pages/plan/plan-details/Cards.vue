<template>
  <div class="card1">
    <div class="title">
      帮助<text style="color: #1f5eff">怂怂</text>{{ props.plan.name }}
      <img :src="Icons.State_Frame" class="state-frame" />
      <view class="state">{{ planStateMap(props.plan.planState) }}</view>
    </div>

    <div class="category">
      <view class="category-style">
        <text class="category-content">{{
          planTypeMap(props.plan.planType)
        }}</text>
      </view>
      <view class="category-style">
        <text class="category-content">{{ props.plan.name }}</text>
      </view>
    </div>

    <div class="content">
      {{ props.plan.description }}
      具体说明小鱼干计划的详情介绍，如生病时介绍病情。
      具体说明小鱼干计划的详情介绍，如生病时介绍病情。具体说明小鱼干计划的详情介绍，如生病时介绍病情。
    </div>
  </div>

  <div class="card2">
    <div class="title-target">
      <text class="target">目标小鱼干： {{ props.plan.maxFish }}</text>
      <img :src="Icons.LittleFish" class="small-icon" />
    </div>

    <view class="time">募集时间： 2023/11/03-2023/12/03</view>

    <div class="dialog-box">
      <img :src="Icons.DialogBox" class="box" />
      <view class="dialog-content">
        还差<text style="color: blue">{{
          props.plan.maxFish - props.plan.nowFish
        }}</text
        >小鱼干
      </view>
    </div>

    <view class="progress-box">
      <view
        class="progress"
        :style="{ width: props.plan.nowFish / props.plan.maxFish + '%' }"
      ></view>
    </view>

    <view class="implication"
      >已获得{{ props.plan.nowFish }}小鱼干助力，还需要{{
        props.plan.maxFish - props.plan.nowFish
      }}小鱼干</view
    >
  </div>

  <div class="card3">
    <view>
      <text class="card3-title">执行说明</text>
      <text
        v-if="props.plan.planState === PlanState.StateComplete"
        class="card3-state"
        >已完成</text
      >
    </view>
    <br />
    <text class="card3-details">执行时间：{{ executionDetails.time }}</text>
    <br />
    <text class="card3-details">执行地点：{{ executionDetails.location }}</text>
    <br />
    <text class="card3-details">执行人员：{{ executionDetails.executor }}</text>
  </div>

  <div class="card4">
    <view>
      <text class="card4-title">任务返图</text>
      <text class="page">1/5</text>
    </view>

    <div class="pic-example">
      <img :src="Icons.Task_Pic" class="task-pic" />
      <img :src="Icons.Pic_Left" class="pic-left" />
      <img :src="Icons.Pic_Right" class="pic-right" />
    </div>
  </div>

  <div class="card5">
    <view class="card5-title">任务总结</view>
    <view class="card5-content">
      {{ props.plan.summary }}
    </view>
  </div>
</template>

<script setup lang="ts">
import { Plan, PlanState } from "@/apis/schemas";
import { Icons } from "@/utils/url";
import { planTypeMap, planStateMap } from "@/pages/plan/utils";
import { reactive, ref } from "vue";
const props = defineProps<{
  plan: Plan;
}>();

const executionDetails = ref<{
  time: string;
  location: string;
  executor: string;
}>({
  time: "1",
  location: "2",
  executor: "3"
});

const executionParse = (str: string) => {
  const words = str.split("\n");
  if (words.length === 3) {
    executionDetails.value = {
      time: words[0],
      location: words[1],
      executor: words[2]
    };
  }
};

const init = () => {
  executionParse(props.plan.instruction);
  console.log(props.plan);
};

init();
</script>

<style scoped lang="scss">
.card1 {
  border-radius: 2vw;
  width: 91.7vw;
  background-color: white;
  flex-direction: row;
  margin: 4vw;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 4vw;

  .title {
    font-size: 4.5vw;
    letter-spacing: 0.4vw;
    font-weight: bold;
    margin-left: 5vw;
    writing-mode: horizontal-tb;
    text-align: left;
    display: inline-block;
    margin-top: 5vw;
    margin-bottom: -2vw;

    .state-frame {
      display: flex;
      height: 5.9vw;
      width: 18.46vw;
      margin-left: 67vw;
      margin-top: -6vw;
    }

    .state {
      font-size: 3.7vw;
      color: royalblue;
      letter-spacing: 0.3vw;
      font-weight: bold;
      position: relative;
      left: 69.5vw;
      top: -5.53vw;
    }
  }

  .category {
    display: flex;
    width: 85vw;
    margin-bottom: 4.5vw;
    margin-left: 5vw;
    height: 7.2vw;
    margin-top: -3vw;

    .category-style {
      font-size: 3.5vw;
      letter-spacing: 0.2vw;
      font-weight: bold;
      padding: 0.5vw 1.5vw;
      margin-right: 3vw;
      border: 0.7vw solid transparent;
      border-radius: 1vw;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #fff, #fff),
        linear-gradient(to right, #0000ff, #1e90ff);
    }

    .category-content {
      background: linear-gradient(to right, #0000ff, #1e90ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  .content {
    font-size: 3vw;
    letter-spacing: 0.4vw;
    color: grey;
    margin-left: 5vw;
    margin-right: 3vw;
    display: flex;
    text-align: left;
  }
}

.card2 {
  border-radius: 2vw;
  width: 91.7vw;
  background-color: white;
  flex-direction: row;
  margin: 4vw;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 5vw;
  padding-bottom: 5vw;
  padding-left: 0.8vw;
  padding-right: 0.8vw;

  .title-target {
    width: 100vw;
    display: flex;
    margin-bottom: 2.2vw;

    .target {
      font-size: 4.5vw;
      letter-spacing: 0.4vw;
      font-weight: bold;
      margin-left: 5vw;
      writing-mode: horizontal-tb;
      text-align: left;
    }

    .small-icon {
      height: 6vw;
      width: 6vw;
      margin-left: 1vw;
    }
  }

  .time {
    font-size: 3.5vw;
    letter-spacing: 0.4vw;
    color: grey;
    margin-left: 5vw;
    margin-top: 0;
    margin-bottom: 5vw;
  }

  .dialog-box {
    margin-bottom: 0;
    position: relative;

    .box {
      width: 35vw;
      height: 12vw;
      margin-left: 38vw;
      z-index: 0;
      margin-top: -2vw;
    }

    .dialog-content {
      font-size: 4vw;
      font-weight: bold;
      letter-spacing: 0.4vw;
      z-index: 1;
      margin-left: 42vw;
      position: relative;
      top: -11.5vw;
    }
  }

  .progress-box {
    margin-left: 5vw;
    margin-right: 5vw;
    width: 83vw;
    height: 2vw;
    border-radius: 1vw;
    background: #dcdcdc;
    margin-top: -5vw;

    .progress {
      width: 60vw;
      height: 2vw;
      background: linear-gradient(to right, #191970, #0000ff, #1e90ff);
      border-radius: 1vw;
    }
  }

  .implication {
    font-size: 3vw;
    letter-spacing: 0.1vw;
    color: grey;
    margin-left: 5vw;
    margin-top: 1.5vw;
    margin-bottom: 3vw;
  }
}

.card3 {
  border-radius: 2vw;
  width: 91.7vw;
  background-color: white;
  flex-direction: row;
  margin: 4vw;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 5vw;
  padding-bottom: 5vw;
  padding-left: 0.8vw;
  padding-right: 0.8vw;

  .card3-title {
    font-size: 4.5vw;
    letter-spacing: 0.4vw;
    margin-left: 5vw;
    font-weight: bold;
  }

  .card3-state {
    background-color: dodgerblue;
    color: white;
    font-size: 3.5vw;
    font-weight: bold;
    letter-spacing: 0.3vw;
    border-radius: 1vw;
    padding: 0.5vw 1.7vw;
    margin-left: 4vw;
  }

  .card3-details {
    font-size: 3.3vw;
    letter-spacing: 0.3vw;
    color: grey;
    margin-left: 5vw;
  }
}

.card4 {
  border-radius: 2vw;
  width: 91.7vw;
  background-color: white;
  flex-direction: row;
  margin: 4vw;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 0vw;
  position: relative;

  .card4-title {
    font-size: 4.5vw;
    letter-spacing: 0.4vw;
    font-weight: bold;
    margin-left: 5vw;
    writing-mode: horizontal-tb;
    text-align: left;
    display: inline-block;
    margin-top: 5vw;
    margin-bottom: -2vw;
  }

  .page {
    font-size: 3vw;
    color: grey;
    margin-left: 58vw;
  }

  .pic-example {
    .task-pic {
      width: 91.7vw;
      height: 51.8vw;
      text-align: center;
      margin-left: -1vw;
      margin-top: 3vw;
      margin-bottom: -9vw;
    }

    .pic-left {
      width: 6.9vw;
      height: 6.9vw;
      margin-left: 3vw;
      position: absolute;
      top: 37vw;
      left: 0vw;
    }

    .pic-right {
      width: 6.9vw;
      height: 6.9vw;
      margin-left: 3vw;
      position: absolute;
      top: 37vw;
      left: 78vw;
    }
  }
}

.card5 {
  border-radius: 2vw;
  width: 91.7vw;
  background-color: white;
  flex-direction: row;
  margin: 4vw;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 4vw;

  .card5-title {
    font-size: 4.5vw;
    letter-spacing: 0.4vw;
    font-weight: bold;
    margin-left: 5vw;
    writing-mode: horizontal-tb;
    text-align: left;
    display: inline-block;
    margin-top: 5vw;
    margin-bottom: 3vw;
  }

  .card5-content {
    font-size: 3vw;
    letter-spacing: 0.4vw;
    color: grey;
    margin-left: 5vw;
    margin-right: 3vw;
    display: flex;
    text-align: left;
  }
}
</style>
