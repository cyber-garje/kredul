import { Module } from '@nestjs/common';

import { CoreModule } from '@kredul/core';

import { <%= classify(apiName) %>Controller } from './<%= dasherize(apiName) %>/<%= dasherize(apiName) %>.controller';
import { <%= classify(apiName) %>Service } from './<%= dasherize(apiName) %>/<%= dasherize(apiName) %>.service';

@Module({
  imports: [
    CoreModule
  ],
  controllers: [<%= classify(apiName) %>Controller],
  providers: [<%= classify(apiName) %>Service],
})
export class <%= classify(apiName) %>Module {}
