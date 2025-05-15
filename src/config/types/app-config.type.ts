export interface AppConfig {
  environment: 'development' | 'production' | 'test';
  host: string;
  port: number;
}
