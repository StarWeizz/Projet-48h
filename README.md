# Challenge 48H

Application web de défis interactifs développée en **48 heures**, entièrement en JavaScript natif côté client et Node.js/Express côté serveur, avec MongoDB pour la persistance des données.

## Concept

Le projet propose trois thèmes de mini-défis progressifs : **Logique**, **Mémoire** et **Décryptage**. Chaque thème contient trois défis de difficulté croissante. La progression est verrouillée : compléter tous les défis d'un thème débloque le suivant. Un système de score et un classement global permettent de comparer les performances entre joueurs.

---

## Stack technique

| Couche | Techno |
|---|---|
| Frontend | HTML5 / CSS3 / JavaScript vanilla |
| Backend | Node.js + Express 5 |
| Base de données | MongoDB Atlas (cloud) |
| ODM | Mongoose 9 |
| Utilitaires | CORS, dotenv |

Aucun framework frontend (pas de React, Vue, etc.) — tout est géré en DOM natif avec des fetch vers l'API REST.

---

## Thèmes et défis

### Logique
Entraîne la rigueur et le raisonnement analytique.

| Défi | Description |
|---|---|
| Combien de signes ? | Compter des formes géométriques cachées dans une image |
| Aide le fermier | Problème d'algèbre simple (systèmes d'équations animaux/pattes) avec niveaux progressifs |
| Charade | Résoudre une charade en plusieurs parties, chaque ligne étant un indice |

### Mémoire
Teste la capacité à retenir et restituer de l'information.

| Défi | Description |
|---|---|
| Suite numérique | Mémoriser et reproduire une séquence de chiffres |
| Image à retenir | Retenir une image et répondre à des questions dessus |
| Trouve l'intrus | Identifier l'élément qui ne correspond pas parmi un ensemble d'images |

### Décryptage
Met à l'épreuve la logique et la culture des codes et chiffres.

| Défi | Description |
|---|---|
| César | Déchiffrer un message encodé par décalage alphabétique |
| Morse | Traduire un message en code Morse |
| Chimie | Décoder un message à partir de symboles et numéros atomiques |

---

## Architecture

```text
.
├── public/
│   ├── assets/              # Libs JS tierces (jQuery, etc.)
│   ├── css/
│   │   └── global.css       # Navbar et styles partagés
│   ├── images/
│   ├── js/
│   │   └── scoreboard.js    # Gestion pseudo + scores localStorage/API
│   ├── Themes/
│   │   ├── logique/         # shapes-challenge, logic-challenge, charade-challenge
│   │   ├── Memoire/         # number, image-memory, image-info
│   │   └── Decryptage/      # cesar, morse, chimie
│   ├── admin/               # Interface d'administration de l'API
│   ├── index.html           # Page d'accueil
│   ├── logic.html           # Page thème Logique
│   ├── memoire.html         # Page thème Mémoire
│   └── decryptage.html      # Page thème Décryptage
└── src/
    ├── config/              # Connexion MongoDB
    ├── controllers/         # Logique métier (themes, challenges, players, scores)
    ├── models/              # Schémas Mongoose (Theme, Challenge, Player)
    ├── routes/              # Routage Express
    ├── scripts/             # Script de seed
    ├── utils/               # Normalisation des réponses
    ├── app.js
    └── server.js
```

---

## Fonctionnalités notables

- **Progression verrouillée** : le premier thème est débloqué à la création du joueur ; les suivants se débloquent en complétant tous les défis du thème précédent.
- **Système de points** : chaque défi rapporte entre 100 et 180 points selon sa difficulté.
- **Classement global** (`/api/players/leaderboard`) : joueurs triés par score total.
- **Validation de réponses tolérante** : les réponses sont normalisées (trim, lowercase) avant comparaison côté serveur.
- **Scoreboard client** : les scores sont stockés en `localStorage` et synchronisés avec l'API. Chaque page de thème affiche les meilleurs scores par défi dans une modale.
- **Gestion de pseudo** : le joueur saisit un pseudo stocké localement, utilisé pour l'identification lors de la soumission des scores.
- **Admin panel** (`/admin`) : interface pour gérer les thèmes et défis via l'API sans passer par Mongo directement.

---

## Installation

1. Installer les dépendances

```bash
npm install
```

2. Créer un fichier `.env` à la racine

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/
```

3. Démarrer le projet

```bash
npm run dev
```

---

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Démarrage en mode watch |
| `npm start` | Démarrage simple |
| `npm run seed` | Réinitialise et insère les données de démo |
| `npm test` | Vérification syntaxique minimale |

---

## API REST

### Thèmes
- `GET /api/themes` — liste tous les thèmes
- `POST /api/themes` — crée un thème
- `GET /api/themes/:slug/challenges` — défis d'un thème

### Défis
- `GET /api/challenges` — liste tous les défis
- `GET /api/challenges/:id` — détail d'un défi
- `POST /api/challenges` — crée un défi

### Joueurs
- `GET /api/players` — liste les joueurs
- `GET /api/players/leaderboard` — classement par score
- `POST /api/players` — crée un joueur
- `GET /api/players/:id` — profil d'un joueur
- `PATCH /api/players/:id` — met à jour un joueur
- `POST /api/players/:id/complete-challenge` — valide une réponse et attribue les points

### Scores
- `GET /api/scores` — liste les scores
- `POST /api/scores` — soumet un score

#### Exemple de payload de validation

```json
{
  "challengeId": "ID_DU_CHALLENGE",
  "answer": "porte-2"
}
```

---

## Routes front

### Pages principales
- `/` — accueil
- `/themes/logique` — thème Logique
- `/themes/memoire` — thème Mémoire
- `/themes/decryptage` — thème Décryptage
- `/admin` — administration

### Accès aux défis
Les défis sont servis depuis `/challenges/<theme>/<defi>/` :

```
/challenges/logique/shapes-challenge/shapes.html
/challenges/logique/logic-challenge/logic.html
/challenges/logique/charade-challenge/charade.html
/challenges/Memoire/number.html
/challenges/memory/image-memory/retenirimage.html
/challenges/memory/image-info/imageinfo.html
/challenges/Decryptage/cesar/cesar.html
/challenges/Decryptage/morse/morse.html
/challenges/Decryptage/chimie/chimie.html
```

Des alias courts sont également disponibles (`/jeu1.html` → shapes, `/jeu2.html` → logic, etc.).
