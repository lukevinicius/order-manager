import { loadEnvConfig } from '@next/env'
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
})

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const env = envSchema.parse(process.env)
