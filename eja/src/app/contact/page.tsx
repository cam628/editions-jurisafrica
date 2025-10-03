'use client';

import { useState } from 'react';
import { FORMSPREE_CONTACT_ENDPOINT } from '@/lib/web3forms';

export default function Page() {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('_subject', `Contact - ${formData.objet} - ${formData.prenom} ${formData.nom}`);
      formDataToSend.append('civilite', formData.civilite || 'Non renseignée');
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('prenom', formData.prenom);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('objet', formData.objet);
      formDataToSend.append('message', formData.message);

      // Send to Formspree
      const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Formspree response:', response.status, data);

      if (response.ok) {
        setSubmitMessage('Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.');
        setFormData({
          civilite: '',
          nom: '',
          prenom: '',
          email: '',
          objet: '',
          message: ''
        });
      } else {
        const errorMsg = data.errors ? data.errors.map((e: any) => e.message).join(', ') : 'Erreur lors de l\'envoi';
        throw new Error(errorMsg);
      }

    } catch (error) {
      console.error('Formspree Error:', error);
      setSubmitMessage('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à jurisafrica@yahoo.fr');
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <main className="bg-slate-100 relative min-h-screen">
      <section className="container-6xl py-10 relative z-10">
        <div className="heading-small">
          <h1 className="sticky-h1 text-6xl font-extralight text-[#063f0e] select-none">
            Éditions JurisAfrica - CONTACT
          </h1>
          {/* Spacer to offset fixed h1 height */}
          <div className="h-6 md:h-8" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Formulaire de contact */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
            <h2 className="text-xl font-semibold text-[#063f0e] mb-6">Formulaire de contact</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Civilité</label>
                  <select
                    name="civilite"
                    value={formData.civilite}
                    onChange={handleInputChange}
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
                  <label className="block text-sm font-medium mb-2 text-gray-700">Prénom *</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nom *</label>
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
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
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Objet *</label>
                <select
                  name="objet"
                  value={formData.objet}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-slate-300 rounded px-3 py-2"
                >
                  <option value="">Sélectionner un objet</option>
                  <option value="Penant">Penant</option>
                  <option value="Revue Juridique et Politique">Revue Juridique et Politique</option>
                  <option value="Ouvrages">Ouvrages</option>
                  <option value="Autres">Autres</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full border border-slate-300 rounded px-3 py-2"
                  placeholder="Votre message..."
                />
              </div>
              
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
                {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
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

          {/* Actions rapides */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
              <h3 className="text-lg font-semibold text-[#063f0e] mb-4">Actions rapides</h3>
              <div className="space-y-4">
                <a 
                  href="/penant?tab=soumettre" 
                  className="block w-full bg-[#063f0e] text-white py-3 px-4 rounded font-medium hover:bg-[#052a08] transition-colors text-center"
                  style={{ color: 'white' }}
                >
                  Soumettre un article
                </a>
                
                <a 
                  href="/penant?tab=abonner" 
                  className="block w-full bg-[#063f0e] text-white py-3 px-4 rounded font-medium hover:bg-[#052a08] transition-colors text-center"
                  style={{ color: 'white' }}
                >
                  S'abonner au PENANT
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#063f0e]">
              <h3 className="text-lg font-semibold text-[#063f0e] mb-4">Coordonnées</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Directeur de publication :</strong> Alain FÉNÉON</p>
                <p><strong>Arbitre, Médiateur, Avocat honoraire</strong></p>
              </div>
            </div>
          </div>
      </div>
      </section>
    </main>
    );
  }
  