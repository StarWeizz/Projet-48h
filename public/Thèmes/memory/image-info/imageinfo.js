const challenges = [
  {
    name: "Challenge 1",
    image: "./image/challenge1.png",
    questions: [
      {
        id: 1,
        question: "Quelle heure est t'il sur le telephone ?",
        answeroptions: ["9h16", "14h00", "10h30", "15h45"],
        answer: "9h16",
      },
      {
        id: 2,
        question: "Quel est le nom de la ville ?",
        answeroptions: ["Paris", "Lyon", "Marseille", "Toulouse"],
        answer: "Paris",
      },
      {
        id: 3,
        question: "Combien de °C fait il ?",
        answeroptions: ["20°C", "22°C", "25°C", "28°C"],
        answer: "22°C",
      },
      {
        id: 4,
        question: "Quelle est l'icon en Haut à gauche ?",
        answeroptions: ["Whatsapp", "Alert", "Message", "Meteo"],
        answer: "Message",
      },
      {
        id: 5,
        question: "Quelle est le morceau en cours de lecture ?",
        answeroptions: [
          "je t'aime",
          "La Vie en Rose",
          "Booba - Zoo",
          "Eclipse",
        ],
        answer: "Eclipse",
      },
      {
        id: 6,
        question: "Combien y'a t'il de tache effectué ?",
        answeroptions: ["4", "6", "3", "0"],
        answer: "0",
      },
      {
        id: 7,
        question: "Combien y'a t'il de tache en attente ?",
        answeroptions: ["4", "6", "3", "0"],
        answer: "3",
      },
      {
        id: 8,
        question: "Combien de % de batterie reste t'il ?",
        answeroptions: ["19%", "54%", "67%", "78%"],
        answer: "78%",
      },
      {
        id: 9,
        question: "Le reunion est programmé à quelle heure ?",
        answeroptions: ["9h16", "14h00", "14h30", "10h30"],
        answer: "14h00",
      },
      {
        id: 10,
        question: "Quelles sont les 3 chiffre en vert ?",
        answeroptions: ["3.5.2", "4.3.5", "2.5.3", "5.3.2"],
        answer: "3.5.2",
      },
      {
        id: 11,
        question: "Quelle connetcion avons nous ?",
        answeroptions: ["Wifi de Ynov", "5G", "6G", "4G"],
        answer: "4G",
      },
      {
        id: 12,
        question:
          "Quelle est l'heure inscrit tout en bas a droite de l'image ?",
        answeroptions: ["9h16", "14h00", "10h30", "15h45"],
        answer: "10h30",
      },
      {
        id: 13,
        question: "De quelle couleur étais le fond d'écran ?",
        answeroptions: ["vert", "bleu", "violet"],
        answer: "bleu",
      },
      {
        id: 14,
        question: "De quelle temps est la météo ?",
        answeroptions: [
          "il pleut",
          "il neige",
          "il fait beau",
          "il fait orage",
        ],
        answer: "il fait beau",
      },
    ],
  },
  {
    name: "Challenge 2",
    image: "./image/challenge2.png",
    questions: [
      {
        id: 1,
        question: "Quelle est la couleurs du fond d'écran ?",
        answeroptions: ["vert", "bleu", "violet", "rouge"],
        answer: "bleu",
      },
      {
        id: 2,
        question: "De quelle couleurs est le carnet de note ?",
        answeroptions: ["vert", "bleu", "violet", "rouge"],
        answer: "bleu",
      },
      {
        id: 3,
        question: "De quelle couleurs est le postite tout en bas ?",
        answeroptions: ["rose", "bleu", "violet", "rouge"],
        answer: "rose",
      },
      {
        id: 4,
        question: "Quelle chiffre sont sur les deux postite ?",
        answeroptions: ["14 - 27", "47 - 17", "27 - 8", "45 - 17"],
        answer: "47 - 17",
      },
      {
        id: 5,
        question: "Ya t'il un oiseaux sur l'image ?",
        answeroptions: ["oui", "non"],
        answer: "oui",
      },
      {
        id: 6,
        question: "De quelle couleurs est le livre qui est tomber ?",
        answeroptions: ["bleu", "violet", "rouge", "vert"],
        answer: "vert",
      },
      {
        id: 7,
        question: "Combien de livre sont sur l'étagère ?",
        answeroptions: ["2", "3", "4", "5"],
        answer: "4",
      },
      {
        id: 8,
        question: "De quelle couleurs est la tasse ?",
        answeroptions: ["vert", "bleu", "violet", "rouge"],
        answer: "rouge",
      },
      {
        id: 9,
        question: "Combien de plante sont sur l'image ?",
        answeroptions: ["1", "2", "3", "4"],
        answer: "1",
      },
      {
        id: 10,
        question:
          "Quelle sont les 3 chiffres entouré en rouge  sur le calendrier ?",
        answeroptions: ["14,22,12", "7,19,29", "3,13,26", "2,5,19"],
        answer: "3,13,26",
      },
      {
        id: 11,
        question: "ou ce situe la montre sur l'image ?",
        answeroptions: [
          "sur le bureaux",
          "a coter du carnet",
          "sur le clavier de l'ordinateur",
          "a coter de la tasse",
        ],
        answer: "sur le clavier de l'ordinateur",
      },
      {
        id: 12,
        question: "Ou ce trouve l'icon finder sur l'ordinateur ?",
        answeroptions: [
          "en bas a droit ",
          "en haut a gauche",
          "au milieux",
          "en haut a droite",
        ],
        answer: "en bas a droit ",
      },
      {
        id: 13,
        question: "quelle est le prix sur le bilet de caisse ?",
        answeroptions: ["9.80", "8.80", "9.90", "8.90"],
        answer: "8.90",
      },
      {
        id: 14,
        question: "Combien de temps duree l'appel téléphonique ?",
        answeroptions: ["14h30", "8h45", "14h27", "8h30"],
        answer: "14h27",
      },
      {
        id: 15,
        question: "yavais t'il une bague sur l'image ?",
        answeroptions: ["oui", "non"],
        answer: "non",
      },
    ],
  },
  {
    name: "Challenge 3",
    image: "./image/challenge3.png",
    questions: [
      {
        id: 1,
        question: "Y'a t'il une chaussette en dessou du lit ?",
        answeroptions: ["oui", "non"],
        answer: "oui",
      },
      {
        id: 2,
        question: "Combien ya t'il de coussin sur le lit ?",
        answeroptions: ["2", "3", "4", "5"],
        answer: "3",
      },
      {
        id: 3,
        question: "Combien y'a t'il de stylo / crayon en tout dans l'image ",
        answeroptions: ["9", "4", "7", "6"],
        answer: "6",
      },
      {
        id: 4,
        question: "Quelle chiffre y'a t'il sur le postite jaune ?",
        answeroptions: ["51", "27", "28", "47"],
        answer: "51",
      },
      {
        id: 5,
        question: "Ya t'il un verre d'eau sur le bureau ?",
        answeroptions: ["oui", "non"],
        answer: "oui",
      },
      {
        id: 6,
        question: "Combien ya t'il de piece en tout sur l'image ?",
        answeroptions: ["9", "4", "7", "6"],
        answer: "4",
      },
      {
        id: 7,
        question: "Combien y'a t'il d'horloge sur l'image ?",
        answeroptions: ["1", "2", "3", "4"],
        answer: "2",
      },
      {
        id: 8,
        question: "De quelle couleurs est le carnet dans le sac ?",
        answeroptions: ["vert", "bleu", "violet", "rouge"],
        answer: "rouge",
      },
      {
        id: 9,
        question: "Combien ya t'il d'icon sur le bureau  du pc ?",
        answeroptions: ["16", "14", "15", "20"],
        answer: "15",
      },
      {
        id: 10,
        question: "De quelle couleurs est la voiture devant la fenetre ?",
        answeroptions: ["vert", "jaune", "rouge", "bleu"],
        answer: "rouge",
      },
      {
        id: 11,
        question:
          "Combien de livre sont sur l'étagère en haut a droit de l'image ?",
        answeroptions: ["7", "6", "5", "8"],
        answer: "8",
      },
      {
        id: 12,
        question: "Quelle numero est ecrit sur le carnet du bureau ?",
        answeroptions: ["51", "28", "47", "12"],
        answer: "28",
      },
      {
        id: 13,
        question: "Il fait jour ou nuit dehors ?",
        answeroptions: ["jour", "nuit"],
        answer: "nuit",
      },
      {
        id: 14,
        question: "Combien de plante sont sur l'image ?",
        answeroptions: ["1", "2", "3", "4"],
        answer: "1",
      },
      {
        id: 15,
        question: "Y'a t'il un tapis sur le sol ?",
        answeroptions: ["oui", "non"],
        answer: "non",
      },
    ],
  },
];

