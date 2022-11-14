export interface Cat {
    id: string;
    createAt: string;
    age: string;
    campusId: string;
    color: string;
    details: string;
    name: string;
    popularity: number;
    sex: string;
    status: number;
    area: string;
    isSnipped: boolean;
    isSterilized: boolean;
    avatars: string[];
}

export interface GetCatDetailReq {
    catId: string;
}

export interface GetCatDetailResp {
    code: string;
    msg: string;
    cat: Cat;
}

export interface CatPreview {
    /**
     * 出没区域
     */
    area: string;
    /**
     * 花色
     */
    color: string;
    /**
     * 封面链接
     */
    coverUrl: string;
    id: string;
    /**
     * 是否被当前用户收藏
     */
    isCollected: boolean;
    /**
     * 名字
     */
    name: string;
    campusId: string;
}

export interface GetCatPreviewsResp {
    code: number;
    msg: string;
    cats: Array<CatPreview>;
}

export interface GetAllCatPreviewsByCampusReq {
    campusId: string;
}