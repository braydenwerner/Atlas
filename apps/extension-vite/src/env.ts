import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLIC_ANON_KEY: z.string().min(1),
  ENV: z
    .union([
      z.literal("development"),
      z.literal("testing"),
      z.literal("production"),
    ])
    .default("development"),
});

console.log(envSchema);

const env = envSchema.parse(import.meta.env);

export default env;
