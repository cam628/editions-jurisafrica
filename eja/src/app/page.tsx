import Image from 'next/image';
import news from '@/content/news.json';

export default function Page() {
  return (
    <main className="bg-slate-100 relative min-h-screen">
      <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
          <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
            Éditions JurisAfrica
          </h1>
          {/* Spacer to offset fixed h1 height (reduced) */}
          <div className="h-6 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
            ÉDITION DE REVUES JURIDIQUES ET D'OUVRAGES SPÉCIALISÉS EN DROIT AFRICAIN
          </h2>
        </div>

      <div className="bg-white py-10 mt-6 rounded-md">

        <h3
          className="
    italic text-lg md:text-xl
    mx-auto 
    bg-white text-[#063f0e]
               /* padding inside the white band */
    rounded-md          /* optional rounded corners */
    max-w-4xl           /* controls the total width of the white band */
  "
          style={{ fontWeight: 300 }}
        >
          Les Éditions Juris Africa publient exclusivement du contenu relatif au
          droit africain et plus particulièrement au droit, régulations et
          législations de <strong>l'espace OHADA</strong>.
          <br />
          À travers la revue trimestrielle <a href="/penant" className="border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"><strong>LE PENANT</strong></a> et de
          nombreux <a href="/ouvrages" className="border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"><strong>ouvrages</strong></a>, les Éditions cultivent et transmettent un socle
          d'informations destiné aux professionnels et étudiants en
          droit africain.
        </h3> </div>

      {/* Updates section (news + social) */}
      <div className='no-bg'>
        <div className="news-grid">
          {Array.isArray(news) && news.slice(0, 3).map((item: any, idx: number) => {
            const imageSrc = typeof item.image === 'string'
              ? (item.image.startsWith('http') ? item.image : (item.image.startsWith('/') ? item.image : `/${item.image}`))
              : undefined;
            const imagesArray: string[] | undefined = Array.isArray((item as any).images)
              ? (item as any).images
              : undefined;
            const hasVisual = Boolean(item.embed) || Boolean(imageSrc) || (Array.isArray(imagesArray) && imagesArray.length > 0);
            return (
            <div key={item.id} className="news-item">
              {item.embed ? (
                <div className="w-full mb-3 bg-white rounded">
                  <iframe
                    src={item.embed}
                    title="Post intégré LinkedIn"
                    className="w-full rounded"
                    height={260}
                    frameBorder={0}
                    allowFullScreen
                  />
                </div>
              ) : (
                imagesArray && imagesArray.length >= 2 ? (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {imagesArray.slice(0, 2).map((img, i) => {
                      const src = img.startsWith('http') ? img : (img.startsWith('/') ? img : `/${img}`);
                      return (
                        <Image
                          key={`${item.id}-img-${i}`}
                          src={src}
                          alt={`${item.title} ${i + 1}`}
                          width={340}
                          height={180}
                          className="news-image"
                        />
                      );
                    })}
                  </div>
                ) : (
                  imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={item.title}
                      width={700}
                      height={400}
                      className="news-image"
                    />
                  )
                )
              )}
              <h4>
                {item.link ? (
                  <a href={item.link} target={item.link?.startsWith('http') ? '_blank' : undefined} rel={item.link?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h4>
              {!hasVisual && item.excerpt && <p>{item.excerpt}</p>}
              {/* Link is embedded in the title; no separate CTA link */}
            </div>
          );})}
        </div>
      </div>

      


      
      <div className="image-text">
        <Image
          src="/ohada_orig.png"
          alt="Couverture du Penant"
          width={400}
          height={300}
          className="rounded shadow"
          priority
        />
        <div className="text-content text-[#063f0e]">
          <p>Depuis les années 1990, l'idée se développe selon laquelle le Droit peut
            fonctionner comme un vecteur de développement et inspirer en retour les
            politiques menées par les bailleurs de fond internationaux et les gouvernements.</p>
          <p>En Afrique, la signature du Traité de l'OHADA et la publication des Actes Uniformes
            correspond bien à cette vision : assurer le respect des fondamentaux juridiques permettant
            d'améliorer le climat des affaires, aider et formaliser le développement du secteur privé
            et attirer davantage d'investissements étrangers. Cette ouverture de l'économie de marché et
            l'implication constante des opérateurs économiques africains dans le commerce international
            exige que les universitaires, praticiens et entreprises exerçant leur activité en Afrique
            puissent disposer d'une documentation juridique complète, tant en Droit privé qu'en Droit
            public, reposant sur des références doctrinales pertinentes et justifiées.</p>
          <p>Seuls, le <strong>PENANT</strong> pour le droit des affaires et <strong>la Revue Juridique 
            et Politique</strong> pour le droit public sont en mesure de vous apporter cette connaissance à partir
            des travaux des meilleurs universitaires et spécialistes du Droit africain.
          </p>
        </div>
      </div>

      <div className="image-text">
        
        <div className="text-content text-[#063f0e]">
          <p><strong>MISSION</strong></p>
          <p>
            ​Juris Africa est le seul éditeur qui publie des revues juridiques et des ouvrages
             exclusivement consacrés au Droit africain. </p>
             <p>Aucune revue de Droit africain ne peut exciper d’une telle notoriété.
               Les étudiants, enseignants et praticiens trouvent dans ces ouvrages une
                documentation d’une richesse inégalée et ce grâce aux auteurs qui par
                 leurs recherches et leurs articles contribuent à ces publications.
          </p>
        </div>
        <Image
          src="/mention-societe-internationale-de-droit-sid.png"
          alt="Mention SID"
          width={400}
          height={300}
          className="rounded shadow"
          priority
        />
      </div>
      <p className="mt-4 text-lg text-gray-700">
      </p>
    </section>
    </main >
  );
}
