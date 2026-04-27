# Backend Target Architecture

## Objective

The project keeps the current mobile app as the implemented frontend while introducing a backend architecture designed for future integration with company-managed WordPress content.

This backend is intended to let the mobile app consume a stable internal API, while making the future switch from mock data to WordPress content a provider replacement rather than a frontend rewrite.

## Selected Stack

- `NestJS`
- `Fastify` adapter
- `PostgreSQL`
- `Prisma`
- `Swagger / OpenAPI`
- `Docker`
- `WordPress REST API adapter`

## Design Rule

The mobile app must never depend directly on WordPress response formats.

Instead:

```text
Mobile App -> Internal API -> Content Provider -> Mock Data or WordPress
```

## Current State

Current implementation in the repository:

- mobile app built with `Expo` and `React Native`
- local state through `Context API`
- local persistence with `AsyncStorage`
- mock business content in `src/data/`
- rule-based recommendation engine in `src/services/RecommendationEngine.ts`
- local chatbot logic in `src/services/ChatbotService.ts`
- backend scaffold implemented in `backend/`
- NestJS modules already added for `content`, `recommendations`, `enquiries`, `insights`, and `system`
- Prisma schema prepared for PostgreSQL persistence
- Swagger and Docker configuration already present

## Target Backend Responsibilities

### 1. Content API

Expose normalized endpoints for:

- destinations
- activities
- accommodations
- restaurants
- travel styles
- itineraries
- company / concierge content

### 2. Recommendation API

Move recommendation execution behind the backend when needed:

- `POST /recommendations`

This keeps the contract stable even if the internal logic evolves later.

### 3. Enquiry API

Persist travel requests in PostgreSQL:

- `POST /enquiries`
- `GET /enquiries/:id`

### 4. Insights API

Serve simple analytics and derived counts:

- `GET /insights`

### 5. WordPress Integration Layer

Add a provider layer with two interchangeable implementations:

- `MockContentProvider`
- `WordPressContentProvider`

The frontend remains unchanged while the provider source changes.

## Implemented Modules

```text
backend/
  src/
    app.controller.ts
    app.module.ts
    main.ts
    modules/
      content/
      recommendations/
      enquiries/
      insights/
    prisma/
```

## Current API Surface

- `GET /api`
- `GET /api/health`
- `GET /api/content/source`
- `GET /api/content/destinations`
- `GET /api/content/activities`
- `GET /api/content/accommodations`
- `GET /api/content/restaurants`
- `GET /api/content/travel-styles`
- `GET /api/content/itineraries`
- `GET /api/content/drivers`
- `GET /api/content/company-profile`
- `POST /api/recommendations`
- `GET /api/enquiries`
- `POST /api/enquiries`
- `GET /api/enquiries/:id`
- `GET /api/insights`

## Why This Architecture Fits The Project

- it preserves the current mobile app structure
- it avoids coupling the app directly to WordPress
- it gives the project a real backend layer without requiring company APIs immediately
- it prepares a clean migration path once WordPress access is granted
- it adds strong backend technologies that improve the CV value of the project
