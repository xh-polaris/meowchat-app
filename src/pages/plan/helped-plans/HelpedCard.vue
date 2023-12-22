<template>
  <view class="card" @click="onClick">
    <image
      mode="aspectFill"
      :src="props.donation.plan.coverUrl"
      class="image-cat"
    />
    <text class="title">
      帮助<text style="color: #1f6bff"
        >{{ props.donation.plan?.cat?.name || "全体猫猫" }} </text
      >{{ props.donation.plan.name }}
    </text>
    <view class="school-box"
      ><view v-if="currentSchool !== currentCampus" class="school">
        <view class="school-name">
          {{ currentSchool }}-{{ currentCampus }}
        </view>
      </view>
      <view v-else class="school">
        <view class="school-name">{{ currentSchool }}</view>
      </view></view
    >
    <view class="bottom">
      <view class="fish-count">
        <img :src="Icons.LittleFish" class="image-fish" />
        <text class="count">x{{ props.donation.donateNum }}</text>
      </view>
      <view class="date">{{
        displayTimeTotal(props.donation.donateTime)
      }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
import { Donation, Community } from "@/apis/schemas";
import { displayTimeTotal } from "@/utils/time";
import { listCommunity } from "@/apis/community/community";
import { reactive, ref } from "vue";
let parentId = ref("");
const currentSchool = ref("");
const currentCampus = ref("");

const lists = reactive<{ data: Community[] }>({ data: [] });

const props = defineProps<{
  donation: Donation;
  community: Community;
}>();
const onClick = () => {
  uni.navigateTo({
    url: `${Pages.PlanDetails}?id=${props.donation.plan.id}`
  });
};
async function schoolList() {
  lists.data = (await listCommunity({})).communities;
}
async function getCampus() {
  await schoolList();
  for (const data of lists.data) {
    if (data.id === props.donation.plan.communityId) {
      currentCampus.value = data.name;
      parentId.value = data.parentId || "";
    }
  }
  for (const data of lists.data) {
    if (data.id === parentId.value) {
      currentSchool.value = data.name;
    }
  }
}

getCampus();
</script>

<style scoped lang="scss">
.card {
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  border-radius: 3vw;
  width: 44vw;
  height: 60vw;
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
    letter-spacing: 0.2vw;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    margin-top: 3vw;
  }

  .date {
    font-size: 2.7vw;
    color: grey;
    position: absolute;
    bottom: 3vw;
    right: 2vw;
  }

  .fish-count {
    display: flex;
    align-items: center;
    margin-top: 1vw;
    margin-bottom: 0;
    .image-fish {
      width: 5.89vw;
      height: 5.89vw;
    }

    .count {
      width: fit-content;
      font-size: 3.7vw;
      font-style: italic;
      font-weight: bold;
      color: #48282d;
    }
  }
}
.school {
  display: inline-block;
  place-items: center;
  border-radius: 1vw;
  margin-top: 2vw;
  background: #1f6bff36;
  padding: 0.8vw;

  .school-name {
    color: #1f6bff;
    font-size: 2.7vw;
  }
}
</style>
