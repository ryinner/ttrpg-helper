import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ClientsModule {}
