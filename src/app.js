const fs = require("node:fs");
const path = require("node:path");

const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const publicDirectory = path.join(__dirname, "..", "public");
const themesDirectory = path.join(publicDirectory, "Thèmes");

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function toLabel(value = "") {
    return value
        .split(/[-_]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function discoverChallengePages() {
    if (!fs.existsSync(themesDirectory)) {
        return [];
    }

    const pages = [];
    const themeEntries = fs.readdirSync(themesDirectory, { withFileTypes: true });

    for (const themeEntry of themeEntries) {
        if (!themeEntry.isDirectory()) {
            continue;
        }

        const themeDirectory = path.join(themesDirectory, themeEntry.name);
        const challengeEntries = fs.readdirSync(themeDirectory, { withFileTypes: true });

        for (const challengeEntry of challengeEntries) {
            if (!challengeEntry.isDirectory()) {
                continue;
            }

            const challengeDirectory = path.join(themeDirectory, challengeEntry.name);
            const htmlFiles = fs.readdirSync(challengeDirectory)
                .filter((fileName) => fileName.toLowerCase().endsWith(".html"))
                .sort((left, right) => left.localeCompare(right, "fr"));

            if (htmlFiles.length === 0) {
                continue;
            }

            const htmlFile = htmlFiles[0];

            pages.push({
                theme: themeEntry.name,
                slug: challengeEntry.name,
                title: toLabel(challengeEntry.name),
                href: `/challenges/${encodeURIComponent(themeEntry.name)}/${encodeURIComponent(challengeEntry.name)}/${encodeURIComponent(htmlFile)}`,
                isDemo:
                    themeEntry.name.toLowerCase() === "exemple" &&
                    challengeEntry.name.toLowerCase() === "defiexemple",
            });
        }
    }

    return pages.sort((left, right) => {
        const themeComparison = left.theme.localeCompare(right.theme, "fr", { sensitivity: "base" });

        if (themeComparison !== 0) {
            return themeComparison;
        }

        return left.title.localeCompare(right.title, "fr", { sensitivity: "base" });
    });
}

function renderCard(page) {
    return `
        <a class="challenge-card" href="${page.href}">
            <span class="card-theme">${escapeHtml(page.theme)}</span>
            <strong>${escapeHtml(page.title)}</strong>
            <span class="card-link">Ouvrir le defi</span>
        </a>
    `;
}

function renderDevHome() {
    const pages = discoverChallengePages();
    const demoPage = pages.find((page) => page.isDemo);
    const challengePages = pages.filter((page) => !page.isDemo);

    const challengeCards = challengePages.length > 0
        ? challengePages.map(renderCard).join("")
        : '<p class="empty-state">Aucun defi HTML detecte pour le moment.</p>';

    const demoLink = demoPage ? demoPage.href : "/demo";

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Challenge 48H | Dev Home</title>
    <style>
        :root {
            --bg: #efe9dc;
            --surface: rgba(255, 252, 246, 0.94);
            --surface-strong: #fffaf1;
            --border: rgba(46, 32, 19, 0.12);
            --ink: #24170e;
            --ink-soft: #6d5237;
            --accent: #b04824;
            --accent-soft: #f4d3b3;
            --shadow: 0 24px 44px rgba(68, 43, 23, 0.12);
            --radius: 24px;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: var(--ink);
            background:
                radial-gradient(circle at top left, rgba(176, 72, 36, 0.18), transparent 26%),
                radial-gradient(circle at top right, rgba(30, 103, 90, 0.12), transparent 24%),
                linear-gradient(150deg, var(--bg) 0%, #e6dbc8 100%);
        }

        a { color: inherit; }

        .page-shell {
            width: min(1180px, calc(100% - 32px));
            margin: 0 auto;
            padding: 36px 0 52px;
        }

        .hero,
        .section-card,
        .challenge-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            backdrop-filter: blur(12px);
        }

        .hero {
            padding: 30px;
            margin-bottom: 22px;
        }

        .eyebrow {
            margin: 0 0 8px;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: 0.78rem;
            color: var(--accent);
        }

        h1,
        h2,
        p {
            margin-top: 0;
        }

        h1 {
            margin-bottom: 12px;
            font-size: clamp(2.4rem, 4vw, 4.3rem);
            line-height: 0.98;
            max-width: 10ch;
        }

        .hero-copy {
            max-width: 70ch;
            color: var(--ink-soft);
            line-height: 1.7;
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 22px;
        }

        .hero-actions a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 18px;
            border-radius: 999px;
            text-decoration: none;
        }

        .primary-link {
            color: #fff7f0;
            background: linear-gradient(135deg, var(--accent) 0%, #d56a33 100%);
        }

        .ghost-link {
            border: 1px solid var(--border);
            background: rgba(255, 255, 255, 0.72);
        }

        .layout {
            display: grid;
            grid-template-columns: minmax(0, 1.8fr) minmax(280px, 0.9fr);
            gap: 20px;
        }

        .section-card {
            padding: 24px;
        }

        .section-card h2 {
            margin-bottom: 6px;
        }

        .section-card p {
            color: var(--ink-soft);
            line-height: 1.6;
        }

        .challenge-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            margin-top: 18px;
        }

        .challenge-card {
            display: grid;
            gap: 10px;
            padding: 18px;
            text-decoration: none;
            transition: transform 140ms ease, border-color 140ms ease;
        }

        .challenge-card:hover {
            transform: translateY(-2px);
            border-color: rgba(176, 72, 36, 0.34);
        }

        .card-theme {
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--accent);
        }

        .card-link {
            color: var(--ink-soft);
            font-weight: 600;
        }

        .sidebar-list {
            list-style: none;
            padding: 0;
            margin: 16px 0 0;
            display: grid;
            gap: 12px;
        }

        .sidebar-list li {
            padding: 14px 16px;
            border-radius: 18px;
            background: var(--surface-strong);
            border: 1px solid var(--border);
        }

        .sidebar-list code {
            font-family: Consolas, "Courier New", monospace;
            color: var(--accent);
        }

        .empty-state {
            margin: 18px 0 0;
            padding: 16px;
            border-radius: 18px;
            background: var(--surface-strong);
            border: 1px dashed var(--border);
        }

        @media (max-width: 920px) {
            .layout {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 700px) {
            .page-shell {
                width: min(100% - 20px, 1180px);
                padding: 22px 0 32px;
            }

            .hero,
            .section-card {
                padding: 20px;
            }

            .challenge-grid {
                grid-template-columns: 1fr;
            }

            .hero-actions a {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <main class="page-shell">
        <section class="hero">
            <p class="eyebrow">Mode developpement</p>
            <h1>Hub des defis et de la demo</h1>
            <p class="hero-copy">
                Cette page detecte automatiquement les pages HTML presentes dans public/Thèmes et sert de point d'entree
                commun pour tester rapidement les integrations de l'equipe pendant la phase de dev.
            </p>
            <div class="hero-actions">
                <a class="primary-link" href="${demoLink}">Ouvrir la demo API</a>
                <a class="ghost-link" href="/api" target="_blank" rel="noreferrer">Explorer l'API</a>
                <a class="ghost-link" href="/health" target="_blank" rel="noreferrer">Verifier le serveur</a>
            </div>
        </section>

        <section class="layout">
            <article class="section-card">
                <p class="eyebrow">Defis detectes</p>
                <h2>${challengePages.length} page(s) de defi trouvee(s)</h2>
                <p>Chaque carte ouvre directement le HTML du defi correspondant via le routeur de dev.</p>
                <div class="challenge-grid">
                    ${challengeCards}
                </div>
            </article>

            <aside class="section-card">
                <p class="eyebrow">Raccourcis</p>
                <h2>Routes utiles</h2>
                <ul class="sidebar-list">
                    <li><strong>Accueil dev</strong><br><code>/</code></li>
                    <li><strong>Demo API</strong><br><code>/demo</code></li>
                    <li><strong>Challenges statiques</strong><br><code>/challenges/&lt;theme&gt;/&lt;defi&gt;/page.html</code></li>
                    <li><strong>API</strong><br><code>/api</code></li>
                </ul>
            </aside>
        </section>
    </main>
</body>
</html>`;
}

app.use(cors());
app.use(express.json());
app.use("/public", express.static(publicDirectory));
app.use("/challenges", express.static(themesDirectory));

app.get("/", (req, res) => {
    res.type("html").send(renderDevHome());
});

app.get("/demo", (req, res) => {
    res.redirect("/challenges/exemple/defiexemple/defiexemple.html");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
