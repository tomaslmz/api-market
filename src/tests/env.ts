import { z } from 'zod';

import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  TEST_POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  TOKEN_EXPIRATION: z.string(),
  ADMIN_TOKEN: z.string(),
  USER_TOKEN: z.string(),
  SUPPLIER_TOKEN: z.string(),
  URL:  z.string().url(),
  OWNER_USER: z.string(),
  OWNER_EMAIL: z.string().email(),
  OWNER_PASSWORD: z.string(),
  ADMIN_TEST_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);
export default env;