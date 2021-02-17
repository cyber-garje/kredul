/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/authentication';
  app.setGlobalPrefix(globalPrefix);

  const hostname = process.env.HOSTNAME || '127.0.0.1';
  const port = process.env.PORT || 3333;

  await app.listen(port, hostname, () => {
    Logger.log(`Listening at http://${hostname}:${port}/${globalPrefix}`);
  });
}

bootstrap();
