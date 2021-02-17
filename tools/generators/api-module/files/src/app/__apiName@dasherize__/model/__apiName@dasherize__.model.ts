import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type <%= classify(apiName) %>Document = <%= classify(apiName) %> & Document;

@Schema({ minimize: false, collection: '<%= dasherize(apiName) %>'})
export class <%= classify(apiName) %> {
  _id: Types._ObjectId;

  @Prop({ required: true, unique: true })
  firstname: string;

  @Prop({ unique: true })
  lastname: string;
}

export const <%= classify(apiName) %>Schema = SchemaFactory.createForClass(<%= classify(apiName) %>);
