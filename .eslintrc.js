module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2017: true
  },
  extends: "eslint:recommended",
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single", { avoidEscape: true }],
    semi: ["error", "always"],
    "no-console": "off"
  },
  parserOptions: {
    sourceType: "module"
  }
};
