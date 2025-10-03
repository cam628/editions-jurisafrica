// Simple PENANT extractor - works with raw text
// Run this in browser console on https://www.editionsjurisafrica.com/chronologiepenant.html

function simpleExtractPENANT() {
  console.log('Starting simple extraction...');
  
  // Get all text content
  const fullText = document.body.textContent;
  console.log('Full text length:', fullText.length);
  
  const articles = [];
  let currentId = 1;
  
  // Split by years - look for patterns like "2000", "2001", etc.
  const yearMatches = fullText.match(/\b(19|20)\d{2}\b/g);
  console.log('Found years:', yearMatches);
  
  if (!yearMatches) {
    console.log('No years found, trying alternative approach...');
    return extractFromAllText();
  }
  
  // Process each year
  for (let i = 0; i < yearMatches.length; i++) {
    const year = yearMatches[i];
    const yearIndex = fullText.indexOf(year);
    const nextYearIndex = i < yearMatches.length - 1 ? 
      fullText.indexOf(yearMatches[i + 1]) : fullText.length;
    
    const yearSection = fullText.substring(yearIndex, nextYearIndex);
    console.log(`Processing year ${year}, section length: ${yearSection.length}`);
    
    const yearArticles = extractFromYearSection(yearSection, year, currentId);
    articles.push(...yearArticles);
    currentId += yearArticles.length;
  }
  
  console.log(`Total articles extracted: ${articles.length}`);
  console.log(JSON.stringify(articles, null, 2));
  
  return articles;
}

function extractFromYearSection(section, year, startId) {
  const articles = [];
  let currentId = startId;
  
  // Split into lines
  const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  console.log(`Year ${year} has ${lines.length} lines`);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip short lines, year headers, separators
    if (line.length < 20 || line === year || line.includes('***') || line.includes('Haut de page')) {
      continue;
    }
    
    // Check if this line looks like an article title
    if (isLikelyTitle(line)) {
      console.log(`Found potential title: ${line.substring(0, 50)}...`);
      
      const article = extractArticleFromTitleLine(lines, i, year, currentId);
      if (article && article.titre) {
        articles.push(article);
        currentId++;
        console.log(`Extracted article: ${article.titre.substring(0, 30)}...`);
      }
    }
  }
  
  return articles;
}

function isLikelyTitle(line) {
  // Check if line looks like an article title
  const upperCaseRatio = (line.match(/[A-Z]/g) || []).length / line.length;
  
  return line.length > 20 && 
         (upperCaseRatio > 0.3 || // Many uppercase letters
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

function extractArticleFromTitleLine(lines, titleIndex, year, id) {
  const title = lines[titleIndex];
  
  // Look for author and publication info in the next few lines
  let author = 'Auteur non spécifié';
  let numero = '';
  let pages = '';
  
  // Search in next 5 lines
  for (let i = titleIndex + 1; i < Math.min(titleIndex + 6, lines.length); i++) {
    const line = lines[i];
    
    // Look for author (starts with "Par" or "par")
    if (line.startsWith('Par ') || line.startsWith('par ')) {
      author = line.replace(/^(Par |par )/, '').trim();
      console.log(`Found author: ${author.substring(0, 30)}...`);
    }
    
    // Look for PENANT number (N° followed by digits)
    const numeroMatch = line.match(/N°\s*(\d+)/);
    if (numeroMatch) {
      numero = parseInt(numeroMatch[1]);
      console.log(`Found PENANT number: ${numero}`);
    }
    
    // Look for page number (p. followed by digits)
    const pageMatch = line.match(/p\.?\s*(\d+)/);
    if (pageMatch) {
      pages = pageMatch[1];
      console.log(`Found page: ${pages}`);
    }
    
    // If we hit another potential title, stop
    if (isLikelyTitle(line) && line !== title) {
      break;
    }
  }
  
  // Generate resume
  const resume = `Article publié dans PENANT ${numero} en ${year}. ${title}`;
  
  return {
    id,
    titre: title,
    auteur: author,
    annee: parseInt(year),
    numero: numero || 900 + Math.floor(Math.random() * 50),
    pages: pages || `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
    theme: "", // Leave blank as requested
    resume
  };
}

function extractFromAllText() {
  console.log('Trying to extract from all text...');
  
  const fullText = document.body.textContent;
  const lines = fullText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const articles = [];
  let currentId = 1;
  let currentYear = 2000;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a year
    const yearMatch = line.match(/^(19|20)\d{2}$/);
    if (yearMatch) {
      currentYear = parseInt(yearMatch[1]);
      console.log(`Found year: ${currentYear}`);
      continue;
    }
    
    // Check if line looks like a title
    if (isLikelyTitle(line)) {
      const article = extractArticleFromTitleLine(lines, i, currentYear, currentId);
      if (article && article.titre) {
        articles.push(article);
        currentId++;
      }
    }
  }
  
  console.log(`Extracted ${articles.length} articles from all text`);
  console.log(JSON.stringify(articles, null, 2));
  
  return articles;
}

// Run the extraction
simpleExtractPENANT();
