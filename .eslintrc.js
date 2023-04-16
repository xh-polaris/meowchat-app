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
    UniNamespace: "readonly",
	uniCloud:true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/valid-v-on": "error",
    "no-undef": "error",
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".tsx"]
      }
    }
  }
};
