'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NewYearWishesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4" style={{ marginTop: '-80px', paddingTop: '100px' }}>
      <div className="max-w-4xl w-full">
        <Link href="/" className="block cursor-pointer transition-opacity hover:opacity-95">
          <Image
            src="/best-wishes.png"
            alt="Meilleurs vœux pour la nouvelle année - Éditions JurisAfrica"
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-xl"
            priority
            unoptimized
          />
        </Link>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Cliquez sur l'image pour visiter le site
          </p>
        </div>
      </div>
    </div>
  );
}

