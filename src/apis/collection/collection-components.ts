/**
 * Cat
 */
export interface Cat {
    /**
     * 年龄
     */
    age: string;
    /**
     * 出没区域
     */
    area: string;
    /**
     * 猫咪头像
     */
    avatars: string[];
    /**
     * 花色
     */
    color: string;
    /**
     * 社区id
     */
    communityId: string;
    /**
     * 创建时间
     */
    createAt: number;
    /**
     * 介绍
     */
    details: string;
    id: string;
    /**
     * 是否剪耳
     */
    isSnipped: boolean;
    /**
     * 是否绝育
     */
    isSterilized: boolean;
    /**
     * 名字
     */
    name: string;
    /**
     * 人气值
     */
    popularity: number;
    /**
     * 猫咪性别
     */
    sex: string;
    /**
     * 猫咪状态
     */
    status: number;
}

export interface GetCatPreviewsReq {
    page: number;
    name: string; // 条件
}

export interface GetCatPreviewsResp {
    cats: Cat[];
    code: number;
    msg: string;
}

export interface GetCatDetailReq {
    catId: string;
}

export interface GetCatDetailResp {
    cat: Cat;
    code: number;
    msg: string;
}

export interface NewCatReq {
    id: string;
    age: string;
    communityId: string;
    color: string;
    details: string;
    name: string;
    popularity: number;
    sex: string;
    area: string;
    isSnipped: boolean;
    isSterilized: boolean;
    avatars: string[];
}

export interface NewCatResp {
    code: number;
    msg: string;
    catId: string;
}

export interface DeleteCatReq {
    catId: string;
}

export interface DeleteCatResp {
    code: number;
    msg: string;
}