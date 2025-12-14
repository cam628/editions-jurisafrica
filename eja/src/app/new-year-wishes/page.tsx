'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NewYearWishesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8" style={{ marginTop: '-80px', paddingTop: '100px' }}>
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* French Text - Left */}
            <div className="order-1 space-y-4 text-[#063f0e]">
              <p className="text-base md:text-lg leading-relaxed font-light italic">
                Alors que l'année touche à sa fin, je vous remercie pour la confiance, les échanges et les projets partagés en 2025. Que l'année à venir soit porteuse de clarté, de continuité et de nouvelles perspectives.
              </p>
              
              <div className="pt-4 border-t border-[#063f0e]/20">
                <p className="text-sm md:text-base text-[#063f0e] font-normal">
                  Bien cordialement,
                </p>
                <p className="text-lg md:text-xl text-[#063f0e] font-semibold mt-2 tracking-wide">
                  ALAIN FÉNÉON
                </p>
              </div>
            </div>

            {/* Image - Center (smaller) */}
            <div className="order-2 flex justify-center">
              <Link href="/" className="block cursor-pointer transition-opacity hover:opacity-95">
                <Image
                  src="/best-wishes.png"
                  alt="Meilleurs vœux pour la nouvelle année - Éditions JurisAfrica"
                  width={800}
                  height={600}
                  className="w-full max-w-sm h-auto rounded-lg shadow-md"
                  priority
                  unoptimized
                />
              </Link>
            </div>

            {/* English Text - Right */}
            <div className="order-3 space-y-4 text-[#063f0e]">
              <p className="text-base md:text-lg leading-relaxed font-light italic">
                As the year draws to a close,<br />
                I would like to thank you for the trust, exchanges, and projects shared throughout 2025.<br />
                May the year ahead bring clarity, continuity, and new perspectives.
              </p>
              
              <div className="pt-4 border-t border-[#063f0e]/20">
                <p className="text-sm md:text-base text-[#063f0e] font-normal">
                  Kind regards,
                </p>
                <p className="text-lg md:text-xl text-[#063f0e] font-semibold mt-2 tracking-wide">
                  ALAIN FÉNÉON
                </p>
              </div>
            </div>
          </div>

          {/* Link to site */}
          <div className="text-center mt-8 pt-6 border-t border-[#063f0e]/10">
            <Link 
              href="/" 
              className="inline-block text-sm text-[#063f0e] hover:underline transition-all"
            >
              Visiter le site →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

