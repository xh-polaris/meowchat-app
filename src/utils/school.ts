import { Community } from "@/apis/schemas";
import { reactive, ref } from "vue";
import { listCommunity } from "@/apis/community/community";

const parentId = ref("");
const currentSchool = ref("");
const currentCampus = ref("");

const lists = reactive<{ data: Community[] }>({ data: [] });
async function schoolList() {
  lists.data = (await listCommunity({})).communities;
}
export const getSchoolName = (communityId: string) => {
  schoolList();
  for (const data of lists.data) {
    if (data.id === communityId) {
      currentCampus.value = data.name;
      parentId.value = data.parentId || "";
    }
  }
  for (const data of lists.data) {
    if (data.id === parentId.value) {
      currentSchool.value = data.name;
    }
  }
  return currentCampus.value != currentSchool.value
    ? `${currentSchool.value}-${currentCampus.value}`
    : currentSchool.value;
};
