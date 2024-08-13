import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import { IClientEntity } from '@repo/api-sdk';

export class ClientEntity implements IClientEntity {
  constructor(client: Client) {
    this.id = client.id;
    this.username = client.username;
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  username: string;
}
