// import * as components from "./auth-interfaces"
//
// export * from "./auth-interfaces"

import {
    SendVerifyCodeReq,
    SendVerifyCodeResp,
    SetPasswordReq,
    SetPasswordResp,
    SignInReq,
    SignInResp
} from "./auth-interfaces"


/**
 * @description
 * @param req
 */
export async function signIn(req: SignInReq): Promise<SignInResp> {
    return new Promise<SignInResp>(function (resolve, reject) {
        uni.request({
            url: "/api/sign_in",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as SignInResp
                resolve(data)
            },
        })
    })
}

/**
 * @description
 * @param req
 */
export async function setPassword(req: SetPasswordReq): Promise<SetPasswordResp> {
    return new Promise(function (resolve, reject) {
        uni.request({
            url: "/api/set_password",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                if (res.statusCode != 200) {
                    reject(res)
                }
                const data = res.data as SetPasswordResp
                resolve(data)
            },
        })
    })
}

/**
 * @description
 * @param req
 */
export async function sendVerifyCode(req: SendVerifyCodeReq): Promise<SendVerifyCodeResp> {
    return new Promise(function (resolve, reject) {
        uni.request({
            url: "/api/send_verify_code",
            data: req,
            method: "POST",
            success(res: UniNamespace.RequestSuccessCallbackResult) {
                const data = res.data as SendVerifyCodeResp
                resolve(data)
            },
            fail(err: UniNamespace.GeneralCallbackResult) {
                reject(err)
            }
        })
    })
}
