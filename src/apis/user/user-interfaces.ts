import { User } from "../schemas";
export interface GetUserResp {
  code: number;
  msg: string;
  user: User;
}
export interface UpdateUserReq {
  avatarUrl: string;
  nickname: string;
}
export interface UpdateUserResp {
  code: number;
  msg: string;
}
