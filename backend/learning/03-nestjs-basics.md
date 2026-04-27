# 03 - NestJS Basics

If you know these words, most of the backend will already make sense.

## Module

A module is a group of related backend pieces.

Example:

- `content.module.ts`
- `recommendations.module.ts`
- `enquiries.module.ts`

Think of a module as a feature box.

## Controller

A controller receives HTTP requests.

Examples:

- `GET /api/content/destinations`
- `POST /api/recommendations`

The controller does not contain the main business logic. It forwards the work.

Think:

```text
Request enters here first
```

## Service

A service contains the main logic.

Examples:

- choosing the content provider
- scoring recommendations
- saving an enquiry in the database
- computing insights

Think:

```text
The service does the real work
```

## DTO

DTO means Data Transfer Object.

A DTO defines the shape of data going in or out.

Examples:

- `CreateEnquiryDto`
- `RecommendationResponseDto`

Think:

```text
This is the allowed data format
```

## Provider

In this project, provider means the source of content.

We have:

- `MockContentProvider`
- `WordPressContentProvider`

Both follow the same contract.

Think:

```text
Different source, same output format
```

## Prisma

Prisma is the tool that connects our code to PostgreSQL.

Think:

```text
NestJS service -> Prisma -> PostgreSQL
```

## Swagger

Swagger generates API documentation automatically.

It shows:

- routes
- request bodies
- response shapes

## Fastify

Fastify is the HTTP engine used underneath NestJS.

NestJS is the framework structure.
Fastify is the request server adapter.

## The Most Important Mental Model

For almost every feature, the flow is:

```text
Module
  -> Controller
  -> Service
  -> DTO / Provider / Prisma
```
