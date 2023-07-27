import { StorageKeys } from "@/utils/const";

export function createInterceptors() {
  uni.addInterceptor("request", {
    invoke(args: UniNamespace.RequestOptions) {
      if (args.url[0] === "/") {
        // import.meta.env的东西，就是本项目最根处.env文件夹里的东西
        args.url = import.meta.env.VITE_BASIC_URL + args.url;
        args.header = {
          Authorization: uni.getStorageSync(StorageKeys.AccessToken),
          "X-Xh-Env": import.meta.env.VITE_XH_ENV
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
