import {
  GignInResp,
  SendVerifyCodeReq,
  SendVerifyCodeResp,
  SetPasswordReq,
  SetPasswordResp,
  SignInReq
} from "./auth-interfaces";
import { getPrefetchData } from "@/apis/prefetch";
import { StorageKeys } from "@/utils/const";
import { UserCheckInResp } from "@/apis/user/user-interfaces";

/**
 * @description
 * @param req
 */
export function signIn(req: SignInReq) {
  return new Promise<GignInResp>((resolve, reject) => {
    getPrefetchData()
      .then((res) => {
        if (!res.signInResp) {
          return Promise.reject();
        }
        resolve(res.signInResp);
      })
      .catch(() => {
        uni.request({
          url: "/auth/sign_in",
          data: req,
          method: "POST",
          success(res: UniNamespace.RequestSuccessCallbackResult) {
            if (res.statusCode !== 200) {
              reject(res);
            }
            const data = res.data as GignInResp;
            resolve(data);
          }
        });
      });
  });
}

/*const signInRes= await signIn({
  authType: "wechat",
  authId: appId,
  verifyCode: res.code,
  appId: AppId
});
uni.setStorageSync(StorageKeys.AccessToken, {
  token: signInRes.accessToken,
  expireTime: signInRes.accessExpire
});
uni.setStorageSync(StorageKeys.UserId,signInRes.userId);
if(signInRes.accessToken) {
  const checkInRes = await checkIn();
  uni.setStorageSync('checkInInfo',JSON.stringify(checkInRes));
}*/

/**
 * @description
 * @param req
 */
export function setPassword(req: SetPasswordReq) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: "/auth/set_password",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as SetPasswordResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function sendVerifyCode(req: SendVerifyCodeReq) {
  return await new Promise((resolve, reject) => {
    uni.request({
      url: "/auth/send_verify_code",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        const data = res.data as SendVerifyCodeResp;
        resolve(data);
      },
      fail(err: UniNamespace.GeneralCallbackResult) {
        reject(err);
      }
    });
  });
}

/*async function checkIn(): Promise<string | AnyObject | ArrayBuffer> {
  try {
    const response = await uni.request({
      url: "/api/check_in",
      data: {
        token: signInRes.accessToken
      },
      method: "GET",
    });
    const data: string | AnyObject | ArrayBuffer = response.data;
    return response.data;
  } catch (error) {
    throw error;
  }
}*/
