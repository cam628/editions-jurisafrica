/*
  Parser for: data/Table analytique du PENANT de 2001 à 2023.docx.txt
  Output: src/content/articles_draft.ts
  - annee left as null (to be filled later)
  - Keep duplicates across themes as requested
*/

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INPUT = path.join(ROOT, 'data', 'Table analytique du PENANT de 2001 à 2023.docx.txt');
const OUTPUT = path.join(ROOT, 'src', 'content', 'articles_draft.ts');

const THEMES = [
  'ARBITRAGE ET MEDIATION',
  'ASSURANCES',
  'DROIT BANCAIRE',
  'DROIT DES BIENS',
  'DROIT CIVIL DES PERSONNES & DE LA FAMILLE',
  'DROIT COMMERCIAL',
  'COMMON LAW',
  'DROIT COMMUNAUTAIRE : UEMOA et CEMAC',
  'DROIT DE LA CONSOMMATION',
  'DROIT DES CONTRATS',
  'DROIT COUTUMIER',
  'DROIT DES ENTREPRISES PUBLIQUES ET PRIVATISATIONS',
  'DROIT FISCAL',
  "DROIT FONCIER , FORESTIER ET DROIT DE L'ENVIRONNEMENT",
  "DROIT DE L'HOMME",
  'DROIT DES INSTITUTIONS COMMUNAUTAIRES (OHADA) ET NATIONALES',
  'INVESTISSEMENTS ETRANGERS',
  'DROIT MINIER, PETROLIER ET DES RESSOURCES NATURELLES',
  'DROIT MONETAIRE ET FINANCIER',
  'DROIT PENAL ET PROCEDURE PENALE',
  'PROCEDURE CIVILE ET ORGANISATION JUDICIAIRE',
  'PROCEDURES COLLECTIVES',
  'PROPRIETE INTELLECTUELLE',
  "RECOUVREMENT DE CREANCES ET VOIES D'EXECUTION",
  'RESPONSABILITE CIVILE',
  'DROIT DES SOCIETES COMMERCIALES',
  'SURETES',
  'DROIT DES TRANSPORTS',
  'DROIT DU TRAVAIL',
  'VENTE ET DISTRIBUTION',
  'UNCLASSIFIED',
];

function readInput(): string {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`Input file not found: ${INPUT}`);
  }
  return fs.readFileSync(INPUT, 'utf8');
}

function normalizeSpaces(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

function splitByThemes(text: string): Array<{ theme: string; content: string }> {
  // Themes appear as lines like: "1.  ARBITRAGE ET MEDIATION" then content until next theme header
  const indices: Array<{ idx: number; theme: string }> = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*\d+\.?\s*(.+)$/);
    if (m) {
      const candidate = m[1].trim();
      if (THEMES.includes(candidate)) {
        indices.push({ idx: i, theme: candidate });
      }
    }
  }

  const sections: Array<{ theme: string; content: string }> = [];
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].idx + 1;
    const end = i + 1 < indices.length ? indices[i + 1].idx : lines.length;
    const content = lines.slice(start, end).join('\n');
    sections.push({ theme: indices[i].theme, content });
  }
  return sections;
}

function parseEntriesForTheme(theme: string, content: string) {
  // Pattern per entry:
  // TITLE (often uppercase, may span lines) then a line starting with Par/ par, then optional descriptor lines, then numero N°xxx and pages p ...
  // We'll match blocks ending in N° xxx p ...
  // Use a greedy block that ends at a line containing N° and p.
  const blocks = content
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    // keep blocks that contain an issue marker
    .filter((b) => /N°\s*\d{3}\s*,?\s*p\.?/i.test(b) || /N°\s*\d{3}\s+p\s*\d+/i.test(b) || /N°\s*\d{3}\s*[,\s]+p\.?\s*\d+/i.test(b));

  const entries: any[] = [];
  for (const block of blocks) {
    // Extract numero (3 digits)
    const numMatch = block.match(/N°\s*(\d{3})/i);
    // Extract pages number after p. variations
    const pageMatch = block.match(/p\.?\s*(\d+)/i);
    if (!numMatch || !pageMatch) continue;
    const numero = parseInt(numMatch[1], 10);
    const pages = pageMatch[1];

    // Split around 'Par' (case-insensitive), keep title before, author+desc between Par and N°
    const parIdx = block.search(/\b[Pp]ar\b/);
    let rawTitle = block;
    let rawAuthor = '';
    if (parIdx >= 0) {
      rawTitle = block.slice(0, parIdx).trim();
      rawAuthor = block.slice(parIdx).replace(/^\b[Pp]ar\b\s*/, '').trim();
    }
    // Cut author up to the N°
    if (rawAuthor) {
      rawAuthor = rawAuthor.split(/N°\s*\d{3}/i)[0] || rawAuthor;
    }
    // Remove dots ellipsis from author
    rawAuthor = rawAuthor.replace(/[…\u2026]+/g, ' ').replace(/\.{2,}/g, ' ');

    const titre = normalizeSpaces(rawTitle.replace(/\n+/g, ' '));
    const auteur = normalizeSpaces(rawAuthor.replace(/\n+/g, ' '));

    // Basic guard: title shouldn't start with 'Par'
    if (/^Par\b/i.test(titre)) continue;

    entries.push({ titre, auteur, annee: null, numero, pages: String(pages), theme });
  }
  return entries;
}

function generateTs(articles: any[]): string {
  const header = `export const articlesData = {\n  themes: ${JSON.stringify(THEMES, null, 2)},\n  articles: [\n`;
  const body = articles
    .map((a, idx) => {
      // Escape backticks and backslashes if any
      const titre = a.titre.replace(/`/g, "'");
      const auteur = a.auteur.replace(/`/g, "'");
      return `    {\n      id: ${idx + 1},\n      titre: ${JSON.stringify(titre)},\n      auteur: ${JSON.stringify(auteur)},\n      annee: null,\n      numero: ${a.numero},\n      pages: ${JSON.stringify(a.pages)},\n      theme: ${JSON.stringify(a.theme)}\n    }`;
    })
    .join(',\n');
  const footer = `\n  ]\n};\n`;
  return header + body + footer;
}

function main() {
  const text = readInput();
  const sections = splitByThemes(text);
  const all: any[] = [];
  for (const s of sections) {
    const items = parseEntriesForTheme(s.theme, s.content);
    all.push(...items);
  }
  const out = generateTs(all);
  fs.writeFileSync(OUTPUT, out, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Parsed ${all.length} articles into ${OUTPUT}`);
}

main();



