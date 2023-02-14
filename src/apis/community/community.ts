import {
  ListCommunityReq,
  ListCommunityResp
} from "@/apis/community/community-interfaces";

export async function listCommunity(req: ListCommunityReq) {
  return await new Promise<ListCommunityResp>((resolve, reject) => {
    uni.request({
      url: "/community/list_community",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as ListCommunityResp;
        resolve(data);
      }
    });
  });
}
