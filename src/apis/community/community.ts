import {
  ListCommunityReq,
  ListCommunityResp
} from "@/apis/community/community-interfaces";

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
}

export function clearCache() {
  cache = null;
}
