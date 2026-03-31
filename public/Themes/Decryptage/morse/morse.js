const challenges = [
  {
    code: "·−·· ·  −·−· −−− −·· ·  −− −−− ·−· ··· ·  · ··· −  ··− −·  ··· −·−− ··· − ·−··− −− ·  −·· ·  −·−· −−− −− −− ··− −· ·· −·−· ·− − ·· −−− −·  −··· ·− ··· ··−··  ··· ··− ·−·  −·· · ···  ··· ·· −−· −· ·− ··− −··−  −·−· −−− ··− ·−· − ···  · −  ·−·· −−− −· −−· ··· ·−·−·− ",
    result:
      "LE CODE MORSE EST UN SYSTÈME DE COMMUNICATION BASÉ SUR DES SIGNAUX COURTS ET LONGS.",
  },
  {
    code: "· −·  ··− − ·· ·−·· ·· ··· ·− −· −  ·−·· ·  −·−· −−− −·· ·  −− −−− ·−· ··· · −−··−−  ·· ·−··  · ··· −  ·−−· −−− ··· ··· ·· −··· ·−·· ·  −·· ·  − ·−· ·− −· ··· −− · − − ·−· ·  −·· · ···  −− · ··· ··· ·− −−· · ···  ·−−· ·− ·−·  −·· · ···  ··· ·· −−· −· ·− ··− −··−  ·−·· ··− −− ·· −· · ··− −··−  −−− ··−  ··· −−− −· −−− ·−· · ··· ·−·−·− ",
    result:
      "EN UTILISANT LE CODE MORSE, IL EST POSSIBLE DE TRANSMETTRE DES MESSAGES PAR DES SIGNAUX LUMINEUX OU SONORES.",
  },
  {
    code: "·−·· ·−  −·−· −−− −− −··· ·· −· ·− ·· ··· −−− −·  −·· ··−  −·−· −−− −·· ·  −− −−− ·−· ··· ·  · −  −·· ·  ·−·· ·−  −·−· −·−− −··· · ·−· ··· ··−·· −·−· ··− ·−· ·· − ··−··  −− −−− −· − ·−· ·  ·−·· ·−−−−· ·· −− ·−−· −−− ·−· − ·− −· −·−· ·  −·· ·  ·−·· ·−  −·−· −−− −− −− ··− −· ·· −·−· ·− − ·· −−− −·  ··· ··−·· −·−· ··− ·−· ·· ··· ··−·· · ·−·−·− ",
    result:
      "LA COMBINAISON DU CODE MORSE ET DE LA CYBERSÉCURITÉ MONTRE L'IMPORTANCE DE LA COMMUNICATION SÉCURISÉE.",
  },
];

const morseToLetter = {
  "·−": "A",
  "−···": "B",
  "−·−·": "C",
  "−··": "D",
  "·": "E",
  "··−·": "F",
  "−−·": "G",
  "····": "H",
  "··": "I",
  "·−−−": "J",
  "−·−": "K",
  "·−··": "L",
  "−−": "M",
  "−·": "N",
  "−−−": "O",
  "·−−·": "P",
  "−−·−": "Q",
  "·−·": "R",
  "···": "S",
  "−": "T",
  "··−": "U",
  "···−": "V",
  "·−−": "W",
  "−··−": "X",
  "−·−−": "Y",
  "−−··": "Z",
  "−−−−−": "0",
  "·−−−−": "1",
  "··−−−": "2",
  "···−−": "3",
  "····−": "4",
  "·····": "5",
  "−····": "6",
  "−−···": "7",
  "−−−··": "8",
  "−−−−·": "9",
};

let currentStep = 0;

const stepLabel = document.getElementById("stepLabel");
const statusBadge = document.getElementById("statusBadge");
const codeText = document.getElementById("codeText");
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const resultText = document.getElementById("resultText");
const resultStatus = document.getElementById("resultStatus");
const hintText = document.getElementById("hintText");

function normalizeAnswer(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
}

function decodeMorse(morse) {
  const words = morse.split("   ");
  return words
    .map((word) => {
      const letters = word.split(" ");
      return letters.map((letter) => morseToLetter[letter] || "?").join("");
    })
    .join(" ");
}

function renderStep() {
  const challenge = challenges[currentStep];

  stepLabel.textContent = `Étape ${currentStep + 1} / ${challenges.length}`;
  codeText.textContent = challenge.code;
  resultText.textContent = "—";
  resultStatus.textContent = "—";
  hintText.textContent = "Décode le message morse et entre le texte clair.";
  statusBadge.textContent = "En cours";
  textInput.value = "";
  textInput.focus();
}

function finishExercise() {
  statusBadge.textContent = "Terminé";
  codeText.textContent = "Bravo, tu as validé les 3 messages morse !";
  hintText.textContent = "Tous les messages morse ont été décodés avec succès.";
  textForm.querySelector("button").disabled = true;
  textInput.disabled = true;

  if (typeof Quiz48h !== 'undefined') {
    Quiz48h.saveScore('morse', 'Décryptage Morse', challenges.length, challenges.length);
    const scoresDiv = document.createElement('div');
    scoresDiv.style.marginTop = '1.5rem';
    scoresDiv.innerHTML = '<h3 style="margin-bottom:0.5rem;">Meilleurs scores</h3><div id="end-scores-list"><p style="color:#888;font-style:italic;">Chargement...</p></div>';
    hintText.parentNode.appendChild(scoresDiv);
    Quiz48h.getScores('morse').then(function(scores) {
      Quiz48h.renderScoreList(scores, document.getElementById('end-scores-list'));
    });
  }
}

textForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const challenge = challenges[currentStep];
  const userText = textInput.value.trim();

  if (!userText) {
    resultStatus.textContent = "Defaite";
    hintText.textContent = "Entre ton décodage du message morse.";
    return;
  }

  const isWin = normalizeAnswer(userText) === normalizeAnswer(challenge.result);

  resultText.textContent = userText;
  resultStatus.textContent = isWin ? "Win" : "Defaite";

  if (isWin) {
    if (currentStep === challenges.length - 1) {
      finishExercise();
      return;
    }

    hintText.textContent = "Win ! Passage à l'étape suivante...";
    currentStep += 1;

    setTimeout(() => {
      renderStep();
    }, 900);
    return;
  }

  hintText.textContent = "Defaite : continue à décoder le message morse.";
});

renderStep();
