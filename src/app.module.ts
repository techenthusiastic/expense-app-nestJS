import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
// Import Custom Interceptor
// import { CustomClassInterceptor } from './customeClassInterceptor';
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'], // fallback to `.env`
      load: [appConfig],
      validationSchema,
    }),
    SummaryModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: CustomClassInterceptor },
  ],
})
export class AppModule {}
