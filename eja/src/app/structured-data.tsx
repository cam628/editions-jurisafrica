export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Éditions JurisAfrica",
    "alternateName": "EJA",
    "url": "https://www.editionsjurisafrica.com",
    "logo": "https://www.editionsjurisafrica.com/logo.png",
    "description": "Éditions JurisAfrica publie la prestigieuse revue Le PENANT et des ouvrages spécialisés en droit africain. Revue juridique et politique des États francophones depuis 1946.",
    "foundingDate": "1946",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "jurisafrica@yahoo.fr",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.editionsjurisafrica.com"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Éditions JurisAfrica"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function PublicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PublicationVolume",
    "name": "Le PENANT",
    "alternateName": "Revue juridique et politique des États francophones",
    "description": "Revue juridique et politique des États francophones, créée en 1946, spécialisée en droit africain et OHADA.",
    "publisher": {
      "@type": "Organization",
      "name": "Éditions JurisAfrica"
    },
    "datePublished": "1946",
    "inLanguage": "fr",
    "genre": "Revue juridique",
    "keywords": ["droit africain", "OHADA", "revue juridique", "droit francophone", "jurisprudence africaine"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Éditions JurisAfrica",
    "url": "https://www.editionsjurisafrica.com",
    "description": "Site officiel des Éditions JurisAfrica - Revue Le PENANT et publications juridiques africaines",
    "publisher": {
      "@type": "Organization",
      "name": "Éditions JurisAfrica"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.editionsjurisafrica.com/penant?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
