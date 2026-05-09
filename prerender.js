const fs = require('fs');
const path = require('path');
const http = require('http');

const ROUTES = [
  { path: '/', name: 'index' },
  { path: '/list-your-pg', name: 'list-your-pg' },
  { path: '/pg-management-app', name: 'pg-management-app' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
  { path: '/tenant-login', name: 'tenant-login' },
  { path: '/sitemap.xml', name: 'sitemap' },
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
};

async function prerender() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer-core');
  } catch {
    console.log('puppeteer-core not available. Prerendering skipped.');
    return;
  }
  const buildDir = path.resolve(__dirname, 'build');

  const server = http.createServer((req, res) => {
    let filePath = path.join(buildDir, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(buildDir, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(500);
            res.end('Server error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });

  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Static server running on port ${port}`);

  const chromePaths = [
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
  ];

  let executablePath;
  for (const cp of chromePaths) {
    if (fs.existsSync(cp)) {
      executablePath = cp;
      break;
    }
  }

  if (!executablePath) {
    console.log('No local Chrome found, checking for puppeteer Chromium...');
    const puppeteerPath = require.resolve('puppeteer-core');
    const possibleDir = path.dirname(puppeteerPath);
    const chromeFinder = path.join(possibleDir, '..', 'node_modules', 'puppeteer', '.local-chromium');
    if (fs.existsSync(chromeFinder)) {
      const dirs = fs.readdirSync(chromeFinder);
      for (const dir of dirs) {
        const exePath = path.join(chromeFinder, dir, 'chrome-win', 'chrome.exe');
        if (fs.existsSync(exePath)) {
          executablePath = exePath;
          break;
        }
        const linuxPath = path.join(chromeFinder, dir, 'chrome-linux', 'chrome');
        if (fs.existsSync(linuxPath)) {
          executablePath = linuxPath;
          break;
        }
      }
    }
  }

  if (!executablePath) {
    console.log('No Chrome/Chromium found. Prerendering skipped.');
    console.log('Install Chrome or set PUPPETEER_EXECUTABLE_PATH env var.');
    server.close();
    return;
  }

  console.log(`Using Chrome: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  for (const route of ROUTES) {
    const url = `http://localhost:${port}${route.path}`;
    console.log(`Prerendering: ${url}`);

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'font', 'media', 'stylesheet'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const html = await page.content();
      const outputDir = route.name === 'index' ? buildDir : path.join(buildDir, route.name);
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, 'index.html'), html);
      console.log(`  Saved: ${route.name}/index.html (${(html.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Failed: ${route.path} - ${err.message}`);
    }

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(err => {
  console.error('Prerender error:', err);
  console.log('Continuing without prerendering.');
});
