# Pur Life Maroc Mobile App - MVP

A clean, elegant, bilingual mobile application for Pur Life Maroc, a luxury Moroccan travel concierge service. Built with React Native/Expo, this MVP showcases a vision for a premium, personalized travel experience platform.

**Languages:** English & German  
**Tech Stack:** Expo React Native, TypeScript, React Navigation, NativeWind, i18next  
**Status:** Academic Prototype - End-of-Study Internship Project

---

## 📱 Features

### Core Functionality
- **Multi-language Support** (English/German) with persistent preferences
- **Personalized Onboarding** - 6 preference steps plus final confirmation
- **Travel Styles** - 4 curated journey philosophies
- **Destinations** - 9 Moroccan locations with details
- **Activities** - 12+ curated experiences
- **Accommodations** - Luxury properties across styles
- **Eat & Drink** - Curated dining suggestions with mock restaurant data
- **Smart Recommendations** - Rule-based matching engine
- **Local Concierge Chatbot** - Knowledge-base chatbot (no external AI)
- **Favorites System** - Save and organize preferences
- **Email Enquiries** - Booking requests with validation
- **Insights & Trends** - Mock analytics screen for product vision
- **Persistent Storage** - Local data via AsyncStorage

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`

### Installation & Running

```bash
# Navigate to project directory
cd PurLifeMaroc

# Install dependencies
npm install

# Start development server
npm start

# Options:
# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
# Press 'w' for Web
# Scan QR with Expo Go app on phone
```

### Other Commands

```bash
npm run ios          # Run on iOS
npm run android      # Run on Android
npm run web          # Run on web browser
npm run lint         # Check code style
npm run reset-project # Clear and reset project
```

---

## 📁 Project Structure

```
src/
├── components/Common.tsx         # Reusable UI (Button, Card, Header)
├── data/mockData.ts             # All mock content
├── locales/                     # i18n translations
│   ├── i18n.ts                 # i18next config
│   ├── en.json                 # English (300+ keys)
│   └── de.json                 # German translations
├── services/                    # Business logic
│   ├── RecommendationEngine.ts # Suggestion algorithm
│   └── ChatbotService.ts       # Knowledge-base chatbot
├── store/AppContext.tsx        # Global state management
├── theme/theme.ts             # Design system (colors, spacing)
├── types/index.ts             # TypeScript definitions
└── utils/helpers.ts           # Utilities (email, validation)

app/
├── _layout.tsx                # Root setup
└── (app)/
    ├── splash.tsx
    ├── language-select.tsx
    ├── onboarding.tsx
    ├── settings.tsx
    ├── travel-styles-list.tsx
    ├── destinations-list.tsx & destination-details.tsx
    ├── activities-list.tsx & activity-details.tsx
    ├── accommodation-list.tsx & accommodation-details.tsx
    ├── eat-drink.tsx
    ├── insights.tsx
    ├── recommendations.tsx
    ├── chatbot.tsx
    ├── enquiry.tsx & enquiry-summary.tsx
    └── (tabs)/               # Bottom navigation
        ├── index.tsx         # Home
        ├── explore.tsx
        ├── favorites.tsx
        ├── concierge.tsx
        └── more.tsx
