import { Test, TestingModule } from '@nestjs/testing';

import { <%= classify(apiName) %>Controller } from './<%= dasherize(apiName) %>.controller';
import { <%= classify(apiName) %>Service } from './<%= dasherize(apiName) %>.service';

describe('<%= classify(apiName) %>Controller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [<%= classify(apiName) %>Controller],
      providers: [<%= classify(apiName) %>Service],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to login!"', () => {
      const appController = app.get<<%= classify(apiName) %>Controller>(<%= classify(apiName) %>Controller);
      expect(appController.ping()).toEqual('ping !' );
    });
  });
});
