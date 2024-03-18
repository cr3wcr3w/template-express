const DB_HOST=process.env.DB_HOST as string
const DB_HELLO_PASSWORD=process.env.DB_HELLO_PASSWORD as string
const DB_HELLO_USER=process.env.DB_HELLO_USER as string
const DB_HELLO_NAME=process.env.DB_HELLO_NAME as string
const DB_HELLO_PORT=process.env.DB_HELLO_PORT as string
const DATABASE_URL=`postgresql://${DB_HELLO_USER}:${DB_HELLO_PASSWORD}@${DB_HOST}:${DB_HELLO_PORT}/${DB_HELLO_NAME}`

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/models/schema.ts",
  driver: 'pg',
  verbose: true,
  strict: true,
  out: "./drizzle",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
})