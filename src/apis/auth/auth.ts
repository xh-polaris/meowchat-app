import {
  SendVerifyCodeReq,
  SendVerifyCodeResp,
  SetPasswordReq,
  SetPasswordResp,
  SignInReq,
  SignInResp
} from "./auth-interfaces";

/**
 * @description
 * @param req
 */
export function signIn(req: SignInReq) {
  return new Promise<SignInResp>((resolve, reject) => {
    uni.request({
      url: "/auth/sign_in",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as SignInResp;
        resolve(data);
      }
    });
  });
}

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
