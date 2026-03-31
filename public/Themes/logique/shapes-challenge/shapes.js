const challenges = [
    {
        question: "Combien y a t-il de triangles dans l'image ?",
        imageURL: "./triangle_1.png",
        options: [17, 18, 22, 15],
        answer: 3
    },
    {
        question: "Combien y a t-il de triangles dans l'image ?",
        imageURL: "./triangle_2.png",
        options: [17, 18, 22, 15],
        answer: 3
    },
    {
        question: "Combien y a t-il de triangles dans l'image ?",
        imageURL: "./triangle_3.png",
        options: [17, 18, 22, 15],
        answer: 3
    }
]

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
            <button id="restart-btn">Rejouer</button>
        </div>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
        toggleGame();
    });
}
