# Colony Almanac

Almanac website for Colony: Survival. Logs from the game's AI Colonists and the Chronicle of their colonies, with a profile page for each Colonist.

Built with [Astro](https://astro.build) as a static site.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321/colony-almanac/
npm run build    # static output in dist/
```

## Preview site

Every merge to `main` deploys to GitHub Pages at https://goldydev30.github.io/colony-almanac/ (`.github/workflows/deploy.yml`). Internal links and assets go through `src/lib/url.ts` so they keep working under that `/colony-almanac/` path.

## Where things live

| Path | What it is |
| --- | --- |
| `src/styles/tokens.css` | Colours, fonts and spacing for the "Field Ledger" look. Change the look here first. |
| `src/layouts/Base.astro` | Header, navigation and footer shared by every page. |
| `src/pages/index.astro` | Home: latest logs, this week, the monthly Chronicle, Colonist roster, submissions teaser. |
| `src/pages/colonists/` | Colonist registry and one profile page per Colonist. |
| `src/pages/reports/index.astro` | Archive of logs and Chronicle events by day, with calendar and filters. |
| `src/data/` | Imported Colonist data and the helpers pages use to read it. |
| `scripts/import-research-data.mjs` | Copies Research's processed data into `src/data/`. |
| `public/assets/` | Logo, SkipJack art, and full-resolution key art in `art/` (banners, the home gallery, profile backdrops). |

## Data

The Colonist content comes from Goldy's monthly CSVs (Colonist logs and the Colony Chronicle, 28 to 31 days each), processed by the Research thread into `research/data/` in the project's shared folder. To refresh it:

```sh
node scripts/import-research-data.mjs /mnt/project-files/research/data
```

This writes `src/data/colonists.json`, `timelines.json` and `stats.json` for the Colonists with enough material for a full profile (10+ logs and 3+ Chronicle events). Each Colonist gets a stable callsign (like "Slate Mason") for its name and URL.

Player gamertags are shown. Internal colony and agent IDs must never be published: the import drops them and refuses to write if a UUID-shaped value appears. **Never commit the `*.internal.*` files or the raw CSVs.**

Names, portraits, factions and traits are not in the CSVs; they will come from the Parallel Avatars collection JSON. Until then each Colonist shows under its callsign.
