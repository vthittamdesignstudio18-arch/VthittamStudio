import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    rules: {
      ...js.configs.recommended.rules,
      // No JSX-aware plugin is installed, so identifiers referenced only from
      // JSX (<Container />, <motion.div>, <Icon />) look unused to the base
      // rule. Component-cased names and `motion` are therefore exempt, as are
      // underscore-prefixed values kept only to hold a call signature stable.
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^(_|[A-Z]|motion$)',
          argsIgnorePattern: '^(_|[A-Z])',
        },
      ],
    },
  },
]
