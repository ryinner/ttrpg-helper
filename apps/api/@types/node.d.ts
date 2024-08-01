declare namespace NodeJS {
  interface ProcessEnv {
    TELEGRAM_BOT_LOGIN: string;
    TELEGRAM_BOT_PASSWORD: string;
    JWT_SECRET: string;
    ROUNDS_OF_HASHING: string;
  }
}
