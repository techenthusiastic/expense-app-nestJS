import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class CustomClassInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('INTERCEPTING : Request');
    return next.handle().pipe(
      map((data) => {
        data.createdAt = data.created_at;
        delete data.created_at;
        delete data.updated_at;
        // console.log('INTERCEPTING : Response');
        return data;
      }),
    );
  }
}
