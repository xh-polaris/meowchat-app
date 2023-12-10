import {
  GetUserInfoReq,
  GetUserInfoResp,
  UpdateUserInfoReq,
  UpdateUserInfoResp,
  UserCheckInResp
} from "./user-interfaces";
import { PictureStyle } from "@/apis/cos/cos-interface";
import { getPrefetchData } from "@/apis/prefetch";

export async function getUserInfo(req: GetUserInfoReq) {
  return new Promise<GetUserInfoResp>((resolve, reject) => {
    getPrefetchData({ userId: req.userId })
      .then((res) => {
        if (!res.getUserInfoResp?.user) {
          return Promise.reject("预拉取数据没有用户信息");
        }
        resolve(res.getUserInfoResp);
        res.getUserInfoResp = undefined;
      })
      .catch(() => {
        uni.request({
          url: "/user/get_user_info",
          data: req,
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

export async function userCheckIn() {
  return await new Promise<UserCheckInResp>((resolve, reject) => {
    uni.request({
      url: "/user/check_in",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as UserCheckInResp;
        resolve(data);
      }
    });
  });
}
