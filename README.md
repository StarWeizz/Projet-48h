# Challenge 48H

JS natif + API backend Express + MongoDB pour une plateforme de defis interactifs avec themes, enigmes et systeme de progression.

## Concept

Le projet consiste a proposer une application web dans laquelle les joueurs progressent a travers plusieurs univers. Chaque theme contient plusieurs defis avec une difficulte croissante. Lorsqu'un joueur complete tous les defis d'un theme, le theme suivant se debloque.

## Stack

- JS natif
- Node.js
- Express
- MongoDB
- Mongoose

## Fonctionnalites de la base repo

- API REST structuree par ressources
- Connexion MongoDB centralisee
- Gestion des themes
- Gestion des challenges
- Gestion des joueurs et du leaderboard
- Validation des reponses cote serveur
- Progression automatique entre themes
- Script de seed pour remplir une base de demo

## Arborescence

```text
.
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

2. Creer un fichier `.env` a la racine du projet ou reutiliser temporairement `src/.env`

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/Challenge_48h
```

3. Lancer l'API

```bash
npm run dev
```

4. Optionnel: injecter des donnees de demonstration

```bash
npm run seed
```

Attention: la seed reinitialise les collections `themes`, `challenges` et `Players`.

La collection joueur utilise explicitement `Players` pour correspondre a ta base locale actuelle.

## Scripts disponibles

- `npm run dev` : demarrage en mode watch
- `npm start` : demarrage simple
- `npm run seed` : insertion de donnees de demo
- `npm test` : verification syntaxique minimale

## Endpoints principaux

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

## Exemples de payloads

### Creer un theme

```json
{
  "name": "Temple des Logiques",
  "description": "Une serie d'enigmes basees sur l'observation.",
  "order": 1,
  "difficulty": "easy"
}
```

### Creer un challenge

```json
{
  "theme": "ID_DU_THEME",
  "title": "Les Trois Portes",
  "order": 1,
  "type": "logic",
  "difficulty": "easy",
  "statement": "Choisis la bonne porte.",
  "hint": "Observe les contradictions.",
  "expectedAnswer": "porte-2",
  "points": 100
}
```

### Creer un joueur

```json
{
  "username": "team-alpha"
}
```

### Valider un challenge

```json
{
  "challengeId": "ID_DU_CHALLENGE",
  "answer": "porte-2"
}
```

## Suite recommandee

- brancher un frontend React/Vue sur ces endpoints
- ajouter l'authentification si vous voulez des vraies sessions
- proteger les endpoints d'administration si la creation de contenu passe par l'API
- ajouter un systeme de tentatives, d'indices et de penalites de score
s

## Page de validation API

Une page de demonstration est disponible sur http://localhost:3000/demo.
Elle sert a verifier qu'un defi statique peut dialoguer avec l'API, creer ou retrouver un joueur, puis valider une reponse.

