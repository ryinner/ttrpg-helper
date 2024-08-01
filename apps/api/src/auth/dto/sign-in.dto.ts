import { ApiProperty } from '@nestjs/swagger';
import { ISignIn } from '@repo/api-sdk';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto implements ISignIn {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  password: string;
}
