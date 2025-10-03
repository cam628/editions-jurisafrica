# Guide de Configuration Formspree

## ✨ Avantages de Formspree

✅ **GRATUIT** - 50 soumissions/mois (amplement suffisant)
✅ **Supporte les pièces jointes** - Jusqu'à 10MB par fichier (vraiment gratuit cette fois!)
✅ **Interface simple** - Dashboard pour voir toutes les soumissions
✅ **Spam protection** - Inclus automatiquement
✅ **Auto-reply emails** - Confirmations automatiques possibles

---

## 🚀 Configuration (2 minutes)

### Étape 1: Créer un compte Formspree

1. Allez sur **[https://formspree.io](https://formspree.io)**
2. Cliquez sur **"Sign Up"** (en haut à droite)
3. Inscrivez-vous avec **jurisafrica@yahoo.fr** (ou n'importe quel email)
4. Confirmez votre email

### Étape 2: Créer le formulaire de Contact

1. Dans le dashboard Formspree, cliquez sur **"+ New Form"**
2. **Name**: "Contact Form"
3. **Email**: jurisafrica@yahoo.fr
4. Cliquez sur **"Create Form"**
5. **Copiez l'endpoint** qui apparaît (ressemble à: `https://formspree.io/f/xpwzgkqr`)

### Étape 3: Créer le formulaire de Soumission d'Article

1. Cliquez à nouveau sur **"+ New Form"**
2. **Name**: "Article Submission"
3. **Email**: jurisafrica@yahoo.fr
4. Cliquez sur **"Create Form"**
5. **Copiez cet endpoint aussi** (différent du premier)

### Étape 4: Configurer dans le code

1. Ouvrez le fichier **`src/lib/web3forms.ts`** (oui, le nom n'a pas changé mais c'est maintenant pour Formspree)
2. Remplacez les deux endpoints:

```typescript
// Contact form endpoint
export const FORMSPREE_CONTACT_ENDPOINT = 'https://formspree.io/f/xpwzgkqr';

// Article submission form endpoint
export const FORMSPREE_ARTICLE_ENDPOINT = 'https://formspree.io/f/xabcdefg';
```

3. **Sauvegardez** le fichier

---

## 🧪 Tester

### Test du formulaire de Contact:
1. Allez sur `/contact`
2. Remplissez le formulaire
3. Cliquez **Soumettre**
4. Vérifiez:
   - Email reçu à jurisafrica@yahoo.fr
   - Dans le dashboard Formspree: vous verrez la soumission

### Test du formulaire d'Article:
1. Allez sur `/penant` > onglet **"Soumettre un article"**
2. Remplissez le formulaire ET **ajoutez un fichier PDF/DOCX**
3. Cliquez **Soumettre l'article**
4. Vérifiez:
   - Email reçu avec le fichier en pièce jointe ✅
   - Dans le dashboard Formspree: vous verrez la soumission avec le fichier

---

## 📧 Format des emails reçus

### Email de Contact:
```
De: [Civilité] [Prénom] [Nom] via Formspree
À: jurisafrica@yahoo.fr
Sujet: Contact - [Objet] - [Prénom Nom]

civilite: [Civilité]
nom: [Nom]
prenom: [Prénom]
email: [Email]
objet: [Objet]
message: [Message complet]
```

### Email de Soumission d'Article:
```
De: [Civilité] [Prénom] [Nom] via Formspree
À: jurisafrica@yahoo.fr
Sujet: Soumission d'article - [Civilité Nom] - [Titre]
Pièce jointe: [fichier.pdf] ✅

civilite: [Civilité]
titre: [Titre de l'article]
nom: [Nom]
prenom: [Prénom]
email: [Email]
commentaire: [Commentaires]
conditions_acceptees: Oui
```

---

## ⚙️ Options Avancées (Optionnel)

### 1. Activer les emails de confirmation automatiques

Dans le dashboard Formspree:
1. Sélectionnez votre formulaire
2. Allez dans **Settings** > **Notifications**
3. Activez **"Auto-reply"**
4. Personnalisez le message de confirmation

### 2. Personnaliser le message de spam

Dans **Settings** > **Spam Protection**:
- Ajustez le niveau de protection anti-spam
- Ajoutez des mots-clés à bloquer

### 3. Recevoir des notifications Slack/Discord

Dans **Settings** > **Integrations**:
- Connectez Slack, Discord, ou d'autres services
- Recevez une notification instantanée pour chaque soumission

---

## 📊 Dashboard Formspree

Le dashboard vous permet de:
- ✅ Voir toutes les soumissions
- ✅ Télécharger les fichiers joints
- ✅ Exporter les données en CSV
- ✅ Voir les statistiques (taux de soumission, spam bloqué, etc.)

Accès: [https://formspree.io/forms](https://formspree.io/forms)

---

## 💡 Limites du Plan Gratuit

- **50 soumissions/mois** - Largement suffisant pour un site académique
- **10MB par fichier** - Parfait pour les articles PDF/DOCX
- **250MB de stockage total** - Pour toutes les pièces jointes
- **Spam protection basique** - Efficace pour la plupart des cas

**Si vous dépassez 50/mois**: Upgrade à 10$/mois pour 1000 soumissions

---

## ❓ Dépannage

### Les emails n'arrivent pas?
1. **Vérifiez les endpoints** dans `src/lib/web3forms.ts`
2. **Vérifiez les spams** dans jurisafrica@yahoo.fr
3. **Vérifiez la console** du navigateur pour les erreurs
4. **Vérifiez le dashboard Formspree** - si la soumission y apparaît, l'email devrait arriver

### Les fichiers sont trop gros?
- Limite: **10MB par fichier**
- Formats acceptés: Tous (PDF, DOCX, DOC, etc.)

### Erreur CORS?
- Normal lors du premier test - Formspree doit approuver votre domaine
- Testez d'abord en local, puis redéployez

---

## ✅ C'est prêt!

Votre site peut maintenant:
- ✅ Recevoir les messages de contact
- ✅ Recevoir les soumissions d'articles **avec pièces jointes PDF/DOCX**
- ✅ Tout gérer via le dashboard Formspree
- ✅ **50 soumissions/mois gratuites** (vraiment cette fois!)

**Total setup time: 2 minutes** ⏱️

---

## 🆘 Support

- Documentation: [https://help.formspree.io](https://help.formspree.io)
- Email support: support@formspree.io
- Status page: [https://status.formspree.io](https://status.formspree.io)

