module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        /* エラー */
        "no-duplicate-case" : "error",
        "no-extra-semi" : "error",
        "no-func-assign" : "error",
        "no-irregular-whitespace" : "error",
        /* ベストプラクティス */
        "no-fallthrough" : "error",
        "no-redeclare" : "error",
        /* 変数 */
        "no-undefined" : "off",
        /* 表記法 */
        "max-nested-callbacks" : "error",
        "semi" : "error",
        /* ECMAScript 6 */
        "prefer-template" : "warn",

        "react/react-in-jsx-scope" : "off",
        "no-undef" : "off",
        "no-unused-vars" : "off",
        "react/prop-types" : "off"
    }
}
