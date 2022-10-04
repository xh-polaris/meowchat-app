module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:n/recommended",
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
    "n",
    "vue",
    "promise"
  ],
  rules: {
    semi: "off",
    "vue/multi-word-component-names": "off",
    "n/no-unpublished-import": "off"
  }
};
