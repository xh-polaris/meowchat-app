import { signIn } from "@/apis/auth/auth";
import { getUserInfo, updateUserInfo } from "@/apis/user/user";
import { SignInResp } from "@/apis/auth/auth-interfaces";
import { WxAppId, StorageKeys } from "@/utils/const";
import { clearCache, listCommunity } from "@/apis/community/community";
import { Pages } from "@/utils/url";

const DefaultUserAvatarUrl = "https://static.xhpolaris.com/cat_world.jpg";

export async function init() {
  clearCache();
  return await new Promise<void>((resolve, reject) => {
    uni.getProvider({
      service: "oauth",
      success(getProviderRes: UniNamespace.GetProviderRes) {
        if (getProviderRes.provider[0] === "weixin") {
          uni.login({
            provider: "weixin",
            success(res: UniNamespace.LoginRes) {
              signIn({
                authType: "wechat",
                authId: WxAppId,
                verifyCode: res.code
              })
                .then((signInRes) => {
                  afterSignIn(signInRes);
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            }
          });
        }
      }
    });
  });
}

function afterSignIn(signInResp: SignInResp) {
  uni.setStorageSync(StorageKeys.AccessToken, signInResp.accessToken);
  // console.log("token", signInResp.accessToken);
  uni.setStorageSync(StorageKeys.UserId, signInResp.userId);
  checkCommunityId().then();
  getUserInfo({})
    .then((getUserInfoResp) => {
      uni.setStorageSync(StorageKeys.EnabledDebug, getUserInfoResp.enableDebug);
    })
    .catch((res: UniNamespace.RequestSuccessCallbackResult) => {
      if (res.statusCode === 400) {
        const id = signInResp.userId;
        updateUserInfo({
          nickname: "用户_" + id.substring(id.length - 13),
          avatarUrl: DefaultUserAvatarUrl
        }).then(() => {
          uni.navigateTo({
            url: Pages.SchoolSelect
          });
        });
      }
    });
}

export async function checkCommunityId() {
  const res = await listCommunity({});
  const id = uni.getStorageSync(StorageKeys.CommunityId);

  if (id) {
    for (let i = 0; i < res.communities.length; i++) {
      if (res.communities[i].id === id) {
        return;
      }
    }
  }

  // 如果storage里没有id或id无法匹配到任何一个社区，就将id赋值为最早的子社区的id
  for (let i = res.communities.length - 1; i >= 0; i--) {
    const community = res.communities[i];
    if (
      community.parentId === "" ||
      community.parentId === undefined ||
      community.parentId === null
    ) {
      continue;
    }
    uni.setStorageSync(StorageKeys.CommunityId, community.id);
  }
}
