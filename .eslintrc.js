module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  globals: {
    uni: "readonly",
    UniNamespace: "readonly"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["import", "vue", "@typescript-eslint", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/valid-v-on": "error",
    "no-undef": "error",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off"
  },
  overrides: [
    {
      files: ["src/apis/**"],
      rules: {
        "no-unused-vars": "off"
      }
    }
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".tsx", ".vue"]
      }
    }
  }
};
