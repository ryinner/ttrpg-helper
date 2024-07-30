import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CardsModule } from './cards/cards.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from './config/auth.config';
import baseConfig from './config/base.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [baseConfig, authConfig],
      cache: true,
      isGlobal: true,
    }),
    PrismaModule,
    CardsModule,
    CollectionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
