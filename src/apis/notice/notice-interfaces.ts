import { Admin, News, Notice } from "../schemas";

export interface GetNewsReq {
  communityId: string;
}

export interface GetNoticeReq {
  communityId?: string;
}

export interface GetNewsResp {
  code: number;
  msg: string;
  news: News[];
}

export interface GetAdminsReq {
  communityId: string;
}

export interface GetAdminsResp {
  code: number;
  msg: string;
  admins: Admin[];
}

export interface GetNoticesResp {
  code: number;
  msg: string;
  notices: Notice[];
}

export interface NewNoticeReq {
  id?: string;
  text: string;
}

export interface NewNoticeResp {
  code: number;
  msg: string;
  noticeId: string;
}

export interface NewNewReq {
  id?: string;
  imageURL: string;
  linkUrl: string;
  type: string;
}

export interface NewNewResp {
  code: number;
  msg: string;
  newId: string;
}
