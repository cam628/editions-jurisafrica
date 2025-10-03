// Enhanced extraction script for PENANT chronologie page
// Run this in the browser console on the chronologie page

function extractPenantArticles() {
  const articles = [];
  
  // Find all year links (they contain years in href)
  const yearLinks = document.querySelectorAll('a[href*="20"]');
  
  yearLinks.forEach(link => {
    const href = link.getAttribute('href');
    const yearMatch = href.match(/(\d{4})/);
    if (!yearMatch) return;
    
    const year = yearMatch[1];
    
    // Find the parent container of this year link
    let container = link.closest('td') || link.closest('div') || link.parentElement;
    
    // Look for articles in this year's section
    // Articles are typically in the same container or nearby containers
    const articleElements = container.querySelectorAll('strong, b');
    
    articleElements.forEach(strong => {
      const title = strong.textContent.trim();
      if (!title || title.length < 10) return; // Skip very short titles
      
      // Find the author information - look for "Par" in nearby text
      let author = '';
      let publicationNumber = '';
      let pageNumber = '';
      
      // Search in the same container and nearby containers
      let searchContainer = strong.closest('td') || strong.closest('div') || strong.parentElement;
      
      // Look for "Par" in the text content - use a simpler approach
      const textContent = searchContainer.textContent || '';
      const parMatch = textContent.match(/Par\s+([^N°p\.]+)/i);
      if (parMatch) {
        author = parMatch[1].trim();
        // Clean up the author name - remove extra spaces and common artifacts
        author = author.replace(/\s+/g, ' ').replace(/[,\-]$/, '').trim();
      }
      
      // Look for publication number (N°)
      const pubMatch = textContent.match(/N°\s*(\d+)/i);
      if (pubMatch) {
        publicationNumber = pubMatch[1];
      }
      
      // Look for page number (p.)
      const pageMatch = textContent.match(/p\.\s*(\d+)/i);
      if (pageMatch) {
        pageNumber = pageMatch[1];
      }
      
      // Debug logging for this article
      if (title && title.length > 10) {
        console.log(`Processing: "${title}"`);
        console.log(`  Text content: "${textContent}"`);
        console.log(`  Author match: ${parMatch ? `"${author}"` : 'none'}`);
        console.log(`  Publication match: ${pubMatch ? `"${publicationNumber}"` : 'none'}`);
        console.log(`  Page match: ${pageMatch ? `"${pageNumber}"` : 'none'}`);
        console.log('---');
      }
      
      // Only add if we have at least a title and year
      if (title && year) {
        articles.push({
          id: articles.length + 1,
          title: title,
          author: author,
          year: parseInt(year),
          publicationNumber: publicationNumber,
          pageNumber: pageNumber,
          theme: '' // Leave blank as requested
        });
      }
    });
  });
  
  // If the above method doesn't work well, try a more aggressive approach
  if (articles.length === 0) {
    console.log('Trying alternative extraction method...');
    
    // Look for all bold text that could be titles
    const allBoldElements = document.querySelectorAll('strong, b');
    
    allBoldElements.forEach(bold => {
      const title = bold.textContent.trim();
      if (!title || title.length < 10) return;
      
      // Find the year by looking at nearby links or text
      let year = '';
      let container = bold.closest('td') || bold.closest('div') || bold.parentElement;
      
      // Look for year in nearby links
      const nearbyLinks = container.querySelectorAll('a');
      for (let link of nearbyLinks) {
        const href = link.getAttribute('href');
        if (href && href.match(/\d{4}/)) {
          const yearMatch = href.match(/(\d{4})/);
          if (yearMatch) {
            year = yearMatch[1];
            break;
          }
        }
      }
      
      // If no year found in links, look in text content
      if (!year) {
        const textContent = container.textContent || '';
        const yearMatch = textContent.match(/(\d{4})/);
        if (yearMatch) {
          year = yearMatch[1];
        }
      }
      
      // Extract author, publication, and page info
      let author = '';
      let publicationNumber = '';
      let pageNumber = '';
      
      const textContent = container.textContent || '';
      const parMatch = textContent.match(/Par\s+([^N°p\.]+)/i);
      if (parMatch) {
        author = parMatch[1].trim();
        // Clean up the author name - remove extra spaces and common artifacts
        author = author.replace(/\s+/g, ' ').replace(/[,\-]$/, '').trim();
      }
      
      const pubMatch = textContent.match(/N°\s*(\d+)/i);
      if (pubMatch) {
        publicationNumber = pubMatch[1];
      }
      
      const pageMatch = textContent.match(/p\.\s*(\d+)/i);
      if (pageMatch) {
        pageNumber = pageMatch[1];
      }
      
      if (title && year) {
        articles.push({
          id: articles.length + 1,
          title: title,
          author: author,
          year: parseInt(year),
          publicationNumber: publicationNumber,
          pageNumber: pageNumber,
          theme: ''
        });
      }
    });
  }
  
  console.log(`Found ${articles.length} articles`);
  console.log('Sample articles:', articles.slice(0, 3));
  
  // Debug: Show some raw text content to understand the structure
  console.log('Debug: Sample text content from first few bold elements:');
  const debugBold = document.querySelectorAll('strong, b');
  for (let i = 0; i < Math.min(3, debugBold.length); i++) {
    const container = debugBold[i].closest('td') || debugBold[i].closest('div') || debugBold[i].parentElement;
    console.log(`Bold text: "${debugBold[i].textContent.trim()}"`);
    console.log(`Container text: "${container.textContent.trim()}"`);
    console.log('---');
  }
  
  // Generate JSON
  const jsonOutput = JSON.stringify(articles, null, 2);
  console.log('JSON output:');
  console.log(jsonOutput);
  
  // Copy to clipboard if possible
  if (navigator.clipboard) {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      console.log('JSON copied to clipboard!');
    }).catch(err => {
      console.log('Could not copy to clipboard (this is normal if page is not focused):', err.message);
      console.log('You can manually copy the JSON output from above.');
    });
  }
  
  return articles;
}

// Run the extraction
extractPenantArticles();
