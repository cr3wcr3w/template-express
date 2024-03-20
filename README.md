## Getting started
```bash
## docker
docker compose up
## docker compose down

## drizzle commands
## generate migrations based on schema
# pnpm run drizzle:generate
## push your schema changes directly to the database
pnpm run drizzle:push
## explore your database in UI mode in local.drizzle.studio/?port=1234
pnpm run drizzle:studio

## run development mode in localhost:3000
pnpm run dev
## build for production
# pnpm run build
## start the application in localhost:3000
# pnpm run start

## swagger: :3000/api-docs
```

## This templates use the following stack:
  - Language: TypeScript
  - Backend: Express.js
  - ORM: Drizzle
  - Package Manager: pnpm
  - Local Database: Docker Compose
  - Documentation: Swagger

## This repository has different branches:
  - [ ] feat/lucia-auth
  - [ ] feat/file-upload
  - [ ] feat/web-socket

