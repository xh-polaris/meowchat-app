import { GetMomentPreviewsResp } from "./moment-components"

export async function getMomentPreviews(): Promise<GetMomentPreviewsResp> {
    return new Promise<GetMomentPreviewsResp>((resolve, reject) => {
        uni.request({
            url: "/moment/get_moment_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as GetMomentPreviewsResp
                resolve(data)
            },
        })
    })
}