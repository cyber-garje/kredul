import { Test } from '@nestjs/testing';

import { <%= classify(apiName) %>Service } from './<%= dasherize(apiName) %>.service';

describe('<%= classify(apiName) %>Service', () => {
  let service: <%= classify(apiName) %>Service;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [<%= classify(apiName) %>Service],
    }).compile();

    service = app.get<<%= classify(apiName) %>Service>(<%= classify(apiName) %>Service);
  });

  describe('ping', () => {
    it('should return "Welcome to login!"', () => {
      expect(service.ping()).toEqual('ping !');
    });
  });
});
