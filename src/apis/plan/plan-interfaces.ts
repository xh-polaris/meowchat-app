import { Plan, PlanType, User } from "../schemas";

export interface DeletePlanReq {
    planId: string;
}

export interface NewPlanReq {
    catId: string;
    description: string;
    endTime: number;
    id: string;
    imageUrls: string[];
    maxFish: number;
    name: string;
    /**
     * 枚举类型 0:feed 1:castrate 2:heal
     */
    planType: PlanType;
    startTime: number;
}

export interface GetPlanPreviewsReq {
    backward?: number;
    catId?: string;
    lastToken?: string;
    limit?: number;
    onlyUserId?: string;
    page: number;
    [property: string]: any;
}

export interface GetPlanPreviewsResp {
    plans: Plan[];
    token: string;
    total: number;
    [property: string]: any;
}

export interface GetPlanDetailReq {
    planId?: string;
    [property: string]: any;
}

export interface GetPlanDetailResp {
    plan: Plan;
    [property: string]: any;
}

export interface ListFishByPlanReq {
    planId?: string;
    [property: string]: any;
}

export interface ListFishByPlanResp {
    fishMap: Map<string, number>;
    users: User[];
    [property: string]: any;
}

export interface GetUserFishReq {
    userId?: string;
    [property: string]: any;
}

export interface GetUserFishResp {
    fish: number;
    [property: string]: any;
}

export interface DonateFishReq {
    fish?: number;
    planId?: string;
    [property: string]: any;
}



