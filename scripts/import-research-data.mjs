// Copies the Research thread's processed Colonist data into src/data/.
//
//   node scripts/import-research-data.mjs <research/data dir>
//
// Only Colonists with enough material for a full profile are imported
// (10+ logs and 3+ Chronicle events). Each Colonist gets a stable callsign
// for its name and URL until real names arrive with the Avatars JSON.
// Player gamertags are shown (Goldy, 2026-10-19), but internal colony and
// agent IDs must never be published: the import refuses to write if a
// UUID-shaped value appears. Never commit the *.internal.* files or raw CSVs.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/import-research-data.mjs <research/data dir>');
  process.exit(1);
}

const MIN_LOGS = 10;
const MIN_EVENTS = 3;

const all = JSON.parse(readFileSync(join(dir, 'colonists.json'), 'utf8'));
const timelines = JSON.parse(readFileSync(join(dir, 'colonist-timelines.json'), 'utf8'));

// Callsigns come from a hash of the Colonist's public ID, assigned across
// every Colonist so a callsign doesn't change when the imported subset does.
const ADJECTIVES = ['Amber', 'Ash', 'Basalt', 'Brass', 'Cinder', 'Cobalt', 'Copper', 'Dawn', 'Dune', 'Dust', 'Ember', 'Flint', 'Frost', 'Gale', 'Granite', 'Hollow', 'Iron', 'Jade', 'Lumen', 'Mesa', 'Night', 'Nova', 'Onyx', 'Quartz', 'Red', 'Rust', 'Sable', 'Salt', 'Signal', 'Silver', 'Slate', 'Solar', 'Static', 'Storm', 'Thorn', 'Tin', 'Vapor', 'Velvet', 'Wire', 'Zinc'];
const NOUNS = ['Badger', 'Beacon', 'Bishop', 'Compass', 'Condor', 'Coyote', 'Crane', 'Drifter', 'Falcon', 'Ferry', 'Finch', 'Fox', 'Harbor', 'Hare', 'Heron', 'Hound', 'Jackal', 'Kestrel', 'Lantern', 'Lark', 'Lynx', 'Magpie', 'Marten', 'Mason', 'Moth', 'Oracle', 'Otter', 'Owl', 'Pilot', 'Raven', 'Sentry', 'Sparrow', 'Spindle', 'Swift', 'Tinker', 'Viper', 'Warden', 'Wolf', 'Wren', 'Yak'];
const SIZE = ADJECTIVES.length * NOUNS.length;
const callsigns = new Map();
const taken = new Set();
const hashed = all
  .map((c) => ({ id: c.colonist_id, h: createHash('sha256').update(c.colonist_id).digest() }))
  .sort((a, b) => Buffer.compare(a.h, b.h));
for (const { id, h } of hashed) {
  let n = h.readUInt32BE(0) % SIZE;
  while (taken.has(n)) n = (n + 1) % SIZE;
  taken.add(n);
  const name = `${ADJECTIVES[Math.floor(n / NOUNS.length)]} ${NOUNS[n % NOUNS.length]}`;
  callsigns.set(id, { name, slug: name.toLowerCase().replace(/\s+/g, '-') });
}

const picked = all.filter((c) => c.log_count >= MIN_LOGS && c.chronicle_event_count >= MIN_EVENTS);
const colonists = picked.map(({ colonist_id, colony_id, has_logs, has_chronicle, ...rest }) => ({
  ...callsigns.get(colonist_id),
  ...rest,
}));
const subset = Object.fromEntries(picked.map((c) => [callsigns.get(c.colonist_id).slug, timelines[c.colonist_id] ?? []]));

const written = JSON.stringify([colonists, subset]);
if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(written)) {
  console.error('Refusing to import: a UUID-shaped internal ID is present.');
  process.exit(1);
}

const stats = {
  colonists: all.length,
  logs: all.reduce((n, c) => n + c.log_count, 0),
  chronicleEvents: all.reduce((n, c) => n + c.chronicle_event_count, 0),
  lastSeen: all.reduce((m, c) => (c.last_seen > m ? c.last_seen : m), ''),
};

const out = join(import.meta.dirname, '..', 'src', 'data');
writeFileSync(join(out, 'colonists.json'), JSON.stringify(colonists, null, 1) + '\n');
writeFileSync(join(out, 'timelines.json'), JSON.stringify(subset) + '\n');
writeFileSync(join(out, 'stats.json'), JSON.stringify(stats, null, 2) + '\n');
console.log(`Imported ${colonists.length} of ${all.length} Colonists.`, stats);
