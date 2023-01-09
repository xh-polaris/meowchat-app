import {
  DoLikeReq,
  DoLikeResp,
  GetCountReq,
  GetCountResp,
  GetUserLikedReq,
  GetUserLikedResp
} from "@/apis/like/like-interface";

/**
 * @description
 * 点赞或取消点赞
 * @param req
 */
export async function doLike(req: DoLikeReq): Promise<DoLikeResp> {
    return await new Promise<DoLikeResp>((resolve, reject) => {
        uni.request({
            url: "/like/do_like",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as DoLikeResp;
                resolve(data);
            }
        });
    });
}

/**
 * @description
 * 获取当前用户是否点赞
 * @param req
 */
export async function getUserLiked(
    req: GetUserLikedReq
): Promise<GetUserLikedResp> {
    return await new Promise<GetUserLikedResp>((resolve, reject) => {
        uni.request({
            url: "/like/get_user_liked",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetUserLikedResp;
                resolve(data);
            }
        });
    });
}

/**
 * @description
 * 获取点赞数量
 * @param req
 */
export async function getCount(req: GetCountReq): Promise<GetCountResp> {
    return await new Promise<GetCountResp>((resolve, reject) => {
        uni.request({
            url: "/like/get_count",
            data: req,
            method: "GET",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode !== 200) {
                    reject(res);
                }
                const data = res.data as GetCountResp;
                resolve(data);
            }
        });
    });
}
