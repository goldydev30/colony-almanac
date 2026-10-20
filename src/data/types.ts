// Shapes of the files written by scripts/import-research-data.mjs.

export interface ColonistRecord {
  /** Generated callsign; the Avatar's name is shown in its place */
  name: string;
  slug: string;
  /** The player's gamertag, when the logs reveal it */
  commander: string | null;
  log_count: number;
  chronicle_event_count: number;
  chronicle_fact_count: number;
  first_seen: string;
  last_seen: string;
  active_days: number;
  logs_per_iso_week: Record<string, number>;
  top_places: string[];
  top_resources: string[];
  top_threats: string[];
  latest_log: string;
  avatar?: Avatar;
}

export type Entry =
  | { at: string; type: 'log'; text: string }
  | { at: string; type: 'chronicle'; facts: string[] };

export type EntryType = Entry['type'];

export interface Avatar {
  /** "preview" = a stand-in until the real Colonist-to-Avatar link is known */
  link: 'preview' | 'confirmed';
  name: string;
  token_id: number;
  faction: string;
  saying: string;
  traits: Record<string, string>;
  thumb_url: string;
  image_url: string;
}

export interface Colonist extends ColonistRecord {
  /** Portrait: a path under /public or a full image URL */
  image?: string;
  /** Larger version of the portrait for the Colonist file */
  imageLarge?: string;
  /** The generated callsign, kept while an Avatar stands in for the name */
  callsign: string;
  quote: string;
}

export interface DatedEntry {
  colonist: Colonist;
  entry: Entry;
}
