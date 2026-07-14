# v0-aura-aesthetics-prototype

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_9Kpss4eoDF8WIbfF3RSddfbACaHq)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

The AI concierge chat widget requires a server-side secret. Copy `.env.example`
to `.env.local` and fill in a real value (this file is gitignored — never commit
real keys):

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Powers the chat assistant (`app/api/chat`). Create one at [console.anthropic.com](https://console.anthropic.com); billing must be funded. |

> **Deployment:** this is not in the repo, so the live site won't have it
> automatically. Set it in your host's environment-variable settings, then
> redeploy — otherwise the chat widget returns its "having a moment" fallback.

Bookings are handled entirely by Calendly (embedded in the in-app booking modal
at `https://calendly.com/aura-aesthetics/booking`) — no booking data is stored
on our side.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/logicengage1/v0-aura-aesthetics-prototype" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
