import { GetCatPreviewsResp } from "./collection-interfaces"

export async function getCatPreviews(): Promise<GetCatPreviewsResp> {
    return new Promise<GetCatPreviewsResp>((resolve, reject) => {
        uni.request({
            url: "/collection/get_cat_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as GetCatPreviewsResp
                resolve(data)
            },
        })
    })
}
