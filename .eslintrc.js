module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript/recommended"
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	overrides: [
		{
			"files": ["*.vue"],
			"rules": {
				"indent": "off"
			}
		},
		{
			"files": ["*.js"],
			"rules": {
				"@typescript-eslint/no-var-requires": "off",
				"no-console": "off"
			}
		},
		{
			"files": ["*.vue", "*.ts"],
			"rules": {
				"@typescript-eslint/explicit-function-return-type": ["error", {"allowExpressions": true}],
				"@typescript-eslint/explicit-member-accessibility": "error",
				"@typescript-eslint/no-non-null-assertion": "off"
			}
		}
	],
	rules: {
		"arrow-body-style": ["warn", "as-needed"],
		"arrow-parens": ["warn", "as-needed"],
		"arrow-spacing": "warn",
		"comma-dangle": ["error", "never"],
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"curly": ["warn", "multi-or-nest"],
		"no-console": "warn",
		"no-constant-condition": "warn",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-duplicate-imports": "error",
		"no-empty": "warn",
		"no-multiple-empty-lines": ["warn", {"max": 1, "maxBOF": 0, "maxEOF": 0}],
		"no-prototype-builtins": "off",
		"prefer-template": "warn",
		"quotes": ["error", "double", {"allowTemplateLiterals": true}],
		"semi": ["error", "never"],
		"sort-imports": ["warn", {"ignoreCase": true}],
		"vue/script-indent": ["error", "tab", {"baseIndent": 1}]
	}
}
