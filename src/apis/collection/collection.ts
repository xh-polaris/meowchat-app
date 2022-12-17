import {
    DeleteCatReq,
    DeleteCatResp,
    GetCatDetailReq,
    GetCatDetailResp,
    GetCatPreviewsReq,
    GetCatPreviewsResp,
    NewCatReq,
    NewCatResp
} from "./collection-interfaces";

export async function deleteCat(req: DeleteCatReq): Promise<DeleteCatResp> {
    return await new Promise<DeleteCatResp>((resolve, reject) => {
        uni.request({
            url: "/collection/delete_cat",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as DeleteCatResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 * @param req
 */
export async function newCat(req: NewCatReq): Promise<NewCatResp> {
    return await new Promise<NewCatResp>((resolve, reject) => {
        uni.request({
            url: "/collection/new_cat",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as NewCatResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 * @param req
 */
export async function getCatPreviews(req: GetCatPreviewsReq): Promise<GetCatPreviewsResp> {
    return await new Promise<GetCatPreviewsResp>((resolve, reject) => {
        uni.request({
            url: "/collection/get_cat_previews",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetCatPreviewsResp;
                resolve(data);
            },
        });
    });
}

/**
 * @description
 * @param req
 */
export async function getCatDetail(req: GetCatDetailReq): Promise<GetCatDetailResp> {
    return await new Promise<GetCatDetailResp>((resolve, reject) => {
        uni.request({
            url: "/collection/get_cat_detail",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetCatDetailResp;
                resolve(data);
            },
        });
    });
}

