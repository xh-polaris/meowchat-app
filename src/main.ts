import { createSSRApp } from "vue";
import App from "./App.vue";
import { StorageKeys } from "@/utils/const";

uni.addInterceptor("request", {
  invoke(args: UniNamespace.RequestOptions) {
    if (args.url[0] === "/") {
      args.url = "http://test.meowchat.cn" + args.url;
      args.header = {
        Authorization: uni.getStorageSync(StorageKeys.AccessToken)
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

export function createApp() {
  const app = createSSRApp(App);
  return {
    app
  };
}
