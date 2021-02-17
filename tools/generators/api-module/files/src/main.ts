import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { <%= classify(apiName) %>Module } from './app/<%= dasherize(apiName) %>.module';

async function bootstrap() {
  const app = await NestFactory.create(<%= classify(apiName) %>Module);

  const globalPrefix = 'api/<%= dasherize(apiName) %>';
  app.setGlobalPrefix(globalPrefix);

  const hostname = process.env.HOSTNAME || '127.0.0.1';
  const port = process.env.PORT || 3333;

  await app.listen(port, hostname, () => {
    Logger.log(`Listening at http://${hostname}:${port}/${globalPrefix}`);
  });
}

bootstrap();
