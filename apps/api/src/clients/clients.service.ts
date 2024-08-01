import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ClientEntity } from './entity/client.entity';

@Injectable()
export class ClientsService extends PrismaService {
  public async findOne(id: number): Promise<ClientEntity> {
    const client = await this.client.findUniqueOrThrow({
      where: { id },
    });

    return new ClientEntity(client);
  }
}
