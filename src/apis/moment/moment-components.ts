import { Moment } from "../schemas"

export interface DeleteMomentReq {
    momentId: string
}

export interface DeleteMomentResp {
    code: number
    msg: string
}

export interface NewMomentReq {
    id?: string
    title: string
    catId?: string
    communityId: string
    text: string
    photos: Array<string>
}

export interface NewMomentResp {
    code: number
    msg: string
    momentId: string
}

export interface GetMomentPreviewsReqParams {
    page: number
    communityId: string
}

export interface GetMomentPreviewsResp {
    code: number
    msg: string
    moments: Array<Moment>
}

export interface GetMomentDetailReqParams {
    momentId: string
}

export interface GetMomentDetailResp {
    moment: Moment
    code: number
    msg: string
}

