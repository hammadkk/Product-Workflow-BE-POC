import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import config = require('config');

async function bootstrap() {
  const host = config.get<string>('host');
  const port = config.get<string>('port');
  const appVersion = config.get<string>('version');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.enableCors();
  app.use(express.json({ limit: '50mb' }));
  app.setGlobalPrefix('product/api');
  await app.listen(port, () =>
    console.log(`server running at  http://${host}:${port}/product`),
  );
}

bootstrap();
