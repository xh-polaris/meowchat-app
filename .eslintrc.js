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
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parser: "@typescript-eslint/parser",
      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
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
    "promise",
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
};
