export interface UserCheckInResp {
  getFish: boolean;
  getFishNum: number;
  getFishTimes: number;
}

export interface getMissionResp {
  SignInTime: number;
  LikeTime: number;
  CommentTime: number;
  ContentTime: number;
  SignInFishes: number[];
  LikeFishes: number[];
  CommentFishes: number[];
  ContentFishes: number[];
}
