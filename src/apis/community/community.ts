import * as components from "./community-components"

export * from "./community-components"

/**
 * @description
 * @param
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

export async function getMomentByCat(req: components.GetMomentsByCatReq): Promise<components.GetMomentPreviewsResp> {
    return new Promise<components.GetMomentPreviewsResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/get_moment_previews_by_cat",
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

export async function createMoment(req: components.CreateMomentReq): Promise<components.CreateMomentResp> {
    return new Promise<components.CreateMomentResp>(function (resolve, reject) {
        uni.request({
            url: "/moment/create_comment",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res);
                }
                const data = res.data as components.CreateMomentResp;
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


