import { applySignedUrl } from "../sts/sts";
import { PutObjectReq, PutObjectResp } from "@/apis/cos/cos-interface";

/**
 * @description 使用PUT方法上传文件至COS
 */
export async function putObject(req: PutObjectReq) {
  const filePath = req.filePath;
  const resp = await applySignedUrl({
    prefix: req.prefix,
    suffix: filePath.substring(filePath.lastIndexOf(".")),
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
          },
          data: fileRes.data,
          success: function (res) {
            if (res.statusCode !== 200) {
              reject(res);
            }
            resolve({ url: resp.url.substring(0, resp.url.lastIndexOf("?")) });
          },
          fail: function (res) {
            reject(res);
          },
        });
      },
    });
  });
}
