import { MongooseModule } from '@nestjs/mongoose';
import { AuthLogin, AuthLoginSchema } from '../model/auth-login';
import { environment } from '../../../../environments/environment';

export const databaseProviders = [
    MongooseModule.forRoot(`mongodb+srv://${environment.loginDatabase.username}:${environment.loginDatabase.password}@${environment.loginDatabase.host}/${environment.loginDatabase.dbname}?retryWrites=true&w=majority`),
];

export const LoginProvider = [
    MongooseModule.forFeature([{ name: AuthLogin.name, schema: AuthLoginSchema }])
];
