import { authConfig, AuthConfig } from './auth.config';
import baseConfig, { BaseConfig } from './base.config';

interface IConfig {
  base: BaseConfig;
  auth: AuthConfig;
}

const configs = [baseConfig, authConfig];

export { configs, IConfig };
