export interface ApplySignedUrlReq {
  prefix?: string;
  suffix?: string;
}

export interface ApplySignedUrlResp {
  code: number;
  msg: string;
  url: string;
  sessionToken: string;
}
