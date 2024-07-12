import { Controller, Get, Res } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AppService } from './app.service';
import { type Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response) {
    return res.json(this.appService.index());
  }
}
