import { GetUserResp, UpdateUserReq, UpdateUserResp } from "./user-interfaces";

/**
 * @description,
 */
export async function getUserInfo(): Promise<GetUserResp> {
  return await new Promise<GetUserResp>((resolve, reject) => {
    uni.request({
      url: "/user/get_user_info",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetUserResp;
        resolve(data);
      },
    });
  });
}
export async function updateUserInfo(
  req: UpdateUserReq
): Promise<UpdateUserResp> {
  return await new Promise<UpdateUserResp>((resolve, reject) => {
    uni.request({
      url: "/user/update_user_info",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as UpdateUserResp;
        resolve(data);
      },
    });
  });
}
