import config from '@repo/eslint-config/base.config.mjs';

export default [
  ...config,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
      '@stylistic/ts/indent': 'off'
    }
  }
];
