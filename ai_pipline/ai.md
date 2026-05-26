# MedVista AI Chatbot Integration

This project uses a Gemini-powered chatbot inside the frontend dashboard. The chatbot is opened from the existing dashboard UI and answers questions using the same dashboard data that powers the charts and KPI cards.

## What Was Added

### 1. AI pipeline reference data

File: `ai_pipline/Data.json`

This JSON file is a stable reference snapshot for the chatbot. It includes:

- bed availability totals
- ward-level bed counts
- ICU availability
- core executive KPIs
- important executive signals and alerts

For example, the current bed reference is:

- Total beds: `420`
- Occupied beds: `348`
- Available beds: `72`
- ICU beds available: `3`

When a user asks, "how many beds are available?", the chatbot can answer accurately from these values and from the calculated frontend dashboard context.

### 2. Dashboard context builder

File: `frontend/Accelerate-main/src/lib/chat/dashboardContext.ts`

This file gathers dashboard data from `src/lib/data/index.ts` and computes exact metrics before the prompt is sent to Gemini.

Important behavior:

- reads KPI, branch, department, forecast, alert, claims, and occupancy data from the frontend dashboard data module
- calculates exact bed availability from `wardOccupancy`
- calculates exact ICU availability
- includes current dashboard filters from `DashboardContext`
- provides a deterministic fallback answer for bed availability questions

The deterministic fallback matters because arithmetic answers should not depend only on an LLM. For bed availability, the code calculates:

```ts
available = totalBeds - occupiedBeds
```

So the answer is based on the dashboard data, not a guess.

### 3. Gemini API route

File: `frontend/Accelerate-main/src/app/api/chat/route.ts`

This server route receives chat messages from the frontend and sends a grounded prompt to Gemini.

The route:

- accepts `message`, chat history, dashboard filters, active page, and last updated time
- reads `ai_pipline/Data.json`
- builds dashboard context from frontend data
- uses `GEMINI_API_KEY` from `.env.local`
- calls Gemini with the REST `generateContent` API
- defaults to model `gemini-2.5-flash`
- falls back to deterministic bed answers if Gemini is unavailable

Environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_MODEL` is optional. If it is not provided, the route uses `gemini-2.5-flash`.

### 4. Frontend chatbot integration

File: `frontend/Accelerate-main/src/components/layout/AIChat.tsx`

The old mock response logic was replaced with a real API call to `/api/chat`.

The frontend now sends:

- the user's message
- recent chat messages
- current dashboard filters
- current route path
- dashboard last updated timestamp

This allows the chatbot to answer based on the user's current dashboard context.

## Chat Request Flow

1. User opens MedVista AI from the dashboard.
2. User asks a question such as:

```text
How many beds are available?
```

3. `AIChat.tsx` sends the question and frontend context to:

```text
POST /api/chat
```

4. The API route builds context from:

- `frontend/Accelerate-main/src/lib/data/index.ts`
- `frontend DashboardContext` filters
- `ai_pipline/Data.json`

5. Exact metrics are calculated on the server.
6. Gemini receives a prompt containing only the allowed dashboard/reference context.
7. The answer is returned to the chat UI.

For bed availability questions, the server can answer accurately even if Gemini is not configured:

```text
There are 72 beds available across the network right now.
```

## How To Get A Gemini API Key

1. Go to Google AI Studio.
2. Create or select a Gemini API key.
3. Keep the key private.
4. Add it to the frontend environment file.

Create this file:

```text
frontend/Accelerate-main/.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Do not commit `.env.local` to GitHub.

## How To Run The Project

From the repository root:

```bash
cd frontend/Accelerate-main
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

If port `3000` is busy, Next.js may offer another port such as `3001`.

## How To Test The Chatbot

1. Start the frontend with `npm run dev`.
2. Open the dashboard in the browser.
3. Open the MedVista AI chatbot.
4. Ask:

```text
How many beds are available?
```

Expected answer:

```text
72 beds are available across the network.
```

You can also ask:

```text
What is ICU availability?
Which departments are underperforming?
Predict ICU occupancy next month.
What alerts need attention?
```

## Files Changed

- `ai_pipline/Data.json`
- `ai_pipline/ai.md`
- `frontend/Accelerate-main/src/lib/chat/dashboardContext.ts`
- `frontend/Accelerate-main/src/app/api/chat/route.ts`
- `frontend/Accelerate-main/src/components/layout/AIChat.tsx`

## Important Notes

- The Gemini API key is only used on the server route. It is never exposed to the browser.
- Bed availability is computed before Gemini is called, so arithmetic answers are reliable.
- The chatbot is grounded in dashboard data and `ai_pipline/Data.json`.
- If Gemini is not configured, bed availability questions still work through the deterministic fallback.
