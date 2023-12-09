import { BackendEnvMap, StorageKeys } from "@/utils/const";
import { refreshToken } from "@/utils/init";
import { Pages } from "@/utils/url";

export function createInterceptors() {
  uni.addInterceptor("request", {
    invoke(args: UniNamespace.RequestOptions) {
      if (args.url.startsWith("/")) {
        const env = uni.getStorageSync(StorageKeys.BackendEnv);
        const lane = uni.getStorageSync(StorageKeys.BackendLane);
        args.url = import.meta.env.VITE_BASIC_URL + args.url;
        args.header = {
          Authorization: uni.getStorageSync(StorageKeys.AccessToken).token,
          "X-Xh-Env": env
            ? env
            : BackendEnvMap[uni.getAccountInfoSync().miniProgram.envVersion],
          "X-Xh-Lane": lane ? lane : ""
        };
      }
    },
    success(result: any) {
      if (result.statusCode === 401) {
        refreshToken(uni.getAccountInfoSync().miniProgram.appId).then(() => {
          uni.reLaunch({ url: Pages.FirstPage });
        });
      } else if (result.statusCode >= 400) {
        uni.showToast({
          title: "请求失败",
          icon: "error"
        });
      }
    },
    fail() {
      uni.showToast({
        title: "网络异常",
        icon: "error"
      });
    }
  });
}
