export interface Environment {
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_URL: string;
  TOKEN_SECRET: string;
}
