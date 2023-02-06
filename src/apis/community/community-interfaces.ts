import { Community } from "../schemas";

export interface GetCommunityInfoResp {
  code: number;
  msg: string;
  communities: Community;
}

export interface UpdateCommunityInfoReq {
  id: string;
  name: string;
  parentId: string;
}

export interface UpdateCommunityInfoResp {
  code: number;
  msg: string;
}
