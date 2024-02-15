import { z } from 'zod';

import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  TOKEN_EXPIRATION: z.string(),
  SECRET_TOKEN: z.string(),
  URL:  z.string().url(),
  OWNER_EMAIL: z.string().email(),
  OWNER_PASSWORD: z.string(),
  ORIGIN: z.string().url()
});

const env = envSchema.parse(process.env);
export default env;