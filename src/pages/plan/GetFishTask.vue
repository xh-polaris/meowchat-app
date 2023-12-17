<template>
  <view class="goToMyPlans" @click="togglePanel">
    <img :src="Icons.GoToPath_Tag" class="small-icon" />
    <text class="goTo_text">领取小鱼干</text>
    <img :src="Icons.GoToArrow" class="arrow" />
  </view>
  <view v-if="showPanel" class="shadow" @click="hidePanel">
    <view v-if="showPanel" class="panel" @click.stop.prevent>
      <view class="top-box">
        <img :src="Icons.TaskLogo" class="task-icon" />
        <FishAmount class="fish-count" />
      </view>
      <view class="box1">
        <TodayCheckIn />
      </view>
      <view class="box2">
        <MomentTask />
      </view>
      <view class="box3">
        <CommentTask />
      </view>
      <view class="box4">
        <LikeTask />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
import { ref } from "vue";
import FishAmount from "@/pages/plan/FishAmount.vue";
import TodayCheckIn from "@/pages/plan/TodayCheckIn.vue";
import MomentTask from "@/pages/plan/MomentTask.vue";
import CommentTask from "@/pages/plan/CommentTask.vue";
import LikeTask from "@/pages/plan/LikeTask.vue";

const showPanel = ref(false);

const togglePanel = () => {
  showPanel.value = !showPanel.value;
};

const hidePanel = () => {
  showPanel.value = false;
};
// const emit = defineEmits<(e: "onHelpClick") => void>();
// function onHelpClick() {
//   emit("onHelpClick");
// }
</script>

<style scoped lang="scss">
.goToMyPlans {
  border-radius: 5vw;
  height: 9.23vw;
  background-color: #feffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 3vw;
  width: 41vw;
  box-shadow: 0 2px 4px -1px #1f6bff1f;

  .small-icon {
    height: 6.41vw;
    width: 6.41vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }

  .goTo_text {
    color: #00365c;
    font-size: 3.9vw;
    margin-right: 2vw;
    font-weight: bold;
    letter-spacing: 0.2vw;
  }

  .arrow {
    height: 3vw;
    width: 1.8vw;
    margin-left: 2vw;
  }
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 20vh;
  width: 100vw;
  height: 80vh;
  background-color: #22222288;
  display: flex;
  z-index: 100;
}
.panel {
  position: fixed;
  display: flex;
  flex-direction: column;
  //top: 73vw;
  top: 30vw;
  left: 0;
  background-color: #ffffff;
  width: 100vw;
  height: 175vw;
  border-radius: 6vw;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); // 阴影效果
  overflow: hidden;
  .top-box {
    display: flex;
    position: fixed;
    width: 100vw;
    height: 16vw;
    align-items: center;
    .task-icon {
      width: 30vw;
      height: 5vw;
      margin-left: 5vw;
      margin-top: 1vw;
    }
    .fish-count {
      margin-left: 35vw;
    }
  }
  .box1 {
    margin-top: 15vw;
  }
  .box2 {
    margin-top: 5vw;
  }
  .box3,
  .box4 {
    margin-top: 2vw;
  }
}
</style>
