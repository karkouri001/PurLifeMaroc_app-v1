# 06 - File By File Explanation

This is the most practical file in the guide.

## Top-Level Source Files

### `src/main.ts`

Role:

- bootstraps the NestJS app
- uses Fastify
- enables CORS
- sets global route prefix `/api`
- enables validation pipe
- configures Swagger
- starts the server

If you want to know how the app starts, read this first.

### `src/app.module.ts`

Role:

- root module of the application
- imports:
  - `ConfigModule`
  - `PrismaModule`
  - `ContentModule`
  - `RecommendationsModule`
  - `EnquiriesModule`
  - `InsightsModule`

If you want the global map of the app, read this second.

### `src/app.controller.ts`

Role:

- simple system endpoints
- returns backend status
- returns health information

This is a light controller, useful as a simple example.

### `src/dto/app-status.dto.ts`

Role:

- defines the response shape of status/health endpoints

It tells the frontend what those responses look like.

## Prisma Files

### `src/prisma/prisma.module.ts`

Role:

- registers `PrismaService`
- exports it to the rest of the app

Because it is global, other modules can use Prisma without re-declaring it.

### `src/prisma/prisma.service.ts`

Role:

- extends `PrismaClient`
- connects to the database when the app starts

This is the file that gives NestJS access to PostgreSQL through Prisma.

### `prisma/schema.prisma`

Role:

- defines database tables/models

Current models:

- `Enquiry`
- `SyncLog`
- `AnalyticsEvent`

This file is the database structure.

## Content Module

### `src/modules/content/content.module.ts`

Role:

- groups content-related pieces
- registers controller, service, and providers
- exports `ContentService`

### `src/modules/content/content.controller.ts`

Role:

- exposes content routes:
  - `/content/source`
  - `/content/travel-styles`
  - `/content/destinations`
  - `/content/activities`
  - `/content/accommodations`
  - `/content/restaurants`
  - `/content/drivers`
  - `/content/itineraries`
  - `/content/company-profile`

### `src/modules/content/content.service.ts`

Role:

- chooses the active provider using `CONTENT_SOURCE`
- forwards content requests to that provider

This file is very important.

It hides the difference between mock content and WordPress content.

### `src/modules/content/dto/content.dto.ts`

Role:

- defines the shapes of content objects:
  - `TravelStyleDto`
  - `DestinationDto`
  - `ActivityDto`
  - `AccommodationDto`
  - `RestaurantDto`
  - `DriverProfileDto`
  - `SignatureItineraryDto`
  - `CompanyProfileDto`

This is the backend content contract.

### `src/modules/content/dto/content-source.dto.ts`

Role:

- defines the response of the `/content/source` endpoint

### `src/modules/content/providers/content-provider.interface.ts`

Role:

- defines the contract every content provider must follow

This is one of the smartest files in the backend.

Why:

Because both the mock provider and WordPress provider must return the same kinds of data.

### `src/modules/content/providers/mock-content.provider.ts`

Role:

- returns local hardcoded content

This is the current active provider when `CONTENT_SOURCE=mock`.

### `src/modules/content/providers/wordpress-content.provider.ts`

Role:

- fetches data from WordPress REST API
- transforms it into the same normalized DTOs

This file is the future integration layer.

## Recommendations Module

### `src/modules/recommendations/recommendations.module.ts`

Role:

- groups recommendation controller and service
- imports `ContentModule`

Why import `ContentModule`:

Because recommendations need destinations, activities, and accommodations.

### `src/modules/recommendations/recommendations.controller.ts`

Role:

- exposes `POST /recommendations`
- validates the request body
- calls the service

### `src/modules/recommendations/recommendations.service.ts`

Role:

- the real recommendation logic
- loads content through `ContentService`
- scores destinations
- filters activities
- filters accommodations
- builds explanation text

This is one of the most important business-logic files.

### `src/modules/recommendations/dto/create-recommendation.dto.ts`

Role:

- defines input preferences for recommendation generation

### `src/modules/recommendations/dto/recommendation-response.dto.ts`

Role:

- defines the response shape of recommendations

## Enquiries Module

### `src/modules/enquiries/enquiries.module.ts`

Role:

- groups enquiry controller and service

### `src/modules/enquiries/enquiries.controller.ts`

Role:

- exposes:
  - `GET /enquiries`
  - `POST /enquiries`
  - `GET /enquiries/:id`

### `src/modules/enquiries/enquiries.service.ts`

Role:

- creates enquiries
- reads enquiries
- lists recent enquiries
- uses Prisma to talk to the database

This file is the bridge between API requests and persistence.

### `src/modules/enquiries/dto/create-enquiry.dto.ts`

Role:

- validates enquiry input

### `src/modules/enquiries/dto/enquiry-response.dto.ts`

Role:

- defines what an enquiry response looks like

## Insights Module

### `src/modules/insights/insights.module.ts`

Role:

- groups insight controller and service

### `src/modules/insights/insights.controller.ts`

Role:

- exposes `GET /insights`

### `src/modules/insights/insights.service.ts`

Role:

- loads content counts
- loads enquiry count from Prisma
- returns combined metrics

### `src/modules/insights/dto/insights-response.dto.ts`

Role:

- defines the response shape for insights

## Top-Level Backend Config Files

### `package.json`

Role:

- dependencies
- scripts

Important scripts:

- `build`
- `start`
- `start:dev`
- `prisma:generate`
- `prisma:migrate:dev`
- `docker:up`
- `docker:down`

### `.env.example`

Role:

- sample environment configuration

### `docker-compose.yml`

Role:

- local backend infrastructure with containers

### `Dockerfile`

Role:

- how to build the backend app image

## If You Only Read 8 Files

If you want the shortest useful path, read these:

1. `src/main.ts`
2. `src/app.module.ts`
3. `src/modules/content/content.controller.ts`
4. `src/modules/content/content.service.ts`
5. `src/modules/content/providers/content-provider.interface.ts`
6. `src/modules/recommendations/recommendations.service.ts`
7. `src/modules/enquiries/enquiries.service.ts`
8. `prisma/schema.prisma`
