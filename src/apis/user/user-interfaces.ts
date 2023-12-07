import { User } from "../schemas";

export interface GetUserInfoResp {
  code: number;
  msg: string;
  user: User;
}

export interface GetUserInfoReq {
  userId?: string;
}

export interface UpdateUserInfoReq {
  avatarUrl?: string;
  nickname?: string;
  motto?: string;
}

export interface UpdateUserInfoResp {
  code: number;
  msg: string;
}

export interface UserCheckInResp {
  getFish: boolean;
  getFishNum: number;
}
