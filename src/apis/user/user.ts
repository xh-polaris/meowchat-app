import {
  GetUserInfoResp,
  UpdateUserInfoReq,
  UpdateUserInfoResp
} from "./user-interfaces";

export async function getUserInfo() {
  return await new Promise<GetUserInfoResp>((resolve, reject) => {
    uni.request({
      url: "/user/get_user_info",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetUserInfoResp;
        resolve(data);
      }
    });
  });
}

export async function updateUserInfo(req: UpdateUserInfoReq) {
  return await new Promise<UpdateUserInfoResp>((resolve, reject) => {
    uni.request({
      url: "/user/update_user_info",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as UpdateUserInfoResp;
        resolve(data);
      }
    });
  });
}
