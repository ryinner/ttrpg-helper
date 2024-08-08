import type { ISignInDto } from '../@types/auth';

interface IConfig {
  signIn: ISignInDto;
  accessToken?: string;
}

interface IRequestSettings extends RequestInit {
  auth?: boolean;
}

let config!: IConfig;

export function createConfig({ signIn }: IConfig) {
  config = {
    signIn,
  };
}

abstract class BaseApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  protected async request<T>(
    endpoint: string,
    { auth = true, ...options }: IRequestSettings,
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const baseHeaders = {
      'Content-Type': 'application/json',
    };

    if (auth) {
      if (config.accessToken === undefined) {
        // auth
      }
    }

    const fullOptions = Object.assign({}, options, { headers: baseHeaders });

    const response = await fetch(url, fullOptions);

    if (response.ok) {
      const data = await response.json();
      return <T>data;
    }

    throw new Error(response.statusText);
  }
}

export { BaseApi, type IConfig };
