module.exports = {
  extends: [
    'eslint:recommended'
  ],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    indent: [2, 2]
  },
  overrides: [
    {
        files: [
          '*.ts'
        ],
        extends: [
          'plugin:@typescript-eslint/recommended'
        ],
        parser: '@typescript-eslint/parser',
        plugins: [
          '@typescript-eslint'
        ],
        rules: {
          "no-undef": 0,
          '@typescript-eslint/member-delimiter-style': 0
        }
    }
  ]
}
