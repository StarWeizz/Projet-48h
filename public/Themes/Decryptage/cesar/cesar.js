const challenges = [
  {
    code: "Wtgl ex whftbgx wn wxoxehiixfxgm pxu be xlm bfihkmtgm w bgmxzkxk et vruxklxvnkbmx wtgl mhnl exl ikhcxml",
    resultat:
      "Dans le domaine du developpement web il est important d integrer la cybersecurite dans tous les projets",
  },
  {
    code: "Slz xbpg lu jfilyzljbypal hpklua h ylumvyjly slz jvuuhpzzhujlz klz bapspzhalbyz khuz sl kvthpul kb klclsvwwltlua dli",
    resultat:
      "Les quiz en cybersecurite aident à renforcer les connaissances des utilisateurs dans le domaine du developpement web",
  },
  {
    code: "Pe gcfivwigyvmxi ix pe kiwxmsr hi p mrjsvqexmsr wsrx hiw ipiqirxw gvmxmuyiw herw pi hizipsttiqirx aif viywwm ix wigyvmwi",
    resultat:
      "La cybersecurite et la gestion de l information sont des elements critiques dans le developpement web réussi et securise",
  },
];

let currentStep = 0;

const stepLabel = document.getElementById("stepLabel");
const statusBadge = document.getElementById("statusBadge");
const codeText = document.getElementById("codeText");
const decalageForm = document.getElementById("decalageForm");
const decalageInput = document.getElementById("decalageInput");
const resultText = document.getElementById("resultText");
const resultStatus = document.getElementById("resultStatus");
const hintText = document.getElementById("hintText");
const submitButton = decalageForm.querySelector("button");

function normalizeAnswer(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function decodeText(text, decallage) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let index = 0; index < text.length; index++) {
    const originalChar = text[index];
    const lowerChar = originalChar.toLowerCase();
    const alphabetIndex = alphabet.indexOf(lowerChar);

    if (alphabetIndex === -1) {
      result += originalChar;
      continue;
    }

    let newIndex = (alphabetIndex - decallage) % 26;
    if (newIndex < 0) {
      newIndex += 26;
    }

    const decodedChar = alphabet[newIndex];
    result +=
      originalChar === originalChar.toUpperCase()
        ? decodedChar.toUpperCase()
        : decodedChar;
  }

  return result;
}

function renderStep() {
  const challenge = challenges[currentStep];

  stepLabel.textContent = `Etape ${currentStep + 1} / ${challenges.length}`;
  codeText.textContent = challenge.code;
  resultText.textContent = "-";
  resultStatus.textContent = "-";
  hintText.textContent = "Trouve le bon decalage pour passer a l'etape suivante.";
  statusBadge.textContent = "En cours";
  decalageInput.value = "";
  decalageInput.focus();
}

function finishExercise() {
  statusBadge.textContent = "Termine";
  codeText.textContent = "Bravo, tu as valide les 3 etapes du decryptage.";
  resultText.textContent = challenges[challenges.length - 1].resultat;
  resultStatus.textContent = "Victoire";
  hintText.textContent = "Tous les messages ont ete decodes avec succes.";
  submitButton.disabled = true;
  decalageInput.disabled = true;

  if (typeof Quiz48h !== 'undefined') {
    Quiz48h.saveScore('cesar', 'Décryptage César', challenges.length, challenges.length);
    const scoresDiv = document.createElement('div');
    scoresDiv.style.marginTop = '1.5rem';
    scoresDiv.innerHTML = '<h3 style="margin-bottom:0.5rem;">Meilleurs scores</h3><div id="end-scores-list"><p style="color:#888;font-style:italic;">Chargement...</p></div>';
    hintText.parentNode.appendChild(scoresDiv);
    Quiz48h.getScores('cesar').then(function(scores) {
      Quiz48h.renderScoreList(scores, document.getElementById('end-scores-list'));
    });
  }
}

decalageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const challenge = challenges[currentStep];
  const userShift = Number(decalageInput.value);

  if (Number.isNaN(userShift) || userShift < 0 || userShift > 25) {
    resultStatus.textContent = "Defaite";
    hintText.textContent = "Entre un decalage valide entre 0 et 25.";
    return;
  }

  const decoded = decodeText(challenge.code, userShift);
  const isWin = normalizeAnswer(decoded) === normalizeAnswer(challenge.resultat);

  resultText.textContent = decoded;
  resultStatus.textContent = isWin ? "Victoire" : "Defaite";

  if (isWin) {
    if (currentStep === challenges.length - 1) {
      finishExercise();
      return;
    }

    hintText.textContent = "Victoire ! Passage a l'etape suivante...";
    currentStep += 1;

    setTimeout(() => {
      renderStep();
    }, 900);
    return;
  }

  hintText.textContent = "Defaite : continue a chercher le bon decalage.";
});

renderStep();
