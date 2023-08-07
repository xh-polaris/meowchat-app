<template>
  <template v-for="school in props.schools" :key="school.id">
    <view
      :class="
        'school ' + (school.id === props.selectedSchoolId ? 'current' : '')
      "
      @click="selectCampus(school.campuses[0].id, school.id)"
    >
      <view class="schoolName">{{ school.name }}</view>
      <view v-if="school.name !== school.campuses[0].name" class="campuses">
        <template v-for="campus in school.campuses" :key="campus.id">
          <view
            :class="
              'campusName ' +
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
  border-radius: 2vw;
  width: 94vw;
  box-sizing: border-box;
  padding: 3vw;
  margin-bottom: 2vw;
  margin-left: 3vw;
  box-shadow: 0 0 0.4vw #b4b4b4;
  &.current {
    box-shadow: none;
    background-color: #a6d9ff;
  }
  .schoolName {
    font-size: 4.7vw;
    font-weight: bold;
  }
  .campuses {
    margin-top: 2vw;
    display: flex;
    .campusName {
      width: fit-content;
      border-radius: 1vw;
      border: 0.4vw solid #222222;
      height: 5.2vw;
      line-height: 5vw;
      padding: 0 1.2vw;
      margin-right: 1vw;
      &.current {
        border-color: #1fa1ff;
        background-color: #1fa1ff;
        color: white;
      }
    }
  }
}
</style>
