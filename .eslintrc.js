module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "import",
    "vue",
  ],
  rules: {
    semi: "off",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },
      "multiline": {
        "max": 2
      }
    }]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: [".ts", ".js", ".jsx", ".tsx", ".vue"]
      }
    },
  },
}
