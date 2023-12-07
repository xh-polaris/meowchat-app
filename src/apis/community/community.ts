import {
  ListCommunityReq,
  ListCommunityResp
} from "@/apis/community/community-interfaces";
import { getPrefetchData } from "@/apis/prefetch";

let cache: ListCommunityResp | null;

export async function listCommunity(req: ListCommunityReq) {
  return await new Promise<ListCommunityResp>((resolve, reject) => {
    if (req.parentId && cache) {
      const communities = [];
      for (const community of cache.communities) {
        if (community.parentId == req.parentId) {
          communities.push(community);
        }
      }
      resolve({
        code: 0,
        msg: "",
        communities: communities
      });
      return;
    } else if (!req.parentId && cache) {
      resolve(cache);
      return;
    }

    getPrefetchData()
      .then((res) => {
        if (!res.listCommunityResp) {
          return Promise.reject();
        }
        cache = res.listCommunityResp;
        resolve(res.listCommunityResp);
      })
      .catch((reason) => {
        console.log(reason);
        uni.request({
          url: "/community/list_community",
          data: req,
          method: "GET",
          success(res: UniNamespace.RequestSuccessCallbackResult) {
            if (res.statusCode !== 200) {
              reject(res);
            }
            const data = res.data as ListCommunityResp;
            cache = data;
            resolve(data);
          }
        });
      });
  });
}

export function clearCache() {
  cache = null;
}

/*export function onLoad() {
  const checkInInfoStr = uni.getStorageSync('checkInInfo');

  if (checkInInfoStr) {
    const checkInInfo = JSON.parse(checkInInfoStr);

    if (checkInInfo.isFirst) {
      this.showToastBox = true;
      this.gotFishNum += 30;
      checkInInfo.isFirst = false;
      checkInInfo.getFishNum += 30;
      uni.setStorageSync('checkInInfo', JSON.stringify(checkInInfo));
    }
  }*/
