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

  stepLabel.textContent = `Étape ${currentStep + 1} / ${challenges.length}`;
  codeText.textContent = challenge.code;
  resultText.textContent = "—";
  resultStatus.textContent = "—";
  hintText.textContent =
    "Trouve le bon décalage pour passer à l'étape suivante.";
  statusBadge.textContent = "En cours";
  decalageInput.value = "";
  decalageInput.focus();
}

function finishExercise() {
  statusBadge.textContent = "Terminé";
  codeText.textContent = "Bravo, tu as validé les 3 étapes du décryptage.";
  hintText.textContent = "Tous les messages ont été décodés avec succès.";
  decalageForm.querySelector("button").disabled = true;
  decalageInput.disabled = true;
}

decalageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const challenge = challenges[currentStep];
  const userShift = Number(decalageInput.value);

  if (Number.isNaN(userShift) || userShift < 0 || userShift > 25) {
    resultStatus.textContent = "Defaite";
    hintText.textContent = "Entre un décalage valide entre 0 et 25.";
    return;
  }

  const decoded = decodeText(challenge.code, userShift);
  const isWin =
    normalizeAnswer(decoded) === normalizeAnswer(challenge.resultat);

  resultText.textContent = decoded;
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

  hintText.textContent = "Defaite : continue à chercher le bon décalage.";
});

renderStep();
