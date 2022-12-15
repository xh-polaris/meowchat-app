import { Admins, News, Notice } from "../schemas"

export interface GetNewsResp {
    code: number
    msg: string
    news: Array<News>
}

export interface GetAdminsResp {
    code: number
    msg: string
    admins: Array<Admins>
}

export interface GetNoticeResp {
    code: number
    msg: string
    notices: Array<Notice>
}

export interface NewNoticeReq {
    id?: string
    text: string
}

export interface NewNoticeResp {
    code: number
    msg: string
}

export interface NewNewsReq {
    id?: string
    imageUrl: string
    linkUrl: string
    type: string
}

export interface NewNewsResp {
    code: number
    msg: string
}