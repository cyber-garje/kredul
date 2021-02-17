import { Injectable } from '@nestjs/common';
import { AuthLogin, AuthLoginDocument } from '../../../../../libs/mongoose/src/lib/mongoose-login/model/auth-login';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplyLogger } from '../../../../../libs/core/src/lib/decorators/logger.decorator';

@Injectable()
export class LoginService {

  constructor(
    @InjectModel(AuthLogin.name)
    private login: Model<AuthLoginDocument>
  ) { }

  @ApplyLogger()
  async findAll() {
    return this.login.find();
  }


  async saveAuthLogin(authLogin: AuthLogin) {
    return new this.login(authLogin)
      .save()
      //.then((login) => CoreLogger.i(`${authLogin.username} successfully created.`));
  }

  @ApplyLogger()
  authenticate(login: AuthLogin): { message: string } {

    return { message: 'ping !' };
  }
}
