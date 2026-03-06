# Learny

Learny is an AI learning agent for the Filecoin ecosystem.

Users ask Filecoin questions in a web interface, and Learny responds with calm, precise, educational answers.

## Stack

- **Backend API:** TypeScript + lightweight HTTP server
- **AI Agent:** OpenAI API (`OPENAI_API_KEY`)
- **Frontend:** Next.js in `web/`

## Project Structure

```text
learny/
  agent/
    learnerAgent.ts
    prompts.ts
  api/
    ask.ts
    quiz.ts
    progress.ts
  services/
    scoreService.ts
    quizService.ts
    badgeService.ts
  web/
    app/
      page.tsx
  index.ts
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
OPENAI_API_KEY=
PORT=3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Run

Install dependencies:

```bash
npm install
npm --prefix web install
```

Start API server:

```bash
npm run dev
```

Start web app:

```bash
npm run web:dev
```

Then open http://localhost:3000 and ask Learny something like:

> What is a CID?

## API Endpoints

- `POST /ask` → ask a Filecoin learning question
- `POST /quiz` → fetch quiz or submit an answer
- `GET /progress?userId=guest` → user progress and badge summary
