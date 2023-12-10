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
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".vue", ".json"]
  },
  globals: {
    uni: "readonly",
    UniNamespace: "readonly",
    uniCloud: true,
    wx: true,
    getCurrentPages: "readonly"
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/valid-v-on": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "no-unused-vars": "off",
    "no-duplicate-imports": "error",
    "no-undef": "error",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false
      }
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any"
        }
      }
    ],
    "vue/prefer-import-from-vue": "error",
    "import/no-empty-named-blocks": "error"
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".tsx"]
      }
    },
    "import/extensions": [".vue", ".ts", ".js", ".jsx", ".tsx"],
    "import/ignore": [".vue"]
  }
};
