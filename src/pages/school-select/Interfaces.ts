export interface Campus {
  id: string;
  name: string;
  parentId: string;
}
export interface School {
  id: string;
  name: string;
  campuses: Campus[];
}
