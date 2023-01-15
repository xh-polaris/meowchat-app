module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
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
  plugins: ["import", "vue", "@typescript-eslint"],
  rules: {
    "semi": "off",
    "@typescript-eslint/semi": "warn",
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": ["warn", "always"],
    "quotes": "off",
    "@typescript-eslint/quotes": "warn",
    "@typescript-eslint/member-delimiter-style": "warn",
    "vue/multi-word-component-names": "off",
    "no-undef": "error",
    "no-unused-vars": "error",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "warn",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3
        },
        multiline: {
          max: 2
        }
      }
    ],
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
