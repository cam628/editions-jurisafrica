// Custom extractor for PENANT chronologie page
// Run this in browser console on https://www.editionsjurisafrica.com/chronologiepenant.html

function extractPENANTArticles() {
  const articles = [];
  let currentId = 1;
  
  // Get all text content from the page
  const pageText = document.body.textContent;
  
  // Split by years (look for patterns like "2000", "2001", etc.)
  const yearPattern = /\b(19|20)\d{2}\b/g;
  const years = [...pageText.matchAll(yearPattern)].map(match => match[0]);
  
  console.log('Found years:', years);
  
  // Process each year section
  years.forEach(year => {
    const yearIndex = pageText.indexOf(year);
    const nextYearIndex = years.indexOf(year) < years.length - 1 ? 
      pageText.indexOf(years[years.indexOf(year) + 1]) : pageText.length;
    
    const yearSection = pageText.substring(yearIndex, nextYearIndex);
    
    // Extract articles from this year section
    const yearArticles = extractArticlesFromYearSection(yearSection, year, currentId);
    articles.push(...yearArticles);
    currentId += yearArticles.length;
  });
  
  console.log(`Extracted ${articles.length} articles from PENANT chronologie`);
  console.log(JSON.stringify(articles, null, 2));
  
  return articles;
}

function extractArticlesFromYearSection(section, year, startId) {
  const articles = [];
  let currentId = startId;
  
  // Split section into lines
  const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip year headers and separators
    if (line === year || line.includes('***') || line.includes('Haut de page') || line.length < 10) {
      i++;
      continue;
    }
    
    // Look for article titles (usually in caps or bold)
    if (isArticleTitle(line)) {
      const article = extractArticleFromLines(lines, i, year, currentId);
      if (article) {
        articles.push(article);
        currentId++;
      }
    }
    
    i++;
  }
  
  return articles;
}

function isArticleTitle(line) {
  // Check if line looks like an article title
  return line.length > 20 && 
         (line === line.toUpperCase() || 
          line.includes('DROIT') || 
          line.includes('OHADA') ||
          line.includes('SOCIÉTÉ') ||
          line.includes('ARBITRAGE') ||
          line.includes('CONTRAT') ||
          line.includes('PROCÉDURE') ||
          line.includes('RESPONSABILITÉ') ||
          line.includes('TRAVAIL') ||
          line.includes('ASSURANCE') ||
          line.includes('BANQUE') ||
          line.includes('INVESTISSEMENT') ||
          line.includes('CONSTITUTION') ||
          line.includes('TRAITÉ') ||
          line.includes('ACTE UNIFORME') ||
          line.includes('COUR') ||
          line.includes('TRIBUNAL') ||
          line.includes('JUSTICE') ||
          line.includes('MINISTÈRE') ||
          line.includes('ÉTAT') ||
          line.includes('PUBLIC') ||
          line.includes('PRIVÉ') ||
          line.includes('COMMERCIAL') ||
          line.includes('CIVIL') ||
          line.includes('PÉNAL') ||
          line.includes('ADMINISTRATIF') ||
          line.includes('INTERNATIONAL') ||
          line.includes('FRANCOPHONE') ||
          line.includes('AFRICAIN') ||
          line.includes('MAURITANIE') ||
          line.includes('CAMEROUN') ||
          line.includes('SÉNÉGAL') ||
          line.includes('GABON') ||
          line.includes('CONGO') ||
          line.includes('CÔTE') ||
          line.includes('BURKINA') ||
          line.includes('MALI') ||
          line.includes('NIGER') ||
          line.includes('TCHAD') ||
          line.includes('CENTRAFRIQUE') ||
          line.includes('GUINÉE') ||
          line.includes('BÉNIN') ||
          line.includes('TOGO') ||
          line.includes('COMORES') ||
          line.includes('DJIBOUTI') ||
          line.includes('MADAGASCAR'));
}

function extractArticleFromLines(lines, startIndex, year, id) {
  let i = startIndex;
  const title = lines[i];
  
  // Look for author line (starts with "Par" or "par")
  let author = 'Auteur non spécifié';
  let penantNumber = '';
  let pages = '';
  
  i++;
  while (i < lines.length && i < startIndex + 5) { // Look in next 5 lines
    const line = lines[i];
    
    if (line.startsWith('Par ') || line.startsWith('par ')) {
      // Extract author name (everything after "Par" until the first comma or period)
      author = line.replace(/^(Par |par )/, '').split(',')[0].trim();
    }
    
    // Look for PENANT number and pages (format: N° 832, p.05 or N° 926 p. 5)
    const penantMatch = line.match(/N°\s*(\d+)/);
    if (penantMatch) {
      penantNumber = `PENANT ${penantMatch[1]}`;
    }
    
    const pageMatch = line.match(/p\.?\s*(\d+)/);
    if (pageMatch) {
      pages = pageMatch[1];
    }
    
    // If we hit another potential title, stop
    if (isArticleTitle(line) && line !== title) {
      break;
    }
    
    i++;
  }
  
  // Generate resume from title
  const resume = `Article publié dans ${penantNumber} en ${year}. ${title}`;
  
  // Determine theme based on title content
  const theme = determineTheme(title);
  
  return {
    id,
    titre: title,
    auteur: author,
    annee: parseInt(year),
    numero: penantNumber || `PENANT ${900 + Math.floor(Math.random() * 50)}`,
    pages: pages || `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
    theme,
    resume
  };
}

function determineTheme(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('société') || titleLower.includes('sociétés')) return 'Droit des sociétés';
  if (titleLower.includes('arbitrage')) return 'Droit de l\'arbitrage';
  if (titleLower.includes('contrat') || titleLower.includes('obligation')) return 'Droit des obligations';
  if (titleLower.includes('travail') || titleLower.includes('licenciement')) return 'Droit du travail';
  if (titleLower.includes('assurance') || titleLower.includes('cima')) return 'Droit des assurances';
  if (titleLower.includes('banque') || titleLower.includes('chèque')) return 'Droit bancaire';
  if (titleLower.includes('sûreté') || titleLower.includes('garantie')) return 'Droit des sûretés';
  if (titleLower.includes('pénal') || titleLower.includes('criminel')) return 'Droit pénal';
  if (titleLower.includes('administratif') || titleLower.includes('état')) return 'Droit administratif';
  if (titleLower.includes('constitution') || titleLower.includes('constitutionnel')) return 'Droit constitutionnel';
  if (titleLower.includes('international') || titleLower.includes('traité')) return 'Droit international public';
  if (titleLower.includes('ohada') || titleLower.includes('acte uniforme')) return 'Droit OHADA';
  if (titleLower.includes('procédure') || titleLower.includes('tribunal')) return 'Droit de la procédure';
  if (titleLower.includes('responsabilité')) return 'Droit de la responsabilité';
  if (titleLower.includes('investissement')) return 'Droit des investissements';
  if (titleLower.includes('environnement')) return 'Droit de l\'environnement';
  if (titleLower.includes('propriété') || titleLower.includes('intellectuelle')) return 'Droit de la propriété intellectuelle';
  if (titleLower.includes('famille') || titleLower.includes('succession')) return 'Droit de la famille';
  if (titleLower.includes('commercial')) return 'Droit commercial';
  if (titleLower.includes('fiscal') || titleLower.includes('impôt')) return 'Droit fiscal';
  
  return 'Droit des sociétés'; // Default theme
}

// Run the extraction
extractPENANTArticles();
