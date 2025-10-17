import Image from 'next/image';

export default function Page() {
    return (
      <main className="bg-slate-100 relative min-h-screen">
        <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
            <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
              Éditions JurisAfrica - RJP
            </h1>
            {/* Spacer to offset fixed h1 height - increased for mobile */}
            
          <div className="h-20 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
          LA REVUE JURIDIQUE & POLITIQUE DES ETATS FRANCOPHONES
          </h2>
        </div>

        <div className="image-text">
          <Image
            src="/rjp.png"
            alt="Couverture de la RJP"
            width={400}
            height={300}
            className="rounded shadow"
            priority
          />
          <div className="text-content text-[#063f0e]">
            <p className="text-lg font-semibold text-[#063f0e] mb-4">Publication suspendue</p>
            <p>Créée en 1946 sous le titre : « Revue juridique & politique d'Outre-Mer », par les Professeurs G.H. CAMERLYNCK et René DE LACHARRIERE, cette prestigieuse revue a été dirigée pendant plus d'un demi-siècle par des Professeurs de Droit de la Faculté de Droit de Paris de haute renommée : L. JULLIOT DE LA MORANDIERE, Pierre LAMPUE, André DE LAUBADERE et Henry SOLUS.</p>
            
            <p>C'est donc dans la lignée d'une tradition ancienne que la Revue, aujourd'hui intitulée « Revue juridique & politique des états francophones » a l'avantage de publier les articles d'éminents professeurs, praticiens et autres spécialistes du Droit Public : Droit Constitutionnel, Droit Administratif et Droit International Public, mais aussi du Droit Public Economique : Droit Foncier, Droit des Investissements, Droit de la Santé etc…</p>
            
            <p>C'est ainsi qu'au cours des 20 dernières années, la Revue Juridique et Politique des Etats Francophones a publié plus de 400 articles relatifs à ces différentes matières, et ce y compris des numéros spéciaux consacrés par exemple au droit du travail en Afrique (n° 2 avril/juin 2019).</p>
            
            <p>La Revue juridique & politique des états francophones a compté parmi ses abonnés, depuis de nombreuses années, des institutions publiques (Ministères, Parlements, Collectivités locales, des Universités (près de 50 universités américaines !), des Centres de documentation, et naturellement des praticiens, Avocats, Notaires et Juristes d'entreprise).</p>
            
            <p><strong>Des numéros anciens sont disponible <a href="/contact" className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300">sur demande</a>.</strong></p>
          </div>
        </div>
        </section>
      </main>
    );
  }
  