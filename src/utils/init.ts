import { signIn } from "@/apis/auth/auth";
import { getUserInfo, updateUserInfo } from "@/apis/user/user";
import { SignInResp } from "@/apis/auth/auth-interfaces";
import { DefaultCommunityId, StorageKeys } from "@/utils/const";

const DefaultUserAvatarUrl = "https://static.xhpolaris.com/cat_world.jpg";

function afterSignIn(signInResp: SignInResp) {
  uni.setStorageSync(StorageKeys.AccessToken, signInResp.accessToken);
  uni.setStorageSync(StorageKeys.UserId, signInResp.userId);
  getUserInfo().catch((res: UniNamespace.RequestSuccessCallbackResult) => {
    if (res.statusCode === 400) {
      const id = signInResp.userId;
      updateUserInfo({
        nickname: "用户_" + id.substring(id.length - 13),
        avatarUrl: DefaultUserAvatarUrl
      });
    }
  });
}

export async function init() {
  return await new Promise<void>((resolve, reject) => {
    if (!uni.getStorageSync(StorageKeys.CommunityId)) {
      uni.setStorageSync(StorageKeys.CommunityId, DefaultCommunityId);
    }

    uni.getProvider({
      service: "oauth",
      success(getProviderRes: UniNamespace.GetProviderRes) {
        if (getProviderRes.provider[0] === "weixin") {
          uni.login({
            provider: "weixin",
            success(res: UniNamespace.LoginRes) {
              signIn({
                authType: "wechat",
                authId: "123", // 微信登陆时这里随便填什么都可以
                params: [res.code]
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
      },
      fail() {
        signIn({
          authType: "email",
          authId: "test@test.com",
          params: ["1234"]
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
  });
}
