import { Comment, Moment, Post, TargetType, User } from "@/apis/schemas";

export interface DoLikeReq {
  targetId: string;
  targetType: TargetType;
}

export interface DoLikeResp {
  getFish: boolean;
  getFishNum: number;
  getFishTimes: number;
}

export interface GetUserLikedReq {
  targetId: string;
  targetType: TargetType;
}

export interface GetUserLikedResp {
  code: number;
  msg: string;
  liked: boolean;
}

export interface GetLikedUsersReq {
  targetId: string;
  targetType: TargetType;
}

export interface GetLikedUsersResp {
  code: number;
  msg: string;
  users: User[];
}

export interface GetCountReq {
  targetId: string;
  targetType: TargetType;
}

export interface GetCountResp {
  code: number;
  msg: string;
  count: number;
}

export interface GetLikeContentsReq {
  userId: string;
  targetType: TargetType;
  lastToken?: string;
  limit?: number;
  page?: number;
}

export interface GetLikeContentsResp {
  code: number;
  msg: string;
  posts: Post[];
  moments: Moment[];
  users: User[];
  comments: Comment[];
  total: number;
  token: string;
}
