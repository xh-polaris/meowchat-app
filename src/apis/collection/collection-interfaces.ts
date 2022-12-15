import { Cat } from "../schemas"

export interface CatPreview {
    id: string
    name: string
    area: string
    color: string
    avatarUrl: string
    isCollected: boolean
}

export interface GetCatPreviewsReqParams {
    page: number
    communityId: string
}

export interface GetCatPreviewsResp {
    cats: Array<CatPreview>
    code: number
    msg: string
}

export interface GetCatDetailReqParams {
    catId: string
}

export interface GetCatDetailResp {
    code: number
    msg: string
    cat: Cat
}

export interface NewCatReq {
    id?: string
    age: string
    communityId: string
    color: string
    details: string
    name: string
    popularity: number
    sex: string
    area: string
    isSnipped: boolean
    isSterilized: boolean
    avatars: Array<string>
}

export interface NewCatResp {
    code: number
    msg: string
    catId: string
}

export interface DeleteCatReq {
    catId: string
}

export interface DeleteCatResp {
    code: number
    msg: string
}