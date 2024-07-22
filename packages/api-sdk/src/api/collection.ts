import type { ICardEntity } from '../@types/card';
import type { ICollectionEntity } from '../@types/collection';
import { BaseApi } from './api';

export class CollectionApi extends BaseApi {
  private prefix = 'collections';

  public async get(): Promise<ICollectionEntity[]> {
    return await this.request(this.prefix, { method: 'GET' });
  }

  public async getOne(id: number): Promise<ICollectionEntity> {
    return await this.request(`${this.prefix}/${id}`, { method: 'GET' });
  }

  public async cards(id: number): Promise<ICardEntity[]> {
    return await this.request(`${this.prefix}/${id}/cards`, { method: 'GET' });
  }
}
