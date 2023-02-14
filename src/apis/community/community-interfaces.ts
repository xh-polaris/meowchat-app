import { Community } from "../schemas";

export interface ListCommunityReq {
  parentId?: string;
}

export interface ListCommunityResp {
  code: number;
  msg: string;
  communities: Community[];
}
