/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >;
  export default component;
}

// 环境变量声明
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASIC_URL: string;
  readonly VITE_NAME: string;
  readonly VITE_ENABLE_DEBUG: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
