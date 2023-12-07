export interface SendVerifyCodeReq {
  authType: "phone" | "email";
  authId: string;
}

export interface SendVerifyCodeResp {
  code: number;
  msg: string;
}

export interface SignInReq {
  authType: "phone" | "email" | "wechat";
  authId: string;
  password?: string;
  verifyCode?: string;
  appId: number;
}

export interface SignInResp {
  userId: string;
  accessToken: string;
  accessExpire: number;
  code: number;
  msg: string;
}

export interface SetPasswordReq {
  password: string;
}

export interface SetPasswordResp {
  code: number;
  msg: string;
}
