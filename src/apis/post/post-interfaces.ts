import { Post, Tag } from "../schemas"

export interface GetPostPreviewsReqParams {
    page: number
}

export interface GetPostPreviewsResp {
    posts: Array<Post>
    code: number
    msg: string
}

export interface GetPostDetailReqParams {
    postId: string
}

export interface GetPostDetailResp {
    post: Post
    code: number
    msg: string
}

export interface NewPostReq {
    id?: string
    isAnonymous: boolean
    title: string
    text: string
    coverUrl?: string
    tags: Array<Tag>
}

export interface NewPostResp {
    code: number
    msg: string
}

export interface DeletePostReq {
    id: string
}

export interface DeletePostResp {
    code: number
    msg: string
}
