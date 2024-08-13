import { createSDK } from '@repo/api-sdk';

const api = createSDK({
  signIn: {
    username: process.env.SDK_USERNAME,
    password: process.env.SDK_PASSWORD,
  },
  modules: ['cards', 'collection'],
});

export { api };
