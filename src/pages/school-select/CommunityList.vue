<template>
  <template v-for="school in props.schools" :key="school.id">
    <view
      :class="
        'school ' + (school.id === props.selectedSchoolId ? 'current' : '')
      "
      @click="selectCampus(school.campuses[0].id, school.id)"
    >
      <view class="school-name">
        <view class="name">{{ school.name }} </view>
        <view v-if="school.id === props.selectedSchoolId" class="current-mark"
          >当前</view
        >
      </view>
      <view v-if="school.name !== school.campuses[0].name" class="campuses">
        <template v-for="campus in school.campuses" :key="campus.id">
          <view
            :class="
              'campus-name ' +
              (campus.id === props.selectedCampusId ? 'current' : '')
            "
            @click.stop="selectCampus(campus.id, school.id)"
            >{{ campus.name }}</view
          >
        </template>
      </view>
    </view>
  </template>
</template>

<script setup lang="ts">
import { School } from "@/pages/school-select/Interfaces";
interface Props {
  schools: School[];
  selectedCampusId: string;
  selectedSchoolId: string;
}
const props = withDefaults(defineProps<Props>(), {
  schools: undefined,
  selectedCampusId: "",
  selectedSchoolId: ""
});
const emits = defineEmits(["select-campus"]);
const selectCampus = (campusId: string, schoolId: string) => {
  emits("select-campus", campusId, schoolId);
};
</script>

<style scoped lang="scss">
.school {
  background-color: white;
  //border-radius: 2vw;
  width: 94vw;
  box-sizing: border-box;
  padding: 3vw;
  margin-bottom: -1px;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  //margin-bottom: 2vw;
  margin-left: 3vw;
  //box-shadow: 0 0 0.4vw #b4b4b4;
  &.current {
    box-shadow: none;
    //background-color: #a6d9ff;
  }
  .school-name {
    display: flex;
    align-items: center;
    .name {
      width: fit-content;
      font-size: 4.7vw;
      font-weight: bold;
    }
    .current-mark {
      width: fit-content;
      color: #1fa1ff;
      font-size: 3.6vw;
      margin-left: 2vw;
    }
  }
  .campuses {
    margin-top: 2vw;
    display: flex;
    .campus-name {
      width: fit-content;
      border-radius: 3vw;
      border: 1px solid #222222;
      height: 6vw;
      line-height: 6vw;
      padding: 0 2vw;
      margin-right: 2vw;
      &.current {
        border-color: #1fa1ff;
        background-color: #1fa1ff;
        color: white;
      }
    }
  }
}
</style>
