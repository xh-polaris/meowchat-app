import { GetNewsResp } from "./notice-interfaces"

export async function getNews(): Promise<GetNewsResp> {
    return new Promise<GetNewsResp>((resolve, reject) => {
        uni.request({
            url: "/notice/get_news",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as GetNewsResp
                resolve(data)
            },
        })
    })
}