import * as components from "./account-components"

export * from "./account-components"

/**
 * @description
 * @param req
 */
export async function signIn (req: components.SignInReq): Promise<components.SignInResp> {
  return new Promise<components.SignInResp>(function (resolve, reject) {
    uni.request({
      url: "/api/sign_in",
      data: req,
      method: "POST",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.SignInResp
        resolve(data)
      },
    })
  })
}

/**
 * @description
 * @param req
 */
export async function setPassword (req: components.SetPasswordReq): Promise<components.SetPasswordResp> {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: "/api/set_password",
      data: req,
      method: "POST",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.SetPasswordResp
        resolve(data)
      },
    })
  })
}

/**
 * @description
 * @param req
 */
export async function sendVerifyCode (req: components.SendVerifyCodeReq): Promise<components.SendVerifyCodeResp> {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: "/api/send_verify_code",
      data: req,
      method: "POST",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        const data = res.data as components.SendVerifyCodeResp
        resolve(data)
      },
      fail (err: UniNamespace.GeneralCallbackResult) {
        reject(err)
      }
    })
  })
}
