import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'check heals of api',
    example: {
      state: 'ok',
      version: '1.0.0',
      description: 'app description',
    },
  })
  index() {
    return this.appService.index();
  }
}
