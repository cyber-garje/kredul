import { Module } from '@nestjs/common';

import { CoreModule } from '@kredul/core';
import { MongooseLoginModule } from '@kredul/mongoose';

import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    CoreModule,
    MongooseLoginModule.forRoot(),
    MongooseLoginModule.forFeature()
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AppModule {}
