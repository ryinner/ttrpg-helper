import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [PrismaModule, CardsModule, CollectionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
