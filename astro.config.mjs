import { defineConfig } from 'astro/config';

// Served from GitHub Pages as a project site.
export default defineConfig({
  site: 'https://goldydev30.github.io',
  base: '/colony-almanac',
  // The archive used to live at /reports/
  redirects: { '/reports': '/colony-almanac/archives/' },
});
