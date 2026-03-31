const API_BASE = `${window.location.origin}/api`;
const HEALTH_URL = `${window.location.origin}/health`;

const state = {
    player: null,
    theme: null,
    challenge: null,
};

const elements = {
    healthResult: document.getElementById("health-result"),
    bootstrapResult: document.getElementById("bootstrap-result"),
    playerResult: document.getElementById("player-result"),
    challengeStatement: document.getElementById("challenge-statement"),
    challengeHint: document.getElementById("challenge-hint"),
    answerResult: document.getElementById("answer-result"),
    leaderboardList: document.getElementById("leaderboard-list"),
    logList: document.getElementById("log-list"),
    playerName: document.getElementById("player-name"),
    answerInput: document.getElementById("challenge-answer"),
    checkApiButton: document.getElementById("check-api-button"),
    bootstrapButton: document.getElementById("bootstrap-button"),
    leaderboardButton: document.getElementById("leaderboard-button"),
    playerForm: document.getElementById("player-form"),
    answerForm: document.getElementById("answer-form"),
};

function log(message, detail) {
    const item = document.createElement("li");
    const timestamp = new Date().toLocaleTimeString("fr-FR");
    item.innerHTML = `<strong>${timestamp}</strong> - ${message}`;

    if (detail) {
        const detailBlock = document.createElement("pre");
        detailBlock.className = "code-block";
        detailBlock.textContent = typeof detail === "string" ? detail : JSON.stringify(detail, null, 2);
        item.appendChild(detailBlock);
    }

    elements.logList.prepend(item);
}

async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const message = typeof payload === "object" && payload !== null ? payload.message : payload;
        const error = new Error(message || "API request failed.");
        error.payload = payload;
        error.status = response.status;
        throw error;
    }

    return payload;
}

async function fetchHealth() {
    const response = await fetch(HEALTH_URL);
    const payload = await response.json();

    if (!response.ok) {
        const error = new Error(payload.message || "Healthcheck failed.");
        error.payload = payload;
        error.status = response.status;
        throw error;
    }

    return payload;
}

function renderThemeAndChallenge() {
    if (!state.challenge || !state.theme) {
        elements.challengeStatement.textContent = "Initialise d'abord les donnees de demo pour afficher le defi.";
        elements.challengeHint.textContent = "";
        return;
    }

    elements.challengeStatement.textContent = state.challenge.statement;
    elements.challengeHint.textContent = state.challenge.hint
        ? `Indice: ${state.challenge.hint}`
        : "";
}

function renderPlayer() {
    if (!state.player) {
        elements.playerResult.textContent = "Aucun joueur selectionne.";
        return;
    }

    elements.playerResult.textContent = JSON.stringify(
        {
            id: state.player._id,
            username: state.player.username,
            totalScore: state.player.totalScore,
            currentLevel: state.player.currentLevel,
        },
        null,
        2
    );
}

function getDemoThemePayload() {
    return {
        name: "Exemple API",
        slug: "exemple-api",
        description: "Theme de validation pour verifier l'integration front -> API -> Mongo.",
        order: 1,
        difficulty: "easy",
    };
}

function getDemoChallengePayload(themeId, themeSlug, existingChallenges) {
    const nextOrder = existingChallenges.reduce((maxValue, challenge) => {
        return Math.max(maxValue, Number(challenge.order) || 0);
    }, 0) + 1;

    return {
        theme: themeId,
        title: "Smoke Test API",
        slug: `smoke-test-${themeSlug}`,
        order: nextOrder,
        type: "logic",
        difficulty: "easy",
        statement: "Ecris api pour valider le branchement entre le defi et l'API.",
        hint: "La bonne reponse est le nom du service que tu testes ici.",
        successMessage: "Le defi d'exemple a bien parle a l'API.",
        expectedAnswer: "api",
        points: 50,
    };
}

async function checkHealth() {
    const health = await fetchHealth();
    elements.healthResult.textContent = JSON.stringify(health, null, 2);
    log("Healthcheck OK", health);
    return health;
}

async function ensureTheme() {
    const themes = await apiFetch("/themes?includeUnpublished=true");
    const demoTheme = themes.find((theme) => theme.slug === getDemoThemePayload().slug);

    if (demoTheme) {
        return demoTheme;
    }

    if (themes.length > 0) {
        return themes[0];
    }

    return apiFetch("/themes", {
        method: "POST",
        body: JSON.stringify(getDemoThemePayload()),
    });
}

async function ensureChallenge(theme) {
    const themeChallenges = await apiFetch(
        `/challenges?themeSlug=${encodeURIComponent(theme.slug)}&includeUnpublished=true`
    );
    const slug = `smoke-test-${theme.slug}`;
    const existingChallenge = themeChallenges.find((challenge) => challenge.slug === slug);

    if (existingChallenge) {
        return existingChallenge;
    }

    return apiFetch("/challenges", {
        method: "POST",
        body: JSON.stringify(getDemoChallengePayload(theme._id, theme.slug, themeChallenges)),
    });
}

