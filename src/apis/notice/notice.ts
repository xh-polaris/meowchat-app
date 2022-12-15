import {
    GetAdminsResp,
    GetNewsResp,
    GetNoticesResp,
    NewNewReq,
    NewNewResp,
    NewNoticeReq,
    NewNoticeResp
} from "./notice-interfaces";

/**
 * @description
 */
export async function getNews(): Promise<GetNewsResp> {
    return new Promise<GetNewsResp>((resolve, reject) => {
        uni.request({
            url: "/notice/get_news",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetNewsResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 */
export async function getAdmins(): Promise<GetAdminsResp> {
    return new Promise<GetAdminsResp>((resolve, reject) => {
        uni.request({
            url: "/notice/get_admins",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetAdminsResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 */
export async function getNotices(): Promise<GetNoticesResp> {
    return new Promise<GetNoticesResp>((resolve, reject) => {
        uni.request({
            url: "/notice/get_notices",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetNoticesResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 * @param req
 */
export async function newNotice(req: NewNoticeReq): Promise<NewNoticeResp> {
    return new Promise<NewNoticeResp>((resolve, reject) => {
        uni.request({
            url: "/notice/new_notice",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as NewNoticeResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 * @param req
 */
export async function newNew(req: NewNewReq): Promise<NewNewResp> {
    return new Promise<NewNewResp>((resolve, reject) => {
        uni.request({
            url: "/notice/new_new",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as NewNewResp;
                resolve(data);
            },
        });
    });
}