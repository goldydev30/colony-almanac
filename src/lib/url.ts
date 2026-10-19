// Prefix a root-relative path with the site's base path, so links and
// assets work both locally ("/") and on GitHub Pages ("/colony-almanac/").
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${base}${path}`;
export const bg = (path: string) => `--bg: url('${url(path)}')`;
