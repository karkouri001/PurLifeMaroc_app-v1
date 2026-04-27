# Chatbot Feature Documentation

## 1. Purpose of the Chatbot

The chatbot was implemented to simulate a digital concierge assistant inside the Pur Life Maroc app. Its role is to answer common user questions about Morocco, destinations, activities, accommodation, travel timing, booking, chauffeur-style transport, and concierge services.

The goal was not to build a generative AI assistant, but to create a reliable and explainable support feature that works locally inside the app.

## 2. Why This Approach Was Chosen

The chatbot uses a local knowledge-base design instead of an external AI API.

This choice was made because it offers:

- no API dependency
- no internet dependency for responses
- predictable output
- no usage cost
- easy explanation during jury or internship presentation
- easier debugging and testing

For an academic MVP, this is a strong engineering tradeoff because it proves the concept without adding backend complexity.

## 3. Files Involved

Main files:

- `src/services/ChatbotService.ts`
- `app/(app)/chatbot.tsx`
- `src/types/index.ts`
- `src/locales/en.json`
- `src/locales/de.json`

## 4. Functional Architecture

### UI Layer

The chatbot screen in `app/(app)/chatbot.tsx` handles:

- the message list
- the input field
- send action
- loading indicator
- display of user and bot messages

### Service Layer

`src/services/ChatbotService.ts` contains the chatbot logic:

- the knowledge base
- intent detection
- response generation
- greeting generation
- booking-related keyword detection
- booking redirect toward the enquiry flow

### Data Model

Messages use the `ChatMessage` type from `src/types/index.ts`.

Each message contains:

- `id`
- `type` as `user` or `bot`
- `text`
- `timestamp`

## 5. How the Chatbot Works

### Step-by-Step Flow

1. The user opens the chatbot screen.
2. The screen displays an initial greeting message.
3. The user writes a question.
4. The screen pushes the user message into local state.
5. The app shows a short loading state to simulate a natural response delay.
6. `ChatbotService.generateResponse()` is called.
7. The service compares the message against the knowledge base.
8. The best matching category is selected according to keyword matches.
9. One predefined response from that category is returned.
10. The response is displayed as a bot message.

### Matching Method

The service converts the user message to lowercase and checks whether it contains known keywords.

For each category:

- every matching keyword increases a score
- the category with the highest score wins
- if nothing matches, the chatbot returns a fallback answer

This is a simple intent-classification strategy based on keyword overlap.

### Booking Redirect

When the user asks to reserve or book something, the chatbot does not pretend to confirm a booking. Instead, it returns a polite redirect message and sends the user toward the enquiry flow, which keeps the feature aligned with the email-based business constraint of the project.

## 6. Supported Topics

The chatbot knowledge base currently covers topics such as:

- greetings
- travel styles
- destinations
- activities
- accommodation
- food and dining
- concierge services
- chauffeur and transport requests
- booking and enquiries
- pricing and budget
- travel duration
- best time to visit
- customization
- logistics and visa
- recommendations
- language questions
- thanks and conversation closing

In practice, this gives the chatbot around 16 intent categories.

## 7. Interesting Technical Points

### Local and Deterministic

Because responses are predefined, the chatbot never invents unsupported facts in the same way an external generative AI sometimes might.

### Easy to Extend

To add a new topic, the developer only needs to add a new entry in the knowledge base:

- `keywords`
- `responses`
- `category`

### Presentation-Friendly

This implementation is very useful for internship defense or jury explanation because the decision logic is transparent.

### Fast Response

The only delay is the intentional simulated typing delay in the UI. The actual lookup is immediate.

## 8. Strengths of This Implementation

- simple and stable
- low technical risk
- no server required
- easy to maintain
- easy to demo
- aligned with MVP constraints

## 9. Limitations

The chatbot is intentionally limited:

- it does not understand full natural language in a deep way
- it does not use conversation memory across topics
- it does not call a real booking backend
- it does not generate fully personalized itineraries by itself
- it depends on manually defined keywords

These are acceptable limitations for an MVP, but they should be stated clearly in a report.

## 10. Possible Future Improvements

If the project evolves, the chatbot can be improved in several steps:

### Short-Term

- add more keywords and response coverage
- make responses language-aware per locale
- connect detected booking intent directly to enquiry prefilling
- log most common user questions locally

### Mid-Term

- connect the chatbot to destination and activity data dynamically
- personalize answers using saved preferences
- provide quick-reply buttons

### Long-Term

- integrate an external LLM or conversational platform
- connect to CRM or booking workflows
- add multilingual support beyond English and German

## 11. Report-Ready Explanation

You can reuse this short explanation in your internship report:

"The chatbot feature was implemented as a local knowledge-based assistant. Instead of relying on an external AI API, the system uses keyword matching to classify user questions into predefined intent categories such as destinations, accommodation, activities, booking, and concierge services. This approach was chosen because it is lightweight, reliable, inexpensive, and easy to explain in an MVP context. It also allowed the application to provide immediate support without backend complexity."

## 12. Final Assessment

The chatbot is well suited to the project scope. It demonstrates service design, mobile interaction, and structured business logic without unnecessary technical overhead. For an internship project, it is a strong feature because it is both functional and explainable.
