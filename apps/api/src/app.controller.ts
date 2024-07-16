import { Controller, Get, Res } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AppService } from './app.service';
import { type Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  index(@Res() res: Response) {
    return res.json(this.appService.index());
  }
}
