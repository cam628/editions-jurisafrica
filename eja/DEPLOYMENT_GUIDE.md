# 🚀 Guide de Déploiement - Éditions JurisAfrica

## 🎯 Déploiement sur Vercel (Recommandé - Gratuit)

Vercel est parfait pour Next.js et offre un déploiement gratuit avec domaine personnalisé.

### Étape 1: Préparer le projet

1. **Vérifiez que tout fonctionne localement:**
   ```bash
   npm run dev
   ```
   - Allez sur `http://localhost:3000`
   - Testez toutes les pages et formulaires

2. **Testez le build de production:**
   ```bash
   npm run build
   npm run start
   ```

### Étape 2: Créer un compte Vercel

1. Allez sur **[https://vercel.com](https://vercel.com)**
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec **GitHub** (recommandé) ou email
4. Confirmez votre email

### Étape 3: Connecter GitHub (Recommandé)

1. **Créez un repository GitHub:**
   - Allez sur [github.com](https://github.com)
   - Cliquez sur **"New repository"**
   - Nom: `editions-jurisafrica` ou `eja-website`
   - **Public** (pour le plan gratuit Vercel)
   - Cliquez **"Create repository"**

2. **Uploadez votre code:**
   ```bash
   # Dans votre dossier du projet
   git init
   git add .
   git commit -m "Initial commit - Éditions JurisAfrica website"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/editions-jurisafrica.git
   git push -u origin main
   ```

### Étape 4: Déployer sur Vercel

1. **Connectez Vercel à GitHub:**
   - Dans Vercel, cliquez **"New Project"**
   - Sélectionnez votre repository `editions-jurisafrica`
   - Cliquez **"Import"**

2. **Configuration du déploiement:**
   - **Framework Preset**: Next.js (détecté automatiquement)
   - **Root Directory**: `./` (par défaut)
   - **Build Command**: `npm run build` (par défaut)
   - **Output Directory**: `.next` (par défaut)
   - Cliquez **"Deploy"**

3. **Attendez le déploiement** (2-3 minutes)

### Étape 5: Configurer le domaine personnalisé

1. **Dans Vercel Dashboard:**
   - Allez dans votre projet
   - Cliquez sur l'onglet **"Domains"**
   - Ajoutez votre domaine: `editionsjurisafrica.com`

2. **Configuration DNS:**
   - Chez votre registrar de domaine (GoDaddy, Namecheap, etc.)
   - Ajoutez ces enregistrements DNS:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **SSL automatique:**
   - Vercel configure automatiquement le certificat SSL
   - Votre site sera accessible en HTTPS

---

## 🔧 Configuration des Variables d'Environnement

### Variables à configurer dans Vercel:

1. **Dans Vercel Dashboard > Settings > Environment Variables:**

```
NEXT_PUBLIC_SITE_URL=https://editionsjurisafrica.com
```

2. **Formspree (déjà configuré):**
   - Vos endpoints Formspree sont déjà dans le code
   - Pas besoin de variables d'environnement

3. **Cloudinary (déjà configuré):**
   - Vos credentials sont déjà dans `src/lib/cloudinary.ts`
   - Pas besoin de variables d'environnement

---

## 🧪 Tester le Déploiement

### Checklist de test:

- [ ] **Page d'accueil** se charge correctement
- [ ] **Navigation** fonctionne sur toutes les pages
- [ ] **Formulaires** fonctionnent (Contact + Soumission d'article)
- [ ] **Upload de fichiers** fonctionne (Cloudinary)
- [ ] **Emails** sont reçus (Formspree)
- [ ] **Design responsive** sur mobile
- [ ] **SEO** (meta tags, sitemap)

### URLs de test:
- `https://editionsjurisafrica.com/`
- `https://editionsjurisafrica.com/penant`
- `https://editionsjurisafrica.com/contact`
- `https://editionsjurisafrica.com/sitemap.xml`

---

## 📊 Monitoring et Analytics

### Vercel Analytics (Gratuit):
1. Dans Vercel Dashboard > Analytics
2. Activez **Vercel Analytics**
3. Ajoutez le code dans `src/app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics (Optionnel):
1. Créez un compte [Google Analytics](https://analytics.google.com)
2. Obtenez votre **Measurement ID** (ex: `G-XXXXXXXXXX`)
3. Ajoutez dans `src/app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🔄 Mises à jour futures

### Pour mettre à jour le site:

1. **Modifiez votre code localement**
2. **Testez avec `npm run dev`**
3. **Commitez et poussez sur GitHub:**
   ```bash
   git add .
   git commit -m "Description des changements"
   git push
   ```
4. **Vercel déploie automatiquement** (2-3 minutes)

### Déploiements automatiques:
- ✅ **Push sur `main`** → Déploiement automatique
- ✅ **Pull Requests** → Preview automatique
- ✅ **Rollback** possible en 1 clic

---

## 💰 Coûts

### Vercel (Plan Gratuit):
- ✅ **Déploiements illimités**
- ✅ **100GB bandwidth/mois**
- ✅ **Domaine personnalisé**
- ✅ **SSL automatique**
- ✅ **CDN global**

### Limites du plan gratuit:
- **100GB bandwidth/mois** (largement suffisant)
- **Repositories publics uniquement** (ou 1 privé)

**Total coût: 0€/mois** 🎉

---

## 🆘 Dépannage

### Erreur de build:
```bash
# Vérifiez les erreurs dans Vercel Dashboard > Functions
# Ou testez localement:
npm run build
```

### Domaine ne fonctionne pas:
- Vérifiez les DNS (peut prendre 24-48h)
- Vérifiez que le domaine est bien configuré dans Vercel

### Formulaires ne fonctionnent pas:
- Vérifiez que Formspree est configuré pour le domaine de production
- Vérifiez les endpoints dans `src/lib/web3forms.ts`

### Images ne se chargent pas:
- Vérifiez que les images sont dans le dossier `public/`
- Vérifiez les chemins dans le code

---

## ✅ Checklist Final

- [ ] Code testé localement
- [ ] Repository GitHub créé
- [ ] Vercel connecté à GitHub
- [ ] Déploiement réussi
- [ ] Domaine configuré
- [ ] SSL activé
- [ ] Formulaires testés
- [ ] Analytics configuré (optionnel)

**Votre site Éditions JurisAfrica sera en ligne!** 🌟

---

## 📞 Support

- **Vercel**: [vercel.com/help](https://vercel.com/help)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub**: [docs.github.com](https://docs.github.com)

**Temps total de déploiement: 30-45 minutes** ⏱️
