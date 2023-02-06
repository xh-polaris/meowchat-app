import {
  GetCommunityInfoResp,
  UpdateCommunityInfoReq,
  UpdateCommunityInfoResp
} from "@/apis/community/community-interfaces";

export async function getCommunityInfo() {
  return await new Promise<GetCommunityInfoResp>((resolve, reject) => {
    uni.request({
      url: "/community/get_community_info",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetCommunityInfoResp;
        resolve(data);
      }
    });
  });
}

export async function updateCommunityInfo(req: UpdateCommunityInfoReq) {
  return await new Promise<UpdateCommunityInfoResp>((resolve, reject) => {
    uni.request({
      url: "/user/update_community_info",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as UpdateCommunityInfoResp;
        resolve(data);
      }
    });
  });
}
