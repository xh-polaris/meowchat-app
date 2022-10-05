module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-essential",
    "plugin:promise/recommended",
    "@vue/typescript/recommended"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "import",
    "vue",
    "promise"
  ],
  rules: {
    semi: "off",
    "vue/multi-word-component-names": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"]
        ],
        extensions: [".ts", ".js", ".jsx", ".tsx"]
      }
    }
  }
};
