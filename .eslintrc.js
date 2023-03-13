module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": ["plugin:vue/essential", "eslint:recommended", "@vue/typescript/recommended", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/interface-name-prefix": 0
  }
};