import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreLogger } from '../core-logger/core-logger';

@Injectable()
export class CoreLoggerInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
        return next
        .handle()
        .pipe(
            tap( () => CoreLogger.i(`${this.formRequestLog(context)}`))
        );
    }
    private formRequestLog = (context: ExecutionContext) => {
        const className = context.getClass().name;
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        return `HTTP ${req.method} ${req.url} ${className} ${req.bodyUsed || ''}`;
    }
}
