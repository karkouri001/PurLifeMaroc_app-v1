# Pur Life Maroc - Quick Start Guide for Jury

Welcome! Here's everything you need to know to run and explore this Moroccan travel concierge mobile app.

## 🚀 Getting Started in 2 Minutes

### Step 1: Install
```bash
cd PurLifeMaroc
npm install
```

### Step 2: Run
```bash
npm start
```

### Step 3: Choose Platform
- **iOS:** Press `i` (requires Mac with Xcode)
- **Android:** Press `a` (requires Android Studio emulator)
- **Web:** Press `w` (runs in browser immediately!)
- **Phone:** Scan QR code with Expo Go app (free from App Store/Play Store)

You should see the splash screen in 2-3 seconds!

---

## 🎯 What to Look For

### 1. Language Selection
- Switch between English ↔ German
- Language persists after app restart
- All UI updates instantly (check **Settings** tab later)

### 2. Onboarding Flow
- Choose travel style (Curator, Culturist, Urbanite, Nomad)
- Select budget level
- Choose trip duration
- Pick interests
- Pick preferred destinations
- Select accommodation preference
- Confirmation screen shows profile

### 3. Home Tab
- Dashboard with quick navigation
- Shows "Your Recommendations" (based on preferences)
- Quick CTAs to explore content

### 4. Explore Tab
- Browse 4 Moroccan travel styles
- View 9 destinations with descriptions
- See 12+ activities with details
- Explore luxury accommodations
- Open Eat & Drink suggestions
- View Insights & Trends mock analytics

### 5. Favorites Tab
- Save experiences across the app
- See all saved items
- Delete favorites

### 6. Concierge Tab
- Read about 24/7 service offering
- See list of available services
- Tap "Chat" to test the chatbot
- Tap "Submit Enquiry" to open the booking request flow

### 7. More Tab
- **Settings:** Switch language and review app information
- **Preferences:** Update travel style and user settings
- **Help:** Contact support, FAQ, privacy

---

## 💡 Key Features to Demonstrate

### A. Personalization
1. Go to Onboarding and select "Curator" style + Luxury budget
2. Go to Home tab → You'll see recommendations based on preferences
3. Change language to German → Everything translates
4. Close and reopen app → Preferences still there (AsyncStorage)

### B. Smart Recommendations
1. Home tab → "Experience Your Travel Style"
2. Shows destinations/activities matched to your preferences
3. See explanation of why they're recommended

### C. Concierge Chatbot
1. Concierge tab → Chat button
2. Ask: "Tell me about Marrakesh" or "What activities?"
3. Bot responds with knowledge base info (no external API!)

### D. Complete Enquiry Flow
1. Home tab or Concierge tab → open the enquiry flow
2. Fill form (name, email, phone, dates, special requests)
3. Validation catches empty fields
4. Summary page shows confirmation + reference number
5. "Open Email Draft" launches the email app with the enquiry draft

### E. Favorites System
1. Explore any destination card
2. Heart icon saves it
3. Favorites tab shows all saved items

---

## 📁 File Structure to Know

**For Content Changes:**
```
src/data/mockData.ts          ← All travel styles, destinations, activities, accommodations
src/locales/en.json & de.json ← All text/translations
src/theme/theme.ts           ← Colors, spacing, typography
```

**For Logic Changes:**
```
src/services/RecommendationEngine.ts  ← How recommendations work
src/services/ChatbotService.ts        ← Chatbot knowledge base
src/store/AppContext.tsx              ← Global state
```

**For UI Changes:**
```
src/components/Common.tsx     ← Reusable buttons, cards, headers
app/(app)/...                 ← Individual screen files
```

---

## ⚡ Quick Demos (30 seconds each)

### Demo 1: Bilingual Support
1. Language Select → Choose "Deutsch"
2. Go through onboarding (all in German!)
3. Settings → Toggle back to "English"

### Demo 2: Content Modification
1. Open `src/data/mockData.ts`
2. Change a destination name (e.g., "Marrakesh" → "MARRAKESH ROYAL")
3. Save and hot reload
4. Destinations list shows your change instantly!

### Demo 3: Recommendations
1. Complete onboarding as "Nomad" + "Budget" 
2. Home tab shows adventure-oriented recommendations
3. Load as "Urbanite" + "Luxury" 
4. See different recommendations appear

### Demo 4: Chatbot Knowledge Base
1. Concierge tab → Chat
2. Ask different questions:
   - "Tell me about Fez"
   - "How long should I stay?"
   - "What activities?"
3. Bot matches intents and responds

---

## 🎯 Important Notes for Jury

### What This MVP Demonstrates
✅ Complete mobile app vision (not just mockups)  
✅ Bilingual support (EN/DE) - scalable to more languages  
✅ Real user state management (preferences persist)  
✅ Smart recommendations without complex AI  
✅ Local chatbot without external APIs  
✅ Beautiful, cohesive design system  
✅ Full content management via simple JSON files  
✅ Professional architecture (easy to scale)  

### Why Certain Decisions Were Made
- **Rule-based recommendations:** Simpler than ML, fully explainable
- **Local chatbot:** Works offline, no API dependency  
- **Mock data:** Easy to modify & demonstrate during jury
- **AsyncStorage:** Demonstrates persistence without backend
- **Email enquiries:** Shows workflow without payment processing
- **Context API:** Lightweight, perfect for teaching/prototyping

### Future -> Production Path
This is a solid foundation. To productionize:
1. Add Supabase/Firebase backend
2. Integrate real CRM for enquiries
3. Add user authentication
4. Connect to payment processor
5. Replace rule-based with ML recommendations
6. Integration external AI chatbot (ChatGPT API)
7. Add push notifications & analytics

---

## 🔧 Troubleshooting

**App won't start?**
```bash
npm install
npm run reset-project
npm start
```

**Hot reload not working?**
- Close app and run `npm start` again
- Use Expo Go app instead of simulator for faster reload

**Translations not updating?**
- Check spelling in locale JSON files
- Make sure you're in the right language setting
- Close and reopen app

**Changes to mockData not showing?**
- Try hot reload (press `r` in terminal)
- Clear cache: `npm run reset-project`

---

## 📞 Questions?

Everything is documented in:
- **README.md** - Full project overview
- **Code comments** - Check individual files
- **src/types/index.ts** - All TypeScript types explained

The codebase is intentionally simple and readable for jury presentation!

---

## 🎉 You're Ready!

Run `npm start`, pick your platform, and explore the app.

Key things to see:
1. Beautiful splash screen
2. Language selection
3. Comprehensive onboarding with destination and accommodation preferences
4. Personalized home page
5. Browse destinations, activities, accommodations
6. Chat with concierge
7. Submit booking enquiry
8. See recommendations based on preferences

**Enjoy! The app is ready for your presentation.** ✨

---

*Pur Life Maroc Mobile MVP - Built for Jury Presentation*  
*April 2026 - End-of-Study Internship Project*
