import { signIn } from "@/apis/auth/auth";

export async function init() {
  return await new Promise<void>((resolve, reject) => {
    if (!uni.getStorageSync("communityId")) {
      uni.setStorageSync("communityId", "637ce159b15d9764c31f9c84");
    }

    uni.getProvider({
      service: "oauth",
      success(res: UniNamespace.GetProviderRes) {
        if (res.provider[0] === "weixin") {
          uni.login({
            provider: "weixin",
            success(res: UniNamespace.LoginRes) {
              signIn({
                authType: "wechat",
                authId: "123", // 微信登陆时这里随便填什么都可以
                params: [res.code],
              })
                .then((res) => {
                  uni.setStorageSync("accessToken", res.accessToken);
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            },
          });
        }
      },
      fail() {
        signIn({
          authType: "email",
          authId: "test@test.com",
          params: ["1234"],
        })
          .then((res) => {
            uni.setStorageSync("accessToken", res.accessToken);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      },
    });
  });
}
