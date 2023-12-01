import { TargetType } from "@/apis/schemas";

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

export interface GetCountReq {
  targetId: string;
  targetType: TargetType;
}

export interface GetCountResp {
  code: number;
  msg: string;
  count: number;
}

export interface GetUserLikesReq {
  userId?: string;
  targetType: TargetType;
}

export interface GetUserLikesResp {
  code: number;
  likes: Like[];
  msg: string;
}

export interface Like {
  associatedId: string;
  targetId: string;
}
