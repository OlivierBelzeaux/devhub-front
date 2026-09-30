# Snippet Library — frontend

Interface Angular de **DevHub**, une application personnelle pour rechercher, consulter et organiser des snippets de code et des configurations.

Le frontend consomme l’API Spring Boot du projet DevHub. La démo publique ne requiert pas de connexion et permet de tester le parcours complet de consultation.

## Fonctionnalités actuelles

- Démo publique avec recherche, filtres par langage et tag, pagination, détail, copie du code et page À propos.
- Connexion JWT, routes protégées, session et déconnexion.
- Espace personnel : création, consultation, modification et suppression confirmée des snippets.
- Tags suggérés dans le formulaire pour réutiliser les libellés existants.
- Thème clair ou sombre conservé pendant la session du navigateur.
- Interface construite avec Angular, PrimeNG et SCSS.

## Prérequis

- Node.js 22 et npm.
- L’API DevHub disponible sur `http://localhost:8080`.

## Démarrage local

```bash
npm ci
npm start
```

Ouvrir ensuite `http://localhost:4200`.

L’application appelle l’API à l’adresse `http://localhost:8080/api`.

Pour activer le bouton Contact hors Docker, créer `public/runtime-config.js` avec l’adresse publique de contact :

```js
window.__DEVHUB_RUNTIME_CONFIGURATION__ = { contactEmail: 'you@example.com' };
```

## Déploiement gratuit sur Cloudflare Pages

Créer un projet Pages relié au dépôt GitHub, puis définir :

| Paramètre | Valeur |
| --- | --- |
| Branche de production | `main` |
| Commande de build | `npm run build:cloudflare` |
| Répertoire de sortie | `dist/devhub-front/browser` |
| Version Node.js | `22` |

Ajouter les variables d’environnement de build suivantes dans Cloudflare Pages :

```text
API_BASE_URL=https://<service-render>.onrender.com/api
CONTACT_EMAIL=<adresse-publique-de-contact>
PRIMEUI_LICENSE_KEY=<clé-PrimeNG-si-nécessaire>
```

Reporter ensuite l’URL Pages finale dans `CORS_ALLOWED_ORIGINS` de l’API Render. Le script `build:cloudflare` génère `runtime-config.js` au build ; aucune URL d’API n’est figée dans le code source.

## Démarrage avec Docker

Le dépôt parent fournit un fichier Compose qui lance PostgreSQL, l’API et ce frontend :

```bash
docker compose up -d --build
```

La variable `PRIMEUI_LICENSE_KEY` doit être définie dans le fichier `.env` du dépôt parent. Elle est injectée au démarrage du conteneur dans un fichier de configuration ignoré par Git.

## Commandes utiles

```bash
npm run build
npm test
```

## Organisation du code

```text
src/app/
├── core/                 # Configuration API, authentification et thème
├── features/auth/        # Connexion
├── features/demo/
│   ├── data-access/      # Client HTTP de la démo
│   ├── pages/            # Pages routées
│   └── ui/               # Composants de présentation réutilisables
├── features/snippets/    # Espace personnel et CRUD des snippets
├── shared/ui/            # États de chargement et d'erreur réutilisables
└── app.*                 # Shell, navigation et routes
```

Chaque composant possède ses fichiers TypeScript, HTML et SCSS dans son propre dossier.
Tous les composants utilisent `ChangeDetectionStrategy.OnPush`. L’application s’appuie sur les signals, les inputs signal et les formulaires réactifs pour mettre à jour l’interface de manière ciblée.
