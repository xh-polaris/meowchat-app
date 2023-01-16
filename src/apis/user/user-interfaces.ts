import { User } from "../schemas";
export interface GetUserInfoResp {
  code: number;
  msg: string;
  user: User;
}
export interface UpdateUserInfoReq {
  avatarUrl: string;
  nickname: string;
}
export interface UpdateUserInfoResp {
  code: number;
  msg: string;
}
