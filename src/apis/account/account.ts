import * as components from "./accountComponents"

export * from "./accountComponents"

/**
 * @description
 * @param req
 */
export function signIn (req: components.SignInReq) {
	uni.request({
		url: "/api/signin",
		data: req,
		method: "POST"
	})
}
