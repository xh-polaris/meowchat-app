import {User} from "@/apis/moment/moment-components";

/**
 * News
 */
export interface New {
    id: string;
    /**
     * 图片链接
     */
    imageUrl: string;
    /**
     * 点击跳转链接
     */
    linkUrl: string;
    /**
     * 公示类型
     */
    type: string;
    /**
     * 发布者
     */
    user: User;
}

/**
 * Admin
 */
export interface Admin {
    /**
     * 头像
     */
    avatarUrl: string;
    /**
     * 名字
     */
    name: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 微信号
     */
    wechat: string;
}

/**
 * Notice
 */
export interface Notice {
    /**
     * 发布时间
     */
    createAt: string;
    id: string;
    /**
     * 详细内容
     */
    text: string;
    /**
     * 发布者
     */
    user: User;
}

export interface GetNewsResp {
    code: number;
    msg: string;
    news: New[];
}

export interface GetAdminsResp {
    code: number;
    msg: string;
    admins: Admin[];
}

export interface GetNoticesResp {
    code: number;
    msg: string;
    notices: Notice[];
}

export interface NewNoticeReq {
    id?: string;
    text: string;
}

export interface NewNoticeResp {
    code: number;
    msg: string;
    noticeId: string;
}

export interface NewNewReq {
    id?: string;
    imageURL: string;
    linkUrl: string;
    type: string;
}

export interface NewNewResp {
    code: number;
    msg: string;
    newId: string;
}
