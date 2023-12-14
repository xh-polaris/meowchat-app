import { getMomentPreviews } from "@/apis/moment/moment";
import { StorageKeys } from "@/utils/const";
import { GetMomentPreviewsReq } from "@/apis/moment/moment-components";
import { getPrefetchData, PrefetchResp } from "@/apis/prefetch";

export function buildLoader(keyword?: string) {
  let lastToken: string; // 每次记录上个token
  const communityId = uni.getStorageSync(StorageKeys.CommunityId);

  const fetch = async () => {
    const req: GetMomentPreviewsReq = {};
    if (communityId) {
      req.communityId = communityId;
    }
    if (lastToken) {
      req.lastToken = lastToken;
    }
    if (keyword) {
      req.keyword = keyword;
    }
    const res = await getMomentPreviews(req);
    lastToken = res.token;
    return res.moments;
  };

  return async () => {
    if (lastToken || keyword) {
      return fetch();
    }
    let res: PrefetchResp;
    try {
      res = await getPrefetchData({ communityId: communityId });
    } catch (reason) {
      return fetch();
    }
    if (!res.firstMomentPreviewsResp?.moments) {
      return fetch();
    }
    lastToken = res.firstMomentPreviewsResp.token;
    const moments = res.firstMomentPreviewsResp.moments;
    res.firstMomentPreviewsResp = undefined;
    return moments;
  };
}
