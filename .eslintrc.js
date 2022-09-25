module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "@vue/typescript/recommended"
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "vue",
    ],
    rules: {
        "no-unused-vars": "off",
        quotes: [
            "error",
            "double",
        ],
        "vue/multi-word-component-names": "off"
    }
}
