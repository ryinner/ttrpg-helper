enum EBaseUrls {
  development = 'http://localhost:3000',
  production = 'https://products',
}

interface IConfig {
  baseUrl?: EBaseUrls;
}

abstract class BaseApi {
  private baseUrl: string;

  constructor(config: IConfig) {
    this.baseUrl = config.baseUrl ?? EBaseUrls.production;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    const baseHeaders = {
      'Content-Type': 'application/json',
    };

    const fullOptions = Object.assign({}, options, { headers: baseHeaders });

    const response = await fetch(url, fullOptions);

    if (response.ok) {
      const data = await response.json();
      return <T>data;
    }

    throw new Error(response.statusText);
  }
}

export { BaseApi, type IConfig, EBaseUrls };
