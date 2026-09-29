# Snippet Library — frontend

Interface Angular de **DevHub**, une application personnelle pour rechercher, consulter et organiser des snippets de code et des configurations.

Le frontend consomme l’API Spring Boot du projet DevHub. La démo publique ne requiert pas de connexion et permet de tester le parcours complet de consultation.

## Fonctionnalités actuelles

- Démo publique avec recherche, filtres par langage et tag, et pagination.
- URL synchronisée avec les filtres de recherche.
- Consultation détaillée d’un snippet et copie du code dans le presse-papiers.
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
├── core/                 # Configuration API et thème
├── features/demo/
│   ├── data-access/      # Client HTTP de la démo
│   ├── pages/            # Pages routées
│   └── ui/               # Composants de présentation réutilisables
└── app.*                 # Shell, navigation et routes
```

Chaque composant possède ses fichiers TypeScript, HTML et SCSS dans son propre dossier.
