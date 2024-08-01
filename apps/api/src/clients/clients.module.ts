import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ClientsModule {}
