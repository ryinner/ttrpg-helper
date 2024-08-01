import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JWTAuthGuard } from './auth/jwt-auth.guard';
import { CardsModule } from './cards/cards.module';
import { ClientsModule } from './clients/clients.module';
import { CollectionsModule } from './collections/collections.module';
import { authConfig } from './config/auth.config';
import baseConfig from './config/base.config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

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
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
