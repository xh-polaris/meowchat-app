import { createSSRApp } from "vue";
import App from "./App.vue";

uni.addInterceptor("request", {
  invoke(args: UniNamespace.RequestOptions) {
    if (args.url[0] === "/") {
      args.url = "https://meowchat.xhpolaris.com" + args.url;
      args.header = {
        Authorization: uni.getStorageSync("accessToken")
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
