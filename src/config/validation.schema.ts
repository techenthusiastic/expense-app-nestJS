import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Environment config: accepted values, default to 'development'
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),

  // Server settings
  SERVER_HOST: Joi.string()
    .hostname()
    .default('localhost')
    .description('Hostname or IP address to bind the server'),

  SERVER_PORT: Joi.number()
    .integer()
    .min(1024)
    .max(65535)
    .default(3000)
    .description('Port number to listen on'),
});
