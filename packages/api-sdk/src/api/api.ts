import type { ISignInDto } from '../@types/auth';

interface IConfig {
  signIn: ISignInDto;
}

interface IRequestSettings extends RequestInit {
  auth?: boolean;
}

abstract class BaseApi {
  private baseUrl: string;

  private signInDto: ISignInDto;

  constructor(config: IConfig) {
    this.baseUrl = 'http://localhost:3000';
    this.signInDto = config.signIn;
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
      console.log(this.signInDto);
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