```

---

## 🎨 Design System

**Colors:**
- Primary: #E67E22 (Warm Orange)
- Secondary: #D4A574 (Gold)
- Neutrals: Black, White, Grays
- Earth Tones: Beige, Natural palette

**Components:**
- Button (3 variants, 3 sizes)
- Card (rounded, shadowed)
- Header (with back button)
- Badge (colored labels)

**Spacing:** xs (4px) → xxxl (48px)  
**Radius:** sm (4px) → full (999px)

---

## 🧠 Key Services

### RecommendationEngine
Rule-based suggestions (no AI):
- Filters by travel style, budget, duration
- Matches activities to preferences
- Filters accommodations
- Generates explanations

### ChatbotService
Local knowledge base:
- 14+ intent categories
- Keyword matching
- Contextual responses
- No external API required

### Utilities
- Email generation & sending
- Form validation
- Text formatting
- Insights generation helpers

---

## 💾 State Management

**AppContext provides:**
- User preferences (travel style, budget, duration, interests)
- Favorites (saved items)
- Enquiries (booking submissions)
- Language choice
- All persisted to AsyncStorage

```typescript
const { preferences, favorites, addFavorite } = useAppContext();
```

---

## 🌐 Internationalization

Complete EN/DE translations:
- 300+ translation keys
- All screens covered
- Runtime language switching
- Settings to persist choice

```typescript
const { t } = useTranslation();
<Text>{t('home.welcome')}</Text>
```

---

## 📧 Enquiry System

Email-based booking (future: backend integration):
1. User fills form with details
2. Validation checks all fields
3. Generates formatted email
4. Opens email client
5. User sends to enquiry@purlifemaroc.com
6. Summary shows reference number

---

## 🔜 Future Enhancements

- **Website/API/CRM Integration:** future connection to real website services, API endpoints, or CRM workflows
- **Real Enquiry Sync:** synchronize submitted enquiries with a real back-office system
- **Auth:** User profiles & authentication
- **Payments:** Real booking + payment processing
- **Analytics:** real analytics and tracking beyond mock trend data
- **AI Chatbot:** Dialogflow/ChatGPT integration
- **Notifications:** Push updates
- **Community:** User reviews, itinerary sharing
- **Richer Multilingual Support:** French, Spanish, Arabic, and stronger localization coverage
- **Admin Panel:** Content management

---

## 📋 Screen Breakdown

**Onboarding Flow:**
1. Splash (2.5s intro)
2. Language Select
3. Onboarding (6 preference steps + final confirmation)

**Main App (Bottom Tabs):**
1. **Home** - Dashboard, quick links, recommendations
2. **Explore** - Browse all content categories
3. **Favorites** - Saved experiences
4. **Concierge** - Chat and services
5. **More** - Settings, help, about

**Detail Screens:**
- Travel Style Details
- Destination Details → Activities by Destination
- Activity Details
- Accommodation Details
- Eat & Drink
- Insights & Trends
- Recommendations Result
- Chatbot Interface
- Enquiry Form
- Enquiry Confirmation
- Settings

---

## 🎓 For Presentations

**Key Features to Highlight:**
1. Luxury design (colors, spacing, shadows)
2. Bilingual support (seamless EN/DE)
3. Smart recommendations (rule-based)
4. Local chatbot (no APIs)
5. Email enquiries (complete flow)
6. Clean architecture (easy to modify)

**Quick Demo Modifications:**
- Colors: `src/theme/theme.ts`
- Content: `src/data/mockData.ts`
- Translations: `src/locales/{en,de}.json`
- Logic: `src/services/`

**Talking Points:**
- Demonstrates product vision
- Shows bilingual scalability
- Teaches mobile development
- Remains simple for jury understanding
- Easy to modify during presentation

---

## ✅ What's Included

- ✅ Complete app structure
- ✅ 22+ screens
- ✅ Full TypeScript types
- ✅ Design system (theme)
- ✅ Mock data (editable)
- ✅ English + German
- ✅ State management
- ✅ Validation & error handling
- ✅ Components library
- ✅ Services (Recommendations, Chatbot)
- ✅ Utilities (Email, formatting)
- ✅ Navigation (file-based routing)

---

## 📦 Dependencies

**Core:** React Native, Expo, TypeScript  
**Navigation:** expo-router, @react-navigation  
**Styling:** NativeWind, centralized theme  
**State:** Context API + AsyncStorage  
**i18n:** i18next + react-i18next  
**Utilities:** Expo Linking, validators  

---

## 🚀 Performance Notes

- Optimized FlatLists with proper key extraction
- Memoized components where needed
- AsyncStorage for quick data access
- Lightweight theme system
- No external API calls
- Efficient navigation stack

---

## 📱 Supported Platforms

✅ iOS (Simulator or device)  
✅ Android (Emulator or device)  
✅ Web (Browser)

---

## 🐛 Known Limitations (By Design)

- No real user authentication
- No actual payment processing
- All data is mock (in JSON files)
- Chatbot uses keyword matching (not AI)
- Email enquiries are manual
- Local storage only (no backend sync)

These are intentional for the MVP - focus is on demonstrating the product vision and user experience.

---

## 🎯 Success Criteria Met

✅ Clean, elegant, minimal luxury Feel  
✅ Bilingual (EN/DE) throughout  
✅ Personalized recommendations  
✅ Concierge chatbot  
✅ Favorites system  
✅ Email enquiry flow  
✅ Eat & Drink screen  
✅ Insights / trends screen  
✅ Centralized theme  
✅ Mock data (editable)  
✅ Simple, readable code  
✅ Easy to modify during jury presentation  
✅ Complete README  

---

## 📄 Project Info

**Created:** April 2026  
**Type:** Academic Prototype - End-of-Study Internship  
**Purpose:** Mobile vision for Pur Life Maroc luxury travel concierge  

Enjoy! 🎉
