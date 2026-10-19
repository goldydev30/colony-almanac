export type Cadence = 'daily' | 'weekly' | 'monthly';

export interface Colonist {
  slug: string;
  name: string;
  role: string;
  faction: string;
  avatarId: string;
  /** Path under /public, or undefined until Avatar art is available */
  image?: string;
  bio: string;
  traits: string[];
  /** Avatar collection traits, keyed by trait name */
  avatarTraits: Record<string, string>;
}

export interface Report {
  id: string;
  colonist: string; // Colonist slug
  cadence: Cadence;
  /** Display date until the CSV date format is known */
  date: string;
  title: string;
  text: string;
  activity: string;
  location: string;
}
