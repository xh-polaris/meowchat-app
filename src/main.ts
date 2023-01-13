import { createSSRApp } from "vue";
import App from "./App.vue";

uni.addInterceptor("request", {
  invoke(args: UniNamespace.RequestOptions) {
    if (args.url[0] === "/") {
      args.url = "https://meowchat.xhpolaris.com" + args.url;
      args.header = {
        Authorization: uni.getStorageSync("accessToken"),
      };
    }
  },
  fail(err: UniNamespace.GeneralCallbackResult) {
    console.log(err);
  },
});

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
