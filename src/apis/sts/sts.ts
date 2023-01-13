import {
  ApplySignedUrlReq,
  ApplySignedUrlResp,
} from "@/apis/sts/sts-interface";

export async function applySignedUrl(req: ApplySignedUrlReq) {
  return await new Promise<ApplySignedUrlResp>((resolve, reject) => {
    uni.request({
      url: "/sts/apply_signed_url",
      method: "POST",
      data: req,
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as ApplySignedUrlResp;
        resolve(data);
      },
    });
  });
}
