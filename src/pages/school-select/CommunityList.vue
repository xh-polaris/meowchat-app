<template>
  <template v-for="school in props.schools" :key="school.id">
    <view
      :class="
        'school ' + (school.id === props.selectedSchoolId ? 'current' : '')
      "
      @click="selectCampus(school.campuses[0].id, school.id)"
    >
      <view class="school-name">
        <view class="name">
          <view
            v-if="school.id === props.selectedSchoolId"
            class="current-mark"
          />
          <view style="width: fit-content">{{ school.name }}</view>
        </view>
        <!--        <view v-if="school.id === props.selectedSchoolId" class="current-text"-->
        <!--          >当前</view-->
        <!--        >-->
      </view>
      <view
        v-if="school.name !== school.campuses[0].name"
        class="campuses-frame"
      >
        <view class="campuses">
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
  width: 90vw;
  border-radius: 4vw;
  box-sizing: border-box;
  padding: 3vw 0;
  margin-bottom: 2vw;
  margin-left: 5vw;
  box-shadow: 0.6vw 0.6vw 0.8vw #aaaaaa11;
  &.current {
  }
  .school-name {
    display: flex;
    align-items: center;
    margin-left: 6vw;
    .name {
      width: fit-content;
      font-size: 4.7vw;
      font-weight: bold;
      position: relative;
      .current-mark {
        position: absolute;
        width: 0.6vw;
        height: 5vw;
        background-color: #407ef6;
        transform: translate(-2vw, 1vw);
      }
    }
    .current-text {
      width: fit-content;
      color: #407ef6;
      font-size: 3.6vw;
      margin-left: 2vw;
    }
  }
  .campuses-frame {
    width: 80vw;
    margin-left: 5vw;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .campuses {
      margin-top: 3vw;
      display: flex;
      width: fit-content;
      .campus-name {
        width: 30vw;
        border-radius: 5vw;
        font-size: 3.4vw;
        background-color: #ebf3fe;
        height: 10vw;
        line-height: 10vw;
        padding: 0 2vw;
        margin-right: 2.4vw;
        text-align: center;
        &.current {
          background-color: #407ef6;
          color: white;
        }
      }
    }
  }
}
</style>
