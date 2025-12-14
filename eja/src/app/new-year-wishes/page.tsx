'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NewYearWishesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8" style={{ marginTop: '-80px', paddingTop: '100px' }}>
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 pt-2 md:pt-4 lg:pt-6">
          <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-3 md:gap-4 items-start">
            {/* French Text - Left (justified right, truncated) */}
            <div className="order-1 text-[#063f0e] flex flex-col justify-start items-end">
              <p className="text-xs md:text-sm leading-tight font-light italic text-right mb-0 pt-0 max-w-[150px]" style={{ marginTop: 0, paddingTop: 0 }}>
                Alors que l'année<br />
                touche à sa fin,<br />
                je vous remercie<br />
                pour la confiance,<br />
                les échanges et<br />
                les projets partagés<br />
                en 2025. Que l'année<br />
                à venir soit porteuse<br />
                de clarté, de continuité<br />
                et de nouvelles perspectives.
              </p>
              <p className="text-xs text-[#063f0e] font-normal mt-1 text-right">
                Bien cordialement,
              </p>
            </div>

            {/* Image - Center (bigger) */}
            <div className="order-2 flex flex-col items-center justify-start">
              <Link href="/" className="block cursor-pointer transition-opacity hover:opacity-95 mb-0">
                <Image
                  src="/best-wishes.png"
                  alt="Meilleurs vœux pour la nouvelle année - Éditions JurisAfrica"
                  width={1800}
                  height={1350}
                  className="w-full max-w-2xl h-auto rounded-lg shadow-md"
                  priority
                  unoptimized
                />
              </Link>
              <div className="text-center mt-2">
                <p className="text-lg md:text-xl text-[#063f0e] font-semibold tracking-wide">
                  ALAIN FÉNÉON
                </p>
              </div>
            </div>

            {/* English Text - Right (justified left, truncated) */}
            <div className="order-3 text-[#063f0e] flex flex-col justify-start items-start">
              <p className="text-xs md:text-sm leading-tight font-light italic text-left mb-0 pt-0 max-w-[150px]" style={{ marginTop: 0, paddingTop: 0 }}>
                As the year<br />
                draws to a close,<br />
                I would like to thank you<br />
                for the trust, exchanges,<br />
                and projects shared<br />
                throughout 2025.<br />
                May the year ahead<br />
                bring clarity, continuity,<br />
                and new perspectives.
              </p>
              <p className="text-xs text-[#063f0e] font-normal mt-1 text-left">
                Best wishes,
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

