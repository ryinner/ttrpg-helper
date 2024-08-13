import { ApiProperty } from '@nestjs/swagger';
import { ISignInDto } from '@repo/api-sdk';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto implements ISignInDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  password: string;
}