async function bootstrapDemo() {
    const theme = await ensureTheme();
    const challenge = await ensureChallenge(theme);

    state.theme = theme;
    state.challenge = challenge;

    renderThemeAndChallenge();

    elements.bootstrapResult.textContent = JSON.stringify(
        {
            theme: {
                id: theme._id,
                name: theme.name,
                slug: theme.slug,
            },
            challenge: {
                id: challenge._id,
                title: challenge.title,
                slug: challenge.slug,
            },
        },
        null,
        2
    );

    log("Demo data ready", {
        theme: theme.slug,
        challenge: challenge.slug,
    });
}

async function ensurePlayer(username) {
    try {
        return await apiFetch("/players", {
            method: "POST",
            body: JSON.stringify({ username }),
        });
    } catch (error) {
        if (error.status !== 409) {
            throw error;
        }

        const players = await apiFetch("/players");
        const existingPlayer = players.find((player) => player.username === username);

        if (!existingPlayer) {
            throw error;
        }

        return existingPlayer;
    }
}

async function loadPlayer(event) {
    event.preventDefault();

    const username = elements.playerName.value.trim();

    if (!username) {
        elements.playerResult.textContent = "Entre un pseudo valide avant de continuer.";
        return;
    }

    const player = await ensurePlayer(username);
    state.player = player;
    renderPlayer();
    log("Player ready", {
        id: player._id,
        username: player.username,
    });
}

async function submitAnswer(event) {
    event.preventDefault();

    if (!state.challenge) {
        elements.answerResult.textContent = "Initialise d'abord le theme et le defi de demo.";
        return;
    }

    if (!state.player) {
        elements.answerResult.textContent = "Charge d'abord un joueur avant de soumettre une reponse.";
        return;
    }

    const answer = elements.answerInput.value.trim();

    if (!answer) {
        elements.answerResult.textContent = "Entre une reponse avant de valider.";
        return;
    }

    try {
        const result = await apiFetch(`/players/${state.player._id}/complete-challenge`, {
            method: "POST",
            body: JSON.stringify({
                challengeId: state.challenge._id,
                answer,
            }),
        });

        state.player = result.player;
        renderPlayer();
        elements.answerResult.textContent = JSON.stringify(result, null, 2);
        log("Answer accepted", {
            player: state.player.username,
            score: state.player.totalScore,
        });
        await refreshLeaderboard();
    } catch (error) {
        elements.answerResult.textContent = JSON.stringify(
            {
                status: error.status,
                message: error.message,
                details: error.payload || null,
            },
            null,
            2
        );
        log("Answer rejected", error.payload || error.message);
    }
}

async function refreshLeaderboard() {
    const leaderboard = await apiFetch("/players/leaderboard");
    elements.leaderboardList.innerHTML = "";

    if (leaderboard.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "Aucun score pour le moment.";
        elements.leaderboardList.appendChild(emptyItem);
        return;
    }

    leaderboard.forEach((player, index) => {
        const item = document.createElement("li");
        item.textContent = `${index + 1}. ${player.username} - ${player.totalScore} points - niveau ${player.currentLevel}`;
        elements.leaderboardList.appendChild(item);
    });

    log("Leaderboard refreshed", leaderboard.slice(0, 3));
}

async function runSafely(action, fallbackTarget, fallbackMessage) {
    try {
        await action();
    } catch (error) {
        const payload = {
            status: error.status || 500,
            message: error.message,
            details: error.payload || null,
        };

        fallbackTarget.textContent = JSON.stringify(payload, null, 2);
        log(fallbackMessage, payload);
    }
}

function bindEvents() {
    elements.checkApiButton.addEventListener("click", () => {
        runSafely(checkHealth, elements.healthResult, "Healthcheck failed");
    });

    elements.bootstrapButton.addEventListener("click", () => {
        runSafely(bootstrapDemo, elements.bootstrapResult, "Bootstrap failed");
    });

    elements.leaderboardButton.addEventListener("click", () => {
        runSafely(refreshLeaderboard, elements.answerResult, "Leaderboard refresh failed");
    });

    elements.playerForm.addEventListener("submit", (event) => {
        runSafely(() => loadPlayer(event), elements.playerResult, "Player load failed");
    });

    elements.answerForm.addEventListener("submit", (event) => {
        runSafely(() => submitAnswer(event), elements.answerResult, "Answer submission failed");
    });
}

async function init() {
    bindEvents();
    await runSafely(checkHealth, elements.healthResult, "Initial healthcheck failed");
    await runSafely(refreshLeaderboard, elements.answerResult, "Initial leaderboard load failed");
}

init();
