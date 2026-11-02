# STUDIO K — Website implementation plan

## Product scope and serving

Build a single-page, public-facing website for STUDIO K — Photography & Film using the existing React 19, TypeScript, Vite, Tailwind, Framer Motion and Lucide React starter. Keep the project static: the business contact, event enquiry and portfolio do not currently require a managed database or hosted server. Use native React state and browser APIs for filters, service detail dialogs, the video/gallery lightbox, responsive navigation and validated enquiry flow. Use Framer Motion, CSS and reduced-motion-aware scroll effects instead of introducing Three.js or another animation framework unless implementation proves it necessary.

The homepage will contain the complete requested identity, cinematic hero, services, portfolio, filmmaking showcase, reasons to choose Studio K, editorial about story, booking/contact details and footer. Keep navigation and section anchors on `/`; use accessible modal views for service and portfolio details rather than inventing additional routes. Make all phone, email, WhatsApp, map, filter, playback and booking controls functional. Because there is no mail delivery service configured, the form will validate all supplied fields and then clearly hand the enquiry to WhatsApp with the entered details; it will not claim a request was delivered or confirmed. WhatsApp numbers are `9171000563` and `8667073847`, with the exact prefilled enquiry text from the brief. The requested Instagram business-card QR/account link was not present in the attachment, so account-specific Instagram integration remains pending the user-supplied QR image or profile URL.

Use the provided business details: Babu N; `studiokbabu@gmail.com`; 17/9, Gulam Murthuzа Street, Ellis Road, Chennai – 600002. Link to Google Maps directions for that address. Do not invent awards, customer counts or claims of actual bookings. Since Studio K originals were not supplied, make clear where editorial/reference imagery is being used as a visual preview rather than representing a verified Studio K commission.

## Design

- **Design Movement:** Luxury fashion-editorial meets contemporary Indian wedding cinema.
- **Core Principles:** Emotion before ornament; restrained gold rather than generic shine; asymmetrical editorial pacing; motion that yields to legibility and user preference.
- **Color Philosophy:** Obsidian charcoal provides a dark screening-room atmosphere. Warm ivory keeps long reading comfortable. Champagne gold signals craft and premium detail without becoming a metallic gradient effect.
- **Layout Paradigm:** A full-bleed hero followed by broad, staggered editorial compositions, alternating split-screen stories, compact horizontal film strips and an airy masonry portfolio; avoid a repetitive stack of centered card grids.
- **Signature Elements:** Fine champagne rules and small editorial index labels; a monogram-inspired K aperture mark; quiet film-grain/light-leak accents used sparingly.
- **Interaction Philosophy:** Every motion clarifies focus or context. Hover and magnetic effects are desktop-only enhancements; touch targets, keyboard operation, focus states and reduced-motion fallbacks remain first-class.
- **Animation:** Slow hero zoom and title reveal, subtle section entrance/parallax, restrained image expansion, short modal transitions and progress indication. Avoid heavy particle simulation or transitions that delay content.
- **Typography System:** Cormorant Garamond for expressive headings paired with Manrope for interface and body copy; generous tracking on small uppercase labels and readable paragraph width.
- **Brand Essence:** A Chennai photography and film studio preserving meaningful celebrations through composed images and cinematic storytelling; **observant, refined, warm**.
- **Brand Voice:** Intimate, composed, never boastful. Example lines: “We capture what words cannot express.” and “A day passes. Its feeling can stay.”
- **Wordmark & Logo:** A custom typographic STUDIO K wordmark paired with a compact aperture/K ligature drawn with SVG/CSS, revealed through a brief line-and-letter animation.
- **Signature Brand Color:** Muted champagne `#C7A979` against near-black `#0C0B0A`.

## Visual assets

Use a custom-generated, cinematic hero image with an Indian wedding couple as the principal page artwork; pair it with distinct, high-quality editorial photographs sourced for portrait, couple, baby, event, drone and detail contexts so each section has a deliberate image. Do not repeat one hero asset throughout. Keep image descriptions accurate, use responsive/lazy-loaded image markup, and label unsupplied imagery as editorial visual previews rather than attributing it to Studio K. Replace those previews with the studio’s own work when supplied. No business-card QR asset was found in the attachment.

## Components and project structure

- `client/src/pages/Home.tsx`: page composition and section ordering.
- `client/src/components/studio/`: navigation/loading reveal, hero, section-heading primitives, service catalogue/detail dialog, portfolio filters/gallery/lightbox, film player, booking form, contact/footer, floating WhatsApp link and desktop cursor.
- `client/src/data/studio.ts`: services, categories, portfolio items, image paths, contact details and enquiry text.
- `client/src/index.css`: dark editorial design tokens, responsive layout, image treatments, interaction states, accessibility and reduced-motion rules.
- `client/index.html`: descriptive title/description, social metadata, canonical only when a public origin is known, JSON-LD and content-bearing static fallback markup for crawlers before JavaScript runs.
- `public/`: route manifest, robots.txt, sitemap.xml, favicon and any optimized project image assets.
- `plan.md` and `TODO.md`: this approved plan and outcome-tracked source requirements.

Keep `/manus-routes.json` synchronized with the only declared page route (`/`). Include LocalBusiness structured data with only the business information supplied. Do not guess a public domain: omit canonical and absolute Open Graph URLs until a real public origin exists. Provide `robots.txt` and `sitemap.xml`; populate absolute sitemap entries and add the sitemap directive to robots only after the production origin is confirmed.

## Build and integration

Continue with the already initialized managed Webdev project and its installed dependencies. Confirm TypeScript diagnostics are registered before application edits. Retain the existing static build (`pnpm build:static`) and preview port 3000. Upload finalized image files to the project’s managed storage and reference their returned project paths. Do not enable a database or server solely to simulate booking delivery. After meaningful content and route manifest are in place, start the static development service, inspect the site at desktop and mobile sizes, run the existing type check/build, and address confirmed defects. Prepare a checkpoint on the canonical project remote only after implementation and checks are complete; do not enable auto-publication or claim a public live URL without a confirmed published result.
