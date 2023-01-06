export interface GetCommentsReq {
    // 作用域，如动态、帖子、评论
    scope: number;
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
    id: string;
    scope: number;
}

export interface NewCommentResp {
    code: number;
    msg: string;
}
