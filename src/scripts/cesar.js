const normalizeAnswer = require("../utils/normalizeAnswer");

const userDecallage = [19, 7, 4];

const challenges = [
  {
    code: "Wtgl ex whftbgx wn wxoxehiixfxgm pxu be xlm bfihkmtgm w bgmxzkxk et vruxklxvnkbmx wtgl mhnl exl ikhcxml",
    resultat:
      "Dans le domaine du developpement web il est important d integrer la cybersecurite dans tous les projets",
    decallage: 19,
  },
  {
    code: "Slz xbpg lu jfilyzljbypal hpklua h ylumvyjly slz jvuuhpzzhujlz klz bapspzhalbyz khuz sl kvthpul kb klclsvwwltlua dli",
    resultat:
      "Les quiz en cybersecurite aident à renforcer les connaissances des utilisateurs dans le domaine du developpement web",
    decallage: 7,
  },
  {
    code: "Pe gcfivwigyvmxi ix pe kiwxmsr hi p mrjsvqexmsr wsrx hiw ipiqirxw gvmxmuyiw herw pi hizipsttiqirx aif viywwm ix wigyvmwi",
    resultat:
      "La cybersecurite et la gestion de l information sont des elements critiques dans le developpement web réussi et securise",
    decallage: 4,
  },
];

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

function checkResult(decoded, expected) {
  return normalizeAnswer(decoded) === normalizeAnswer(expected)
    ? "Win"
    : "Defaite";
}

function decodeChallenge(challenge, userDecallageByIndex) {
  const decallage =
    typeof userDecallageByIndex === "number"
      ? userDecallageByIndex
      : challenge.decallage;

  if (typeof decallage !== "number") {
    console.log("Defaite");
    console.log("Décalage manquant pour ce challenge");
    return;
  }

  const decoded = decodeText(challenge.code, decallage);
  const status = checkResult(decoded, challenge.resultat);

  console.log(status);
  console.log(`Décalage ${decallage} → ${decoded}`);
}

for (const [index, challenge] of challenges.entries()) {
  decodeChallenge(challenge, userDecallage[index]);
}
