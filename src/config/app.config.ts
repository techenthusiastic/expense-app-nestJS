import { registerAs } from '@nestjs/config';
import { AppConfig } from './types/app-config.type';

export default registerAs(
  'app',
  (): AppConfig => ({
    environment:
      (process.env.NODE_ENV as AppConfig['environment']) || 'development',
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
  }),
);
