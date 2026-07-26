# Feedback email setup (Resend)

In-app **Send Feedback** posts to the server-only route `POST /api/feedback`, which emails the site owner through [Resend](https://resend.com).

This route is a **Vercel / Next.js serverless function**. The project must use a standard Next.js deployment — **not** `output: "export"` / static export — or `/api/feedback` will not be deployed and the form cannot send email.

API keys and addresses are never exposed to the browser. Do not use `NEXT_PUBLIC_*` for feedback secrets.

## Environment variables

| Variable | Purpose | Example |
|---|---|---|
| `RESEND_API_KEY` | Server-only Resend API key | `re_…` (from Resend dashboard) |
| `FEEDBACK_FROM_EMAIL` | Verified sender | `Football Time Machine <feedback@football-timemachine.com>` |
| `FEEDBACK_TO_EMAIL` | Site-owner inbox | your personal or ops address |

See also [`.env.example`](../.env.example). Local secrets belong in `.env.local` (gitignored).

## Production checklist (Resend + Vercel)

1. **Verify the domain** `football-timemachine.com` in the Resend dashboard (Domains), including DNS records Resend requires.
2. **Create a Resend API key** (API Keys) with permission to send email.
3. In **Vercel → Project → Settings → Environment Variables**, add `RESEND_API_KEY` for Production (and Preview if desired).
4. Add `FEEDBACK_FROM_EMAIL` (must use the verified domain), e.g. `Football Time Machine <feedback@football-timemachine.com>`.
5. Add `FEEDBACK_TO_EMAIL` set to the site-owner address that should receive reports.
6. **Redeploy** the project after saving environment variables so the runtime picks them up.
7. Open the live site, submit one real feedback note, and confirm delivery in the owner inbox (and in the Resend Logs view).

## Local development

```bash
cp .env.example .env.local
# Fill RESEND_API_KEY, FEEDBACK_FROM_EMAIL, FEEDBACK_TO_EMAIL
npm run dev
```

If configuration is missing:

- **Development** — the API returns a message naming the missing variables.
- **Production** — the API returns a generic temporary-unavailability message; the precise missing keys are logged server-side only.

## Security notes

- Recipients and senders come only from env vars; the client cannot override them.
- Optional visitor email is used as `replyTo` only when it passes validation.
- User content is escaped in the HTML email alternate.
- Feedback is not written to public files.
- Lightweight spam controls: honeypot field, minimum fill time, and a small in-memory rate limit.
