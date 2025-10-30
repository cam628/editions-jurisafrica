const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'content', 'articles.ts');
const OUT = path.join(__dirname, '..', 'src', 'content', 'articles_2025_review.ts');

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeFile(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

function parseArticles(sourceText) {
  // naive parse: find objects within articles: [ ... ]
  const startIdx = sourceText.indexOf('articles: [');
  if (startIdx === -1) throw new Error('articles array not found');
  const endIdx = sourceText.indexOf('\n  ]', startIdx);
  const arrayText = sourceText.slice(startIdx, endIdx + 4); // include closing

  // Match individual article objects { ... }
  const objectRegex = /\{[\s\S]*?\n\s*\}/g;
  const entries = [];
  for (const match of arrayText.matchAll(objectRegex)) {
    const block = match[0];
    if (!/\bannee\s*:\s*2025\b/.test(block)) continue;

    // Extract fields with regex
    const get = (label, re) => {
      const m = block.match(re);
      return m ? m[1] : null;
    };
    const id = get('id', /\bid\s*:\s*(\d+)/);
    const titre = get('titre', /\btitre\s*:\s*"([\s\S]*?)"/);
    const auteur = get('auteur', /\bauteur\s*:\s*"([\s\S]*?)"/);
    const numero = get('numero', /\bnumero\s*:\s*(\d{3})/);
    const pages = get('pages', /\bpages\s*:\s*"(\d+)"/);
    const theme = get('theme', /\btheme\s*:\s*"([\s\S]*?)"/);

    if (!numero || !pages) continue;
    entries.push({ id: id ? Number(id) : null, titre, auteur, annee: 2025, numero: Number(numero), pages: String(pages), theme });
  }
  return entries;
}

function sortEntries(entries) {
  return entries.sort((a, b) => a.numero - b.numero || Number(a.pages) - Number(b.pages));
}

function renderFile(entries) {
  const header = `export const articles2025Review = [\n`;
  const body = entries.map((e, idx) => {
    const id = 516 + idx;
    return `  {\n    id: ${id},\n    titre: ${JSON.stringify(e.titre)},\n    auteur: ${JSON.stringify(e.auteur)},\n    annee: 2025,\n    numero: ${e.numero},\n    pages: ${JSON.stringify(e.pages)},\n    theme: ${JSON.stringify(e.theme)}\n  }`;
  }).join(',\n');
  const footer = `\n];\n`;
  return header + body + footer;
}

const src = readFile(SRC);
const entries = sortEntries(parseArticles(src));
const out = renderFile(entries);
writeFile(OUT, out);
console.log(`Wrote ${entries.length} entries to ${OUT}`);


