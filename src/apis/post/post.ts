import * as components from "./post-components";

export async function deletePost(req: components.DeletePostReq): Promise<components.DeletePostResp> {
    return new Promise<components.DeletePostResp>(function (resolve, reject) {
        uni.request({
            url: "/post/delete_post",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.DeletePostResp;
                resolve(data);
            },
        });
    });
}

export async function newPost(req: components.NewPostReq): Promise<components.NewPostResp> {
    return new Promise<components.NewPostResp>(function (resolve, reject) {
        uni.request({
            url: "/post/new_post",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewPostResp;
                resolve(data);
            },
        });
    });
}

export async function getPostPreviews(req: components.GetPostPreviewsReq): Promise<components.GetPostPreviewsResp> {
    return new Promise<components.GetPostPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/post/get_post_previews",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetPostPreviewsResp;
                resolve(data);
            },
        });
    });
}

export async function getPostDetail(req: components.GetPostDetailReq): Promise<components.GetPostDetailResp> {
    return new Promise<components.GetPostDetailResp>(function (resolve, reject) {
        uni.request({
            url: "/post/get_post_detail",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetPostDetailResp;
                resolve(data);
            },
        });
    });
}