# Football Time Machine

A spoiler-free way to experience classic football tournaments as if they were happening live.

## What is already included

- A redesigned Football Time Machine homepage
- A World Cups collection
- Complete USA '94 Tournament Edition with 36 matches
- Progress tracking saved in the browser
- Pre-match context and standings
- Replay links
- Post-match reports
- France '98 season structure with 36 curated matches ready for research

## Run it locally

1. Install Node.js from https://nodejs.org
2. Unzip this folder.
3. Open Terminal on Mac or Command Prompt on Windows.
4. Change into the project folder.
5. Run:

```bash
npm install
npm run dev
```

6. Open http://localhost:3000

## Feedback (Resend)

In-app **Send Feedback** posts to server-only `POST /api/feedback`, which emails the site owner through Resend.

Required environment variables (see `.env.example` and [docs/FEEDBACK_SETUP.md](docs/FEEDBACK_SETUP.md)):

- `RESEND_API_KEY`
- `FEEDBACK_FROM_EMAIL` — e.g. `Football Time Machine <feedback@football-timemachine.com>`
- `FEEDBACK_TO_EMAIL` — site-owner inbox

Never use `NEXT_PUBLIC_*` for these values. Keep secrets in `.env.local` locally and in Vercel Environment Variables in production, then redeploy.

## Put it online without coding

The easiest route:

1. Create a free GitHub account.
2. Create a new repository named `football-time-machine`.
3. Upload every file from this folder.
4. Create a free Vercel account using GitHub.
5. In Vercel, select **Add New → Project**.
6. Import the `football-time-machine` repository.
7. Press **Deploy**.

Vercel will detect Next.js automatically and provide a public URL.

This is a standard Next.js app (serverless functions on Vercel), not a static export. Do not set `output: "export"` in `next.config.ts` — that omits API routes such as `/api/feedback`.

## Current content status

- USA '94: complete prototype content
- France '98: match map created; narratives, replay verification, standings and post-match reports still in research
- 2002 onward: future seasons
