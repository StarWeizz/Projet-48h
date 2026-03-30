const fs = require("node:fs");
const path = require("node:path");

const dotenv = require("dotenv");

const rootEnvPath = path.resolve(process.cwd(), ".env");
const legacyEnvPath = path.resolve(__dirname, "../.env");
const envPath = fs.existsSync(rootEnvPath) ? rootEnvPath : legacyEnvPath;

dotenv.config({ path: envPath });

const connectDB = require("../config/db");
const Theme = require("../models/Theme");
const Challenge = require("../models/Challenge");
const Player = require("../models/Player");

const themes = [
    {
        name: "Temple des Logiques",
        slug: "temple-des-logiques",
        description: "Une serie d'enigmes progressives basees sur l'observation et la logique.",
        order: 1,
        difficulty: "easy",
    },
    {
        name: "Crypte du Chiffre",
        slug: "crypte-du-chiffre",
        description: "Des defis autour des codes, des substitutions et de la cryptographie.",
        order: 2,
        difficulty: "medium",
    },
    {
        name: "Laboratoire Algorithmique",
        slug: "laboratoire-algorithmique",
        description: "Des mini-problemes ou il faut comprendre un raisonnement et l'optimiser.",
        order: 3,
        difficulty: "hard",
    },
];

const challenges = [
    {
        themeSlug: "temple-des-logiques",
        title: "Les Trois Portes",
        slug: "les-trois-portes",
        order: 1,
        type: "logic",
        difficulty: "easy",
        statement: "Trois portes sont devant toi. Une seule mene a la suite. Trouve la bonne en eliminant les impossibles.",
        hint: "Commence par analyser les affirmations contradictoires.",
        successMessage: "La bonne porte s'ouvre lentement.",
        expectedAnswer: "porte-2",
        points: 100,
    },
    {
        themeSlug: "temple-des-logiques",
        title: "Suite Miroir",
        slug: "suite-miroir",
        order: 2,
        type: "observation",
        difficulty: "easy",
        statement: "Observe la suite suivante et trouve sa logique cachee : 2, 3, 5, 8, 13, ?",
        hint: "Chaque terme depend des deux precedents.",
        successMessage: "Le mecanisme s'aligne parfaitement.",
        expectedAnswer: "21",
        points: 120,
    },
    {
        themeSlug: "crypte-du-chiffre",
        title: "Cesar Renverse",
        slug: "cesar-renverse",
        order: 1,
        type: "crypto",
        difficulty: "medium",
        statement: "Decode le message YNQX avec un decalage de 2 vers l'arriere.",
        hint: "Pense au chiffrement de Cesar.",
        successMessage: "Le message dechiffre apparait sur le mur.",
        expectedAnswer: "WLNV",
        points: 160,
    },
    {
        themeSlug: "crypte-du-chiffre",
        title: "Substitution Binaire",
        slug: "substitution-binaire",
        order: 2,
        type: "crypto",
        difficulty: "medium",
        statement: "Convertis 101010 en decimal pour debloquer la console.",
        hint: "Additionne les puissances de 2 actives.",
        successMessage: "La console accepte le code.",
        expectedAnswer: "42",
        points: 180,
    },
    {
        themeSlug: "laboratoire-algorithmique",
        title: "Chemin Minimal",
        slug: "chemin-minimal",
        order: 1,
        type: "algorithm",
        difficulty: "hard",
        statement: "Trouve le plus petit nombre d'etapes pour traverser un graphe sans revisiter un noeud.",
        hint: "Un parcours en largeur peut t'aider.",
        successMessage: "Le robot trouve l'itineraire optimal.",
        expectedAnswer: "bfs",
        points: 220,
    },
    {
        themeSlug: "laboratoire-algorithmique",
        title: "Tri sous Pression",
        slug: "tri-sous-pression",
        order: 2,
        type: "algorithm",
        difficulty: "hard",
        statement: "Quel algorithme de tri a une complexite moyenne de O(n log n) et repose sur le pivot ?",
        hint: "Il partitionne la liste autour d'une valeur centrale.",
        successMessage: "Les donnees se reorganisent instantanement.",
        expectedAnswer: "quicksort",
        points: 250,
    },
];

async function seedDemoData() {
    await connectDB();

    await Challenge.deleteMany({});
    await Theme.deleteMany({});
    await Player.deleteMany({});

    const createdThemes = await Theme.insertMany(themes);
    const themeMap = new Map(createdThemes.map((theme) => [theme.slug, theme._id]));

    const seededChallenges = challenges.map((challenge) => ({
        theme: themeMap.get(challenge.themeSlug),
        title: challenge.title,
        slug: challenge.slug,
        order: challenge.order,
        type: challenge.type,
        difficulty: challenge.difficulty,
        statement: challenge.statement,
        hint: challenge.hint,
        successMessage: challenge.successMessage,
        expectedAnswer: challenge.expectedAnswer,
        points: challenge.points,
    }));

    await Challenge.insertMany(seededChallenges);

    console.log("Demo data seeded successfully.");
    process.exit(0);
}

seedDemoData().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
});
