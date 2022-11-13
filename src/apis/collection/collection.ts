import * as components from "./collection-components";

export * from "./collection-components";

export async function getCatPreviews(): Promise<components.GetCatPreviewsResp> {
    return new Promise<components.GetCatPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/get_cat_previews",
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetCatPreviewsResp;
                resolve(data);
            },
        });
    });
}

export async function getCatDetail(req: components.GetCatDetailReq): Promise<components.GetCatDetailResp> {
    return new Promise<components.GetCatDetailResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/get_cat_detail",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetCatDetailResp;
                resolve(data);
            },
        });
    });
}