let currentChallengeIndex = 0;
let selectedQuestions = [];
let userAnswers = {};

const stepLabel = document.getElementById("stepLabel");
const statusBadge = document.getElementById("statusBadge");
const goButton = document.getElementById("goButton");
const imagePhase = document.getElementById("imagePhase");
const timerPhase = document.getElementById("timerPhase");
const quizPhase = document.getElementById("quizPhase");
const resultPhase = document.getElementById("resultPhase");
const challengeImage = document.getElementById("challengeImage");
const timerText = document.getElementById("timerText");
const questionsContainer = document.getElementById("questionsContainer");
const submitQuizButton = document.getElementById("submitQuizButton");
const resultContent = document.getElementById("resultContent");
const nextChallengeButton = document.getElementById("nextChallengeButton");
const retryButton = document.getElementById("retryButton");

function selectRandomQuestions(questions, count = 5) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderPhase(phase) {
  imagePhase.classList.remove("active");
  timerPhase.classList.remove("active");
  quizPhase.classList.remove("active");
  resultPhase.classList.remove("active");

  if (phase === "image") {
    imagePhase.classList.add("active");
  } else if (phase === "timer") {
    timerPhase.classList.add("active");
  } else if (phase === "quiz") {
    quizPhase.classList.add("active");
  } else if (phase === "result") {
    resultPhase.classList.add("active");
  }
}

