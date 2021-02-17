import { Module } from '@nestjs/common';
import { databaseProviders, LoginProvider } from './providers/database.providers';
import { AuthLogin } from './model/auth-login';

@Module({
  exports: [
    ...databaseProviders,
    ...LoginProvider,
    AuthLogin
  ],
})
export class MongooseLoginModule {
  static forRoot() {
    return {
      module: MongooseLoginModule,
      imports: [...databaseProviders],
    };
  }

  static forFeature() {
    return {
      module: MongooseLoginModule,
      imports: [...LoginProvider],
    };
  }
}
