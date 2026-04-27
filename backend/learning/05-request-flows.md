# 05 - Request Flows

This file explains how a request moves through the backend.

## Flow 1 - Content Request

Example:

```text
GET /api/content/destinations
```

Path:

1. `main.ts` starts the app and enables routing.
2. `app.module.ts` imports `ContentModule`.
3. `content.controller.ts` receives `GET /content/destinations`.
4. `content.service.ts` decides which provider to use.
5. Either:
   - `mock-content.provider.ts`
   - or `wordpress-content.provider.ts`
6. Data is returned to the client.

Important idea:

The controller does not care where the content comes from.

## Flow 2 - Recommendation Request

Example:

```text
POST /api/recommendations
```

Path:

1. Request reaches `recommendations.controller.ts`
2. Incoming body is validated by `CreateRecommendationDto`
3. Controller calls `RecommendationsService`
4. Service asks `ContentService` for destinations, activities, and accommodations
5. Service computes scores and selects results
6. Response is returned as `RecommendationResponseDto`

Important idea:

The recommendation logic is in the service, not in the controller.

## Flow 3 - Enquiry Creation

Example:

```text
POST /api/enquiries
```

Path:

1. Request reaches `enquiries.controller.ts`
2. Body is validated with `CreateEnquiryDto`
3. Controller calls `EnquiriesService`
4. Service uses `PrismaService`
5. Prisma writes data into PostgreSQL
6. Response returns saved enquiry data

Important idea:

`PrismaService` is the database access bridge.

## Flow 4 - Insights

Example:

```text
GET /api/insights
```

Path:

1. `insights.controller.ts`
2. `insights.service.ts`
3. `content.service.ts` for content counts
4. `prisma.service.ts` for enquiry count
5. combined response returned

## Short Summary

In this backend, almost every route follows one of these patterns:

```text
Controller -> Service -> Provider
Controller -> Service -> Prisma
Controller -> Service -> Provider + Prisma
```
