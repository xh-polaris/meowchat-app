import { applySignedUrl } from "../sts/sts";
import { PutObjectReq, PutObjectResp } from "@/apis/cos/cos-interface";
import mime from "mime";

export const enum Prefixes {
  Avatar = "avatar",
  Moment = "moment",
  Post = "post"
}

/**
 * @description 使用PUT方法上传文件至COS
 */
export async function putObject(req: PutObjectReq) {
  const filePath = req.filePath;
  const suffix = filePath.substring(filePath.lastIndexOf("."));
  const resp = await applySignedUrl({
    prefix: req.prefix,
    suffix: suffix
  });
  return await new Promise<PutObjectResp>((resolve, reject) => {
    // put请求需要从文件临时路径读取出文件内容
    const fsm = uni.getFileSystemManager();
    fsm.readFile({
      filePath: filePath,
      success: function (fileRes) {
        uni.request({
          url: resp.url,
          method: "PUT",
          header: {
            "x-cos-security-token": resp.sessionToken,
            "Content-Type": mime.getType(suffix)
          },
          data: fileRes.data,
          success: function (res) {
            if (res.statusCode !== 200) {
              reject(res);
            }
            // 去除url内的param
            const url = resp.url.substring(0, resp.url.lastIndexOf("?"));
            resolve({ url: url });
          },
          fail: function (res) {
            reject(res);
          }
        });
      }
    });
  });
}
