# Parth Pipaliya — personal portfolio

A multi-page portfolio for an independent AI engineer and technology consultant. Built with Next.js App Router, React, TypeScript, and plain CSS. The identity remains Parth Pipaliya; there is no invented agency, client list, testimonial, or performance metric.

## Local setup (PowerShell)

```powershell
cd D:\Projects\PORTFOLIO\portfolionew
npm ci
Copy-Item .env.example .env.local
notepad .env.local
npm run dev
```

Open http://localhost:3000. The public pages render without credentials. Restart the server after changing `.env.local`.

## Environment

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | Gmail account that sends and receives project enquiries |
| `EMAIL_PASSWORD` | Gmail App Password for that account |
| `GROQ_API_KEY` | Enables AI assistant replies |
| `GROQ_MODEL` | Optional model override; defaults to `llama-3.3-70b-versatile` |

Never put secrets in a `NEXT_PUBLIC_` variable or commit `.env.local`. Supabase is no longer required. New conversations stay in browser memory and are sent to Groq only when AI is configured. No database persistence endpoints remain. Existing remote database data is not modified.

Without email configuration, the form gives a clear direct-email alternative and does not pretend an enquiry was delivered. Without a Groq key, chat returns links to services, work, and contact. No live email or paid AI requests are needed for the automated checks.

## Pages

- `/` — introduction, services, work, delivery process, insights
- `/services` and four service detail pages
- `/work` and four technical project overviews
- `/about` — personal background, experience, working principles
- `/insights` and three engineering articles
- `/contact` — project enquiry form and FAQs
- `/privacy` — enquiry and AI processing disclosures

Project interfaces are labelled illustrative studies. Work descriptions use existing portfolio material, including employed-team contributions. Confirm employer history and all public technical descriptions before deploying. No client-approved material was supplied, so do not add client logos or screenshots without permission.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm test
npm start
```

`npm test` needs a completed production build. It starts an isolated server on port 3101 with empty email/AI credentials, then checks public pages, metadata, routing, and negative API cases. Use `TEST_PORT` to change that port. Test traffic remains local.

## Editing content

- `src/lib/site.ts`: identity, service copy, project summaries, and articles
- `src/app/globals.css`: shared colour, typography, layout, and responsive rules
- `src/lib/assistant.ts`: assistant behaviour and grounded service/project context
- `src/components/`: navigation, project illustrations, enquiry form, and chatbot
- `src/app/layout.tsx`: global metadata and Person/WebSite structured data

The canonical domain is `https://parthpipaliya.com` in `src/lib/site.ts`. Change it there if deploying to another domain. Metadata, robots, and sitemap use the same value. Social preview imagery is generated at `/opengraph-image`; the old uppercase profile image references and hash-only sitemap entries were removed. The application uses local system fonts and CSS illustrations, so rendering does not rely on third-party font or image requests.

## Deployment

Deploy as a Node-compatible Next.js application. Set the email and Groq values in the host's environment settings. After deployment, verify the real contact delivery, AI response quality, mobile navigation, and social preview. Submit `/sitemap.xml` in Google Search Console for the domain you own. Search rankings and indexing are not guaranteed by metadata.

Before wider public traffic, configure the hosting provider's rate limiting for `/api/send-email` and `/api/chat/response`, and set a Groq spending limit. The enquiry form includes a honeypot and validates input, but these are not a replacement for edge abuse protection.

Design rationale and source links are in `docs/design-research.md`.

## Identity, dark theme, and motion

The shared PP monogram is in `src/components/brand-mark.tsx`; its vector paths live in `src/lib/brand.ts`. Three original logo concepts are available in `docs/logo-options.html`, with a PNG comparison in `docs/logo-options.png` and downloadable SVGs in `public/brand/`. Interlock is the applied direction.

The header appearance button cycles **Auto → Light → Dark → Auto**. Auto follows the device colour preference; explicit choices persist in local storage. A small before-paint script avoids a flash of the wrong theme. Dark mode uses its own surface palette, while illustrative project interfaces retain a deliberate light presentation.

Decorative hero motion can be paused using its visible control. That choice is saved locally. Reduced-motion device preferences disable decorative animation, including scroll reveals; content remains visible if JavaScript or IntersectionObserver is unavailable. Reveal animations enhance existing server-rendered content without changing page URLs or metadata.

The chatbot now includes topic cards, route-aware follow-up questions, a new-conversation control, and a cancel-request button. The backend model and privacy boundaries are unchanged. The logo concepts are design proposals, not a trademark clearance.
