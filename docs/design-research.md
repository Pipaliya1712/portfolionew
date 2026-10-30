# Design and content rationale

## Positioning

This is Parth Pipaliya's personal portfolio with the clarity and presentation of a specialist consultancy. It does not imply a larger company or pretend employed-team projects are independent client engagements. The owner confirmed that no client-approved project materials are available.

The visual direction is editorial: warm paper (#f8f7f3), forest green (#183c32), and terracotta (#b34f2c). Strong, asymmetric typography and generous spacing replace floating cards, animated glow effects, repeated gradients, and percentage-based skills. A constructed architectural illustration expresses connected systems; it is decorative, not a claimed deliverable. Project interface studies are labelled as illustrations.

## Research consulted

1. [thoughtbot — consultancy homepage](https://thoughtbot.com/). Reference for a clear hierarchy of services, selected work, professional expertise, and a direct enquiry path. Used as a structural reference, not copied text or branding.
2. [Nielsen Norman Group — Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/). Supports prioritising design quality, upfront disclosure, substantive content, and links to external professional profiles. Applied through real identity, specific service descriptions, transparent project attribution, and contact links.
3. [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Applied through descriptive page titles, helpful original content, crawlable internal links, separate pages for separate topics, image descriptions, and a sitemap of actual URLs. Metadata is not a promise of rankings.
4. [Google Search Central — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article). Applied to the insights articles with headline, description, author, and main page URL. No review stars or fabricated publication history are added.
5. [Next.js — Metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata). Used for the generated sitemap, robots rules, social preview image, and icon, alongside per-page canonical metadata.
6. [W3C WAI — Labelling Controls](https://www.w3.org/WAI/tutorials/forms/labels/). Applied through visible form labels, required indicators, descriptive button names, and accessible feedback.
7. [Groq — Supported Models](https://console.groq.com/docs/models) and [API reference](https://console.groq.com/docs/api-reference). Used to review model configuration and the chat completion integration; the model can be changed through `GROQ_MODEL`.

These sources inform the design judgment; they do not establish one universally best visual style or validate Parth's professional claims.

## Copy changes

- Describe a business problem, a suitable engagement, and potential deliverables for each service.
- Replace unsupported numerical outcomes with contribution-based technical project summaries.
- Use first-person language appropriate to a personal portfolio.
- Explain scope, working reviews, handover, and the initial enquiry process.
- Avoid guarantees, artificial urgency, superlatives, fake customer logos, endorsements, and skill proficiency percentages.
- Expand the site with original practical engineering notes, not a generic keyword blog.
- Make the chatbot openly AI-assisted and allow uncertainty. It must never claim to book a meeting, send an enquiry, or guarantee pricing.

## Content boundaries

Project descriptions and employment dates come from the existing repository, not independent verification. Generic project titles reduce reliance on unapproved product names; internal URLs retain existing project identifiers. Confirm that any technical description is suitable for public disclosure before publishing. No new client identity, testimonial, outcome metric, or production screenshot has been invented.

## SEO implementation

Unique metadata and canonical paths for all public pages; server-rendered content; semantic headings; explicit internal links; consistent identity schema; service and article structured data; a sitemap without hash fragments; a matching robots rule; a generated 1200 × 630 social image; descriptive profile alt text; a custom 404; and a redirect from `/projects` to `/work`.

Old homepage section hashes are handled by a small navigation bridge so shared `#about`, `#projects`, `#services`, `#skills`, and `#contact` links remain useful after moving to real pages.

## Remaining real-world validation

Public email and paid AI delivery need credentials and are intentionally not exercised by local tests. Visual checks require an available browser host. Search Console verification, deployment, indexing, client approvals, and live delivery confirmation are separate from the local implementation.

## Refinement: personal identity, optional dark mode, and restrained motion

The owner requested a more distinctive logo, optional dark theme, richer chatbot presentation, and subtle movement. Interlock, an original geometric PP monogram, is the applied identity; Open Frame and Parallel are provided as alternatives in the local logo comparison. No image-generation service or third-party logo asset was used.

Dark mode is a preference, not a claim of greater professionalism. The visual decision retains the forest/terracotta identity with deeper green surfaces and warm text. The theme follows device preferences until a visitor chooses otherwise and stores choices locally. Reference: [web.dev — prefers-color-scheme](https://web.dev/articles/prefers-color-scheme) and [colour-scheme](https://web.dev/articles/color-scheme).

Motion is transform-based and concentrated in the architectural hero. A visible pause control and the device reduced-motion preference disable decorative animation. Below-the-fold reveals are progressively enhanced: failure to initialise the observer leaves content visible. Reference: [W3C — Using prefers-reduced-motion to prevent motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39).

The revised guide uses shared branding, a clear AI disclosure, topic cards, contextual follow-up suggestions, and a direct-contact option. It does not imitate live human availability. No new external chat storage or additional AI service was introduced.
