import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createInterceptors } from "@/interceptor";
import App from "./App.vue";
import share from "./utils/share";

createInterceptors();

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.mixin(share);
  app.use(pinia);
  return {
    app
  };
}
