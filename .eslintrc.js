module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
