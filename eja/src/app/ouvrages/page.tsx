import Image from 'next/image';
import ouvrages from '@/content/ouvrages.json';

export default function Page() {
    return (
      <main className="bg-slate-100 relative min-h-screen">
        <section className="container-6xl py-10 relative z-10">
          <div className="heading-small">
            <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
              Éditions JurisAfrica - OUVRAGES
            </h1>
            {/* Spacer to offset fixed h1 height - increased for mobile */}
            <div className="h-20 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
          DE LA COLLECTION DROITS AFRICAINS PUBLIÉE EN CO-ÉDITION EJA / LGDJ
          </h2>
        </div>

        {/* Ouvrages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {Array.isArray(ouvrages) && ouvrages.map((ouvrage: any) => (
            <div key={ouvrage.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
              <div className="flex gap-4">
                {ouvrage.image && (
                  <div className="flex-shrink-0">
                    <Image
                      src={`/${ouvrage.image}`}
                      alt={ouvrage.title}
                      width={120}
                      height={160}
                      className="rounded shadow object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#063f0e] mb-2">
                    {ouvrage.purchaseLink ? (
                      <a 
                        href={ouvrage.purchaseLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"
                      >
                        {ouvrage.title}
                      </a>
                    ) : (
                      ouvrage.title
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Auteur(s) :</strong> {ouvrage.authors}
                    {ouvrage.year && <span> ({ouvrage.year})</span>}
                  </p>
                  {ouvrage.resume && (
                    <p className="text-sm text-gray-700 mb-3">{ouvrage.resume}</p>
                  )}
                  {ouvrage.description && (
                    <p className="text-sm text-gray-600 mb-3">{ouvrage.description}</p>
                  )}
                  {ouvrage.purchaseLink && (
                    <a 
                      href={ouvrage.purchaseLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-[#063f0e] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#052a08] transition-colors"
                      style={{ color: 'white' }}
                    >
                      Acheter
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </main>
    );
  }
  