import * as components from "./notice-components";

/**
 * @description
 * @param
 */
export async function getNews(): Promise<components.GetNewsResp> {
    return new Promise<components.GetNewsResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/get_news",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetNewsResp;
                resolve(data);
            },
        });
    });
}

export async function getAdmins(): Promise<components.GetAdminsResp> {
    return new Promise<components.GetAdminsResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/get_admins",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetAdminsResp;
                resolve(data);
            },
        });
    });
}

export async function getNotices(): Promise<components.GetNoticesResp> {
    return new Promise<components.GetNoticesResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/get_notices",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetNoticesResp;
                resolve(data);
            },
        });
    });
}

export async function newNotice(req: components.NewNoticeReq): Promise<components.NewNoticeResp> {
    return new Promise<components.NewNoticeResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/new_notice",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewNoticeResp;
                resolve(data);
            },
        });
    });
}

export async function newNew(req: components.NewNewReq): Promise<components.NewNewResp> {
    return new Promise<components.NewNewResp>(function (resolve, reject) {
        uni.request({
            url: "/notice/new_new",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewNewResp;
                resolve(data);
            },
        });
    });
}
