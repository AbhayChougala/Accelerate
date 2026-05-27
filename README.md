# Accelerate

Accelerate is an AI-powered executive business intelligence dashboard for healthcare leadership teams. It presents hospital performance, operations, financial, clinical, HR, patient experience, and predictive analytics in a CEO-style command center.

The current implementation is centered on a Next.js frontend with grounded Gemini-powered assistant routes and realistic hospital dashboard data.

## Features

- Executive command center for hospital CEOs, CFOs, COOs, directors, and strategy teams
- Dashboard modules for finance, operations, beds, doctors, HR, patient experience, diagnostics, pharmacy, OT, insurance, clinical quality, emergency, branches, procurement, digital, ESG, and AI predictive analytics
- AI CEO assistant that answers questions from dashboard context and reference data
- Patient sentiment analysis route powered by Gemini
- KPI cards, trend charts, donut charts, gauges, heatmaps, Sankey flows, tables, alerts, leaderboards, and forecast views
- Healthcare-specific context including NABH, Ayushman Bharat, ABDM, TPA workflows, GST, UPI, and Indian hospital operations

## Tech Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Recharts
- Lucide React icons
- next-themes for theme handling

### AI and Backend Routes

- Next.js API routes
- Google Gemini REST API
- `GEMINI_API_KEY` server-side environment variable
- Optional `GEMINI_MODEL` override
- Deterministic fallback logic for exact dashboard answers such as bed availability

### Data Layer

- Static hospital analytics data in `frontend/Accelerate-main/src/lib/data`
- Chat grounding context built in `frontend/Accelerate-main/src/lib/chat/dashboardContext.ts`
- AI reference snapshot in `ai_pipline/Data.json`
- Dashboard filter state managed through React context

### Tooling

- npm
- ESLint
- PostCSS
- Node.js runtime for server routes

## Technologies Implemented

- Responsive hospital BI dashboard using Next.js App Router layouts and route groups
- Modular chart components built on Recharts
- Reusable UI components for cards, badges, buttons, inputs, alerts, health scores, and gauges
- Global dashboard shell with sidebar navigation, top navigation, theme toggle, filters, notifications, and AI chat access
- Gemini-backed chat endpoint at `POST /api/chat`
- Gemini-backed patient sentiment endpoint at `POST /api/sentiment`
- Prompt grounding using active page, filters, chat history, dashboard data, and `ai_pipline/Data.json`
- Server-side API key handling so Gemini keys are not exposed to the browser
- Fallback responses when Gemini is missing or unavailable for supported deterministic questions

## Project Pipeline

1. Dashboard data is defined in the frontend data modules and AI reference JSON.
2. The user opens a dashboard route such as CEO Command Center, Beds, Finance, Patient Sentiment, or AI Predictive.
3. Dashboard components render KPIs, charts, tables, alerts, and forecast modules from the shared data layer.
4. Global dashboard context tracks filters such as date range, branch, department, and doctor.
5. When the user asks Accelerate AI a question, the chat UI sends the message, recent history, active page, filters, and timestamp to `POST /api/chat`.
6. The API route builds a grounded dashboard context from frontend data and reads `ai_pipline/Data.json`.
7. Exact metrics are calculated before the LLM call, so arithmetic answers can use deterministic values.
8. Gemini receives a constrained prompt containing dashboard context, frontend context, chat history, and AI pipeline reference data.
9. The answer is returned to the dashboard chat UI.
10. If Gemini is not configured or unavailable, the API returns a deterministic answer when possible or a clear configuration message.

## Repository Structure

```text
.
├── ai_pipline/
│   ├── Data.json
│   └── ai.md
├── database-prediction-team/
├── frontend/
│   └── Accelerate-main/
│       ├── src/
│       │   ├── app/
│       │   │   ├── (dashboard)/
│       │   │   └── api/
│       │   ├── components/
│       │   ├── context/
│       │   ├── hooks/
│       │   └── lib/
│       ├── package.json
│       └── README.md
└── README.md
```

## Environment Variables

Create `frontend/Accelerate-main/.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_MODEL` is optional. If it is not set, the chat route uses `gemini-2.5-flash`.

## Getting Started

```bash
cd frontend/Accelerate-main
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Key Files

- `frontend/Accelerate-main/src/app/(dashboard)` - dashboard pages
- `frontend/Accelerate-main/src/app/api/chat/route.ts` - Gemini chat API route
- `frontend/Accelerate-main/src/app/api/sentiment/route.ts` - Gemini sentiment API route
- `frontend/Accelerate-main/src/components/layout/AIChat.tsx` - dashboard chat UI
- `frontend/Accelerate-main/src/lib/chat/dashboardContext.ts` - grounded dashboard context builder
- `frontend/Accelerate-main/src/lib/data/index.ts` - shared dashboard data
- `ai_pipline/Data.json` - AI reference data snapshot
