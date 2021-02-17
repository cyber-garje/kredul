import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthLoginDocument = AuthLogin & Document;

@Schema({ minimize: false, collection: 'auth-login'})
export class AuthLogin {
  _id?: Types._ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashKey: string;
}

export const AuthLoginSchema = SchemaFactory.createForClass(AuthLogin);
