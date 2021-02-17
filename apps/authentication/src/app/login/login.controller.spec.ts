import { Test, TestingModule } from '@nestjs/testing';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthLogin } from '@kredul/mongoose';

const loginServiceMock = {
  findAll: jest.fn()
}

const defaultLogin: AuthLogin = {username: 'user1', password: 'pass1', hashKey: 'hash', email: 'my@email.com' };

describe('LoginController', () => {
  let app: TestingModule;
  let service: LoginService
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [{ provide: LoginService, useValue: loginServiceMock }],
    }).compile();


    service = app.get<LoginService>(LoginService);
  });

  describe('getData', () => {
    it('should return "Welcome to login!"', () => {
      const appController = app.get<LoginController>(LoginController);
      expect(appController.ping()).toEqual({ message: 'ping !'});
    });
  });
});
