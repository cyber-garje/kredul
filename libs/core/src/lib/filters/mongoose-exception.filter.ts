import { Catch, ExceptionFilter } from '@nestjs/common';
import { CoreLogger } from '../core-logger/core-logger';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: string) {
    CoreLogger.e(`An error occurred`, exception);
  }
}
