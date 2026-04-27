# 01 - What To Ignore

If you are learning the backend, ignore these folders first:

## `node_modules/`

This contains installed packages from npm.

Examples:

- NestJS itself
- Prisma client
- Fastify
- Swagger packages

You did not write this code. It is dependency code.

## `dist/`

This contains generated JavaScript after TypeScript compilation.

The real source code is in `src/`.

So:

- `src/` = the code you should read
- `dist/` = compiled output

## `package-lock.json`

This is generated automatically by npm to lock dependency versions.

Useful for reproducibility, but not useful for understanding backend architecture.

## What You Should Focus On Instead

Start with these:

- `src/main.ts`
- `src/app.module.ts`
- `src/app.controller.ts`
- `src/modules/`
- `src/prisma/`
- `prisma/schema.prisma`
- `package.json`
- `.env.example`
- `docker-compose.yml`
