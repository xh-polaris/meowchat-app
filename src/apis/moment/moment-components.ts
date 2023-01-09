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
}

export interface GetMomentPreviewsReq {
  page: number;
  communityId: string;
}

export interface GetMomentPreviewsResp {
  code: number;
  msg: string;
  moments: Moment[];
}

export interface GetMomentDetailReq {
  momentId: string;
}

export interface GetMomentDetailResp {
  moment: Moment;
  code: number;
  msg: string;
}
