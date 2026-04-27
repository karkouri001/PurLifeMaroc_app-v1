# Pur Life Maroc Backend

This folder contains the backend scaffold for the selected architecture:

- `NestJS`
- `Fastify`
- `PostgreSQL`
- `Prisma`
- `Swagger`
- `Docker`
- future `WordPress REST API` adapter

## Scope

The backend is intentionally separated from the existing mobile app.  
Current status:

- frontend mobile app is already implemented in the repository root
- backend is scaffolded here as the next integration layer
- mobile is not yet wired to this API

## Main modules

- `content`: normalized content endpoints
- `recommendations`: server-side recommendation endpoint
- `enquiries`: persistent travel requests
- `insights`: simple counts and derived metrics
- `system`: backend summary and health endpoints
- `prisma`: database access

## Implemented routes

All routes are exposed under the global `/api` prefix.

- `GET /api`
- `GET /api/health`
- `GET /api/content/source`
- `GET /api/content/travel-styles`
- `GET /api/content/destinations`
- `GET /api/content/activities`
- `GET /api/content/accommodations`
- `GET /api/content/restaurants`
- `GET /api/content/drivers`
- `GET /api/content/itineraries`
- `GET /api/content/company-profile`
- `POST /api/recommendations`
- `GET /api/enquiries`
- `POST /api/enquiries`
- `GET /api/enquiries/:id`
- `GET /api/insights`

## Provider strategy

The backend is designed to support two content sources:

- `mock`: current default source
- `wordpress`: future source through WordPress REST API

The API contract stays stable while the source changes behind the provider layer.

## Suggested local setup

1. Copy `.env.example` to `.env`
2. Install dependencies
3. Start PostgreSQL with Docker
4. Run Prisma generate and migrations
5. Start the backend

Commands:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run start:dev
```

On Windows PowerShell with the default execution policy, use `npm.cmd` instead of `npm`.

Docker:

```bash
docker compose up --build
```

## Swagger

Once running locally, Swagger is exposed at:

```text
http://localhost:3001/docs
```
