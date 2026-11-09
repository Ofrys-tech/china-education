# ADLAS STUDY

**Live:** https://ofrys-tech.github.io/china-education/

International education platform for students who want to study in China: destinations, a university directory, five study pathways, scholarships, accommodation, anonymized admission results, and a student inquiry flow. Static Astro site deployed to GitHub Pages.

**Site language:** English at launch. All user-facing copy lives in `src/i18n/en/**`; the interface is ready for locale routing, but Arabic, French, Spanish, Russian and Persian require reviewed translations before they can be published. Do not ship machine translation as a finished locale.

## Stack

- **Astro 7** — static generation, zero framework JS.
- **TypeScript strict + Biome** — types and formatting in one fast gate.
- **Tailwind CSS 4** — reset/utilities only; the brand system is CSS tokens and components.
- **Content Collections + Zod** — programs, universities and FAQ validated at build time.
- **Vitest** — unit tests for validation, payload and content invariants.
- **Playwright + axe** — navigation, directory filtering, form submission, accessibility.
- **GitHub Actions → GitHub Pages** — build, checks and deployment.

## Quick start

```bash
npm ci
npm run dev          # http://localhost:4321
npm run verify       # lint + types + unit + assets + build + HTML checks
```

Node >= 22.23.4 (`.nvmrc`).

## Commands

| Command                  | What it does                              | When                               |
| ------------------------ | ----------------------------------------- | ---------------------------------- |
| `npm run dev`            | dev server                                | development                        |
| `npm run build`          | static build into `dist/`                 | before deploy                      |
| `npm run verify`         | the required fast gate                    | before push/PR                     |
| `npm run check`          | `astro check` (types)                     | after TS/Astro edits               |
| `npm test`               | unit tests                                | logic, content invariants          |
| `npm run test:e2e`       | Playwright + axe                          | navigation, forms, directory, a11y |
| `npm run check:html`     | base-aware links, meta, h1, ids           | after build                        |
| `npm run check:assets`   | generated PNG manifest and alpha          | after image generation             |
| `npm run check:links`    | external links over the network           | before launch / scheduled          |
| `npm run assets:preview` | 1024px WebP previews                      | visual review                      |
| `npm run og`             | rebuild the social preview and touch icon | after a brand change               |
| `npm run lint:fix`       | Biome formatting                          | before commit                      |

## Routes

| Path              | Purpose                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `/`               | cinematic landing: philosophy, destinations, programs, universities, funding, community, housing, process, results, FAQ, inquiry |
| `/destinations/`  | China active; Russia and Malaysia explicitly upcoming                                                                            |
| `/programs/`      | language year, foundation, bachelor's, master's, PhD + comparison table                                                          |
| `/programs/[id]/` | detailed pathway page (5 items)                                                                                                  |
| `/universities/`  | searchable directory of 17 universities with official links                                                                      |
| `/scholarships/`  | CSC, provincial, municipal, university and institutional funding                                                                 |
| `/accommodation/` | room types, campus facilities, housing costs and paperwork                                                                       |
| `/experience/`    | community, labelled illustrative stories and anonymized admission results                                                        |
| `/process/`       | five stages, document checklist, annual calendar, common risks                                                                   |
| `/about/`         | mission, vision, nine values, philosophy and boundaries                                                                          |
| `/contact/`       | WhatsApp, email, Instagram and WhatsApp channel + full inquiry form                                                              |
| `/apply/`         | full student inquiry form                                                                                                        |
| `/faq/`           | grouped FAQ                                                                                                                      |
| `/privacy/`       | privacy policy (noindex)                                                                                                         |
| `/styleguide/`    | internal design reference (noindex)                                                                                              |
| `/404.html`       | custom 404                                                                                                                       |

## Structure

```text
src/
  config/site.ts          brand, official contacts, navigation, intake
  i18n/en/                ALL user-facing copy, split by page and form labels
  content/                JSON: programs, universities, faq
  content.config.ts       Zod schemas
  layouts/BaseLayout.astro
  components/             Header, Footer, Logo/Emblem, PageHero, cards, form…
  pages/                  routes
  lib/leads/              schema, payload, endpoint adapter
  scripts/                menu, reveal, header, float visibility, form, directory search
  styles/tokens.css       brand tokens — start here for a reskin
  styles/global.css       layout and legacy component base
  styles/adlas.css        ADLAS brand layer loaded after the base
  assets/generated/       generated emblems + manifest.json
docs/                     architecture, deploy, leads, assets, tests, design
scripts/                  checks, OG, previews
tests/unit|e2e
```

## Where to change what

- **Brand, official contacts, navigation, intake** — `src/config/site.ts`.
- **Any interface text** — `src/i18n/en/**`; never hardcode copy in `.astro`.
- **Visual language** — `src/styles/tokens.css`, then `src/styles/adlas.css`.
- **Programs, universities, FAQ** — JSON in `src/content/**`, schema in `src/content.config.ts`; see [docs/content.md](docs/content.md).
- **Forms** — `LeadForm.astro`, `scripts/lead-form.ts`, `lib/leads/`; see [docs/leads.md](docs/leads.md).
- **Deploy** — [docs/deployment.md](docs/deployment.md).

## Official contacts

- WhatsApp: [+86 184 4860 1096](https://wa.me/8618448601096)
- Email: [adlasagency01@gmail.com](mailto:adlasagency01@gmail.com)
- Instagram: [@adlas.study](https://instagram.com/adlas.study)
- WhatsApp channel: [ADLAS STUDY](https://whatsapp.com/channel/0029Vb9FmvqJZg3zZ7MpbG17)

ADLAS operates online and has no public walk-in office. Do not invent an address.

## Before a public launch

1. **Connect inquiries.** Set `PUBLIC_LEAD_ENDPOINT` and `PUBLIC_LEAD_PROVIDER` in GitHub Actions variables. Without them the form opens a prefilled email; WhatsApp remains the direct fallback. See [docs/leads.md](docs/leads.md).
2. **Review facts.** Tuition is indicative; requirements, deadlines and scholarships change by intake. Verify against official sources each cycle.
3. **Review legal text.** The privacy policy and disclaimer are a working basis, not a substitute for legal advice.
4. **Review translations.** Do not enable Arabic, French, Spanish, Russian or Persian until a human translator has reviewed the full interface and content.
5. **Run `npm run check:links`** and click through the university links manually.
6. **Test the form on the live domain** after deployment.

## Deploy

GitHub Pages via Actions. `deploy.yml` injects `BASE_PATH=/<repo>/` and `SITE_URL=https://<owner>.github.io`, builds, deploys and smoke-checks the live page. See [docs/deployment.md](docs/deployment.md).
