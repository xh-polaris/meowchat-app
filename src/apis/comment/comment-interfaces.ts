export interface GetCommentsReqParams {
    scope: string
    page: number
    id: string
}

export interface GetCommentsResp {
    comments: Array<Comment>
    code: number
    msg: string
}

export interface NewCommentReq {
    text: string
    ownerId: string
    type: string
}

export interface NewCommentResp {
    code: number
    msg: string
}