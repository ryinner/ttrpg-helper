import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from '../package.json';
import { AppModule } from './app.module';
import { BaseConfig } from './config/base.config';
import { IConfig } from './config/main.config';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TTRPG helper API')
    .setDescription('App for helping dungeon masters :)')
    .setVersion(packageJson.version)
    .setContact('ryinner', 'https://github.com/ryinner/ttrpg-helper/issues', '')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-docs', app, document);
  const configService = app.get(ConfigService<IConfig>);
  await app.listen(configService.get<BaseConfig>('base').port);
}
bootstrap();
