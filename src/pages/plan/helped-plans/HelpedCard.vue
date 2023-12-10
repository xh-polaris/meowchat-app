<template>
  <view class="card" @click="onClick">
    <img :src="props.donation.plan.coverUrl" class="image-cat" />

    <text class="title">
      帮助<text style="color: #1f6bff"
        >{{ props.donation.plan?.cat?.name || "全体猫猫" }} </text
      >{{ props.donation.plan.name }}
    </text>
    <view class="school">
      <view class="school-name">{{ currentSchool }}</view>
    </view>
    <view class="bottom">
      <view class="fish-count">
        <img :src="Icons.LittleFish" class="image-fish" />
        <text class="count">×{{ props.donation.donateNum }}</text>
        <view class="date">{{
          displayTimeTotal(props.donation.donateTime)
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Icons, Pages } from "@/utils/url";
import { Donation, Community } from "@/apis/schemas";
import { displayTimeTotal } from "@/utils/time";
import { listCommunity } from "@/apis/community/community";
import { reactive, ref } from "vue";
import { StorageKeys } from "@/utils/const";
let communityId = ref("");
let parentId = ref("");
const currentSchool = ref("");
const currentCampus = ref("");
function init() {
  communityId.value = uni.getStorageSync(StorageKeys.CommunityId);
}

init();

const lists = reactive<{ data: Community[] }>({ data: [] });

const campuses = reactive<{ data: Community[] }>({ data: [] });

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
  schoolList().then(async () => {
    init();
    for (let i = 0; i < lists.data.length; i++) {
      if (lists.data[i].id === communityId.value) {
        currentCampus.value = lists.data[i].name;
        parentId.value = <string>lists.data[i].parentId;
      }
    }
    for (let j = 0; j < lists.data.length; j++) {
      if (lists.data[j].id === parentId.value) {
        currentSchool.value = lists.data[j].name;
      }
    }
    campuses.data = (
      await listCommunity({
        parentId: parentId.value
      })
    ).communities;
  });
}

getCampus();
</script>

<style scoped lang="scss">
.card {
  //display: flex;
  //flex-direction: column;
  background-color: white;
  border-radius: 3vw;
  width: 44vw;
  height: 63vw;
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
  .school {
    display: grid;
    place-items: center; /* 在容器中居中对齐 */
    width: 20vw;
    height: 4.6vw;
    border-radius: 1vw;
    margin-top: 1vw;
    background: #1f6bff36;
    .school-name {
      color: #1f6bff;
      font-size: 2.8vw;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 4vw;
  }

  .date {
    font-size: 3vw;
    color: grey;
    letter-spacing: 0.3vw;
    margin-left: 4vw;
    //margin-bottom: 1vw;
  }

  .fish-count {
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    .image-fish {
      width: 7vw;
      height: 7vw;
    }

    .count {
      width: fit-content;
      font-size: 4.5vw;
      font-style: italic;
      font-weight: bold;
      color: #48282d;
    }
  }
}
</style>
