# Backend Learning Guide

This folder is a guided explanation of the backend for someone who is new to `NestJS`.

If you understand the files in this folder, you should understand around 80 to 90 percent of how the current backend works.

## Read In This Order

1. `01-what-to-ignore.md`
2. `02-big-picture.md`
3. `03-nestjs-basics.md`
4. `04-folder-map.md`
5. `05-request-flows.md`
6. `06-file-by-file.md`
7. `07-study-path.md`

## Goal

The goal is not to memorize everything. The goal is to answer these questions clearly:

- Where does the backend start?
- How does an HTTP request move through NestJS?
- Why do we have modules, controllers, services, DTOs, and Prisma?
- Which files are important?
- Which files can be ignored for now?

## Current Backend Scope

The backend currently does these things:

- exposes API routes with `NestJS`
- serves content from a `mock` provider or a future `wordpress` provider
- generates recommendations on the server
- stores travel enquiries in PostgreSQL through `Prisma`
- exposes simple insights
- documents the API with `Swagger`

## Important Note

You do **not** need to read `node_modules/` or `dist/`.

Those folders are generated or external. They are not where you learn the project logic.
