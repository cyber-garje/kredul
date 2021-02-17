import { Controller, Get } from '@nestjs/common';

import { <%= classify(apiName) %>Service } from './<%= dasherize(apiName) %>.service';

@Controller('ping')
export class <%= classify(apiName) %>Controller {
  constructor(private readonly <%= camelize(apiName) %>Service: <%= classify(apiName) %>Service) {}

  @Get()
  ping() {
    return this.<%= camelize(apiName) %>Service.ping();
  }
}
