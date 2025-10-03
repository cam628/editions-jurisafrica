# Guide de Configuration Cloudinary + Formspree

## 🎯 Solution Hybride Gratuite

Cette solution combine:
- **Cloudinary** (gratuit) - Pour stocker les fichiers PDF/DOCX
- **Formspree** (gratuit) - Pour envoyer les emails avec le lien vers le fichier

**Avantages:**
- ✅ Complètement GRATUIT
- ✅ 25GB de stockage Cloudinary
- ✅ Uploads illimités
- ✅ Les fichiers sont accessibles via URL directe

---

## 🚀 Configuration Cloudinary (3 minutes)

### Étape 1: Créer un compte Cloudinary

1. Allez sur **[https://cloudinary.com](https://cloudinary.com)**
2. Cliquez sur **"Sign Up for Free"**
3. Inscrivez-vous avec `cfeneon@gmail.com` (ou n'importe quel email)
4. Confirmez votre email

### Étape 2: Obtenir votre Cloud Name

1. Une fois connecté, allez sur le **Dashboard**
2. En haut, vous verrez: **Cloud name: xxxxx**
3. **Copiez ce nom** (exemple: `jurisafrica` ou `dxxx123`)

### Étape 3: Créer un Upload Preset

1. Dans le menu de gauche, allez dans **Settings** (⚙️)
2. Cliquez sur l'onglet **"Upload"**
3. Scrollez jusqu'à **"Upload presets"**
4. Cliquez sur **"Add upload preset"**
5. Configurez:
   - **Preset name**: `article_submissions` (ou n'importe quel nom)
   - **Signing Mode**: Sélectionnez **"Unsigned"** ⚠️ IMPORTANT
   - **Folder**: `articles` (optionnel - pour organiser)
   - **Allowed formats**: Ajoutez `pdf,doc,docx`
6. Cliquez sur **"Save"**
7. **Copiez le nom de votre preset**

### Étape 4: Configurer dans le code

1. Ouvrez le fichier **`src/lib/cloudinary.ts`**
2. Remplacez les valeurs:

```typescript
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'jurisafrica',              // Votre Cloud Name de l'étape 2
  UPLOAD_PRESET: 'article_submissions',   // Votre Upload Preset de l'étape 3
  UPLOAD_URL: 'https://api.cloudinary.com/v1_1'  // Ne pas changer
};
```

3. **Sauvegardez** le fichier

---

## 🧪 Tester

1. Allez sur `/penant` > onglet **"Soumettre un article"**
2. Remplissez le formulaire
3. **Ajoutez un fichier PDF ou DOCX**
4. Cliquez sur **"Soumettre l'article"**

**Ce qui va se passer:**
1. Message bleu: "Upload du fichier en cours..."
2. Le fichier est uploadé sur Cloudinary
3. Message bleu: "Fichier uploadé avec succès! Envoi du formulaire..."
4. Le formulaire est envoyé via Formspree
5. Message vert: "Votre article a été soumis avec succès!"

**Vous recevrez un email avec:**
- Toutes les infos de l'auteur
- **fichier_url**: Un lien direct vers le PDF uploadé sur Cloudinary
- **nom_fichier**: Le nom du fichier original

---

## 📧 Format de l'Email Reçu

```
De: [Civilité] [Prénom] [Nom] via Formspree
À: cfeneon@gmail.com
Sujet: Soumission d'article - [Civilité Nom] - [Titre]

civilite: Dr
titre: Les impacts du droit OHADA
nom: Dupont
prenom: Jean
email: jean.dupont@example.com
commentaire: Article en pièce jointe
conditions_acceptees: Oui
fichier_url: https://res.cloudinary.com/jurisafrica/raw/upload/v1234567890/articles/article.pdf
nom_fichier: mon_article.pdf
```

**Pour télécharger le fichier:** Cliquez simplement sur le lien `fichier_url` dans l'email!

---

## 🔧 Options Avancées (Optionnel)

### Limite de taille des fichiers

Par défaut, Cloudinary accepte jusqu'à **100MB** par fichier. Pour limiter:

1. Dans Cloudinary Settings > Upload
2. Votre upload preset > **Max File Size**
3. Définissez (exemple: 10MB pour éviter les fichiers trop gros)

### Organiser les fichiers par date

Dans `src/lib/cloudinary.ts`, modifiez la fonction:

```typescript
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
  
  // Ajouter un dossier avec la date
  const today = new Date().toISOString().split('T')[0]; // 2025-10-01
  formData.append('folder', `articles/${today}`);
  
  // ... reste du code
}
```

### Sécuriser les uploads (Signed)

Pour éviter les uploads non autorisés:

1. Changez votre preset en **"Signed"** au lieu de "Unsigned"
2. Cela nécessite une clé API côté serveur
3. Plus complexe mais plus sécurisé

---

## 📊 Gérer les Fichiers Uploadés

### Dashboard Cloudinary

1. Allez dans **Media Library** dans le menu de gauche
2. Vous verrez tous les fichiers uploadés
3. Vous pouvez:
   - ✅ Télécharger les fichiers
   - ✅ Supprimer les anciens fichiers
   - ✅ Voir les statistiques d'usage

### Limites du Plan Gratuit

- **25GB de stockage** - Largement suffisant pour des PDFs
- **25 crédits/mois** - Uploads illimités
- **Bande passante**: 25GB/mois de téléchargements

**Si vous dépassez:** Upgrade à 89$/an (très rare pour votre usage)

---

## ❓ Dépannage

### Erreur "Upload preset not found"
- Vérifiez que l'upload preset est bien créé
- Vérifiez qu'il est en mode **"Unsigned"**
- Vérifiez l'orthographe du nom dans le code

### Erreur "Invalid file type"
- Ajoutez `pdf,doc,docx` dans les formats autorisés du preset
- Ou enlevez la restriction de format

### Les fichiers n'apparaissent pas dans Media Library
- Vérifiez le dossier (peut-être dans `articles/`)
- Attendez quelques secondes, rafraîchissez

### L'email ne contient pas le lien
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que Formspree reçoit bien le champ `fichier_url`

---

## ✅ C'est prêt!

Votre site peut maintenant:
- ✅ Recevoir les soumissions d'articles avec fichiers PDF/DOCX
- ✅ Stocker les fichiers sur Cloudinary (25GB gratuit)
- ✅ Envoyer les emails avec lien direct vers le fichier
- ✅ **100% GRATUIT** pour votre usage

**Total setup time: 3 minutes** ⏱️

---

## 🆘 Support

- **Cloudinary**: [https://support.cloudinary.com](https://support.cloudinary.com)
- **Formspree**: support@formspree.io
- **Documentation Cloudinary**: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)

