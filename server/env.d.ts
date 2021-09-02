declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string
    PORT: string
    JWT_SECRET: string
  }
}
