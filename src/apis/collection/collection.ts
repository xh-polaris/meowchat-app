import * as components from "@/apis/collection/collection-components";

export async function deleteCat(req: components.DeleteCatReq): Promise<components.DeleteCatResp> {
    return new Promise<components.DeleteCatResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/delete_cat",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.DeleteCatResp;
                resolve(data);
            },
        });
    });
}

export async function newCat(req: components.NewCatReq): Promise<components.NewCatResp> {
    return new Promise<components.NewCatResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/new_cat",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.NewCatResp;
                resolve(data);
            },
        });
    });
}

export async function getCatPreviews(req: components.GetCatPreviewsReq): Promise<components.GetCatPreviewsResp> {
    return new Promise<components.GetCatPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/collection/get_cat_previews",
            data: req,
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