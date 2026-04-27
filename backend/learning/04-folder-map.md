# 04 - Folder Map

This is the backend tree you should care about.

## Backend Root

### `package.json`

Defines scripts and dependencies.

Examples:

- `npm run build`
- `npm run start:dev`
- `npm run prisma:generate`

### `.env.example`

Shows required environment variables:

- `PORT`
- `CONTENT_SOURCE`
- `DATABASE_URL`
- `WORDPRESS_BASE_URL`

### `docker-compose.yml`

Starts the local infrastructure:

- PostgreSQL database
- backend API container

### `Dockerfile`

Defines how the backend app is built in Docker.

### `nest-cli.json`

NestJS CLI configuration.

### `tsconfig.json`

TypeScript config for development/build.

### `tsconfig.build.json`

TypeScript config specifically for the production build.

### `prisma/schema.prisma`

Database schema definition.

This is where you define database models.

## `src/`

This is the real backend source code.

### `src/main.ts`

Application entry point.

It:

- starts NestJS
- sets the `/api` prefix
- enables validation
- enables Swagger
- starts the server

### `src/app.module.ts`

Root module of the whole backend.

It imports all feature modules.

### `src/app.controller.ts`

System endpoints like:

- `/api`
- `/api/health`

### `src/dto/`

Contains DTOs used at app level.

Current example:

- `app-status.dto.ts`

### `src/modules/`

Contains feature modules.

#### `content/`

Everything related to content delivery.

#### `recommendations/`

Everything related to server-side recommendation logic.

#### `enquiries/`

Everything related to saving and reading enquiries.

#### `insights/`

Everything related to simple metrics.

### `src/prisma/`

Prisma integration for database access.

Contains:

- `prisma.module.ts`
- `prisma.service.ts`

## Generated Folders You Should Not Study First

### `dist/`

Compiled JavaScript output.

### `node_modules/`

Installed libraries.
