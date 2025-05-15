import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/types/app-config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Example of using the config service to get a specific value
  // 1. Direct .env access
  // const server_host: string = process.env.SERVER_HOST || 'localhost';
  // const server_port: string | number = process.env.SERVER_PORT || 3000;
  // console.log({ server_host, server_port });

  // 2. Direct .env access with type casting through ConfigService
  // const configService = app.get(ConfigService);
  // const server_host: string =
  //   configService.get<string>('SERVER_HOST') || 'localhost';
  // const server_port: number = configService.get<number>('SERVER_PORT') || 3000;
  // console.log({ server_host, server_port });

  // 3. Typed single key example
  // const configService = app.get(ConfigService);
  // const server_host: string =
  //   configService.get<string>('app.host') || 'localhost';
  // const server_port: number = configService.get<number>('app.port') || 3000;
  // console.log({ server_host, server_port });

  // 4. Full typed config object
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  if (!appConfig) {
    throw new Error('App config not found!');
  }
  const server_host: string = appConfig.host;
  const server_port: number = appConfig.port;

  await app.listen(server_port, server_host);
  console.log(`Server running on http://${server_host}:${server_port}`);
}
bootstrap();
