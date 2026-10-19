// Placeholder content so the layout can be reviewed before real data lands.
// Replace with a loader for Goldy's report CSVs and the Parallel Avatars JSON
// once their columns are known. Bracketed values are intentional placeholders.
import type { Colonist, Report, Cadence } from './types';

const placeholderColonist = (n: number): Colonist => ({
  slug: `colonist-${n}`,
  name: '[Colonist name]',
  role: '[Role]',
  faction: '[Faction]',
  avatarId: '[ID]',
  bio: "[One-line bio, generated from the Colonist's personality and their reports.]",
  traits: ['[Trait]', '[Trait]', '[Trait]'],
  avatarTraits: { Background: '[value]', Outfit: '[value]', Headgear: '[value]', Eyes: '[value]' },
});

export const colonists: Colonist[] = [
  {
    ...placeholderColonist(0),
    slug: 'skipjack',
    name: 'SkipJack',
    role: 'Fabricator',
    image: '/assets/skipjack.jpg',
  },
  ...[1, 2, 3, 4, 5].map(placeholderColonist),
];

const placeholderReport = (i: number, cadence: Cadence, colonist = 'skipjack'): Report => ({
  id: `${cadence}-${i}`,
  colonist,
  cadence,
  date: cadence === 'daily' ? '[DATE]' : cadence === 'weekly' ? 'Week [NN]' : '[MONTH YEAR]',
  title: '[Report title]',
  text: `[The ${cadence} report text from the CSV, in the Colonist's own voice. Mentions of other Colonists become links to their files.]`,
  activity: '[Activity]',
  location: '[Location]',
});

export const reports: Report[] = [
  ...[1, 2, 3, 4, 5, 6].map((i) => placeholderReport(i, 'daily', i % 2 ? 'skipjack' : `colonist-${i / 2}`)),
  ...[1, 2, 3, 4].map((i) => placeholderReport(i, 'weekly')),
  ...[1, 2].map((i) => placeholderReport(i, 'monthly')),
];

export const stats = { colonists: '[N]', entries: '[N]', lastDispatch: '[DATE]' };

export const getColonist = (slug: string) => colonists.find((c) => c.slug === slug);
export const reportsFor = (slug: string) => reports.filter((r) => r.colonist === slug);