function startChallenge() {
  const challenge = challenges[currentChallengeIndex];
  stepLabel.textContent = challenge.name;
  statusBadge.textContent = "Observez...";
  goButton.disabled = true;

  renderPhase("timer");
  challengeImage.src = challenge.image;

  let timeLeft = 6;
  timerText.textContent = timeLeft;

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endImagePhase();
    }
  }, 1000);
}

function endImagePhase() {
  const challenge = challenges[currentChallengeIndex];
  selectedQuestions = selectRandomQuestions(challenge.questions, 5);
  userAnswers = {};

  renderPhase("quiz");
  statusBadge.textContent = "Questions";
  renderQuestions();
}

function renderQuestions() {
  questionsContainer.innerHTML = "";

  selectedQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-block";

    const questionLabel = document.createElement("strong");
    questionLabel.textContent = `${index + 1}. ${q.question}`;
    div.appendChild(questionLabel);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "question-options";

    q.answeroptions.forEach((option) => {
      const label = document.createElement("label");
      label.className = "option-label";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${q.id}`;
      input.value = option;
      input.addEventListener("change", () => {
        userAnswers[q.id] = option;
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      optionsDiv.appendChild(label);
    });

    div.appendChild(optionsDiv);
    questionsContainer.appendChild(div);
  });
}

function evaluateQuiz() {
  let correctCount = 0;

  selectedQuestions.forEach((q) => {
    if (userAnswers[q.id] === q.answer) {
      correctCount++;
    }
  });

  return correctCount;
}

function showResult(correctCount) {
  renderPhase("result");
  const isWin = correctCount >= 3;
  statusBadge.textContent = isWin ? "Réussi" : "Échoué";

  resultContent.textContent = `Tu as obtenu ${correctCount}/5 bonnes réponses.`;
  resultContent.className = isWin ? "win" : "lose";

  if (isWin) {
    resultContent.textContent += " Bien joué ! 🎉";
    if (currentChallengeIndex < challenges.length - 1) {
      resultContent.textContent += " Passage au challenge suivant...";
      nextChallengeButton.style.display = "none";
      retryButton.style.display = "none";
      setTimeout(() => {
        goToNextChallenge();
      }, 1200);
    } else {
      resultContent.textContent += " Tu as complété tous les challenges !";
      nextChallengeButton.style.display = "none";
      retryButton.style.display = "none";
    }
  } else {
    resultContent.textContent += " Continue à chercher...";
    retryButton.style.display = "inline-block";
    nextChallengeButton.style.display = "none";
  }
}

function goToNextChallenge() {
  currentChallengeIndex++;
  userAnswers = {};
  selectedQuestions = [];
  goButton.disabled = false;
  stepLabel.textContent = challenges[currentChallengeIndex].name;
  renderPhase("image");
  statusBadge.textContent = "Prêt";
}

goButton.addEventListener("click", startChallenge);
submitQuizButton.addEventListener("click", () => {
  const correctCount = evaluateQuiz();
  showResult(correctCount);
});

nextChallengeButton.addEventListener("click", () => {
  goToNextChallenge();
});

retryButton.addEventListener("click", () => {
  userAnswers = {};
  selectedQuestions = [];
  startChallenge();
});

stepLabel.textContent = challenges[currentChallengeIndex].name;
renderPhase("image");
