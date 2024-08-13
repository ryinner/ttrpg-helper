import type { IAuthEntity, ISignInDto } from '../@types/auth';

interface IConfig {
  signIn: ISignInDto;
  accessToken?: string;
}

interface IRequestSettings extends Omit<RequestInit, 'body' | 'headers'> {
  auth?: boolean;
  headers?: Headers;
  body?: RequestInit['body'] | object;
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
    { auth = true, headers, body, ...options }: IRequestSettings,
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    if (headers === undefined) {
      headers = new Headers();
    }
    if (headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (typeof body === 'object') {
      switch (headers.get('Content-Type')) {
        // add form data handler
        default:
          body = JSON.stringify(body);
          break;
      }
    }

    if (auth) {
      if (config.accessToken === undefined) {
        config.accessToken = (await this.auth()).accessToken;
      }
      headers.set('Authorization', `Bearer ${config.accessToken}`);
    }

    const fullOptions: RequestInit = {
      ...options,
      headers,
      body,
    };
    const response = await fetch(url, fullOptions);

    if (response.ok) {
      const data = await response.json();
      return <T>data;
    }

    throw new Error(response.statusText);
  }

  private async auth(): Promise<IAuthEntity> {
    return await this.request<IAuthEntity>('/auth/sing-in', {
      auth: false,
      body: config.signIn,
    });
  }
}

export { BaseApi, type IConfig };
