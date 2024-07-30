import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CardsModule {}
