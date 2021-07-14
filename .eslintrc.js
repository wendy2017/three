module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "prefer-promise-reject-errors": "off",
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-prototype-builtins": "off",
    "no-self-assign": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        singleQuote: false,
        printWidth: 80,
        trailingComma: "none"
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
