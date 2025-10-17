'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { articlesData } from '@/content/articles';
import { PublicationStructuredData } from '../structured-data';
import { FORMSPREE_ARTICLE_ENDPOINT } from '@/lib/web3forms';
import { uploadToCloudinary } from '@/lib/cloudinary';

function PenantContent() {
  const searchParams = useSearchParams();
  const tabs = useMemo(() => [
    { id: 'dernier', label: 'Dernière parution' },
    { id: 'recherche', label: 'Rechercher un article' },
    { id: 'soumettre', label: 'Soumettre un article' },
    { id: 'abonner', label: "S'abonner" },
  ] as const, []);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('dernier');

  // Handle URL tab parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam as typeof tabs[number]['id']);
    }
  }, [searchParams, tabs]);
  
  // Set French validation messages
  useEffect(() => {
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required], input[type="checkbox"][required]');
    inputs.forEach((input) => {
      input.addEventListener('invalid', function(e) {
        const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (target.validity.valueMissing) {
          if (target.type === 'checkbox') {
            target.setCustomValidity('Veuillez cocher cette case.');
          } else if (target.type === 'file') {
            target.setCustomValidity('Veuillez sélectionner un fichier.');
          } else {
            target.setCustomValidity('Veuillez remplir ce champ.');
          }
        } else if (target.validity.typeMismatch && target.type === 'email') {
          target.setCustomValidity('Veuillez entrer une adresse email valide.');
        }
      });
      input.addEventListener('input', function(e) {
        const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        target.setCustomValidity('');
      });
      input.addEventListener('change', function(e) {
        const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        target.setCustomValidity('');
      });
    });
  }, [activeTab]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    civilite: '',
    titre: '',
    nom: '',
    prenom: '',
    email: '',
    commentaire: '',
    acceptConditions: false,
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  
  // Filter articles
  const filteredArticles = articlesData.articles.filter(article => {
    const matchesSearch = article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || article.annee.toString() === selectedYear;
    const matchesTheme = !selectedTheme || article.theme === selectedTheme;
    
    return matchesSearch && matchesYear && matchesTheme;
  });
  
  // Get unique years
  const years = [...new Set(articlesData.articles.map(article => article.annee))].sort((a, b) => b - a);
  
  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setUploadProgress('');
    
    try {
      let fileUrl = '';
      
      // Upload file to Cloudinary first if present
      if (formData.file) {
        setUploadProgress('Upload du fichier en cours...');
        fileUrl = await uploadToCloudinary(formData.file);
        setUploadProgress('Fichier uploadé avec succès! Envoi du formulaire...');
      }
      
      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('_subject', `Soumission d'article - ${formData.civilite} ${formData.nom} - ${formData.titre}`);
      formDataToSend.append('civilite', formData.civilite || 'Non renseignée');
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('prenom', formData.prenom);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('commentaire', formData.commentaire);
      formDataToSend.append('conditions_acceptees', 'Oui');
      
      // Add file URL if uploaded
      if (fileUrl) {
        formDataToSend.append('fichier_url', fileUrl);
        formDataToSend.append('nom_fichier', formData.file!.name);
      }

      // Send to Formspree
      const response = await fetch(FORMSPREE_ARTICLE_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Formspree response:', response.status, data);

      if (response.ok) {
        setUploadProgress('');
        setSubmitMessage('Votre article a été soumis avec succès ! Nous vous contacterons bientôt.');
        setFormData({
          civilite: '',
          titre: '',
          nom: '',
          prenom: '',
          email: '',
          commentaire: '',
          acceptConditions: false,
          file: null
        });
      } else {
        const errorMsg = data.errors ? data.errors.map((e: any) => e.message).join(', ') : 'Erreur lors de l\'envoi';
        throw new Error(errorMsg);
      }
      
    } catch (error) {
      console.error('Submission Error:', error);
      setUploadProgress('');
      setSubmitMessage('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à cfeneon@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
    <main className="bg-slate-100 relative min-h-screen">
      <PublicationStructuredData />
      <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
          <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
            Éditions JurisAfrica - PENANT
          </h1>
          {/* Spacer to offset fixed h1 height */}

          <div className="h-6 md:h-8" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold text-[#063f0e]">
            ÉDITÉ DEPUIS 1891, LE PENANT EST LA PLUS ANCIENNE REVUE JURIDIQUE DE DROIT EN AFRIQUE.
          </h2>
        </div>

        {/* Tabs container */}
        <div className='no-bg'>
          <div className="tab-container">
            <div className="tab-header">
              {tabs.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`tab-button ${activeTab === t.id ? 'active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {activeTab === 'dernier' && (
                <div className="text-[#063f0e] pt-6">
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-4">
                      <Image
                        src="/penant-928-2025-juillet-septembre_orig.jpg"
                        alt="Couverture du Penant"
                        width={400}
                        height={300}
                        className="rounded shadow"
                        priority
                      />
                      <Image
                        src="/penant-928-2025-juillet-septembre-sommaire_orig.jpg"
                        alt="Sommaire du Penant"
                        width={400}
                        height={300}
                        className="rounded shadow"
                        priority
                      />
                    </div>
                    <div className="text-content flex-1 space-y-4">
                       <p><strong>JUILLET-SEPTEMBRE 2025, Nº928</strong></p>
                       <p><strong>LA NÉGOCIATION ET LES CONVENTIONS MINIÈRES</strong></p>
                       <p>par Gaorang Wangkari WAIROU, Docteur/Ph.D en Droit Privé de l'Université de Maroua (Cameroun), Enseignant vacataire à l'Université de Garoua (Cameroun) . . . 5</p>
                       <p><strong>CONDITIONS DE RECEVABILITÉ DU RECOURS EN CASSATION DEVANT LA COUR COMMUNE DE JUSTICE ET D'ARBITRAGE À LA LUMIÈRE DE LA PRATIQUE JURISPRUDENTIELLE</strong></p>
                       <p>par Jules MASUKU AYIKABA, Docteur en droit et détenteur d'un LL.M. en droit des affaires de l'Université allemande Julius-Maximilians-Universität Würzburg, Chargé de cours à l'Université de Kikwit (RDC) . . . 29</p>
                       <p><strong>LA CONSULTATION ÉCRITE EN DROIT OHADA</strong></p>
                       <p>par Dr. Mariame ZERBO ép. HIEN, Maître-Assistante à l'UFR/SJP, Université Thomas SANKARA . . . 73</p>
                       <p><strong>LE PRINCIPE D'INDÉPENDANCE DE LA GARANTIE AUTONOME ET ORDRE PUBLIC EN DROIT OHADA</strong></p>
                       <p>par Malick Oluchegoun FALOLA, Docteur en Droit privé, Assistant à la Faculté de Droit et de Science politique, Université d'Abomey-Calavi (Bénin) . . . 105</p>
                       <p><strong>ERREMENTS DE LA COUR COMMUNE DE JUSTICE ET D'ARBITRAGE DE L'OHADA AUTOUR DE LA QUALIFICATION JURIDIQUE DES FIGURES D'ALLIAGE DU CAUTIONNEMENT ET DE L'HYPOTHEQUE</strong></p>
                       <p>par Thierry Noël KANCHOP, Maître de Conférences à la FSJP de l'Université de Yaoundé II (Cameroun) . . . 136</p>
                       <p><strong>LE PRIVILÈGE DE LA CONCILIATION DE L'ARTICLE 5-11 DE L'AUPPCAP</strong></p>
                       <p>par Christian Roméo ANOUKAHA SATEU, Dr/Ph.D. en Droit privé à l'Université de Paris I Panthéon Sorbonne, Assistant à la Faculté des Sciences Juridiques et Politiques de l'Université de Dschang . . . 153</p>
                       <p><strong>LE DROIT MUSULMAN DES AFFAIRES: OUTIL DE FINANCEMENT DES TPE/PME DANS LA ZONE OHADA?</strong></p>
                       <p>par Edouard-Robert AQUEREBURU, Avocat à la Cour, Docteur en Droit Privé et Sciences Criminelles, Conseil en Stratégies et Partenariats Publics Privés, Chargé d'Enseignement en Faculté de Droit . . . 175</p>
                       <p><strong>L'INTÉGRATION DE L'INTELLIGENCE ARTIFICIELLE DANS LA COMMANDE PUBLIQUE AU NIVEAU DES PAYS AFRICAINS: QUELS APPORTS?</strong></p>
                       <p>par Salma ESSARDI, Docteur en Droit public (Université Hassan II, Mohammedia), Maroc . . . 185</p>
                       <p className="lg:hidden mt-4">
                         <a 
                           href="/comite" 
                           className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"
                         >
                           Voir la liste complète du Comité
                         </a>
                       </p>
                  </div>
                      {/* Comité teaser (desktop) */}
                      <aside className="hidden lg:block w-80 shrink-0">
                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
                          <h4 className="text-base font-semibold mb-2">Comité scientifique</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>Pascal AGBOYIBOR</li>
                            <li>Martial ΑΚΑΚΡΟ</li>
                            <li>François ANOUKAHA</li>
                            <li>Taoufik AZZOUZI</li>
                            <li>Aziber DIDOT SAID ALGADI</li>
                            <li>Olivier FILLE-LAMBIE</li>
                          </ul>
                          <a 
                            href="/comite" 
                            className="inline-block mt-3 text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"
                          >
                            Voir la liste complète
                          </a>
                        </div>
                      </aside>
                </div>
              </div>
            )}

            {activeTab === 'recherche' && (
              <div className="text-[#063f0e]">
                <h3 className="text-lg font-semibold mb-4">Rechercher un article</h3>
                
                {/* Search filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Recherche textuelle</label>
                    <input 
                      type="text" 
                      placeholder="Titre, auteur, mot-clé..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border border-slate-300 rounded px-3 py-2" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Année</label>
                    <select 
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    >
                      <option value="">Toutes les années</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Thème</label>
                    <select 
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    >
                      <option value="">Tous les thèmes</option>
                      {articlesData.themes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Results */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                {/* Articles list */}
                <div className="space-y-4">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="pl-4 py-2 bg-slate-50 rounded">
                      <h4 className="font-semibold text-[#063f0e] mb-1">{article.titre}</h4>
                      <p className="text-sm text-gray-700 mb-1">par {article.auteur}</p>
                      <p className="text-xs text-gray-600">
                        PENANT {article.numero} ({article.annee}) - Pages {article.pages} - {article.theme}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'soumettre' && (
              <div className="text-[#063f0e]">
                <h3 className="text-lg font-semibold mb-4">Soumettre un article</h3>
                
                {/* Instructions */}
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-4">Conditions générales applicables aux articles soumis au Recueil PENANT :</h4>
                  <div className="text-sm text-gray-700 space-y-4">
                    <div>
                      <p className="mb-2"><strong>1.</strong> Le Recueil PENANT et la Revue Juridique des Etats Francophones sont des revues trimestrielles consacrées au droit africain des affaires. Elles sont diffusées auprès d'abonnés des cinq continents, constitués majoritairement par des Universités, des Centres de documentation, des Institutions publiques ainsi que des praticiens et des entreprises privées.</p>
                    </div>
                    
                    <div>
                      <p className="mb-2"><strong>2.</strong> Les articles doivent respecter les prescriptions suivantes :</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>comporter l'identification complète du ou des auteurs : nom, prénoms, titre ; ainsi que dans le courrier d'accompagnement, son adresse postale complète ;</li>
                        <li>être rédigé en langue française ;</li>
                        <li>un résumé d'un maximum de 300 mots en français et en anglais doit être ajouté en tête d'article, ainsi que 5 mots clefs en français et en anglais.</li>
                        <li>respecter les règles de forme suivante :
                          <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>20 à 35 pages ;</li>
                            <li>format du fichier : version éditable WORD ;</li>
                            <li>titre de l'article en minuscule, gras et sans encadré ;</li>
                            <li>texte principal : police Cambria, taille 12, interligne simple ;</li>
                            <li>note de bas de page : police Cambria, taille 10, interligne simple apparaissant en numérotation continue sur chaque bas de page de l'article et non à la fin du texte.</li>
                          </ul>
                        </li>
                      </ul>
                      <p className="mt-2 italic">Nous recommandons en outre, s'agissant de désigner le droit OHADA, d'utiliser le vocable « droit uniforme », et non « droit communautaire ».</p>
                    </div>
                    
                    <div>
                      <p className="mb-2"><strong>3.</strong> Tout auteur, en soumettant son article destiné à publication, déclare que :</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>son article est original, authentique et n'a pas fait l'objet d'une précédente publication, y compris par voie numérique.</li>
                        <li>toutes les informations qui sont contenues ont fait l'objet de vérification par ses propres soins.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="mb-2"><strong>4.</strong> L'auteur accepte que son article :</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>fasse l'objet d'une évaluation par le Comité Scientifique et le Comité de Rédaction de la revue. Il peut être accepté ou refusé pour publication sans que l'éditeur soit tenu de justifier de sa décision ;</li>
                        <li>s'agissant d'une publication à caractère universitaire et scientifique, l'auteur cède à titre exclusif et gratuit à l'éditeur les droits de reproduction en représentation de son article en vue de son édition au Recueil PENANT ou à la Revue Juridique et Politique ainsi que les droits nécessaires à l'exploitation par tout procédé, sous toutes formes et sur tous supports numériques, et ce, sans qu'il y ait lieu à rémunération.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p><strong>5.</strong> L'envoi de l'article aux Editions JurisAfrica vaut pour l'auteur acceptation des conditions ci-dessus.</p>
                    </div>
                  </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre de l'article *</label>
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2"
                      placeholder="Titre de votre article"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2"
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Civilité</label>
                      <select
                        name="civilite"
                        value={formData.civilite}
                        onChange={handleInputChange as any}
                        className="w-full border border-slate-300 rounded px-3 py-2"
                      >
                        <option value="">Sélectionner</option>
                        <option value="M.">M.</option>
                        <option value="Mme">Mme</option>
                        <option value="Me">Me</option>
                        <option value="Dr">Dr</option>
                        <option value="Pr">Pr</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom *</label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-300 rounded px-3 py-2"
                        placeholder="Votre prénom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-slate-300 rounded px-3 py-2"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Commentaires</label>
                    <textarea
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                      placeholder="Commentaires ou informations supplémentaires..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Joindre un fichier *</label>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileChange}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                    <p className="text-xs text-gray-600 mt-1">Formats acceptés : PDF, DOCX, DOC</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="acceptConditions"
                      checked={formData.acceptConditions}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                    <label className="text-sm text-gray-700">
                      J'ai lu et j'accepte les conditions générales pour soumettre un article *
                    </label>
                  </div>
                  
                  {uploadProgress && (
                    <div className="p-3 rounded text-sm bg-blue-100 text-blue-800 flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {uploadProgress}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#063f0e] text-white py-3 px-4 rounded font-medium hover:bg-[#052a08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ color: 'white' }}
                  >
                    {isSubmitting && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'article'}
                  </button>
                  
                  {submitMessage && (
                    <div className={`p-3 rounded text-sm ${
                      submitMessage.includes('succès') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === 'abonner' && (
              <div className="text-[#063f0e]">
                <h3 className="text-lg font-semibold mb-4">S'abonner</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      ABONNEMENT DISPONIBLE VIA 
                      <a 
                        href="https://boutique.lamy-liaisons.fr/produit/affaires/recueil-penant.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300 ml-1"
                      >
                        LAMY LIAISON
                      </a>
                    </h4>
                    <p className="mb-3">
                      Lamy Liaisons est dorénavant en charge de la distribution du PENANT.
                    </p>
                    <p className="mb-3">
                      Pour souscrire à un abonnement ou commander un ouvrage, accéder au 
                      <a 
                        href="https://boutique.lamy-liaisons.fr/produit/affaires/recueil-penant.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300 ml-1"
                      >
                        PORTAIL LAMY LIAISONS
                      </a> ou contacter 
                      <a 
                        href="mailto:CONTACT@LAMYLIAISONS.FR"
                        className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300 ml-1"
                      >
                        CONTACT@LAMYLIAISONS.FR
                      </a>
                    </p>
                    <p>
                      <a 
                        href="/contact" 
                        className="text-[#063f0e] border-b-2 border-transparent hover:border-[#063f0e] transition-all duration-300"
                      >
                        Contacter
                      </a> les éditions pour plus d'informations.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Tarifs d'abonnement</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>220€ HT/an</strong> - Abonnement annuel</li>
                      <li>• <strong>19€ HT/mois</strong> - Abonnement mensuel</li>
                      <li>• Abonnement en tacite reconduction, paiement unique annuel</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

   
    </section>
      </main >
    );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PenantContent />
    </Suspense>
  );
}
  