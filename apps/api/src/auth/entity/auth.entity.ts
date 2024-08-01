import { ApiProperty } from '@nestjs/swagger';
import { IAuthEntity } from '@repo/api-sdk';

export class AuthEntity implements IAuthEntity {
  constructor({ accessToken }: { accessToken: string }) {
    this.accessToken = accessToken;
  }

  @ApiProperty()
  accessToken: string;
}
