import { createSSRApp } from "vue"
import App from "./App.vue"

uni.addInterceptor("request", {
  invoke (args: UniNamespace.RequestOptions) {
    args.url = "https://mock.apifox.cn/m1/1634976-0-default" + args.url
  },
  fail (err: UniNamespace.GeneralCallbackResult) {
    console.log(err)
  }
})

export function createApp () {
  const app = createSSRApp(App)
  return {
    app,
  }
}
