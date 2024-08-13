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
    console.log(url);
    if (headers === undefined) {
      headers = new Headers();
    }
    if (headers.get('content-type') === null) {
      headers.set('content-type', 'application/json');
    }

    if (typeof body === 'object') {
      switch (headers.get('content-type')) {
        // add form data handler
        default:
          body = JSON.stringify(body);
          break;
      }
    }

    if (auth) {
      headers.set('Authorization', `Bearer ${this.getToken()}`);
    }

    const fullOptions = {
      ...options,
      headers,
      body,
    } satisfies RequestInit;

    let response = await fetch(url, fullOptions);

    if (response.ok) {
      const data = await response.json();
      return <T>data;
    }

    // token has been expired try re auth
    if (response.status === 403) {
      headers.set('Authorization', `Bearer ${this.getToken(true)}`);
      response = await fetch(url, fullOptions);

      if (response.ok) {
        const data = await response.json();
        return <T>data;
      }
    }

    throw new Error(response.statusText);
  }

  private async getToken(hard = false): Promise<string> {
    if (hard || config.accessToken === undefined) {
      config.accessToken = (await this.auth()).accessToken;
    }
    return config.accessToken;
  }

  private async auth(): Promise<IAuthEntity> {
    return await this.request<IAuthEntity>('auth/sign-in', {
      auth: false,
      body: config.signIn,
      method: 'POST',
    });
  }
}

export { BaseApi, type IConfig };
