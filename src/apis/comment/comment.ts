import * as components from "./comment-components";

export async function newComment(req: components.NewCommentReq): Promise<components.NewCommentResp> {
    return new Promise<components.NewCommentResp>(function (resolve, reject) {
        uni.request({
            url: "/comment/new_comment",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewCommentResp;
                resolve(data);
            },
        });
    });
}

export async function getComments(req: components.GetCommentsReq): Promise<components.GetCommentsResp> {
    return new Promise<components.GetCommentsResp>(function (resolve, reject) {
        uni.request({
            url: "/comment/get_comments",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetCommentsResp;
                resolve(data);
            },
        });
    });
}
