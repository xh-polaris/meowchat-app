import * as components from "./community-interfaces"

export * from "./community-interfaces"

/**
 * @description
 * @param req
 */




export async function getMomentPreviews(): Promise<components.GetMomentPreviewsResp> {
    return new Promise<components.GetMomentPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as components.GetMomentPreviewsResp
                resolve(data)
            },
        })
    })
}

export async function getCatPreviews(): Promise<components.GetCatPreviewsResp> {
    return new Promise<components.GetCatPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/get_cat_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as components.GetCatPreviewsResp
                resolve(data)
            },
        })
    })
}

export async function getNews(): Promise<components.GetNewsResp> {
    return new Promise<components.GetNewsResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/get_news",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as components.GetNewsResp
                resolve(data)
            },
        })
    })
}