import { GetPostPreviewsResp } from "@/apis/post/post-interfaces";

export async function getPostPreviews(): Promise<GetPostPreviewsResp> {
    return new Promise<GetPostPreviewsResp>((resolve, reject) => {
        uni.request({
            url: "/post/get_post_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as GetPostPreviewsResp
                resolve(data)
            },
        })
    })
}