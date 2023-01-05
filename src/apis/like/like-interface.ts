import {TargetType} from "@/apis/schemas";

export interface DoLikeReq {
    targetId: string;
    targetType: TargetType;
}

export interface DoLikeResp {
    code: number;
    msg: string;
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
