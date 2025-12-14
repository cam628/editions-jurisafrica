import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meilleurs vœux - Éditions JurisAfrica',
  description: 'Meilleurs vœux pour la nouvelle année de la part des Éditions JurisAfrica',
  robots: {
    index: false, // Ne pas indexer cette page
    follow: false,
  },
};

export default function NewYearWishesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

