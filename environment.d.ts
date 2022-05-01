declare namespace NodeJS {
  interface ProcessEnv {
    DB_FILE: string;
    DB_PATH: string;
    NODE_ENV: 'development' | 'production';
    PORT: string;
    SECRET: string;
  }
}
