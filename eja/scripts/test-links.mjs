#!/usr/bin/env node

/**
 * Script de test des liens externes
 * Vérifie que tous les liens externes du site sont accessibles
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Configuration
const ROOT_DIR = join(__dirname, '..');
const SRC_DIR = join(ROOT_DIR, 'src');
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
];

// Extensions de fichiers à analyser
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

// URLs à ignorer (services toujours disponibles)
const IGNORE_URLS = [
  'https://fonts.googleapis.com',
  'https://api.cloudinary.com',
  'https://formspree.io',
  'mailto:',
];

// Collecte tous les liens externes
function collectLinks(dir, links = new Set()) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    
    // Ignorer les dossiers exclus
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath))) {
      continue;
    }

    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      collectLinks(filePath, links);
    } else if (FILE_EXTENSIONS.includes(extname(file))) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        const urlPattern = /https?:\/\/[^\s"'<>)]+/g;
        const mailtoPattern = /mailto:[^\s"'<>)]+/g;
        
        // Trouver les URLs HTTP/HTTPS
        const httpMatches = content.match(urlPattern) || [];
        httpMatches.forEach(url => {
          if (!IGNORE_URLS.some(ignore => url.startsWith(ignore))) {
            links.add(url);
          }
        });

        // Trouver les mailto
        const mailtoMatches = content.match(mailtoPattern) || [];
        mailtoMatches.forEach(url => {
          links.add(url);
        });
      } catch (error) {
        console.error(`${colors.red}Erreur lecture ${filePath}: ${error.message}${colors.reset}`);
      }
    }
  }

  return links;
}

// Test un lien
async function testLink(url, timeout = 10000) {
  try {
    // Mailto links sont toujours valides (format)
    if (url.startsWith('mailto:')) {
      const email = url.replace('mailto:', '');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return {
        url,
        status: emailRegex.test(email) ? 'valid' : 'invalid',
        statusCode: emailRegex.test(email) ? 200 : 400,
        error: emailRegex.test(email) ? null : 'Format email invalide',
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
      },
    });

    clearTimeout(timeoutId);

    return {
      url,
      status: response.ok ? 'valid' : 'error',
      statusCode: response.status,
      error: response.ok ? null : `HTTP ${response.status}`,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        url,
        status: 'timeout',
        statusCode: 0,
        error: 'Timeout (>10s)',
      };
    }
    
    return {
      url,
      status: 'error',
      statusCode: 0,
      error: error.message,
    };
  }
}

// Test tous les liens
async function testAllLinks(links) {
  const results = [];
  const linksArray = Array.from(links).sort();
  
  console.log(`${colors.cyan}Test de ${linksArray.length} liens...${colors.reset}\n`);

  for (let i = 0; i < linksArray.length; i++) {
    const url = linksArray[i];
    process.stdout.write(`[${i + 1}/${linksArray.length}] Test: ${url}... `);
    
    const result = await testLink(url);
    results.push(result);

    if (result.status === 'valid') {
      console.log(`${colors.green}✓ OK${colors.reset} (${result.statusCode})`);
    } else {
      console.log(`${colors.red}✗ ${result.status}${colors.reset} - ${result.error || result.statusCode}`);
    }

    // Petite pause pour ne pas surcharger les serveurs
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return results;
}

// Génère le rapport
function generateReport(results) {
  const valid = results.filter(r => r.status === 'valid');
  const invalid = results.filter(r => r.status !== 'valid');

  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}                    RAPPORT FINAL${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.green}✓ Liens valides: ${valid.length}${colors.reset}`);
  console.log(`${colors.red}✗ Liens invalides: ${invalid.length}${colors.reset}`);
  console.log(`${colors.cyan}Total: ${results.length}${colors.reset}\n`);

  if (invalid.length > 0) {
    console.log(`${colors.red}Liens avec problèmes:${colors.reset}\n`);
    invalid.forEach(result => {
      console.log(`  ${colors.red}✗${colors.reset} ${result.url}`);
      console.log(`    Status: ${result.status} | Code: ${result.statusCode || 'N/A'} | Erreur: ${result.error || 'N/A'}\n`);
    });
  }

  if (valid.length > 0 && invalid.length === 0) {
    console.log(`${colors.green}✓ Tous les liens sont valides !${colors.reset}\n`);
  }

  return {
    total: results.length,
    valid: valid.length,
    invalid: invalid.length,
    results,
  };
}

// Fonction principale
async function main() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}     Test des liens externes - Éditions JurisAfrica${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.blue}Collecte des liens...${colors.reset}`);
  const links = collectLinks(SRC_DIR);
  console.log(`${colors.green}✓ ${links.size} liens trouvés${colors.reset}\n`);

  if (links.size === 0) {
    console.log(`${colors.yellow}Aucun lien externe trouvé.${colors.reset}`);
    return;
  }

  console.log(`${colors.blue}Liens à tester:${colors.reset}`);
  Array.from(links).sort().forEach((url, i) => {
    console.log(`  ${i + 1}. ${url}`);
  });
  console.log('');

  const results = await testAllLinks(links);
  const report = generateReport(results);

  // Code de sortie
  process.exit(report.invalid > 0 ? 1 : 0);
}

// Exécution
main().catch(error => {
  console.error(`${colors.red}Erreur fatale: ${error.message}${colors.reset}`);
  console.error(error.stack);
  process.exit(1);
});
