// Shapes of the files written by scripts/import-research-data.mjs.

export interface ColonistRecord {
  /** Interim callsign until names arrive with the Parallel Avatars JSON */
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
}

export type Entry =
  | { at: string; type: 'log'; text: string }
  | { at: string; type: 'chronicle'; facts: string[] };

export type EntryType = Entry['type'];

export interface PreviewAvatar {
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
  avatar?: PreviewAvatar;
  quote: string;
}

export interface DatedEntry {
  colonist: Colonist;
  entry: Entry;
}
