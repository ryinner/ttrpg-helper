import type { ICardEntity } from '../@types/card';
import { BaseApi } from './api';

export class CardApi extends BaseApi {
  private prefix = 'cards';

  public async get(): Promise<ICardEntity[]> {
    return await this.request(this.prefix, { method: 'GET' });
  }

  public async getOne(id: number): Promise<ICardEntity> {
    return await this.request(`${this.prefix}/${id}`, { method: 'GET' });
  }
}
