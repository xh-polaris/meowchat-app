import { getLikeContents } from "@/apis/like/like";
import { TargetType } from "@/apis/schemas";
import { getMomentPreviews } from "@/apis/moment/moment";
import { StorageKeys } from "@/utils/const";
import { GetLikeContentsReq } from "@/apis/like/like-interface";
import { GetMomentPreviewsReq } from "@/apis/moment/moment-components";

export function buildLikingMomentLoader(userId?: string) {
  let lastToken: string; // 每次记录上个token
  const myUserId = uni.getStorageSync(StorageKeys.UserId);
  return async () => {
    const req: GetLikeContentsReq = {
      userId: userId || myUserId,
      targetType: TargetType.Moment
    };
    if (lastToken) {
      req.lastToken = lastToken;
    }
    const res = await getLikeContents(req);
    lastToken = res.token;
    return res.moments;
  };
}

export function buildPublishMomentLoader(userId?: string) {
  let lastToken: string; // 每次记录上个token
  const myUserId = uni.getStorageSync(StorageKeys.UserId);
  return async () => {
    const req: GetMomentPreviewsReq = {
      onlyUserId: userId || myUserId
    };
    if (lastToken) {
      req.lastToken = lastToken;
    }
    const res = await getMomentPreviews(req);
    lastToken = res.token;
    return res.moments;
  };
}
