# Pur Life Maroc Project Details

## 1. Project Summary

Pur Life Maroc is a mobile MVP built with Expo and React Native for a luxury travel concierge experience focused on Morocco. The application was designed as an academic internship project to demonstrate product thinking, mobile UI development, bilingual support, recommendation logic, and a concierge-style chatbot without depending on an external backend or AI API.

The app is intentionally positioned as a prototype with production-minded structure:

- clear screen-based navigation
- reusable UI components
- centralized theme
- local persistence with AsyncStorage
- rule-based recommendation logic
- a local knowledge-base chatbot

## 2. Main Objective

The objective of the project is to simulate a premium digital concierge that can:

- collect traveler preferences
- guide the user through Moroccan destinations and experiences
- recommend suitable activities and accommodations
- allow favorites saving
- answer common travel questions through a chatbot
- capture booking intent through an enquiry flow

## 3. Tech Stack

### Current Mobile Stack

- `Expo` and `React Native`
- `TypeScript`
- `expo-router` for file-based navigation
- `react-i18next` and `i18next` for translations
- `AsyncStorage` for persistence
- `Context API` for global state

### Target Backend Stack

- `NestJS`
- `Fastify`
- `PostgreSQL`
- `Prisma`
- `Swagger / OpenAPI`
- `Docker`
- `WordPress REST API adapter`

## 4. How the Application Works

### Launch Flow

1. The app starts with a splash screen.
2. The user selects a language: English or German.
3. The onboarding flow collects travel preferences.
4. Preferences are stored locally and reused across the app.

### Main Navigation

The main experience is organized through bottom tabs:

- `Home`: quick links, recommendations access, favorites shortcut, enquiry CTA
- `Explore`: browse travel styles, destinations, activities, accommodation
- `Favorites`: review saved destinations, activities, accommodation, and restaurant entries
- `Concierge`: access support information, chatbot, and enquiry CTA
- `More`: settings, language switch, support, preferences, app information

### Detail Flow

The user can open:

- destination details
- activity details
- accommodation details
- recommendations screen
- chatbot screen
- enquiry form and enquiry summary

## 5. Implemented Features

### User Experience Features

- bilingual interface in English and German
- persistent language preference
- 6-step onboarding
- favorites management
- clean luxury-inspired visual theme
- reusable buttons, cards, headers, and badges

### Content Features

- 4 travel styles
- 9 destinations
- 12+ activities
- multiple accommodation options
- Eat & Drink screen backed by restaurant mock data
- Insights and trends screen backed by mock analytics data

### Logic Features

- rule-based recommendation engine based on:
  - travel style
  - trip duration
  - budget
  - accommodation preference
- chatbot intent matching based on keywords
- enquiry form validation
- local enquiry persistence

### Persistence Features

Stored locally with AsyncStorage:

- selected language
- onboarding preferences
- favorites
- submitted enquiries

## 6. Architecture Overview

### Current Implemented Architecture

### `app/`

Contains all screens and navigation routes.

### `src/components/`

Contains shared UI building blocks such as `Button`, `Card`, and `Header`.

### `src/data/mockData.ts`

Contains mock business content:

- travel styles
- destinations
- activities
- accommodations
- restaurants

### `src/store/AppContext.tsx`

Provides app-wide state and persistence methods.

### `src/services/RecommendationEngine.ts`

Generates recommendations without AI by applying explicit filtering and sorting rules.

### `src/services/ChatbotService.ts`

Handles chatbot responses through a local knowledge base and keyword-based intent matching.

### `src/locales/`

Contains English and German translation files plus i18n setup.

### Backend Architecture Added

The repository now also contains a separate backend workspace in `backend/`. It adds an internal API layer between the mobile app and future enterprise-managed content.

Target flow:

```text
Mobile App -> NestJS API -> Content Provider -> Mock Data or WordPress REST API
```

This keeps the mobile app independent from WordPress response structures and makes future integration a provider-level replacement instead of a frontend rewrite.

Backend elements already added:

- NestJS bootstrap with Fastify
- Swagger documentation setup
- Prisma schema for PostgreSQL
- `content`, `recommendations`, `enquiries`, `insights`, and `system` endpoints
- provider strategy for `mock` and `wordpress`

## 7. Recommendation System

The recommendation system is deterministic and explainable.

It works by:

1. filtering destinations using preferred destinations or travel style mapping
2. prioritizing short-trip destinations for weekend stays
3. filtering activities connected to the recommended destinations
4. prioritizing activity categories according to travel style
5. filtering accommodations by destination, preference, and budget
6. generating an explanation string for the user

This approach was chosen because it is:

- simple to explain during presentation
- easy to debug
- easy to extend
- appropriate for an MVP

## 8. Enquiry Flow

The enquiry feature is designed to simulate booking intent.

It currently includes:

- form inputs for customer details
- field validation
- local enquiry storage
- a confirmation screen with reference number

In a production version, this would normally be connected to:

- CRM
- booking engine
- email automation
- payment workflow

## 9. Current Limits and Honest Scope

The project is clean and functional, but some features are intentionally scoped as mock-driven foundations rather than live integrations.

Current examples:

- restaurant suggestions are based on mock data only
- insights and trends are based on mock analytics only
- the chatbot is local and rule-based, not AI-powered
- the app uses mock data only
- there is no backend authentication or payment integration

## 10. Backend Direction Chosen

The project now has a defined backend direction and an initial backend scaffold already added in the repository, even though this layer is not yet integrated in the current mobile implementation.

Chosen backend direction:

- `NestJS` as the API framework
- `PostgreSQL` as the main database
- `Prisma` for schema management and typed database access
- `Swagger` for API documentation
- `Docker` for reproducible local execution
- a `WordPress REST API adapter` for future company integration

The goal is to preserve the current frontend logic while progressively moving content delivery, enquiries, and recommendation execution behind a stable internal API.

## 11. Verification Status

Project verification completed on April 14, 2026.

Checks passed:

- `npm run lint`
- `npx tsc --noEmit`

Key fixes applied during verification:

- fixed TypeScript errors in navigation and style props
- fixed duplicate JSX props in settings
- restored onboarding coverage for preferred destinations
- fixed runtime language switching in the `More` tab
- added Eat & Drink and Insights screens required by the brief
- added email-draft opening in the enquiry flow
- improved chatbot handling for booking and chauffeur requests
- aligned README and jury guide with the implemented scope

## 12. Branding Assets

If you want to replace the current app branding with a real company logo, the main assets to update are:

- `assets/images/icon.png`
- `assets/images/splash-icon.png`
- `assets/images/favicon.png`
- `assets/images/android-icon-background.png`
- `assets/images/android-icon-foreground.png`
- `assets/images/android-icon-monochrome.png`

## 13. Short Conclusion

Pur Life Maroc is a well-structured mobile prototype that already demonstrates a complete travel-concierge product flow with bilingual UX, recommendation logic, local persistence, and a chatbot feature. The project now also includes an initial backend scaffold that supports future WordPress integration without forcing a frontend redesign.
