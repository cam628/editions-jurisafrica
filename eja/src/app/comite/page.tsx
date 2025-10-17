import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comité (éditorial & scientifique)',
  description: "Liste des membres du comité scientifique et du comité d'honneur du PENANT.",
  alternates: { canonical: '/comite' },
  openGraph: {
    title: 'Comité du PENANT – Éditions JurisAfrica',
    description: "Membres du comité scientifique et du comité d'honneur.",
    url: 'https://www.editionsjurisafrica.com/comite',
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Comité du PENANT – Éditions JurisAfrica',
    description: "Membres du comité scientifique et du comité d'honneur.",
    images: ['/logo.png'],
  },
};

export default function Page() {
  return (
    <main className="bg-slate-100 relative min-h-screen">
      <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
          <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
            Éditions JurisAfrica - COMITÉ
          </h1>
          <div className="h-6 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
            Comité scientifique et d'honneur
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Comité scientifique */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h3 className="text-lg font-semibold text-[#063f0e] mb-4">COMITÉ SCIENTIFIQUE</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <p className="font-semibold text-[#063f0e]">Pascal AGBOYIBOR</p>
                <p>Avocat au Barreau de Paris</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Martial ΑΚΑΚΡΟ</p>
                <p>Avocat au Barreau de Lomé</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">François ANOUKAHA</p>
                <p>Professeur agrégé des Facultés de droit, Doyen de l'Université de Dschang (Cameroun)</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Taoufik AZZOUZI</p>
                <p>Notaire à Rabat (Maroc)</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Aziber DIDOT SAID ALGADI</p>
                <p>Directeur de la recherche et de la documentation à TERSUMA</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Olivier FILLE-LAMBIE</p>
                <p>Avocat au Barreau de Paris</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Mouhamed KEBE</p>
                <p>Avocat au Barreau du Sénégal</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Boris MARTOR</p>
                <p>Avocat au Barreau de Paris</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Jean-Marie TCHAKOUA</p>
                <p>Professeur à l'Université de Yaoundé II</p>
              </div>
            </div>
          </div>

          {/* Comité d'honneur */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h3 className="text-lg font-semibold text-[#063f0e] mb-4">COMITÉ D'HONNEUR</h3>
            <div className="text-sm text-gray-700 space-y-4">
              <div>
                <p className="font-semibold text-[#063f0e]">Jean-François AKANDJI-KOMBE</p>
                <p>Professeur des Universités, Directeur du Master 2 Droits africains de la Sorbonne</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Jacques MESTRE</p>
                <p>Professeur de droit privé, Président de l'Association Française des Docteurs en Droit</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">H.D. MODI KOKO BEBEY</p>
                <p>Professeur agrégé, Doyen de l'Université de Dschang (Cameroun)</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Esther NGO MOUNTGUI IKOUE</p>
                <p>Présidente de la Cour Commune de Justice et d'Arbitrage (CCJA)</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Jean-Bernard PADARE</p>
                <p>Président du Conseil constitutionnel du Tchad</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Cossi. D. SOSSA</p>
                <p>Président de la Cour constitutionnelle du Bénin, ancien Secrétaire Permanent de l'OHADA</p>
              </div>
              <div>
                <p className="font-semibold text-[#063f0e]">Abbe YAO</p>
                <p>Ancien Bâtonnier de Côte d'Ivoire</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
