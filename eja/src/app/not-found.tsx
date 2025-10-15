import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-slate-100 relative min-h-screen flex items-center justify-center">
      <div className="container-6xl py-10 relative z-10 text-center">
        <h1 className="text-6xl font-extralight text-[#063f0e] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#063f0e] mb-6">
          Page non trouvée
        </h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée. 
          Si vous êtes arrivé ici depuis un moteur de recherche, le lien est peut-être obsolète.
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-6">
            Nos pages principales :
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/"
              className="bg-[#063f0e] text-white py-2 px-6 rounded font-medium hover:bg-[#052a08] transition-colors"
              style={{ color: 'white' }}
            >
              Accueil
            </Link>
            
            <Link 
              href="/penant"
              className="bg-[#063f0e] text-white py-2 px-6 rounded font-medium hover:bg-[#052a08] transition-colors"
              style={{ color: 'white' }}
            >
              Le PENANT
            </Link>
            
            <Link 
              href="/rjp"
              className="bg-[#063f0e] text-white py-2 px-6 rounded font-medium hover:bg-[#052a08] transition-colors"
              style={{ color: 'white' }}
            >
              La RJP
            </Link>
            
            <Link 
              href="/ouvrages"
              className="bg-[#063f0e] text-white py-2 px-6 rounded font-medium hover:bg-[#052a08] transition-colors"
              style={{ color: 'white' }}
            >
              Ouvrages
            </Link>
            
            <Link 
              href="/contact"
              className="bg-[#063f0e] text-white py-2 px-6 rounded font-medium hover:bg-[#052a08] transition-colors"
              style={{ color: 'white' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

