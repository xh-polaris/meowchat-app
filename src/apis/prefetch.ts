import { SignInResp } from "@/apis/auth/auth-interfaces";
import { GetUserInfoResp } from "@/apis/user/user-interfaces";
import { ListCommunityResp } from "@/apis/community/community-interfaces";
import { GetPostPreviewsResp } from "@/apis/post/post-interfaces";
import { GetMomentPreviewsResp } from "@/apis/moment/moment-components";
import { GetCatPreviewsResp } from "@/apis/collection/collection-interfaces";
import { GetNewsResp } from "@/apis/notice/notice-interfaces";
import { StorageKeys } from "@/utils/const";

export interface PrefetchResp {
  signInResp?: SignInResp;
  getUserInfoResp?: GetUserInfoResp;
  listCommunityResp?: ListCommunityResp;
  firstPostPreviewsResp?: GetPostPreviewsResp;
  firstMomentPreviewsResp?: GetMomentPreviewsResp;
  firstCatPreviewsResp?: GetCatPreviewsResp;
  getNewsResp?: GetNewsResp;
  token?: string;
  timestamp: number;
}

interface Token {
  communityId?: string;
  userId?: string;
  env?: string;
}

let data: PrefetchResp;

export async function getPrefetchData(expectToken?: Token) {
  if (!expectToken) {
    expectToken = {};
  }
  if (!expectToken.env) {
    expectToken.env = uni.getStorageSync(StorageKeys.BackendEnv);
  }
  if (!data) {
    data = await new Promise<PrefetchResp>((resolve, reject) => {
      uni.getBackgroundFetchData({
        fetchType: "pre",
        success: (res) => {
          if (res.fetchedData) {
            resolve(JSON.parse(res.fetchedData));
            return;
          }
          reject("获取预加载数据失败");
        },
        fail: (reason) => {
          reject(reason);
        }
      });
    });
  }
  if (!data) {
    return Promise.reject("获取预加载数据失败");
  }
  const token: Token = JSON.parse(data.token || "{}");
  if (!data.timestamp || new Date().getTime() - data.timestamp > 60000) {
    return Promise.reject("预加载数据过期");
  }
  if (
    expectToken?.communityId &&
    expectToken.communityId !== token.communityId
  ) {
    return Promise.reject("社区id不匹配");
  }
  if (expectToken?.userId && expectToken.userId !== token.userId) {
    return Promise.reject("用户id不匹配");
  }
  if (expectToken?.env && expectToken.env !== token.env) {
    return Promise.reject("环境不匹配");
  }
  return data;
}
