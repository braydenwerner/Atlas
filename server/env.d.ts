declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string
    PORT: string
    JWT_SECRET: string
    STRIPE_SECRET_TEST: string
    STRIPE_PRICE_TEST: string
  }
}
