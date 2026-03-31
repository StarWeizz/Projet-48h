# Challenge 48H

Application web de defis en JS natif avec backend Express et MongoDB pour gerer les joueurs, la progression et le classement.

## Concept

Le projet propose plusieurs themes de mini-defis. Les pages d'accueil et de themes sont servies comme pages statiques, tandis que l'API permet de gerer les joueurs, les scores, la validation de reponses et la progression.

## Stack

- HTML / CSS / JavaScript natif
- Node.js
- Express
- MongoDB
- Mongoose

## Structure du projet

```text
.
|-- public
|   |-- assets
|   |-- css
|   |-- images
|   |-- Thèmes
|   |-- index.html
|   |-- logic.html
|   |-- memoire.html
|   `-- decryptage.html
|-- src
|   |-- config
|   |-- controllers
|   |-- middlewares
|   |-- models
|   |-- routes
|   |-- scripts
|   |-- utils
|   |-- app.js
|   `-- server.js
|-- .env.example
|-- package.json
`-- README.md
```

## Installation

1. Installer les dependances

```bash
npm install
```

2. Creer un fichier `.env` a la racine du projet

```env
PORT=3000
MONGO_URI=mongodb+srv://quiz_admin:XuKYk13ZIvCB0LoO@cluster0.w2ubvxy.mongodb.net/
```

4. Demarrer le projet

```bash
npm run dev
```

## Scripts disponibles

- `npm run dev` : demarrage en mode watch
- `npm start` : demarrage simple
- `npm run seed` : insertion de donnees de demo
- `npm test` : verification syntaxique minimale

## Base de donnees

- Base mongo hébergée : `Challenge_48h`
- Collection joueur : `Players`
- La seed reinitialise `themes`, `challenges` et `Players`

## Routes front

### Pages principales

- `/` : page d'accueil
- `/themes/logique` : page du theme logique
- `/themes/memoire` : page du theme memoire
- `/themes/decryptage` : page du theme decryptage
- `/admin` : page de demonstration / administration API

### Defis statiques

Les defis sont servis depuis `public/Thèmes` via le prefixe `/challenges`.

Exemples :

- `/challenges/logique/shapes-challenge/shapes.html`
- `/challenges/logique/logic-challenge/logic.html`
- `/challenges/logique/charade-challenge/charade.html`
- `/challenges/Memoire/number.html`
- `/challenges/memory/image-memory/retenirimage.html`
- `/challenges/memory/image-info/imageinfo.html`
- `/challenges/Decryptage/cesar/cesar.html`
- `/challenges/Decryptage/morse/morse.html`
- `/challenges/Decryptage/chimie/chimie.html`

### Aliases utilises par les pages theme

- `/jeu1.html` -> shapes challenge
- `/jeu2.html` -> logic challenge
- `/jeu3.html` -> charade challenge
- `/jeu_memoire1.html` -> suite numerique
- `/jeu_memoire2.html` -> image a retenir
- `/jeu_memoire3.html` -> trouve l'intrus
- `/jeu_decryptage1.html` -> cesar
- `/jeu_decryptage2.html` -> morse
- `/jeu_decryptage3.html` -> chimie

## API

### Themes

- `GET /api/themes`
- `POST /api/themes`
- `GET /api/themes/:slug/challenges`

### Challenges

- `GET /api/challenges`
- `GET /api/challenges/:id`
- `POST /api/challenges`

### Players

- `GET /api/players`
- `GET /api/players/leaderboard`
- `POST /api/players`
- `GET /api/players/:id`
- `PATCH /api/players/:id`
- `POST /api/players/:id/complete-challenge`

## Exemple de payload de validation

```json
{
  "challengeId": "ID_DU_CHALLENGE",
  "answer": "porte-2"
}
```

## Notes ==

- Les pages d'accueil et de themes doivent vivre dans `public/` si elles utilisent `assets/` et `images/` en relatif.
- Les defis individuels restent dans `public/Thèmes/<theme>/<defi>/`.
- Pour ajouter un nouveau defi, il suffit de placer son HTML/CSS/JS dans le bon dossier et de le lier depuis la page du theme correspondant.
