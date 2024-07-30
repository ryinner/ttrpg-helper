import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-in')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    return {};
  }
}
