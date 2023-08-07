import { School } from "@/pages/school-select/Interfaces";
export const getCurrentSchools = (
  allSchools: School[],
  currentCampusId: string
) => {
  return allSchools.filter((school) => {
    let isCurrent = false;
    school.campuses.forEach((campus) => {
      if (campus.id === currentCampusId) isCurrent = true;
    });
    return isCurrent;
  });
};
export const getFilteredSchools = (
  allSchools: School[],
  filterText: string
) => {
  return allSchools.filter((school) => school.name.includes(filterText));
};
