
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const DOMAIN = 'https://www.kynyx.com'; 

async function Sitemap() {
  const sitemap = new SitemapStream({ hostname: DOMAIN });

  
  const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/services', changefreq: 'weekly', priority: 0.8 },
    { url: '/portfolio', changefreq: 'weekly', priority: 0.7 },
    { url: '/about', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.9 },
   
  ];

  routes.forEach(route => sitemap.write(route));
  sitemap.end();

  const sitemapOutput = await streamToPromise(sitemap);
  createWriteStream('./public/sitemap.xml').write(sitemapOutput);
}

Sitemap().then(() => console.log(' Sitemap generated successfully!'));
