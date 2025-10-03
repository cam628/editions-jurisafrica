export default function Page() {
    return (
      <main className="bg-slate-100 relative min-h-screen">
        <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
            <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
              Éditions JurisAfrica - CONTRIBUTEURS
            </h1>
            {/* Spacer to offset fixed h1 height */}
            
          <div className="h-6 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
          FONDATEURS, AUTEURS ET DIRECTEUR DE PUBLICATION
          </h2>
        </div>

        {/* Contributeurs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* FONDATION */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h3 className="text-lg font-semibold text-[#063f0e] mb-4">FONDATION</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <p>Lorsque Delphin Penant fonda en 1891 le Recueil qui devait illustrer son nom, il s'assignait à une tâche dont l'utilité n'allait cessé de grandir : il s'agissait de faciliter la connaissance des textes relatifs aux pays d'Outre-Mer, de divulguer les décisions judiciaires rendues par les juridictions de ces pays et de donner un moyen d'expression aux juristes qu'attiraient l'étude de droit en formation.</p>
              
              <p>En 2016, le Penant est entré dans sa 126ème année, et près de 900 numéros ont été publiés. La Revue Juridique et Politique des États Francophones entrera pour sa part dans 70ème année.</p>
              
              <p>Aucune revue de Droit africain ne peut exciper d'une telle ancienneté et les étudiants, enseignants et praticiens trouveront dans ces ouvrages une documentation d'une richesse insoupçonnée.</p>
              
              <p><strong>Citons parmi eux de prestigieux ainés :</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Martin KIRSCH, Conseiller honoraire à la Cour de Cassation</li>
                <li>Professeur P-F GONIDEC</li>
                <li>Professeur F LUCHAIRE</li>
                <li>Professeur F TERRE</li>
                <li>Professeur G TIXIER</li>
                <li>Professeur J-M JEANNENEY</li>
                <li>Professeur P LAMPUE, qui présida le Comité de Direction pendant près de 30 ans</li>
              </ul>
            </div>
          </div>

          {/* AUTEURS */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h3 className="text-lg font-semibold text-[#063f0e] mb-4">AUTEURS</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <p>Les Editions Juris Africa tiennent à rendre hommage à ces auteurs qui consacrent une part de leur temps aux recherches et à la rédaction des articles que nous publions et notamment tous ceux qui ont contribué à la revue le PENANT en 2023 :</p>
              
              <div className="space-y-2">
                <p><strong>Contributeurs 2023 :</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>COSSI DOROTHE SOSSA</li>
                  <li>Malick OLUCHEGUN FALOLA</li>
                  <li>Nchankou NjJINDAM</li>
                  <li>Jean-Gaspard MBOUEME</li>
                  <li>Nadine Josiane BAKAM TITGOUM ep. DJEYA</li>
                  <li>Nicolas BINCTIN</li>
                  <li>Cédric Carol TSAFACK DJOUMESSI</li>
                  <li>Boubou BA</li>
                  <li>Julien C. HOUNKPE</li>
                  <li>Apollnaire GOUDOU</li>
                  <li>Diomansy I. SISSOKO</li>
                  <li>Souleymane TOE</li>
                  <li>Soline KETCHEUZEU NANA</li>
                  <li>Robert ASSONTSA</li>
                  <li>Franciscine Stella VOGA_TCHOKOTE</li>
                  <li>Pierre Charly NGUE BIKOI</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DIRECTEUR DE PUBLICATION */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h3 className="text-lg font-semibold text-[#063f0e] mb-4">DIRECTEUR DE PUBLICATION</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div className="text-center">
                <h4 className="font-semibold text-[#063f0e] text-lg mb-2">Alain FÉNÉON</h4>
                <p className="mb-3">Arbitre, Médiateur</p>
                <p className="mb-3">Avocat honoraire</p>
                <a 
                  href="https://fr.linkedin.com/in/alain-feneon/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#063f0e] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#052a08] transition-colors"
                  style={{ color: 'white' }}
                >
                  Profil LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>
    );
  }
  