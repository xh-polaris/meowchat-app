import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createInterceptors } from "@/interceptor";
import App from "./App.vue";

createInterceptors();

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  return {
    app
  };
}
