import * as components from "@/apis/moment/moment-components";

export async function deleteMoment(req: components.DeleteMomentReq): Promise<components.DeleteMomentResp> {
    return new Promise<components.DeleteMomentResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/delete_moment",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.DeleteMomentResp;
                resolve(data);
            },
        });
    });
}

export async function newMoment(req: components.NewMomentReq): Promise<components.NewMomentResp> {
    return new Promise<components.NewMomentResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/new_moment",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewMomentResp;
                resolve(data);
            },
        });
    });
}

export async function getMomentPreviews(req: components.GetMomentPreviewsReq): Promise<components.GetMomentPreviewsResp> {
    return new Promise<components.GetMomentPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment_previews",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetMomentPreviewsResp;
                resolve(data);
            },
        });
    });
}

export async function getMomentDetail(req: components.GetMomentDetailReq): Promise<components.GetMomentDetailResp> {
    return new Promise<components.GetMomentDetailResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment_detail",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetMomentDetailResp;
                resolve(data);
            },
        });
    });
}