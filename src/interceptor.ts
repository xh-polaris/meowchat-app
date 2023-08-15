import { StorageKeys } from "@/utils/const";

export function createInterceptors() {
  uni.addInterceptor("request", {
    invoke(args: UniNamespace.RequestOptions) {
      if (args.url[0] === "/") {
        const env = uni.getStorageSync(StorageKeys.BackendEnv);
        const lane = uni.getStorageSync(StorageKeys.BackendLane);
        args.url = import.meta.env.VITE_BASIC_URL + args.url;
        // console.log({
        //   Authorization: uni.getStorageSync(StorageKeys.AccessToken),
        //   "X-Xh-Env": env ? env : import.meta.env.VITE_XH_ENV,
        //   "X-Xh-Lane": lane ? lane : ""
        // });
        args.header = {
          Authorization: uni.getStorageSync(StorageKeys.AccessToken),
          // "X-Xh-Env": "",
          // "X-Xh-Lane": ""
          "X-Xh-Env": env ? env : import.meta.env.VITE_XH_ENV,
          "X-Xh-Lane": lane ? lane : ""
        };
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
