# 07 - Study Path

This is the best way to study this backend without getting overwhelmed.

## Pass 1 - Understand The Shape

Read only:

- `src/main.ts`
- `src/app.module.ts`
- `src/app.controller.ts`

Goal:

- understand how the app starts
- understand what a module is
- understand that routes live in controllers

## Pass 2 - Understand One Simple Feature

Read:

- `src/modules/enquiries/enquiries.controller.ts`
- `src/modules/enquiries/enquiries.service.ts`
- `src/modules/enquiries/dto/create-enquiry.dto.ts`
- `src/modules/enquiries/dto/enquiry-response.dto.ts`
- `src/prisma/prisma.service.ts`
- `prisma/schema.prisma`

Goal:

- understand request -> validation -> database -> response

This is the easiest complete backend flow in the project.

## Pass 3 - Understand The Provider Pattern

Read:

- `src/modules/content/content.service.ts`
- `src/modules/content/providers/content-provider.interface.ts`
- `src/modules/content/providers/mock-content.provider.ts`
- `src/modules/content/providers/wordpress-content.provider.ts`

Goal:

- understand why we have two providers
- understand how one service can switch between them

## Pass 4 - Understand Business Logic

Read:

- `src/modules/recommendations/recommendations.controller.ts`
- `src/modules/recommendations/recommendations.service.ts`
- recommendation DTO files

Goal:

- understand where the real recommendation logic lives

## Pass 5 - Understand Aggregation

Read:

- `src/modules/insights/insights.service.ts`

Goal:

- understand how one service can combine content data and database data

## Questions To Ask Yourself

If you can answer these, you already understand most of the backend:

1. What is the difference between a controller and a service?
2. Why do we use DTOs?
3. Why does `ContentService` exist?
4. Why do we have both `MockContentProvider` and `WordPressContentProvider`?
5. How does an enquiry reach PostgreSQL?
6. Why is `schema.prisma` important?
7. What does `main.ts` do before the server starts?

## Final Advice

Do not try to understand all files at once.

Use this order:

```text
entry point -> modules -> one simple feature -> provider pattern -> business logic
```

That is the fastest way to become comfortable with this backend.
