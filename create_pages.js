import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = [
    // News section
    { path: 'latest-news.html', title: 'Latest News' },
    { path: 'events.html', title: 'Events' },
    { path: 'updates.html', title: 'Updates' },
    { path: 'archives.html', title: 'Archives' },
    
    // Info section
    { path: 'rules.html', title: 'Rules' },
    { path: 'mappool.html', title: 'Map Pool' },
    { path: 'about.html', title: 'About Us' },
    
    // Competitive section
    { path: 'tournaments.html', title: 'Tournaments' },
    { path: 'standings.html', title: 'Standings' },
    { path: 'results.html', title: 'Results' },
    { path: 'scoreboards.html', title: 'Scoreboards' },
    
    // Community section
    { path: 'forum.html', title: 'Forum' },
    { path: 'demos.html', title: 'Demos' },
    { path: 'files.html', title: 'Files' },
    { path: 'servers.html', title: 'Servers' }
];

const templatePath = join(__dirname, 'src', 'template.html');
const template = readFileSync(templatePath, 'utf8');

pages.forEach(page => {
    const content = template.replace(/\[PAGE_TITLE\]/g, page.title);
    const filePath = join(__dirname, 'src', page.path);
    writeFileSync(filePath, content);
    console.log(`Created ${page.path}`);
});
