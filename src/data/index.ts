import records from './colonists.json';
import timelineData from './timelines.json';
import statsData from './stats.json';
import previewAvatars from './preview-avatars.json';
import type { Colonist, ColonistRecord, DatedEntry, Entry, PreviewAvatar } from './types';

const timelines = timelineData as Record<string, Entry[]>;

const firstSentence = (text: string) => {
  const match = text.match(/^.+?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
};

// Preview only: Parallel Avatars stand in for the callsigns, handed out in
// registry order, until we know which Avatar belongs to which Colonist
export const colonists: Colonist[] = (records as ColonistRecord[]).map((r, i) => {
  const avatar = (previewAvatars as PreviewAvatar[])[i];
  return {
    ...r,
    name: avatar?.name ?? r.name,
    callsign: r.name,
    avatar,
    image: avatar?.thumb_url,
    imageLarge: avatar?.image_url,
    quote: firstSentence(r.latest_log),
  };
});

export const stats = statsData;

export const getColonist = (slug: string) => colonists.find((c) => c.slug === slug);

/** A Colonist's logs and Chronicle events, newest first */
export const timelineFor = (c: Colonist): Entry[] =>
  [...(timelines[c.slug] ?? [])].sort((a, b) => b.at.localeCompare(a.at));

/** Every entry across all Colonists, newest first */
export const allEntries: DatedEntry[] = colonists
  .flatMap((colonist) => (timelines[colonist.slug] ?? []).map((entry) => ({ colonist, entry })))
  .sort((a, b) => b.entry.at.localeCompare(a.entry.at));

export const day = (at: string) => at.slice(0, 10);

export const formatDate = (d: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(`${d.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });

export const excerpt = (text: string, max = 220) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(' ', max))}…`;

/** Entries grouped by day, newest day first */
export const byDay = (entries: DatedEntry[]) => {
  const groups = new Map<string, DatedEntry[]>();
  for (const e of entries) {
    const d = day(e.entry.at);
    if (!groups.has(d)) groups.set(d, []);
    groups.get(d)!.push(e);
  }
  return [...groups.entries()];
};
