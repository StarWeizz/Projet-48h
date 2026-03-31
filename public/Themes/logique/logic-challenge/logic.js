const challenges = [
  {
    level: "Niveau 1 - Facile",
    question:
      "Dans une petite ferme, il y a 10 animaux : des poules et des lapins. Ils ont en tout 24 pattes. Combien y a-t-il de poules et de lapins ?",
    hint: "Commence par chercher une combinaison qui fait 10 animaux.",
    items: [
      {
        name: "Poules",
        plural: "poules",
        detail: "2 pattes",
        image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      },
      {
        name: "Lapins",
        plural: "lapins",
        detail: "4 pattes",
        image: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
      },
    ],
    sumTarget: 10,
    sumError: "Le total doit faire 10 animaux.",
    answers: [8, 2],
  },
  {
    level: "Niveau 2 - Moyen",
    question:
      "Trouve deux nombres. Leur somme fait 25 et leur difference fait 7. Quels sont ces deux nombres ?",
    hint: "Le plus grand nombre doit etre 7 de plus que l'autre.",
    items: [
      {
        name: "Nombre 1",
        plural: "nombres",
        detail: "Nombre le plus grand",
        image: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
      },
      {
        name: "Nombre 2",
        plural: "nombres",
        detail: "Nombre le plus petit",
        image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      },
    ],
    sumTarget: 25,
    sumError: "La somme doit faire 25.",
    answers: [16, 9],
  },
  {
    level: "Niveau 3 - Difficile",
    question:
      "Dans une tirelire, il y a 18 pieces : des pieces de 1 euro et des pieces de 2 euros. La somme totale est de 27 euros. Combien y a-t-il de pieces de 1 euro et de pieces de 2 euros ?",
    hint: "Le nombre total de pieces doit faire 18.",
    items: [
      {
        name: "Pieces de 1 euro",
        plural: "pieces de 1 euro",
        detail: "Valeur : 1 euro",
        image: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
      },
      {
        name: "Pieces de 2 euros",
        plural: "pieces de 2 euros",
        detail: "Valeur : 2 euros",
        image: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
      },
    ],
    sumTarget: 18,
    sumError: "Le total doit faire 18 pieces.",
    answers: [9, 9],
  },
];

let currentChallengeIndex = 0;
let score = 0;
const SCORE_PER_CORRECT_ANSWER = 100;

const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const questionTextElement = document.getElementById("question-text");
const item1ImageElement = document.getElementById("item-1-image");
const item2ImageElement = document.getElementById("item-2-image");
const item1NameElement = document.getElementById("item-1-name");
const item2NameElement = document.getElementById("item-2-name");
const item1DetailElement = document.getElementById("item-1-detail");
const item2DetailElement = document.getElementById("item-2-detail");
const label1Element = document.getElementById("label-1");
const label2Element = document.getElementById("label-2");
const answer1Element = document.getElementById("answer-1");
const answer2Element = document.getElementById("answer-2");
const resultElement = document.getElementById("result");
const hintElement = document.getElementById("hint");
const validateButton = document.getElementById("validate-btn");

function updateScoreDisplay() {
  scoreElement.textContent = `Score : ${score} pts`;
}

function renderChallenge() {
  const challenge = challenges[currentChallengeIndex];
  const firstItem = challenge.items[0];
  const secondItem = challenge.items[1];

  levelElement.textContent = `${challenge.level} - Question ${currentChallengeIndex + 1} / ${challenges.length}`;
  questionTextElement.textContent = challenge.question;
  hintElement.textContent = `Indice : ${challenge.hint}`;

  item1ImageElement.src = firstItem.image;
  item1ImageElement.alt = firstItem.name;
  item1NameElement.textContent = firstItem.name;
  item1DetailElement.textContent = firstItem.detail;

  item2ImageElement.src = secondItem.image;
  item2ImageElement.alt = secondItem.name;
  item2NameElement.textContent = secondItem.name;
  item2DetailElement.textContent = secondItem.detail;

  label1Element.textContent = firstItem.name;
  label2Element.textContent = secondItem.name;

  answer1Element.value = "";
  answer2Element.value = "";
  answer1Element.placeholder = "Entrez un nombre";
  answer2Element.placeholder = "Entrez un nombre";
  resultElement.textContent = "";
  validateButton.disabled = false;
  updateScoreDisplay();
}

function showResult(message, color) {
  resultElement.textContent = message;
  resultElement.style.color = color;
}

function goToNextChallenge() {
  currentChallengeIndex += 1;

  if (currentChallengeIndex >= challenges.length) {
    levelElement.textContent = "Tous les niveaux sont termines";
    questionTextElement.textContent =
      `Bravo ! Tu as reussi les 3 defis du plus facile au plus difficile. Score final : ${score} pts.`;
    hintElement.textContent = "Tu peux recharger la page pour recommencer.";
    document.querySelector(".challenge-items").style.display = "none";
    document.querySelector(".form-group").style.display = "none";
    validateButton.style.display = "none";
    updateScoreDisplay();
    showResult("Serie completee avec succes !", "green");
    return;
  }

  renderChallenge();
}

function checkAnswer() {
  const challenge = challenges[currentChallengeIndex];

  if (!answer1Element.value || !answer2Element.value) {
    showResult("Les deux champs sont obligatoires.", "orange");
    return;
  }

  const answer1 = Number(answer1Element.value);
  const answer2 = Number(answer2Element.value);

  if (answer1 + answer2 !== challenge.sumTarget) {
    validateButton.disabled = true;
    showResult(challenge.sumError, "orange");

    setTimeout(() => {
      goToNextChallenge();
    }, 1200);
    return;
  }

  const isCorrect =
    answer1 === challenge.answers[0] && answer2 === challenge.answers[1];

  if (!isCorrect) {
    validateButton.disabled = true;
    showResult("Mauvaise reponse.", "red");

    setTimeout(() => {
      goToNextChallenge();
    }, 1200);
    return;
  }

  validateButton.disabled = true;
  score += SCORE_PER_CORRECT_ANSWER;
  updateScoreDisplay();
  showResult("Bonne reponse ! Passage a la question suivante...", "green");

  setTimeout(() => {
    goToNextChallenge();
  }, 1200);
}

validateButton.addEventListener("click", checkAnswer);

renderChallenge();
