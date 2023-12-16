import {
  DoLikeReq,
  DoLikeResp,
  GetCountReq,
  GetCountResp,
  GetUserLikedReq,
  GetUserLikedResp,
  GetLikeContentsReq,
  GetLikeContentsResp,
  GetLikedUsersReq,
  GetLikedUsersResp
} from "@/apis/like/like-interface";

/**
 * @description
 * 点赞或取消点赞
 * @param req
 */
export async function doLike(req: DoLikeReq) {
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
export async function getUserLiked(req: GetUserLikedReq) {
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

export async function getLikedUsers(req: GetLikedUsersReq) {
  return await new Promise<GetLikedUsersResp>((resolve, reject) => {
    uni.request({
      url: "/like/get_liked_users",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetLikedUsersResp;
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
export async function getCount(req: GetCountReq) {
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

export async function getLikeContents(req: GetLikeContentsReq) {
  return await new Promise<GetLikeContentsResp>((resolve, reject) => {
    uni.request({
      url: "/like/get_user_like_contents",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetLikeContentsResp;
        resolve(data);
      }
    });
  });
}
