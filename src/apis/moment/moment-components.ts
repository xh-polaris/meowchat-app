import { Moment } from "../schemas";

export interface DeleteMomentReq {
  momentId: string;
}

export interface DeleteMomentResp {
  code: number;
  msg: string;
}

export interface NewMomentReq {
  id?: string; // 留空表示创建
  title: string;
  catId?: string; // 是否以猫咪身份发布
  communityId: string;
  text: string;
  photos: string[];
}

export interface NewMomentResp {
  code: number;
  msg: string;
  momentId: string;
  getFish: boolean;
  getFishTimes: number;
  getFishNum: number;
}

export interface GetMomentPreviewsReq {
  communityId?: string;
  isParent?: number;
  onlyUserId?: string;
  keyword?: string;

  backward?: number;
  lastToken?: string;
  limit?: number;
  page?: number;
  offset?: number;
}

export interface GetMomentPreviewsResp {
  code: number;
  msg: string;
  moments: Moment[];
  total: number;
  token: string;
}

export interface GetMomentDetailReq {
  momentId: string;
}

export interface GetMomentDetailResp {
  moment: Moment;
  code: number;
  msg: string;
}
