import {
  DeleteMomentReq,
  DeleteMomentResp,
  GetMomentDetailReq,
  GetMomentDetailResp,
  GetMomentPreviewsReq,
  GetMomentPreviewsResp,
  NewMomentReq,
  NewMomentResp
} from "./moment-components";
import { PictureStyle } from "@/apis/cos/cos-interface";

/**
 * @description
 * @param req
 */
export async function deleteMoment(
  req: DeleteMomentReq
): Promise<DeleteMomentResp> {
  return await new Promise<DeleteMomentResp>((resolve, reject) => {
    uni.request({
      url: "/moment/delete_moment",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as DeleteMomentResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function newMoment(req: NewMomentReq): Promise<NewMomentResp> {
  return await new Promise<NewMomentResp>((resolve, reject) => {
    uni.request({
      url: "/moment/new_moment",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewMomentResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getMomentPreviews(req: GetMomentPreviewsReq) {
  return await new Promise<GetMomentPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/moment/get_moment_previews",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetMomentPreviewsResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getMomentDetail(req: GetMomentDetailReq) {
  return await new Promise<GetMomentDetailResp>((resolve, reject) => {
    uni.request({
      url: "/moment/get_moment_detail",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetMomentDetailResp;
        resolve(data);
      }
    });
  });
}
