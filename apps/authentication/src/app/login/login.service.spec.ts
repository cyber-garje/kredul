import { Test } from '@nestjs/testing';

import { LoginService } from './login.service';
import { AuthLogin } from '@kredul/mongoose';

const loginServiceMock = {
  findAll: jest.fn()
}

const defaultLogin: AuthLogin = {username: 'user1', password: 'pass1', hashKey: 'hash', email: 'my@email.com' };

describe('AppService', () => {
  let service: LoginService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ { provide: LoginService, useValue: loginServiceMock}],
    }).compile();

    service = app.get<LoginService>(LoginService);
  });

  describe('findAll', () => {
    it('should return "Welcome to login!"', () => {
      loginServiceMock.findAll = jest.fn().mockResolvedValue(defaultLogin)
      expect(service.findAll()).resolves.toEqual(defaultLogin);
    });
  });
});
