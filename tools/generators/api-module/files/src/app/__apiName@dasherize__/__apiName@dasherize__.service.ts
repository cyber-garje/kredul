import { Injectable } from '@nestjs/common';

@Injectable()
export class <%= classify(apiName) %>Service {
  ping() {
    return 'ping !';
  }
}
