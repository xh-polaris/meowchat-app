/**
 * Moment
 */
export interface Moment {
    /**
     * 猫咪id，是否以某猫咪身份发布
     */
    catId?: string;
    /**
     * 社区id
     */
    communityId: string;
    /**
     * 创建时间
     */
    createAt: number;
    id: string;
    /**
     * 图片，第一张做封面
     */
    photos: string[];
    /**
     * 详细内容，文本
     */
    text: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 发布用户
     */
    user: User;
}

/**
 * 发布用户
 *
 * User
 */
export interface User {
    /**
     * 头像链接
     */
    avatarUrl: string;
    id: string;
    /**
     * 昵称
     */
    nickname: string;
}

export interface DeleteMomentReq {
    momentId: string;
}

export interface DeleteMomentResp {
    code: number;
    msg: string;
}

export interface NewMomentReq {
    id?: string; // 留空表示创建
    title: string;
    catId?: string; // 是否以猫咪身份发布
    communityId: string;
    text: string;
    photos: string[];
}

export interface NewMomentResp {
    code: number;
    msg: string;
    momentId: string;
}

export interface GetMomentPreviewsReq {
    page: number;
    communityId: string;
}

export interface GetMomentPreviewsResp {
    code: number;
    msg: string;
    moments: Moment[];
}

export interface GetMomentDetailReq {
    momentId: string;
}

export interface GetMomentDetailResp {
    moment: Moment;
    code: number;
    msg: string;
}

