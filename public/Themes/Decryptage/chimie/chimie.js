const challenges = [
  {
    word: "CAFE",
    hint: "Une boisson chaude incontournable du matin...",
    elements: [
      { symbol: "Ca", name: "Calcium", atomicNumber: 20, bg: "#fff3e0", color: "#e65100" },
      { symbol: "Fe", name: "Fer", atomicNumber: 26, bg: "#e3f2fd", color: "#0d47a1" },
    ],
  },
  {
    word: "BISON",
    hint: "Un grand bovidé des plaines d'Amérique du Nord...",
    elements: [
      { symbol: "Bi", name: "Bismuth", atomicNumber: 83, bg: "#f3e5f5", color: "#6a1b9a" },
      { symbol: "S", name: "Soufre", atomicNumber: 16, bg: "#fffde7", color: "#f57f17" },
      { symbol: "O", name: "Oxygène", atomicNumber: 8, bg: "#e8f5e9", color: "#1b5e20" },
      { symbol: "N", name: "Azote", atomicNumber: 7, bg: "#e0f7fa", color: "#006064" },
    ],
  },
  {
    word: "POLICE",
    hint: "Ils veillent au respect de la loi et maintiennent l'ordre public...",
    elements: [
      { symbol: "Po", name: "Polonium", atomicNumber: 84, bg: "#e8f5e9", color: "#1b5e20" },
      { symbol: "Li", name: "Lithium", atomicNumber: 3, bg: "#ffebee", color: "#b71c1c" },
      { symbol: "Ce", name: "Cérium", atomicNumber: 58, bg: "#fff8e1", color: "#e65100" },
    ],
  },
];

let currentStep = 0;
let shuffledElements = [];
let selectedSequence = [];

const stepLabel = document.getElementById("stepLabel");
const statusBadge = document.getElementById("statusBadge");
const hintText = document.getElementById("hintText");
const cardsGrid = document.getElementById("cardsGrid");
const assembledWord = document.getElementById("assembledWord");
const resetBtn = document.getElementById("resetBtn");
const validateBtn = document.getElementById("validateBtn");
const resultZone = document.getElementById("resultZone");
const resultStatus = document.getElementById("resultStatus");
const resultHint = document.getElementById("resultHint");

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderStep() {
  const challenge = challenges[currentStep];
  shuffledElements = shuffle([...challenge.elements]);
  selectedSequence = [];

  stepLabel.textContent = `Étape ${currentStep + 1} / ${challenges.length}`;
  statusBadge.textContent = "En cours";
  statusBadge.className = "badge";
  hintText.textContent = challenge.hint;
  assembledWord.textContent = "—";
  validateBtn.disabled = true;
  resetBtn.disabled = false;
  resultZone.style.display = "none";

  renderCards();
}

function renderCards() {
  cardsGrid.innerHTML = "";

  shuffledElements.forEach((el, idx) => {
    const isSelected = selectedSequence.includes(idx);
    const orderPos = selectedSequence.indexOf(idx);

    const card = document.createElement("div");
    card.className = "element-card" + (isSelected ? " selected" : "");
    card.style.background = el.bg;
    card.style.color = el.color;
    card.style.borderColor = el.color;

    card.innerHTML = `
      <span class="atomic-number">${el.atomicNumber}</span>
      <span class="symbol">${el.symbol}</span>
      <span class="name">${el.name}</span>
      ${isSelected ? `<span class="order-badge">${orderPos + 1}</span>` : ""}
    `;

    card.addEventListener("click", () => handleCardClick(idx));
    cardsGrid.appendChild(card);
  });
}

function updateAssembly() {
  const assembled = selectedSequence.map((i) => shuffledElements[i].symbol).join("");
  assembledWord.textContent = assembled || "—";
  validateBtn.disabled = selectedSequence.length !== challenges[currentStep].elements.length;
}

function handleCardClick(idx) {
  const posInSequence = selectedSequence.indexOf(idx);

  if (posInSequence === -1) {
    selectedSequence.push(idx);
  } else {
    selectedSequence.splice(posInSequence, 1);
  }

  updateAssembly();
  renderCards();
}

function validate() {
  const challenge = challenges[currentStep];
  const assembled = selectedSequence
    .map((i) => shuffledElements[i].symbol)
    .join("")
    .toUpperCase();

  const isWin = assembled === challenge.word;

  resultZone.style.display = "block";
  resultStatus.textContent = isWin ? "Win !" : "Défaite";

  if (isWin) {
    statusBadge.textContent = "Win";
    statusBadge.className = "badge badge-win";

    if (currentStep === challenges.length - 1) {
      finishExercise();
      return;
    }

    resultHint.textContent = `Bravo ! Le mot était bien "${challenge.word}". Passage à l'étape suivante...`;
    currentStep += 1;
    setTimeout(() => renderStep(), 1500);
  } else {
    resultHint.textContent = "Ce n'est pas le bon ordre. Essaie encore !";
    selectedSequence = [];

    setTimeout(() => {
      renderCards();
      assembledWord.textContent = "—";
      validateBtn.disabled = true;
      resultZone.style.display = "none";
    }, 1200);
  }
}

function finishExercise() {
  statusBadge.textContent = "Terminé";
  statusBadge.className = "badge badge-done";
  hintText.textContent = "Félicitations ! Tu as résolu tous les défis chimiques !";
  resultHint.textContent = "Tous les mots ont été retrouvés grâce aux formules chimiques.";
  cardsGrid.innerHTML = "";
  assembledWord.textContent = challenges[challenges.length - 1].word;
  validateBtn.disabled = true;
  resetBtn.disabled = true;

  if (typeof Quiz48h !== 'undefined') {
    Quiz48h.saveScore('chimie', 'Chimie & Symboles', challenges.length, challenges.length);
    const scoresDiv = document.createElement('div');
    scoresDiv.style.marginTop = '1.5rem';
    scoresDiv.innerHTML = '<h3 style="margin-bottom:0.5rem;">Meilleurs scores</h3><div id="end-scores-list"><p style="color:#888;font-style:italic;">Chargement...</p></div>';
    resultHint.parentNode.appendChild(scoresDiv);
    Quiz48h.getScores('chimie').then(function(scores) {
      Quiz48h.renderScoreList(scores, document.getElementById('end-scores-list'));
    });
  }
}

resetBtn.addEventListener("click", () => {
  selectedSequence = [];
  renderCards();
  assembledWord.textContent = "—";
  validateBtn.disabled = true;
  resultZone.style.display = "none";
});

validateBtn.addEventListener("click", validate);

renderStep();
