import * as components from "./community-components"

export * from "./community-components"

/**
 * @description
 * @param req
 */
export async function getNews (): Promise<components.GetNewsResp> {
  return new Promise<components.GetNewsResp>(function (resolve, reject) {
    uni.request({
      url: "/notice/get_news",
      method: "GET",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.GetNewsResp
        resolve(data)
      },
    })
  })
}

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

export async function getMomentPreviews(): Promise<components.GetMomentPreviewsResp> {
    return new Promise<components.GetMomentPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment_previews",
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

export async function getMoment(req: components.GetMomentReq): Promise<components.GetMomentResp> {
    return new Promise<components.GetMomentResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetMomentResp;
                resolve(data);
            },
        });
    });
}

export async function getChildComments(req: components.GetChildCommentsReq): Promise<components.GetChildCommentsResp> {
    return new Promise<components.GetChildCommentsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_childComments",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.GetChildCommentsResp;
                resolve(data);
            },
        });
    });
}

export async function getComments(req: components.GetCommentsReq): Promise<components.GetCommentsResp> {
    return new Promise<components.GetCommentsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_comments",
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
