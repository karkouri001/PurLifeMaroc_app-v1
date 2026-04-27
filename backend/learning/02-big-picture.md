# 02 - Big Picture

## What This Backend Is

This backend is the server part of the project.

The mobile app is the client.

The backend exposes HTTP routes like:

- `GET /api/content/destinations`
- `POST /api/recommendations`
- `POST /api/enquiries`
- `GET /api/insights`

## Main Idea

The app should not talk directly to WordPress later.

Instead:

```text
Mobile app -> our NestJS backend -> mock provider or WordPress provider
```

That means the mobile app talks to **our own API format**.

Later, if the company gives WordPress access, we only change the provider layer. The app does not need a full rewrite.

## What The Backend Does Today

### 1. Content

Returns normalized content:

- travel styles
- destinations
- activities
- accommodations
- restaurants
- drivers
- itineraries
- company profile

### 2. Recommendations

Receives traveler preferences and returns:

- recommended destinations
- recommended activities
- recommended stays
- explanation text

### 3. Enquiries

Receives enquiry data and stores it in PostgreSQL.

### 4. Insights

Returns simple counts and metrics.

### 5. System

Returns health and backend summary info.

## One Sentence Summary

This backend is a middle layer between the mobile app and the data sources.
