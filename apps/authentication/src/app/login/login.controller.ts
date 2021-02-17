import { Body, Controller, Get, Post, Sse } from '@nestjs/common';

import { LoginService } from './login.service';
import { AuthLogin } from '../../../../../libs/mongoose/src/lib/mongoose-login/model/auth-login';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('ping')
  ping() {
    return { message: 'ping !'};
  }

  @Get()
  allUser() {
    return this.loginService.findAll();
  }

  @Post()
  authenticate() {
    return this.loginService.findAll()
      .then(() => console.log('toto'))
      .catch((error) => console.error(error));
  }

  @Sse('sse')
  sse(){
    return interval(5000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
