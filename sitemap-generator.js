const fs = require('fs');
const globby = require('globby');
function addPage(page) {
  const path = page
    .replace(/app(?!s)/g, '')
    .replace('pages', '')
    .replace(/\/\(.*?\)/g, '')
    .replace('page.tsx', '')
    .replace('index.tsx', '');
  const route = path === '/page' ? '' : path;
  return ` 
  <url>
    <loc>${`https://vibe.us${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
}
//<changefreq>monthly</changefreq>
//<priority>1.0</priority>
async function generateSitemap() {
  // excludes Nextjs files and API routes.
  const pages = await globby([
    'app/*.tsx',
    'app/**/page.tsx',
    '!app/_*tsx',
    '!app/api',
    '!app/layout.tsx',
    'pages/**/index.tsx',
    '!pages/**/sections/**/index.tsx',
  ]);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(addPage).join('\n')}
    </urlset>`;
  fs.writeFileSync('public/sitemap.xml', sitemap);
}
generateSitemap();
