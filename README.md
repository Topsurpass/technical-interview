# Interview Question Generator

An AI-powered web app that generates 3 tailored interview questions for any job title in seconds — built with Next.js and Google Gemini.

---

## What It Does

Enter a job title (e.g. *Senior Product Manager*, *DevOps Engineer*, *UX Designer*) and the app uses Google's Gemini AI to instantly produce 3 thoughtful, open-ended interview questions that assess both technical competence and soft skills relevant to that role.

---

## Features

- **AI-generated questions** — context-aware questions tailored to the specific job title
- **Instant results** — powered by Gemini 2.5 Flash for fast inference
- **Clean UX** — input clears after submission; the last searched role stays visible in results
- **Loading states** — animated skeleton cards while the AI generates
- **Error handling** — clear messages for rate limits, network failures, and invalid input
- **Fully responsive** — works on mobile, tablet, and desktop
- **Accessible** — ARIA labels, live regions, keyboard-navigable

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 (strict mode) |
| UI | React 19, Tailwind CSS v4, Geist font |
| Icons | [Lucide React](https://lucide.dev/) |
| Components | Radix UI Slot, Class Variance Authority |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| AI provider | [Google Gemini](https://ai.google.dev/) via `@google/generative-ai` |

---

## AI Provider & Model

**Provider:** Google Gemini (via the `@google/generative-ai` SDK)

**Model:** `gemini-2.5-flash`

Gemini 2.5 Flash is Google's fastest production model, optimised for low-latency, high-throughput tasks. It receives a structured prompt asking for exactly 3 open-ended interview questions and returns a JSON array — no markdown, no extra text. The API response is parsed, validated, and streamed back to the client.

The prompt instructs the model to act as an experienced hiring manager and to balance technical and behavioural questions appropriate for the given role.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A [Google AI Studio](https://ai.google.dev/) API key (free tier available)

### Installation

```bash
git clone https://github.com/topsurpass/technical-interview.git
cd technical-interview
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

You can generate a free API key at [https://ai.google.dev/](https://ai.google.dev/).

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   ├── page.tsx                # Home page — main UI
│   ├── globals.css             # Tailwind base styles and CSS variables
│   └── api/
│       └── questions/
│           └── route.ts        # POST /api/questions — calls Gemini, returns JSON
├── components/
│   ├── question-skeleton.tsx   # Animated loading placeholder
│   └── ui/
│       ├── button.tsx          # Button with variants and loading state
│       └── input.tsx           # Controlled text input
├── lib/
│   ├── utils.ts                # cn() class merging utility
│   └── gemini.ts               # Gemini SDK wrapper — prompt + response parsing
├── providers/
│   └── react-query-provider.tsx
└── services/
    └── interviews/
        └── index.ts            # useGenerateQuestions() TanStack Query mutation
```

---

## How It Works

1. The user types a job title and submits the form.
2. The client calls `POST /api/questions` with the job title in the request body.
3. The API route validates the input, then calls `generateInterviewQuestions()` in `lib/gemini.ts`.
4. Gemini 2.5 Flash receives a structured prompt and returns a JSON array of 3 questions.
5. The API strips any markdown code fences, parses the JSON, and returns it to the client.
6. TanStack Query updates the UI with the results; the input clears for the next search.

---

## Rate Limits

This app uses the Gemini free tier. If you hit a `429` rate limit error, wait a minute and try again, or check your quota at [https://ai.google.dev/](https://ai.google.dev/).
