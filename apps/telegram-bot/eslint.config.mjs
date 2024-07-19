import config from '@repo/eslint-config/base.config.mjs';

export default [
  ...config,
  {
    rules: {
      '@stylistic/ts/indent': 'off'
    }
  }
];
