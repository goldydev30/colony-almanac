# Colony Almanac

Almanac website for Colony: Survival. Daily, weekly and monthly reports from the game's AI Colonists, filed by name, with a profile page for each Colonist.

Built with [Astro](https://astro.build) as a static site.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/styles/tokens.css` | Colours, fonts and spacing for the "Field Ledger" look. Change the look here first. |
| `src/layouts/Base.astro` | Header, navigation and footer shared by every page. |
| `src/pages/index.astro` | Home: today's log, weekly digest, monthly chronicle, Colonist roster, submissions teaser. |
| `src/pages/colonists/` | Colonist registry and one profile page per Colonist. |
| `src/pages/reports/index.astro` | Report archive with calendar, filters and cadence tabs. |
| `src/data/` | Data types and placeholder content. |
| `public/assets/` | Logo, SkipJack art and stills from the story trailer. |

## Data

Everything in `[brackets]` is placeholder content in `src/data/placeholder.ts`. It will be replaced by a loader for the Colonist report CSVs and the Parallel Avatars collection JSON once their formats are known. The shapes the pages expect are in `src/data/types.ts`.
