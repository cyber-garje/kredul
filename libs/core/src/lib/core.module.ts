import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from '@nestjs/core';

import { CoreLoggerInterceptor } from './interceptors/logger-interceptor';
import { AuthGuard } from './guards/auth-guard';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { CoreLogger } from './core-logger/core-logger';
import { CoreSwagger } from './core-swagger/core-swagger';
import { ConfigReader } from './conf-reader/config-reader';
import { ApplyLogger } from './decorators/logger.decorator';
import { HashToolsService } from './hast-tools/hash-tools.service';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CoreLoggerInterceptor },
    AuthGuard,
    MongooseExceptionFilter,
    HashToolsService
  ],
  exports: [
    ConfigReader,
    CoreLogger,
    CoreSwagger,
    MongooseExceptionFilter,
    AuthGuard,
    CoreLoggerInterceptor,
    ApplyLogger,
    HashToolsService
  ]
})
export class CoreModule {}
