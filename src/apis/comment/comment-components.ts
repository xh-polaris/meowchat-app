import {User} from "@/apis/moment/moment-components";

/**
 * Comment
 */
export interface Comment {
    /**
     * 评论的评论数
     */
    comments: number;
    /**
     * 创建时间
     */
    createAt: number;
    id: string;
    /**
     * 点赞量
     */
    likes: number;
    /**
     * 想要回复的用户名
     */
    replyName?: string;
    /**
     * 评论的具体内容
     */
    text: string;
    /**
     * 评论者信息
     */
    user: User;
}

export interface GetCommentsReq {
    // 作用域，如动态、帖子、评论
    scope: string;
    page: number;
    id: string;
}

export interface GetCommentsResp {
    code: number;
    msg: string;
    comments: Comment[];
}

export interface NewCommentReq {
    text: string;
    ownerId: string;
    type: string;
}

export interface NewCommentResp {
    code: number;
    msg: string;
}



