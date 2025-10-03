import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationStructuredData, WebsiteStructuredData } from './structured-data';

export const metadata = {
  title: {
    default: 'Éditions JurisAfrica - Revue Le PENANT et publications juridiques africaines',
    template: '%s | Éditions JurisAfrica'
  },
  description: 'Éditions JurisAfrica publie la prestigieuse revue Le PENANT et des ouvrages spécialisés en droit africain. Revue juridique et politique des États francophones depuis 1946.',
  keywords: ['droit africain', 'OHADA', 'revue juridique', 'PENANT', 'publications juridiques', 'droit francophone', 'jurisprudence africaine'],
  authors: [{ name: 'Éditions JurisAfrica' }],
  creator: 'Éditions JurisAfrica',
  publisher: 'Éditions JurisAfrica',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.editionsjurisafrica.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.editionsjurisafrica.com',
    title: 'Éditions JurisAfrica - Revue Le PENANT et publications juridiques africaines',
    description: 'Éditions JurisAfrica publie la prestigieuse revue Le PENANT et des ouvrages spécialisés en droit africain. Revue juridique et politique des États francophones depuis 1946.',
    siteName: 'Éditions JurisAfrica',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Éditions JurisAfrica - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Éditions JurisAfrica - Revue Le PENANT et publications juridiques africaines',
    description: 'Éditions JurisAfrica publie la prestigieuse revue Le PENANT et des ouvrages spécialisés en droit africain.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet" />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#fafbfc' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

