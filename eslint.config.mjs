import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    env: {
      browser: true,
      commonjs: true,
      es2021: true
    },
    extends: [
      'standard',
      'prettier'
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest'
    },
    rules: {
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }]
    }
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended
]
