const challenges = [
{
    question: `Mon premier est le contraire de haut.
Mon deuxième est le contraire de rapide.
Mon troisième est le contraire de matin.
Mon tout s’accroche aux branches des arbres.`,
    imageURL: null,
    options: ["Balançoire", "Horloge", "Parapluie", "Cerf-volant"],
    answer: 0
},
{
    question: `Mon premier est un animal qui mange des souris.
Mon deuxième est un animal qui vit dans les égouts.
Mon troisième est un chiffre entre un et cinq.
Mon tout est ce que je suis en train de faire.`,
    imageURL: null,
    options: ["Charade", "Conversation", "Histoire", "Discussion"],
    answer: 0
},
{
    question: `Mon premier est au milieu de la figure.
Mon deuxième est le contraire d’habillé.
Mon troisième dirige les bateaux en mer la nuit.
Mon tout est une fleur sur l’eau.`,
    imageURL: null,
    options: ["Tulipe", "Nénuphar", "Rose", "Lotus"],
    answer: 1
},
{
    question: `Mon premier est un métal précieux.
Mon deuxième est un habitant des cieux.
Mon tout est un fruit délicieux.`,
    imageURL: null,
    options: ["Orange", "Pêche", "Poire", "Mangue"],
    answer: 0
},
{
    question: `Mon premier est un musicien célèbre.
Mon deuxième est une note de musique.
Mon troisième est aussi une note de musique.
Mon tout est un fromage italien.`,
    imageURL: null,
    options: ["Mozzarella", "Parmesan", "Ricotta", "Gorgonzola"],
    answer: 0
},
{
    question: `Mon premier est la première lettre de l’alphabet.
Mon deuxième est utilisé par les prisonniers pour s’échapper dans les bandes-dessinées.
Les fantômes font mon troisième dans les vieux châteaux.
Mon quatrième est la meilleure carte d’un jeu de 52.
Mon cinquième est une note de musique.
Mon sixième est un pronom personnel indéfini.
On doit généralement faire attention à mon tout.`,
    imageURL: null,
    options: ["Alimentation", "Attention", "Administration", "Application"],
    answer: 0
},
{
    question: `Mon premier est un ancien petit ami.
Mon deuxième est une boisson qu’aiment les anglais.
Mon troisième est un rongeur parfois mal aimé.
Mon quatrième est un métal précieux.
On fait mon cinquième lorsque l’on mange le soir.
Mon sixième nous est indispensable pour vivre.
Mon tout n’arrive pas souvent.`,
    imageURL: null,
    options: ["Extraordinaire", "Exceptionnel", "Incroyable", "Unique"],
    answer: 0
},
{
    question: `Mon premier est un synonyme de durée.
Mon deuxième est l’enveloppe extérieure du corps.
Mon troisième est un poisson au corps aplati.
Mon quatrième est le mot "ré" sans accent.
Mon tout est le contraire de permanent.`,
    imageURL: null,
    options: ["Temporaire", "Momentané", "Court", "Passager"],
    answer: 0
},
{
    question: `Mon premier est une boisson.
Mon deuxième est une boisson.
Mon troisième est une boisson.
Mon tout est une boisson.`,
    imageURL: null,
    options: ["Café-eau-lait", "Jus de fruit", "Soda", "Sirop"],
    answer: 0
},
{
    question: `Mon premier est un nombre entier supérieur à 0 mais inférieur à deux.
Les vaches passent leur temps dans mon deuxième.
Mon troisième est une note de musique.
Mon quatrième est un pronom indéfini.
Mon tout peut être trompeuse.`,
    imageURL: null,
    options: ["Impression", "Illusion", "Observation", "Sensation"],
    answer: 0
}
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

let timerInterval;
let timeLeft = 10;

document.addEventListener('DOMContentLoaded', () => {
    const challengesCount = challenges.length;
    const challengesCountElement = document.getElementById("challenges-count");
    challengesCountElement.textContent = challengesCount;

    const startGameElement = document.getElementById("startGame");
    startGameElement.addEventListener("click", () => {
        startGame();
    });
})

function startGame() {
    currentQuestions = challenges
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    currentQuestionIndex = 0;
    score = 0;

    toggleGame();
    showQuestion();
}

function startTimer() {
    timeLeft = 10;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;

        const timer = document.getElementById("timer");
        if (timer) {
            timer.textContent = `Temps restant : ${timeLeft}s`;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            showQuestion();
        }
    }, 1000);
}

function toggleGame() {
    const welcome = document.getElementById("welcome-quiz");
    const game = document.getElementById("game");

    welcome.style.display =
        welcome.style.display === "none" ? "block" : "none";

    game.style.display =
        game.style.display === "block" ? "none" : "block";
}

function showQuestion() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = "";

    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    const header = document.createElement("div");
    header.innerHTML = `
        <span>Question ${currentQuestionIndex + 1} / ${currentQuestions.length}</span>
        <span id="timer">Temps restant : 10s</span>
        <button id="quit-btn">Quitter</button>
    `;

    const questionBlock = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = question.question;
    questionBlock.appendChild(title);

    if (question.imageURL) {
        const img = document.createElement("img");
        img.src = question.imageURL;
        img.alt = question.question;
        questionBlock.appendChild(img);
    }

    question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {
            clearInterval(timerInterval);
            checkAnswer(index, question);
        });

        questionBlock.appendChild(btn);
    });

    gameDiv.appendChild(header);
    gameDiv.appendChild(questionBlock);

    document.getElementById("quit-btn").addEventListener("click", () => {
        clearInterval(timerInterval);
        toggleGame();
    });

    startTimer();
}

function checkAnswer(index, question) {
    const gameDiv = document.getElementById("game");
    const isCorrect = index === question.answer;

    if (isCorrect) score++;

    const feedback = document.createElement("p");
    feedback.className = isCorrect ? "feedback-correct" : "feedback-wrong";
    feedback.textContent = isCorrect
        ? "Bonne réponse !"
        : `Mauvaise réponse. La bonne réponse était : ${question.options[question.answer]}`;

    gameDiv.appendChild(feedback);

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

function endQuiz() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = `
        <div class="end-screen">
            <h2>Quiz terminé !</h2>
            <p>Score : ${score} / ${currentQuestions.length}</p>
            <p>${score >= 8 ? '🏆 Excellent !' : score >= 5 ? '👍 Bien joué !' : '💪 Continue à t\'entraîner !'}</p>
            <button id="restart-btn">Rejouer</button>
            <div id="end-scores" style="margin-top:1.5rem;">
                <h3 style="margin-bottom:0.5rem;">Meilleurs scores</h3>
                <div id="end-scores-list"><p style="color:#888;font-style:italic;">Chargement...</p></div>
            </div>
        </div>
    `;

    if (typeof Quiz48h !== 'undefined') {
        Quiz48h.saveScore('charade', 'Charades', score, currentQuestions.length);
        Quiz48h.getScores('charade').then(function(scores) {
            Quiz48h.renderScoreList(scores, document.getElementById('end-scores-list'));
        });
    }

    document.getElementById("restart-btn").addEventListener("click", () => {
        toggleGame();
    });
}
