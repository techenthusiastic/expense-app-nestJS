import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/types/app-config.type';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const appConfig = this.configService.get<AppConfig>('app');
    if (!appConfig) {
      throw new Error('App config not found!');
    }
    const server_environment: string = appConfig.environment;
    console.log({ server_environment });
  }
}
