import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define an interface for the input object shape
interface DataType {
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  [key: string]: any; // other possible properties
}

export class CustomClassInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<DataType>,
  ): Observable<DataType> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          const transformed: DataType = { ...data };
          if (transformed.created_at !== undefined) {
            transformed.createdAt = transformed.created_at;
            delete transformed.created_at;
          }
          delete transformed.updated_at;
          return transformed;
        }
        return data;
      }),
    );
  }
}
